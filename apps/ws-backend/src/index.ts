import { initRedis } from "./config/redis"
import { initWSServer } from "./ws/server";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
    await initRedis();
    initWSServer(8080);
}

start();