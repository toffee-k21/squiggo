import { WebSocket, WebSocketServer } from 'ws';
import { pub, sub } from "@repo/redis-client";
import { authenticateUser } from '../utils/auth';
import { handleMessage } from './handlers';

const localConnections = new Map<string, WebSocket>();

export const initWSServer = (port: number) => {
  const wss = new WebSocketServer({ port });

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
}