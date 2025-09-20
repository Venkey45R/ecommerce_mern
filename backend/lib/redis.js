import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redis.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Connected to Redis");
  }
})();

export default redis;
