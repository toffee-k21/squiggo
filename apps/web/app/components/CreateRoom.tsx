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
        <div className="flex justify-center items-center min-h-screen bg-[#fdfaf4]">
            <div className="bg-[#fffef9] shadow-md rounded-2xl p-8 w-full max-w-lg border-2 border-dotted border-gray-400">
                <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-wide underline decoration-wavy decoration-lime-500">
                    🎨 Create a Game Room
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                            ✏️ Hint
                        </label>
                        <input
                            className="w-full p-3 border-2 border-dotted border-gray-400 rounded-md bg-[#fef6e4] focus:ring-2 focus:ring-lime-400 outline-none placeholder:text-gray-500 shadow-sm"
                            type="text"
                            placeholder="Enter hint for the round"
                            ref={hintRef}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                            🎭 Mode
                        </label>
                        <input
                            className="w-full p-3 border-2 border-dotted border-gray-400 rounded-md bg-[#f0f7ff] focus:ring-2 focus:ring-lime-400 outline-none placeholder:text-gray-500 shadow-sm"
                            type="text"
                            placeholder="e.g. Classic / Team"
                            ref={modeRef}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                            🔄 Rounds
                        </label>
                        <input
                            className="w-full p-3 border-2 border-dotted border-gray-400 rounded-md bg-[#e9f7f0] focus:ring-2 focus:ring-lime-400 outline-none placeholder:text-gray-500 shadow-sm"
                            type="number"
                            placeholder="Number of rounds"
                            ref={roundRef}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-700 font-semibold">
                            ⏳ Draw Time (seconds)
                        </label>
                        <input
                            className="w-full p-3 border-2 border-dotted border-gray-400 rounded-md bg-[#fef0f3] focus:ring-2 focus:ring-lime-400 outline-none placeholder:text-gray-500 shadow-sm"
                            type="number"
                            placeholder="Time to draw in seconds"
                            ref={drawTimeRef}
                        />
                    </div>

                    <button
                        className="w-full bg-lime-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-lime-600 transition-transform transform hover:-translate-y-0.5 hover:shadow-lg border-2 border-dotted border-gray-600"
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
