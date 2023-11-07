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
