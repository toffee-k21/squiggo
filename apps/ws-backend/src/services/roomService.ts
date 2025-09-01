import { pub } from "@repo/redis-client";

export const joinRoom = async (roomId: string, userId : string) =>{
    pub.sAdd(`room:${roomId}`, userId);
} 

export const leaveRoom = async (roomId: string, userId:string) => {
    await pub.sRem(`room:${roomId}`, userId);
}