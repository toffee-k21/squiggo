import { createClient, RedisClientType } from "redis";
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.resolve(__dirname, "../.env")});
console.log(path.resolve(__dirname, "../.env"))

console.log("env", process.env.REDIS_PASSWORD)

export const pub:RedisClientType = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-18914.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18914
    }
});
  
export const sub:RedisClientType = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-18914.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18914
    }
});

pub.on('error', err => console.log('Redis Pub Error', err));
sub.on('error', err => console.log('Redis Sub Error', err));
  
export async function initRedis() {
    await pub.connect();
    await sub.connect();
    console.log("Redis connected !");
}