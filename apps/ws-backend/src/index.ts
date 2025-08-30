import { initRedis } from "./config/redis"
import { initWSServer } from "./ws/server";

const PORT = 8080;

const start = async () => {
    await initRedis();
    initWSServer(PORT);
    console.log("WebSocket server started at :", PORT);
}

start();