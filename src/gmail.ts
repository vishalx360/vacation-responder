import { Auth, gmail_v1, google } from 'googleapis';

// This function is used to send an automated reply to a message.
export async function reply(auth: Auth.OAuth2Client, props: {
    messageId: string;
    message: string;
    labelIds?: string[];
}) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });

    // Get the original message to reply to
    const originalMessage = await gmail.users.messages.get({
        userId: 'me',
        id: props.messageId,
    });

    // Extract the necessary information for the reply
    const threadId = originalMessage.data.threadId;
    const subject = originalMessage.data.payload.headers.find(header => header.name === 'Subject').value;

    // Construct the reply message
    const from = originalMessage.data.payload.headers.find(header => header.name === 'From').value;
    const replyMessage = `From: your@email.com\r\nTo: ${from}\r\nIn-Reply-To: ${originalMessage.data.id}\r\nReferences: ${originalMessage.data.id}\r\nSubject: ${subject}\r\n\r\n${props.message}`;

    const encodedMessage = Buffer.from(replyMessage)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // URL-safe base64

    // Send the reply
    await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage,
            threadId: threadId,
            labelIds: props.labelIds
        },
    });

    console.log('Replied and labled an email from:', from);
}

// fetches the list of unread messages from the user's inbox
// which are unread and not in the 'vacation' label
export async function getUnreadMessages(auth: Auth.OAuth2Client, after: Date | number = Date.now()) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });

    const afterTimeInSecond = Math.floor(new Date(after).getTime() / 1000);
    const queryString = `is:unread -label:vacation -in:chats after:${afterTimeInSecond}`;

    const res = await gmail.users.messages.list({
        userId: 'me',
        q: queryString,
        maxResults: 200
    });
    return res.data;
}

export async function listLabels(auth: Auth.OAuth2Client) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    return res.data;
}

export async function createLabelIfNotExist(authclient: Auth.OAuth2Client, labelName: string) {
    const res = await listLabels(authclient);
    const labels = res.labels?.map((label) => label.name);

    if (!labels?.includes(labelName)) {
        const labelId = await createLabel(authclient, labelName);
        console.log(`Created label '${labelName}' with id: ${labelId}`);
        return labelId;
    } else {
        const existingLabel = res.labels?.find((label) => label.name === labelName);
        if (existingLabel) {
            console.log(`Label '${labelName}' already exists`);
            return existingLabel.id;
        } else {
            console.log(`Error: Label '${labelName}' was not found in the existing labels`);
            return null;
        }
    }
}

export async function createLabel(auth: Auth.OAuth2Client, labelName: string) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.create({
        userId: 'me',
        requestBody: {
            name: labelName,
            messageListVisibility: 'show',
            labelListVisibility: 'labelShow',
        },
    });
    return res.data.id;
}

export async function addLabelToEmail(auth: Auth.OAuth2Client, messageId: string, labelId: string) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.modify({
        userId: 'me',
        id: messageId,
        requestBody: {
            addLabelIds: [labelId],
        },
    });
    return res.data;
}

