import { Auth, gmail_v1, google } from 'googleapis';

/**
 * Lists the labels in the user's account.
 *
 */
export async function listLabels(auth: Auth.OAuth2Client) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
        console.log('No labels found.');
        return;
    }
    console.log('Labels:');
    labels.forEach((label: any) => {
        console.log(`- ${label.name}`);
    });
}

export async function sendEmail(auth: Auth.OAuth2Client) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: 'Hello World!',
        },
    });
    console.log(res.data);
}

export async function getMessages(auth: Auth.OAuth2Client) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
        userId: 'me',
    });
    console.log(res.data);
}

export async function sendEmailAndLabel(auth: Auth.OAuth2Client, labelName: string) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: 'Hello World!',
            labelIds: [await createLabel(auth, labelName)] // Include the label ID when sending the email
        },
    });
    console.log(res.data);
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

export async function moveEmailToLabel(auth: Auth.OAuth2Client, messageId: string, labelId: string) {
    const gmail: gmail_v1.Gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.modify({
        userId: 'me',
        id: messageId,
        requestBody: {
            addLabelIds: [labelId],
        },
    });
    console.log(res.data);
}

