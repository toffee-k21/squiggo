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
              className='bg-white'
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
          />
          <button className='text-white' onClick={() => {
              router.push(`room/${slug}`);
          }}>join</button>
      </div>
  )
}

export default InputBox