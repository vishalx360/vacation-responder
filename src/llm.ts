import { config } from "dotenv";

import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";

config();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GENERATIVE_AI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
        {
            role: "user",
            parts: [{ text: "System Prompt --\nYou are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.\n\nEmail Content --\nI hope you're doing well. Attached is the report for this month's project updates.\nRajesh" }],
        },
        {
            role: "model",
            parts: [{ text: "Thank you Rajesh for the project updates. \n\nThis is an automated response from Vacation Responder. The recipient is currently on vacation and will get back to you as soon as possible." }],
        },
        {
            role: "user",
            parts: [{ text: "System Prompt --\nYou are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.\n\nEmail Content --\nJust wanted to check in and see if you received my previous message regarding the upcoming client meeting.\n\nBest regards\nJames" }],
        },
        {
            role: "model",
            parts: [{ text: "Thank you James for checking in. \n\nThis is an automated response from Vacation Responder. The recipient is currently on vacation and will get back to you as soon as possible." }],
        },
        {
            role: "user",
            parts: [{ text: "System Prompt --\nYou are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.\n\nEmail Content --\n\nAttached are the revised draft documents for our upcoming presentation. Please review them at your earliest convenience\n\nJohn" }],
        },
        {
            role: "model",
            parts: [{ text: "Thank you John for sending the draft documents. \n\nThis is an automated response from Vacation Responder. The recipient is currently on vacation and will get back to you as soon as possible." }],
        },
        {
            role: "user",
            parts: [{ text: "System Prompt --\nYou are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.\n\nEmail Content --\n\nI wanted to share the latest updates on the marketing campaign. Please let me know your thoughts." }],
        },
        {
            role: "model",
            parts: [{ text: "Thank you for the marketing campaign updates.\n\nThis is an automated response from Vacation Responder. The recipient is currently on vacation and will get back to you as soon as possible." }],
        },
        {
            role: "user",
            parts: [{ text: "System Prompt --\nYou are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.\n\nEmail Content --\n\nJust a reminder about our team-building event next week. Please confirm your attendance." }],
        },
        {
            role: "model",
            parts: [{ text: "Thank you for the reminder about the team-building event. \n\nThis is an automated response from Vacation Responder. The recipient is currently on vacation and will get back to you as soon as possible" }],
        },
        {
            role: "user",
            parts: [{ text: "System Prompt --\nYou are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.\n\nEmail Content --\n\nHey I am intrested in the software engineer role.\nI am confident that I can make a significant contribution to your team, aiding in the achievement of InstaSell's goals. Eager to learn from experienced professionals and collaborate on challenging projects, I am available for an interview at your earliest convenience. Please feel free to contact me if you require any additional information.\nI have attached my resume to this email.\n\nThank you for considering my application.Best regards, Sumit" }],
        },
        {
            role: "model",
            parts: [{ text: "Thank you sumit for applying to the software engineer role. \n\nYour email appears to be important, so the recipient will prioritize responding to it upon their return. \n\n\nThis is an automated response from Vacation Responder. The recipient is currently on vacation and will get back to you as soon as possible. If you have immediate concerns, please contact the recipient via phone call." }],
        },
    ],
});

export async function GenerateSmartReply(message: string) {
    const result = await chat.sendMessage(`
    System Prompt --
    You are a vacation responder system tasked with generating automated responses for emails. Your goal is to provide a brief and courteous message acknowledging the receipt of the email content and informing the sender that the recipient is currently on vacation. The message should assure the sender that their email has been received and that the recipient will respond as soon as possible. Your responses should be professional and neutral in tone.
    
    Email Snippet --
    ${message}
    `);
    const response = result.response;
    return response.text();
}