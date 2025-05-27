'use client'
import Chat from './Chat'
// import { cookies } from 'next/headers';
import config from '../utils.json';
import { useSocket } from '../hooks/useSocket';
import { useEffect, useRef, useState } from 'react';
import Canvas from './Canvas';

const backend_url = config.backend_url;
interface ChatProps {
  id?: number,
  type: string,
  roomId: number,
  message: string,
  userId?: string
}
const ChatRoom = ({ roomId }: { roomId: number }) => {

  const [chats, setChats] = useState<ChatProps[]>([]);
  const [chatMessage, setChatMessage] = useState<string>();
  const { loading, socket } = useSocket();
  const Id = roomId;

  const joinedRef = useRef(false);

  useEffect(() => {
    const handleFetchChats = async (id: number) => {
      const token = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      if (!token) {
        return;
      }
      const resp = await fetch(`${backend_url}/room/chat/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(resp);
      const data = await resp.json();
      console.log("data", data)
      setChats(data);
    }

    handleFetchChats(Id);
  }, [])

  useEffect(() => {
    if (!socket || joinedRef.current) {
      return;
    }
    
    socket.send(JSON.stringify({
      type: "join_room",
      roomId: Id,
      message: "joined room !"
    }));

    joinedRef.current = true;
    console.log("joinedRef.current")

    const handleMessage2 = (event: MessageEvent) => {
 
        const chat = JSON.parse(event.data);
        if(chat.type == "chat"){
        console.log("Received:", chat);
        setChats((prev: ChatProps[]) => [...prev, chat]);
        }
  
    }
    socket.addEventListener('message', handleMessage2);

    return () => {
      socket.removeEventListener('message', handleMessage2);
    };

  }, [socket])


  const handleMsgEmit = () => {
    if (!chatMessage) {
      return;
    }
    let data: ChatProps = {
      type: "chat",
      roomId: Id,
      message: chatMessage
    };
    socket?.send(JSON.stringify(data));
  }

  return socket ? (
    <div className='flex'>
      <div className=' border-r border-neutral-800 mr-1'>
        <div className='absolute top-0 text-pink-500 m-4 opacity-35 z-[-1]'>Stream Your Sketch...</div>
        <Canvas key={Id} id={Id} socket={socket}/>
      </div>
      <div className='h-screen overflow-y-scroll' style={{scrollbarWidth:"none"}}>
      {
        chats.map((chat: ChatProps) => {
          return <Chat key={chat.id || Math.random()} data={chat} />
        })
      }
      <div className='absolute bottom-5'>
      <input className='p-2 ml-2' type='text' placeholder='Type your message...' onChange={(e) => setChatMessage(e.target.value)} />
          <button className={"cursor-pointer bg-pink-500 m-1 p-2 border-2 border-pink-500 rounded-sm"} onClick={handleMsgEmit}>send</button>
      </div>
      </div>
    </div>
  ) : (<div>loading...</div>)
}

export default ChatRoom;