import { config } from "dotenv";
import Redis from "ioredis";

config();

// Get Redis URL from environment variable.
const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
    throw new Error("REDIS_URL environment variable is not defined.");
}

// Initialize client.
const redisClient = new Redis(REDIS_URL);

redisClient.on("error", console.error)
redisClient.on("connecting", () => {
    console.log("connecting to redis...")
})
redisClient.on("connect", () => {
    console.log("connected to redis")
})
redisClient.on("end", () => {
    console.log("disconnected to redis")
})


export default redisClient;