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
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        if (!token) {
            alert("Not authenticated!");
            router.push("/");
            return;
        }

        const resp = await fetch(`${backend_url}/room/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                mode: modeRef.current?.value,
                round: parseInt(roundRef.current?.value!),
                hint: parseInt(hintRef.current?.value!),
                drawTime: parseInt(drawTimeRef.current?.value!),
            }),
        });
        const data = await resp.json();
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-950 rounded-lg">
            <div className=" shadow-md rounded-xl p-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-pink-500">
                    🎨 Create a Game Room
                </h1>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700">Hint</label>
                        <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
                            type="text"
                            placeholder="Enter hint for the round"
                            ref={hintRef}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Mode</label>
                        <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
                            type="text"
                            placeholder="e.g. Classic / Team"
                            ref={modeRef}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Rounds</label>
                        <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
                            type="number"
                            placeholder="Number of rounds"
                            ref={roundRef}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Draw Time (seconds)</label>
                        <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-400 outline-none"
                            type="number"
                            placeholder="Time to draw in seconds"
                            ref={drawTimeRef}
                        />
                    </div>

                    <button
                        className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 transition-colors"
                        onClick={handleCreateRoom}
                    >
                        🚀 Create Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
