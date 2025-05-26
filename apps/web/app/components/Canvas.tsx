import React, { useEffect, useMemo, useRef, useState } from 'react'
import { sketch } from '../draw/sketch';
import Image from 'next/image';
import Link from 'next/link';
import {backend_url} from '../utils.json';
import { useSocket } from '../hooks/useSocket';
import { useSketchList } from '../hooks/useSketchList';

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

 
    console.log(id);
    // const [sketchList, setSketchList] = useState<Sketch[]>([]);
  // const { sketchList, setSketchList } = useSketchList();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // useEffect(()=>{
    //   fetchSketches(id);
    // },[])
    useEffect(()=>{
         const canvas = canvasRef.current;
         if(canvas){
           sketch(canvas, socket, id);
         }
    }, []);


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