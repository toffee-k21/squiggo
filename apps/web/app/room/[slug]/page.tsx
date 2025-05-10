import React from 'react';
import config from '../../utils.json';
import ChatRoom from '../../components/ChatRoom';


interface Chat {
    id: number,
    type: string,
    roomId: number,
    message: string,
    userId: string
}

const backend_url = config.backend_url;

const RoomPage = async ({ params }: {
    params: {
        slug: string
    }
}) => {
    const slugToId = async (slug: string) => {
        const resp = await fetch(`${backend_url}/room/${slug}`);
        const data = await resp.json();
        const roomId = data.roomId;
        return roomId;
    }

    const slug = await params.slug;
    const roomId = await slugToId(slug);

    return (
        <div>
            <ChatRoom roomId={roomId} />
        </div>
    )
}

export default RoomPage