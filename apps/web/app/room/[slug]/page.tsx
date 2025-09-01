import React from "react";
import config from "../../utils.json";
import ChatRoom from "../../components/ChatRoom";

const backend_url = config.backend_url;

const RoomPage = async ({ params }: {
    params: {
        roomId: string
    }
}) => {

    const p = await params;
    const roomId = p.roomId;

    return (
        <div>
            <ChatRoom roomId={roomId} />
        </div>
    );
};

export default RoomPage;