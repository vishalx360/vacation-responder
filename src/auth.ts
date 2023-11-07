import { authenticate } from '@google-cloud/local-auth';
import fs from 'fs/promises';
import { Auth, google } from 'googleapis';
import path from 'path';

// If modifying these scopes, delete token.json.
const SCOPES: string[] = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/userinfo.email'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const TOKEN_PATH: string = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH: string = path.join(process.cwd(), 'credentials.json');

async function loadSavedTokenIfExist() {
  try {
    // Check if the file exists before attempting to read it
    const credentialsExist = await fileExists(CREDENTIALS_PATH);

    if (!credentialsExist) {
      console.error('Credentials file does not exist.');
      return null;
    }
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.error('Error loading credentials:', err);
    return null;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Serializes credentials to a file compatible with google.auth.fromJSON.
 *
 */
async function saveToken(client: Auth.OAuth2Client) {
  const content: Buffer = await fs.readFile(CREDENTIALS_PATH);
  const keys: any = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  console.log({ key, client });
  const payload: string = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });

  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Delete existing credential.
 *
 */
export async function unauthorize() {
  try {
    // Check if the credentials file exists before attempting to delete it
    const credentialsExist = await fileExists(TOKEN_PATH);

    if (credentialsExist) {
      await fs.unlink(TOKEN_PATH);
      console.log('Credentials file deleted successfully.');
    } else {
      console.log('Credentials file does not exist.');
    }
  } catch (err) {
    console.error('Error deleting credentials:', err);
  }
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  const existingClient = await loadSavedTokenIfExist();
  if (existingClient) {
    return existingClient;
  }
  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveToken(client);
  }
  return client;
}
