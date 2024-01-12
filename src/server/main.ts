import { Auth, gmail_v1 } from "googleapis";
import { addLabelToEmail, createLabelIfNotExist, getMessage, getUnreadMessages, reply } from "../shared/gmail";
import { GenerateSmartReply } from "../shared/llm";
import { schedule } from "../shared/scheduler";
import redisClient from "./redis";

const MARKER_LABEL = "vacation";
const DEFAULT_AUTOMATED_MESSAGE = `Hey, the recipient is currently on vacation. Once they are back, they will reply to your email. This is an automated reply sent by VacationResponder.`;


export async function Main() {
    await schedule(async () => {
        let lastExecutedAt = Date.now();
        // create auth clients from tokens stored in redis
        // key:email, value:access_token
        const activeStatusKeys = await redisClient.keys("status:*");
        console.log(`\nFound ${activeStatusKeys.length} active accounts`);

        console.log(activeStatusKeys)
        // for all job, create an authClient and run the job
        activeStatusKeys.forEach(async (key) => {
            const email = key.split(":")[1];
            console.log(`\nProcessing for ${email}`);
            const refresh_token = await redisClient.get(key);

            const authclient = new Auth.OAuth2Client(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                `${process.env.HOST_URL}/auth/google/callback`
            );
            authclient.setCredentials({
                refresh_token,
            });
            await RecurringJob(authclient, lastExecutedAt);
        })
        lastExecutedAt = Date.now();
    });
}

export async function RecurringJob(authclient: Auth.OAuth2Client, lastExecutedAt: number) {
    try {
        const MARKER_LABEL_ID = await createLabelIfNotExist(authclient, MARKER_LABEL);

        const unreadMessages = await getUnreadMessages(authclient, lastExecutedAt);
        if (unreadMessages.resultSizeEstimate === 0) {
            console.log("\nNo new unread emails");
            return;
        }
        console.log(`\nFound ${unreadMessages.resultSizeEstimate} new unread emails`);
        const batchSize = 10;
        await processMessagesConcurrently(authclient, unreadMessages.messages, MARKER_LABEL_ID, batchSize);
        console.log('Replied to unread emails and applied the label');
    } catch (error) {
        console.error('Error in RecurringJob:', error);
    }
}

async function processMessagesConcurrently(authclient: Auth.OAuth2Client, messages: gmail_v1.Schema$Message[], MARKER_LABEL_ID: string, batchSize: number) {
    for (let i = 0; i < messages.length; i += batchSize) {
        const batch = messages.slice(i, i + batchSize);
        const batchPromises = [];

        for (const message of batch) {
            const snippet = (await getMessage(authclient, message.id)).snippet;
            batchPromises.push(addLabelToEmail(authclient, message.id, MARKER_LABEL_ID));
            batchPromises.push(
                reply(authclient, {
                    message: snippet && await GenerateSmartReply(snippet) || DEFAULT_AUTOMATED_MESSAGE,
                    messageId: message.id,
                    labelIds: [MARKER_LABEL_ID],
                    historyId: message.historyId,
                })
            );
        }
        await Promise.all(batchPromises);
    }
}
