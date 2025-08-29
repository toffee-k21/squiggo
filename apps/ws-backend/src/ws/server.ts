import jwt, { JwtPayload } from 'jsonwebtoken';
import { WebSocket, WebSocketServer } from 'ws';
import {JWT_SECRET} from "@repo/common-backend/config"
import {prisma} from "@repo/db/prisma"
import dotenv from "dotenv";
import { initRedis } from './config/redis';
import { publishMessage } from './services/messageService';
import { joinRoom, leaveRoom } from './services/roomService';
import { handleMessage } from './ws/handlers';
import { authenticateUser } from './utils/auth';
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });


const localConnections = new Map<string, WebSocket>();

sub.pSubscribe("room:*",(message, channel)=>{
  const parsed = JSON.parse(message.toString());
  const roomId = channel.split(":")[1];

  localConnections.forEach(async(ws, userId)=>{
    const isMember = await pub.sIsMember(`room:${roomId}`, userId);
    if(isMember){
      ws.send(JSON.stringify(parsed));
    }
  })
})

wss.on('connection', function connection(ws, request) {

    let userId =  authenticateUser(request.url);
    if(!userId) return wss.close();
      
    localConnections.set(userId,ws);

    ws.on('message',async (data)=>{
      let parsed = JSON.parse(data.toString());
      await handleMessage(parsed, userId);
    })

    ws.on('close', ()=>{
        localConnections.delete(userId);
    })
});