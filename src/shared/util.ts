import fs from 'fs/promises';


export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

export async function textToBase64(text: string) {
    // Convert text to base64
    const base64String = Buffer.from(text).toString('base64');
    return base64String;
}