"use client"
import React from "react";
import GameplayPage from "../../components/GameplayPage";
import { useParams, useSearchParams } from "next/navigation";

const RoomPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const username = searchParams.get("username");
    // console.log(username);

    console.log(params);
    return (
        <div>
            <GameplayPage roomId={params.slug} username={username} />
        </div>
    );
};

export default RoomPage;