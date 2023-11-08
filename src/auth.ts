import { authenticate } from '@google-cloud/local-auth';
import fs from 'fs/promises';
import { Auth, google } from 'googleapis';
import path from 'path';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { fileExists } from './util';

// Define the scopes required for authentication.
const SCOPES: string[] = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.email'
];

// The file token.json stores the user's access and refresh tokens, 
// and is created automatically during the authorization process.

// Paths for the token and credentials files.
const TOKEN_PATH: string = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH: string = path.join(process.cwd(), 'credentials.json');

/**
 * Checks if the user is currently logged in by verifying the existence of the token file.
 * 
 * @returns {boolean} True if the user is logged in, otherwise false.
 */
export async function isLoggedIn(): Promise<boolean> {
    try {
        const tokenExist = await fileExists(TOKEN_PATH);
        return tokenExist;
    } catch (err) {
        console.error('Error checking login status:', err);
        return false;
    }
}

/**
 * Represents the structure for user data after parsing the token.
 */
export interface UserData {
    client_id: string;
    client_email: string;
    user_id: string;
    issued_at: number;
    expires_at: number;
}

/**
 * Loads the saved login token and returns the logged-in user's data if available.
 * 
 * @returns {UserData | null} The user's data if logged in, otherwise null.
 */
export async function getUserData(): Promise<UserData | null> {
    try {
        const tokenExist = await fileExists(TOKEN_PATH);
        if (tokenExist) {
            const content = await fs.readFile(TOKEN_PATH);
            const token = JSON.parse(content.toString());
            const parsedIdToken = jwt.decode(token.id_token, { complete: true }) as JwtPayload;

            const userData: UserData = {
                client_id: token.client_id,
                client_email: token.client_email,
                user_id: parsedIdToken.payload.sub,
                issued_at: parsedIdToken.payload.iat,
                expires_at: parsedIdToken.payload.exp
            };

            return userData;
        } else {
            console.log('You are not currently logged in.');
            return null;
        }
    } catch (err) {
        console.error('Error loading user data:', err);
        return null;
    }
}

/**
 * Performs login by checking existing login status or initiating 
 * the Google account authentication process.
 * 
 * @returns {Auth.OAuth2Client} The authenticated client.
 */
export async function login() {
    const existingClient = await loadSavedTokenIfExist();
    if (existingClient) {
        return existingClient;
    }
    console.log("Please log in to your Google account to proceed.");
    console.log("A browser window will open. Please grant the requested permissions.");

    const client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
        await saveToken(client);
    }
    return client;
}

/**
 * Performs logout by deleting existing credentials (token).
 */
export async function logout() {
    try {
        const tokenExist = await fileExists(TOKEN_PATH);

        if (tokenExist) {
            await fs.unlink(TOKEN_PATH);
            console.log('Logged out successfully.');
        } else {
            console.log('You are not currently logged in.');
        }
    } catch (err) {
        console.error('Error logging out:', err);
    }
}


/**
 * Serializes credentials to a file compatible with google.auth.fromJSON.
 * 
 * @param {Auth.OAuth2Client} client - The authenticated client to save.
 */
async function saveToken(client: Auth.OAuth2Client) {
    const credentialsExist = await fileExists(CREDENTIALS_PATH);
    if (!credentialsExist) {
        throw new Error(`The 'credentials.json' file does not exist. Please download it from Google Cloud Console.`);
    }
    const content: Buffer = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;

    const parsedIdToken = jwt.decode(client.credentials.id_token, { complete: true }) as JwtPayload;
    const payload: string = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
        client_email: parsedIdToken.payload.email,
    });

    await fs.writeFile(TOKEN_PATH, payload);

    console.log("Login successful with email : ", parsedIdToken.payload.email);
}

/**
 * Loads saved login token if it exists and returns Auth.OAuth2Client.
 * 
 * @returns {Auth.OAuth2Client | null} The authenticated client if found, otherwise null.
 */
async function loadSavedTokenIfExist() {
    try {
        const tokenExist = await fileExists(TOKEN_PATH);
        if (tokenExist) {
            const content = await fs.readFile(TOKEN_PATH);
            const token = JSON.parse(content.toString());
            console.log('Currently logged in as:', token.client_email);
            console.log('if you want to login with a different account, please run logout first.');
            return google.auth.fromJSON(token) as Auth.OAuth2Client;
        } else {
            console.log('You are not currently logged in.');
            return null;
        }
    } catch (err) {
        console.error('Error loading credentials:', err);
        return null;
    }
}
