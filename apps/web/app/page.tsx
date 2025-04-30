'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [slug, setSlug] = useState("");
  const router = useRouter()
  return (
    <div>
      <input onChange={(e) => {
          setSlug(e.target.value);
        }} value={slug} type="text">
      </input>
      <button onClick={()=>{
        router.push(`room/${slug}`);
      }}>join</button>
    </div>
  );
}
