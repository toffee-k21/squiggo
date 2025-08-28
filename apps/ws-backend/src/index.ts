import jwt, { JwtPayload } from 'jsonwebtoken';
import { WebSocket, WebSocketServer } from 'ws';
import { createClient } from "redis";
import {JWT_SECRET} from "@repo/common-backend/config"
import {prisma} from "@repo/db/prisma"
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });
const init_server = async () =>{
  const pub = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-18914.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18914
    }
  });

  pub.on('error', err => console.log('Redis Pub Error', err));
  const sub = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-18914.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18914
    }
  });
  pub.on('error', err => console.log('Redis Sub Error', err));
  await pub.connect();
  await sub.connect();
}

init_server();

async function isRoomExists(roomId:number){
  try {
    const room = await prisma.room.findUnique({
      where:{id: roomId}
    })
    if(!room){
      return false;
    }else{
      return true;
    }
  } catch (e){
    console.log("prisma couldn't process roomId :",e);
  }
}


function authenticateUser(url:string | undefined){
  if(!url) return null;

  try {
    const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token');
    if(!token)  return null;
    const id:string = jwt.verify(token, JWT_SECRET) as string;
    return id || null;
  }
    catch(e){
      console.log(e);
      return null;
    }
}

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
      let parsed;
      
      parsed = JSON.parse(data.toString());

        if(parsed.type == "join_room"){
          if(!(await isRoomExists(parsed.roomId))) return;
          pub.sAdd(`room:${parsed.roomId}`, userId);
        }

        if(parsed.type == "leave_room"){
          if(!(await isRoomExists(parsed.roomId))) return;
          pub.sRem(`room:${parsed.roomId}`, userId);
        }

        if(parsed.type == "chat" || parsed.type == "sketch"){
          if(!(await isRoomExists(parsed.roomId))) return;
          await pub.publish(`room:${parsed.roomId}`, JSON.stringify({
            type: parsed.type,
            message: parsed.data,
            roomId: parsed.roomId,
            userId
          }))
        }
    })
});