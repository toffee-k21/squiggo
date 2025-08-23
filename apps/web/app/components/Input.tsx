"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const InputBox = () => {
    const [slug, setSlug] = useState("");
    const router = useRouter();
    return (
        <div>
            <input
                className='border-1 p-2'
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
            />
            <button className=' hover:cursor-pointer cursor-pointer bg-pink-500 m-1 p-2 border-2 border-pink-500 rounded-sm' onClick={() => {
                router.push(`room/${slug}`);
            }}>join</button>
        </div>
    );
};

export default InputBox;