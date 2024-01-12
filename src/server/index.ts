import RedisStore from "connect-redis";
import { config } from "dotenv";
import express, { Request, Response } from 'express';

import session from "express-session";
import morgan from 'morgan';
import redisClient from "./redis";
import { google } from "googleapis";

config();

const app = express();
const PORT = process.env.PORT;
import { jwtDecode } from "jwt-decode";
import { Main } from "./main";

// middlewares
app.use(morgan('dev'));
const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
});
app.use(session({
    name: "smart-vacation-responder",
    store: redisStore,
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        signed: true,
    }
}));
app.use(express.static("public"));

// Login route
// Configuration for Google OAuth
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = `${process.env.HOST_URL}/auth/google/callback`;
const SCOPES: string[] = [
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/userinfo.email',
];

// Login route
app.get('/login', async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: "consent",
    });
    res.redirect(authUrl);
});

// Callback route
app.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    const { tokens } = await oauth2Client.getToken(code);

    const userInfo = jwtDecode(tokens.id_token);

    req.session.user = {
        email: userInfo.email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
    };
    res.redirect('/'); // Redirect to protected area
});

app.get('/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
    })
    res.redirect('/');
});
// Success route
app.get('/success', (req, res) => {
    console.log(req.session?.user);
    res.send('Logged in successfully!');
});

// Failure route
app.get('/failure', (req, res) => {
    res.send('Login failed! Try again later <a href="/">go back</a>');
});
// Profile route
app.get('/profile', (req, res) => {
    console.log(req.session);
    if (req.session?.user) {
        res.json({
            email: req.session?.user?.email
        });
    } else {
        res.status(401).json({ message: 'You are not authenticated' });
    }
});

// ------------------ App Routes ------------------

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: "src/server/public" }); // Serve index.html from the 'public' directory
});

app.use("/responder", (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authenticated' });
    }
});

app.get("/responder/status", async (req, res) => {
    const status = await redisClient.get(`status:${req?.session?.user.email}`);
    res.json({ status: Boolean(status) });
});

app.post("/responder/start", async (req, res) => {
    console.log(req.session)
    await redisClient.set(`status:${req?.session?.user.email}`, req.session?.user?.refresh_token);
    const status = await redisClient.get(`status:${req?.session?.user.email}`);
    res.json({ status: Boolean(status), message: "started" });
});

app.post('/responder/stop', async (req, res) => {
    await redisClient.del(`status:${req?.session?.user.email}`);
    const status = await redisClient.get(`status:${req?.session?.user.email}`);
    res.json({ status: Boolean(status), message: "stopped" });
});

Main();
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});

