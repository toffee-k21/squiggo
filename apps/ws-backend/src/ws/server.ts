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

    const params = new URLSearchParams(request?.url?.split('?')[1]);
    const username = params.get('username');
    console.log(username);
      if(!username) return wss.close();
        
      localConnections.set(username,ws);

      ws.on('message',async (data)=>{
        let parsed = JSON.parse(data.toString());
        if(typeof parsed.roomId == 'string'){
          await handleMessage(parsed, username);
        }
      })

      ws.on('close', ()=>{
          localConnections.delete(username);
      })
  });
}