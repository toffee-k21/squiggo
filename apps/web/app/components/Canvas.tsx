'use client'
import React, { useEffect, useRef } from 'react'
import { sketch } from '../draw/sketch';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        if(canvas){
            sketch(canvas);
        }
   
    },[canvasRef])
  return (
    <div>
          <canvas id="myCanvas" ref={canvasRef} width={1000} height={window.innerHeight} className='border-1 border-dashed border-gray-500 rounded-md shadow-lg'></canvas>
    </div>
  )
}

export default Canvas