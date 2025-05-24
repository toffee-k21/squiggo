import jwt, { JwtPayload } from 'jsonwebtoken';
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
  try {
    const room = await prisma.room.findUnique({
      where:{id:a}
    })
    if(!room){
      return false;
    }else{
      return true;
    }
  } catch (e){
    console.log(e);
  }
}


function authenticateUser(url:string){
  try {
    const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token');
    if(!token){
      console.log("token not found"); //todo: write code -> send to client 
      return null;
    }
    const id:string = jwt.verify(token,JWT_SECRET) as string;
    if(!id){
      wss.close();
    }
    // const user =  await prisma.user.findUnique({ where: { id } }); //to-do : resolve it ! if user is deleted but if token is there for user then the user can access even if he/she is removed from db
    return id;
    // else wss.close()
  }
    catch(e){
      console.log(e);
      return null;
    }
}

let users: User[] = [];

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    let id = null;

      if(!url){
        wss.close();
        return;
      }
      id =  authenticateUser(url);
      console.log("iddddddddddddd",id);
  
      if(!id){
        console.log("invalid user"); //todo: write code -> send to client 
        return;
      }
   
    const userId = String(id);

    users.push({
      userId,
      rooms:[],
      ws,
    });
    ws.on('message',async (data)=>{
      let parsedData;
      
      parsedData = JSON.parse(data.toString());
        if(parsedData.type == "join_room"){
        try{
            const user = users.find(u => u.ws == ws);
            if(!isRoomExists(parsedData.roomId)){
              console.log('room not exists');
              return;
            };
            user?.rooms.push(parsedData.roomId);

          } catch(e){
            console.error(e)
          }
        }

        if(parsedData.type == "leave_room"){
          try {
            const user = users.find(x => x.ws == ws);
            if(!isRoomExists(parsedData.roomId)){
              console.log('room not exists');
              return;
            };
            if(!user){
              return;
            }
            user.rooms = user.rooms.filter(id => id!=parsedData.roomId);
          } catch(e){
            console.error(e)
          }
        }

        if(parsedData.type == "chat"){
          try{
          const user = users.find(x => x.ws == ws);
          console.log("log", userId )
          if(user?.rooms.includes(parsedData.roomId)){
          const chat = await prisma.chat.create({
                data:{
                  type: parsedData.type,
                  roomId: parsedData.roomId,
                  message: parsedData.message,
                  userId: userId
                }
              })
              if(!chat){
                // console.log("haiiiiii");
                return;
              }
              console.log(chat)
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
        }
      } catch(e){
        console.error(e);
      }
        }
    // todo : add queue system for db 
    })
});

// concern : state is only depended on backend , if backend goes off, all data / varaible wil be cleared. so, to avoid this -> tempo solution is make a model and store in db and reload db again.