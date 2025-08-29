import { pub } from "../config/redis";

export const joinRoom = async (roomId : number, userId : string) =>{
    pub.sAdd(`room:${roomId}`, userId);
} 

export const leaveRoom = async (roomId:number, userId:string) => {
    pub.sRem(`room:${roomId}`, userId);
}