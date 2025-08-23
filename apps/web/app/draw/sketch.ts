import { backend_url } from "../utils.json";

interface Sketch {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface ChatProps {
  id?: number;
  type: string;
  roomId: number;
  message: string;
  userId?: string;
}

export const sketch = async (
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  Id: number
) => {
  async function fetchSketches(id: number): Promise<Sketch[]> {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      return [];
    }
    const res = await fetch(`${backend_url}/room/sketch/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data: ChatProps[] = await res.json();

    const crds: Sketch[] = data?.map((x) => {
      return JSON.parse(x.message);
    });

    return crds;
  }

  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const realTimeSketch: Sketch[] = [];

  const handleMessage = (event: MessageEvent) => {
    const chat: ChatProps = JSON.parse(event.data);
    if (chat.type == "sketch") {
      console.log("WebSocket message received");
      const crds: Sketch = JSON.parse(chat.message);
      realTimeSketch.push(crds);
      ctx.strokeRect(crds.x, crds.y, crds.w, crds.h);
    }
  };
  socket.addEventListener("message", handleMessage);

  const size = canvas.getBoundingClientRect();
  ctx.strokeStyle = "gray";
  let startX: number = 0;
  let startY: number = 0;
  let sketch = false;
  let height: number;
  let width: number;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const list: Sketch[] = await fetchSketches(Id);
  list.map((f) => {
    return ctx.strokeRect(f.x, f.y, f.w, f.h);
  });
  const handleMouseDown = (e: MouseEvent) => {
    sketch = true;
    startX = e.clientX - size.left!;
    startY = e.clientY - size.top!;
  };
  const handleMouseUp = () => {
    sketch = false;
    const data = JSON.stringify({ x: startX, y: startY, w: width, h: height });
    console.log("mouseup");
    socket.send(JSON.stringify({ type: "sketch", message: data, roomId: Id }));
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (sketch) {
      const mouseX = e.clientX - size.left!;
      const mouseY = e.clientY - size.top!;
      height = mouseY - startY;
      width = mouseX - startX;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(startX, startY, width, height);
      list.map((f) => {
        return ctx.strokeRect(f.x, f.y, f.w, f.h);
      });
      realTimeSketch.map((f) => {
        return ctx.strokeRect(f.x, f.y, f.w, f.h);
      });
    }
  };
  canvas?.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    socket.removeEventListener("message", handleMessage);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
};
