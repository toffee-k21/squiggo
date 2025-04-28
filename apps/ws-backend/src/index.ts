import jwt from 'jsonwebtoken';
import { WebSocket, WebSocketServer } from 'ws';
import {JWT_SECRET} from "@repo/common-backend/config"
import {prisma} from "@repo/db/prima"
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


async function isRoomExists(a:number){
  const room = await prisma.room.findUnique({
    where:{id:a}
  })
  if(!room){
    return false;
  }else{
    return true;
  }
}

function authenticateUser(url:string){
  try {const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token');
    if(!token){
      console.log("token not found"); //todo: write code -> send to client 
      return null;
    }
    const user = jwt.verify(token,JWT_SECRET);
    return user}
    catch(e){
      console.log(e);
      return null;
    }
}

let users: User[] = [];

wss.on('connection', function connection(ws, request) {
    const url = request.url;

    if(!url){
        return;
    }

    const user = authenticateUser(url);

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
        const user = users.find(u => u.ws == ws);
      if(!isRoomExists(parsedData.roomId)){
        console.log('room not exists');
        return;
      };
        user?.rooms.push(parsedData.roomId);
      }

      if(parsedData.type="leave_room"){
        const user = users.find(x => x.ws == ws);
        if(!isRoomExists(parsedData.roomId)){
          console.log('room not exists');
        return;
        };
        user?.rooms.filter(id => id==parsedData.roomId);
      }

      if(parsedData.type="chat"){
        if(!isRoomExists(parsedData.roomId)){
          console.log('room not exists');
        return;
        };
        users.forEach(user => {
          if(user.rooms.includes(parsedData.roomId)){
            user.ws.send(JSON.stringify({
              type:"chat",
              message: parsedData.message,
              roomId: parsedData.roomId,
              userId: userId // it will be handled from here only
            }))
          }
        });
            prisma.chat.create({
              data:{
                type: parsedData.type,
                roomId: parsedData.roomId,
                message: parsedData.message,
                userId: userId
              }
            })
      }
    })
});