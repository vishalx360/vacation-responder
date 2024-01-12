import { Auth, gmail_v1 } from "googleapis";
import { addLabelToEmail, createLabelIfNotExist, getMessage, getUnreadMessages, reply } from "./gmail";
import { GenerateSmartReply } from "./llm";
import { schedule } from "./scheduler";

const MARKER_LABEL = "vacation";
const DEFAULT_AUTOMATED_MESSAGE = `Hey, the recipient is currently on vacation. Once they are back, they will reply to your email. This is an automated reply sent by VacationResponder.`;

let lastExecutedAt = Date.now();
let MARKER_LABEL_ID = "";

export async function Main(authclient: Auth.OAuth2Client) {
    MARKER_LABEL_ID = await createLabelIfNotExist(authclient, MARKER_LABEL);

    await schedule(async () => {
        await RecurringJob(authclient, lastExecutedAt);
        lastExecutedAt = Date.now();
    });
}

export async function RecurringJob(authclient: Auth.OAuth2Client, lastExecutedAt: number) {
    try {
        const unreadMessages = await getUnreadMessages(authclient, lastExecutedAt);
        if (unreadMessages.resultSizeEstimate === 0) {
            console.log("\nNo new unread emails");
            return;
        }
        console.log(`\nFound ${unreadMessages.resultSizeEstimate} new unread emails`);
        const batchSize = 10;
        await processMessagesConcurrently(authclient, unreadMessages.messages, batchSize);
        console.log('Replied to unread emails and applied the label');
    } catch (error) {
        console.error('Error in RecurringJob:', error);
    }
}

async function processMessagesConcurrently(authclient: Auth.OAuth2Client, messages: gmail_v1.Schema$Message[], batchSize: number) {
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
