import jwt from 'jsonwebtoken';
import { WebSocket, WebSocketServer } from 'ws';
import {JWT_SECRET} from "@repo/common-backend/config"

const wss = new WebSocketServer({ port: 8080 });


interface User {
  userId: String,
  rooms : String[], // ids are stored
  ws: WebSocket
}

// model Chat {
//   id      Int   
//   type    String
//   roomId  Int
//   message String
//   userId  String
// }

let users: User[] = [];

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url){
        return;
    }
    const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token');
    if(!token){
      console.log("token not found"); //todo: write code -> send to client 
      return;
    }
    const user = jwt.verify(token,JWT_SECRET);
    if(!user){
      console.log("invalid user"); //todo: write code -> send to client 
      return;
    }

    const userId = (user as jwt.JwtPayload).id;

    users.push({
      userId,
      rooms:[],
      ws,
    });

    ws.on('message',(data)=>{
      let parsedData;

      parsedData = JSON.parse(data.toString());
      if(parsedData.type="join_room"){
        const user = users.find(x => x.ws == ws);
        user?.rooms.push(parsedData.roomId);
      }

      if(parsedData.type="leave_room"){
        const user = users.find(x => x.ws == ws);
        user?.rooms.filter(id => id==parsedData.roomId);
      }

      if(parsedData.type="chat"){
        users.forEach(user => {
          if(user.rooms.includes(parsedData.roomId)){
            user.ws.send(JSON.stringify({
              type:"chat",
              message: parsedData.message,
              roomId: parsedData.roomId
            }))
          }
          
        });
      }
    })
});