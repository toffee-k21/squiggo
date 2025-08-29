import { pub } from "../config/redis";

export async function publishMessage(roomId:number, type:string, message:string, userId:string){
    await pub.publish(`room:${roomId}`, JSON.stringify({ type, message, roomId, userId }))
}