"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import config from "../utils.json";

const backend_url = config.backend_url;

const CreateRoom = () => {
    const router = useRouter();
    const hintRef = useRef<HTMLInputElement>(null);
    const modeRef = useRef<HTMLInputElement>(null);
    const roundRef = useRef<HTMLInputElement>(null);
    const drawTimeRef = useRef<HTMLInputElement>(null);

    const handleCreateRoom = async () => {
        const router = useRouter();
        const token = document.cookie.split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
        if (!token) {
            alert("not authenticated !");
            router.push("/");
            return;
        }
        const resp = await fetch(`${backend_url}/room/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                mode: modeRef.current?.value,
                round: roundRef.current?.value,
                hint: hintRef.current?.value,
                drawTime: drawTimeRef.current?.value,
            }),
        })
        const data = resp.json();
        console.log(data);
    }
    return (
        <div>
            <input
                className='border-1 p-2'
                type="text"
                ref={hintRef}
            />
            <input
                className='border-1 p-2'
                type="text"
                ref={modeRef}
            />
            <input
                className='border-1 p-2'
                type="text"
                ref={roundRef}
            />
            <input
                className='border-1 p-2'
                type="text"
                ref={drawTimeRef}
            />
            <button className=' hover:cursor-pointer cursor-pointer bg-pink-500 m-1 p-2 border-2 border-pink-500 rounded-sm' onClick={handleCreateRoom}>Create</button>
        </div>
    );
};

export default CreateRoom;