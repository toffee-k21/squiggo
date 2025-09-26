"use client";
import { useEffect, useState } from "react";
import config from "../utils.json";

const WS_URL = config.WS_URL;

export function useSocket(username:string) {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    try {
      //auth for later
      // const token = document.cookie
      //   .split("; ")
      //   .find((row) => row.startsWith("token="))
      //   ?.split("=")[1];
      // const ws = new WebSocket(`${WS_URL}?token=${token}`);
      console.log("socket connection made !");

      const ws = new WebSocket(`${WS_URL}?username=${username}`);

      ws.onopen = () => {
        setSocket(ws);
        setLoading(false);
      };

      return () => {
        ws.close();
        setSocket(undefined);
        setLoading(true);
      };
    } catch (e) {
      console.log("socket connection issue", e); //todo: make it alert
    }
  }, []);

  return {
    socket,
    loading,
  };
}
