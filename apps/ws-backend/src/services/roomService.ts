import { pub } from "@repo/redis-client";

export const joinRoom = async (roomId : number, userId : string) =>{
    pub.sAdd(`room:${roomId}`, userId);
} 

export const leaveRoom = async (roomId:number, userId:string) => {
    await pub.sRem(`room:${roomId}`, userId);
}