'use client'
import Chat from './Chat'
// import { cookies } from 'next/headers';
import config from '../utils.json';
import { useSocket } from '../hooks/useSocket';
import { useEffect, useState } from 'react';
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
    if (!socket) {
      return;
    }
    socket.send(JSON.stringify({
      type: "join_room",
      roomId: Id,
      message: "joined room !"
    }));
    socket.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received:", message);
        setChats((prev: ChatProps[]) => [...prev, message]);
      } catch (err) {
        console.error("Invalid JSON from server:", event.data);
      }
    };

  }, [socket, loading])

  console.log(chats);

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
    setChats((prev: ChatProps[]) => [...prev, data]);
  }

  return (
    <div className='flex'>
      <div className=' border-r border-neutral-800 mr-1'>
        <div className='absolute top-0 text-pink-500 m-4 opacity-35 z-[-1]'>Stream Your Sketch...</div>
        <Canvas />
      </div>
      <div className='h-screen overflow-y-scroll' style={{scrollbarWidth:"none"}}>
      {
        chats.map((chat: ChatProps) => {
          return <Chat key={chat.id} data={chat} />
        })
      }
      <div className='absolute bottom-5'>
      <input className='p-2 ml-2' type='text' placeholder='Type your message...' onChange={(e) => setChatMessage(e.target.value)} />
          <button className={"cursor-pointer bg-pink-500 m-1 p-2 border-2 border-pink-500 rounded-sm"} onClick={handleMsgEmit}>send</button>
      </div>
      </div>
    </div>
  )
}

export default ChatRoom;