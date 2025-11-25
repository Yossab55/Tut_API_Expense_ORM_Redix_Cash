import { createClient } from "redis";
import { env } from "../../utils/helpers.js";

const Redis = createClient({
  username: env("REDIS_USERNAME"),
  password: env("REDIS_PASSWORD"),
  socket: {
    host: env("REDIS_HOST"),
    port: env("REDIS_PORT"),
  },
});

Redis.on("error", (err) => {
  console.log("Redis Client Error", err);
  process.exit(1);
});

if (!Redis.isOpen) {
  await Redis.connect();
}

export { Redis };
