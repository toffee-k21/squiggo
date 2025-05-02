'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  return (
    <div>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <button onClick={()=>{
        router.push(`room/${slug}`);
      }}>join</button>
    </div>
  );
}
