"use client";
import Chat from "./Chat";
import config from "../utils.json";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import { FiSend } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";

const backend_url = config.backend_url;
interface ChatProps {
  id?: number,
  type: string,
  roomId: string,
  message: string,
  userId?: string
}
const ChatRoom = () => {

  const params = useParams();
  const roomId = params.slug as string;


  const [chats, setChats] = useState<ChatProps[]>([]);
  const [chatMessage, setChatMessage] = useState<string>();
  const { socket } = useSocket();
  // console.log(Id);

  console.log("roomId", roomId);
  const joinedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  useEffect(() => {
    const handleFetchChats = async (id: string) => {
      console.log("id:", id);
      const token = document.cookie.split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
      if (!token) {
        alert("not authenticated !");
        router.push("/");
        return;
      }
      if (!id) {
        alert("room Id not detected");
        router.push("/");
        return;
      }
      const resp = await fetch(`${backend_url}/room/chat/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(resp);
      const data = await resp.json();
      console.log("data", data);
      setChats(data);
    };

    handleFetchChats(roomId);
  }, []);

  useEffect(() => {
    if (!socket || joinedRef.current) {
      return;
    }

    socket.send(JSON.stringify({
      type: "join_room",
      roomId: roomId,
      message: "joined room !"
    }));

    joinedRef.current = true;
    console.log("joinedRef.current");

    const handleMessage2 = (event: MessageEvent) => {
      const chat = JSON.parse(event.data);
      if (chat.type == "chat") {
        console.log("Received:", chat);
        setChats((prev: ChatProps[]) => [...prev, chat]);
      }
    };
    socket.addEventListener("message", handleMessage2);

    return () => {
      socket.removeEventListener("message", handleMessage2);
    };

  }, [socket]);

  useEffect(() => {
    // bottom-scroll func
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chats]);

  const handleMsgEmit = () => {
    if (!chatMessage) {
      return;
    }
    const data: ChatProps = {
      type: "chat",
      roomId: roomId,
      message: chatMessage
    };
    socket?.send(JSON.stringify(data));
  };

  return socket ? (
    <div className='flex'>
      <div className=' border-r border-neutral-800 mr-1'>
        <div className='absolute top-0 text-pink-500 m-4 opacity-35 z-[-1]'>Stream Your Sketch...</div>
        <Canvas key={roomId} id={roomId} socket={socket} />
      </div>
      <div className='h-screen overflow-y-scroll pb-[5%]' ref={containerRef} style={{ scrollbarWidth: "none" }}>
        {
          chats.map((chat: ChatProps) => {
            return <Chat key={chat.id || Math.random()} data={chat} />;
          })
        }
        <div className='absolute bottom-5'>
          <input className='p-2 ml-2 bg-neutral-800' type='text' placeholder='Type your message...' onChange={(e) => setChatMessage(e.target.value)} />
          <button className={"cursor-pointer bg-pink-500 m-1 p-3 border-[0.4]border-pink-500 rounded-sm"} onClick={handleMsgEmit}> <FiSend /></button>
        </div>
      </div>
    </div>
  ) : (<div>loading...</div>);
};

export default ChatRoom;