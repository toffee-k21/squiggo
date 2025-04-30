import React, { use } from 'react';
import config from '../../utils.json';
import Chat from '../../components/Chat';
import { cookies } from 'next/headers';

interface Chat {
    id: number,
    type: string,
    roomId: number,
    message: string,
    userId: string
}

const backend_url = config.backend_url;

const slugToId = async (slug: string) => {
    const resp = await fetch(`${backend_url}/room/${slug}`);
    const data = await resp.json();
    const roomId = data.roomId;
    return roomId;
}

const handleFetchRooms = async (id: number) => {
    const token = (await cookies()).get("token")?.value;
    const resp = await fetch(`${backend_url}/room/${id}`,{
        headers:{
            authentication: `Bearer ${token}`
        }
    });
    const data = await resp.json();
    console.log(data);
    return data;
    // return roomId;
}

const fetchRooms = async (slug: string) => {
    const roomId = await slugToId(slug);
    console.log(roomId)
    const resp = await handleFetchRooms(roomId);
    return resp;
}


const ChatRoom = async ({ params }: {
    params: {
        slug: string
    }
}) => {
    const chats = await fetchRooms(params.slug);
    {console.log(chats)}
    return (
        <div>
            {
                chats.map((chat: Chat) => {
                    return <Chat key={chat.id} data={chat} />
                })
            }

        </div>
    )
}

export default ChatRoom