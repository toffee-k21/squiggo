'use client'
import React, { useEffect, useRef } from 'react'
import { sketch } from '../draw/sketch';
import Image from 'next/image';
import Link from 'next/link';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        if(canvas){
            sketch(canvas);
        }
   
    },[canvasRef])
  return (
    <div className='z-10'>
          <canvas id="myCanvas" ref={canvasRef} width={1000} height={window.innerHeight} className='border-1 border-dashed border-gray-500 rounded-md shadow-lg'></canvas>
      <div className='absolute bottom-5 left-15'>
          <Link href={"/"}><Image className='mr-4' width={40} height={40} src="/images/sketch_stream_logo.png" alt="logo" /></Link>
      </div>
    </div>
  )
}

export default Canvas