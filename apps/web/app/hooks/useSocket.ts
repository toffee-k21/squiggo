`use client`
import { useEffect, useState } from "react";
import config from "../utils.json"

const WS_URL = config.WS_URL;

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const token = document.cookie.split('; ')
            .find(row => row.startsWith('token='))?.split('=')[1];
        
        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        
        ws.onopen = () => {
            setSocket(ws);
            setLoading(false);
        };
    
        return () => {
            ws.close();
            setSocket(undefined);
            setLoading(true);
        };
    }, []);

    return {
        socket,
        loading
    }
}