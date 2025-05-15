import React from 'react';
import config from '../../utils.json';
import ChatRoom from '../../components/ChatRoom';

const backend_url = config.backend_url;

const RoomPage = async ({ params }: {
    params: {
        slug: string
    }
}) => {
    
    const slugToId = async (slug: string) => {
        console.log(slug)
        const resp = await fetch(`${backend_url}/room/${slug}`);
        // console.log(resp)
        const data = await resp.json();
        const roomId = data.roomId;
        // console.log(roomId);
        return roomId;
    }

    const p = await params;
    const slug = p.slug;
    const roomId = await slugToId(slug);
    // console.log(roomId);

    return (
        <div>
            <ChatRoom roomId={roomId} />
        </div>
    )
}

export default RoomPage