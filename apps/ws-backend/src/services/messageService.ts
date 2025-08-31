import { pub } from "@repo/redis-client";

export async function publishMessage(roomId:number, type:string, message:string, userId:string){
    await pub.publish(`room:${roomId}`, JSON.stringify({ type, message, roomId, userId }))
    switch(type){
        case "chat" : {
            await pub.rPush(`room-chat:${roomId}`, message);
        }
        case "Sktech" : {
            await pub.set(`room-sketch:${roomId}`, message); //fix : append logic or try using list for sketch too
        }
    }
}