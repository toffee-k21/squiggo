'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";

const InputBox = () => {
      const [slug, setSlug] = useState("");
      const router = useRouter();
  return (
      <div>
          <input
              className='border-1'
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
          />
          <button className='text-white ml-4 hover:cursor-pointer' onClick={() => {
              router.push(`room/${slug}`);
          }}>join</button>
      </div>
  )
}

export default InputBox