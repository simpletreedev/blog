import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const client = new Redis({
  // port: process.env.REDIS_PORT,
  // host: process.env.REDIS_HOST,
});

client.on("connect", () => {
  console.log("Client connected to redis...");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

export default client;
