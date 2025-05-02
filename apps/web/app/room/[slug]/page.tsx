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
    console.log(token)
    const resp = await fetch(`${backend_url}/room/chat/${id}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    });
    console.log(resp);
    const data = await resp.json();
    console.log(data)
    return data;
}

const fetchRooms = async (slug: string) => {
    const roomId = await slugToId(slug);
    const resp = await handleFetchRooms(roomId);
    return resp;
}


const ChatRoom = async ({ params }: {
    params: {
        slug: string
    }
}) => {
    const slug = await params.slug
    const chats = await fetchRooms(slug);
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