'use client'
import React, { useEffect, useRef, useState } from 'react'
import { sketch } from '../draw/sketch';
import Image from 'next/image';
import Link from 'next/link';
import {backend_url} from '../utils.json';
import { useSocket } from '../hooks/useSocket';

interface Sketch {
  x: number,
  y: number,
  w: number,
  h: number,
}

interface ChatProps {
  id?: number,
  type: string,
  roomId: number,
  message: string,
  userId?: string
}

const Canvas = ({id,socket}:{id:number,socket:WebSocket}) => {

  async function fetchSketches(id:number){
    const token = document.cookie.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (!token) {
      return;
    }
    const res = await fetch(`${backend_url}/room/sketch/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const data: ChatProps[] = await res.json();
    console.log("data",data)
    const crds: Sketch[] = data?.map((x)=>{
      return JSON.parse(x.message);
    })
    console.log("crds",crds)
    setSketchesList(crds);
  }
    console.log(id);
    const [sketchesList, setSketchesList] = useState<Sketch[]>([]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
      fetchSketches(id);
    },[])
    useEffect(()=>{
    
         const canvas = canvasRef.current;
         if(canvas){
           sketch(canvas, sketchesList!, socket, id);
         }
    }, [canvasRef, sketchesList, socket]);

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      const chat: ChatProps = JSON.parse(event.data);
      if (chat.type = "chat") {
      console.log("WebSocket message received");
      const crds:Sketch = JSON.parse(chat.message);

      // Update sketchesList with the new sketch data
        setSketchesList((prev: Sketch[]) => [...prev, crds]);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  return (
    <div className='z-10'>
          <canvas id="myCanvas" ref={canvasRef} width={1000} height={window.innerHeight} className='rounded-md shadow-lg'></canvas>
      <div className='absolute bottom-5 left-15'>
          <Link href={"/"}><Image className='mr-4' width={40} height={40} src="/images/sketch_stream_logo.png" alt="logo" /></Link>
      </div>
    </div>
  )
}

export default Canvas