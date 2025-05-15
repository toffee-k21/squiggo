'use client'
import Chat from './Chat'
// import { cookies } from 'next/headers';
import config from '../utils.json';
import { useSocket } from '../hooks/useSocket';
import { useEffect, useState } from 'react';

const backend_url = config.backend_url;
interface ChatProps {
    id: number,
    type: string,
    roomId: number,
    message: string,
    userId: string
}
const ChatRoom =  ({roomId}:{roomId: number}) => {

  const [chats,setChats] = useState([]);

  const Id = roomId;
  const ws = useSocket();
  const socket = ws.socket;

      useEffect(()=>{
        const handleFetchChats = async (id: number) => {
          const token = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
          if(!token){
            return;
          }
          const resp = await fetch(`${backend_url}/room/chat/${id}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          });
          console.log(resp);
          const data = await resp.json();
          console.log("data",data)
          setChats(data);
         }

        handleFetchChats(Id);
      },[])

      useEffect(()=>{
        if (!socket) {
          return;
        }
        socket.send(JSON.stringify({
          type: "join_room",
          roomId: Id,
          message: "joining !"
        }));
        socket.onmessage = (data) => {
          console.log("data", data);
        }
      },[])

      console.log(chats);

  return (
    <div>
      <div>ChatRoom</div>
      {  
        chats.map((chat:ChatProps)=>{
         return <Chat key={chat.id} data={chat}/>
        })
      }
    </div>
  )
}

export default ChatRoom;