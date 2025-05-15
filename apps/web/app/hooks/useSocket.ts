`use client`
import { useEffect, useState } from "react";
import config from "../utils.json"

const WS_URL = config.WS_URL;

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }

    },[]);

    return {
        socket,
        loading
    }
}