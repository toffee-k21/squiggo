"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from "../hooks/useSocket";
import {
    Pencil,
    Palette,
    Eraser,
    RotateCcw,
    Crown,
    Users,
    MessageCircle,
    Send,
    Trophy,
    Timer,
    Maximize2,
    Minimize2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { backend_url } from "../utils.json";

interface Player {
    id: string;
    name: string;
    score: number;
    isDrawing: boolean;
}

interface ChatMessage {
    id: string;
    playerId: string;
    playerName: string;
    message: string;
    timestamp: number;
    isCorrectGuess?: boolean;
}

interface ChatProps {
    id?: number;
    type: string;
    roomId: string;
    message: string | SketchMessage;
    userId?: string;
}

interface SketchMessage {
    instruction: string,
    tool: string,
    x: number,
    y: number,
    width: number,
    color: string
}

export default function GameplayPage({ roomId, username }: any) {
    if (!username) return;
    const { socket, loading } = useSocket(username);
    const router = useRouter();
    const lastPosRef = useRef<{ x: number; y: number } | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen');
    const [currentColor, setCurrentColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [chatMessage, setChatMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(85);
    const [currentWord, setCurrentWord] = useState('BUTTERFLY');
    const [isLeaderboardExpanded, setIsLeaderboardExpanded] = useState(false);

    const colors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
        '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000'
    ];

    const [players, setPlayers] = useState<Player[]>([]);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            playerId: '2',
            playerName: 'DoodleKing',
            message: 'Is it a bird?',
            timestamp: Date.now() - 30000
        },
        {
            id: '2',
            playerId: '3',
            playerName: 'SketchyBoy',
            message: 'butterfly!',
            timestamp: Date.now() - 25000,
            isCorrectGuess: true
        },
        {
            id: '3',
            playerId: '4',
            playerName: 'PaintLover',
            message: 'Nice drawing! 🎨',
            timestamp: Date.now() - 20000
        }
    ]);

    // Timer countdown effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        socket?.addEventListener("message", handleMessage);
        socket?.send(JSON.stringify({ type: "join_room", roomId, message: { name: "myname" } }));

        return () => {
            socket?.removeEventListener("message", handleMessage);
            socket?.close();
        };
    }, [socket]);

    const fetchPlayersList = async () => {
        const resp = await fetch(`${backend_url}/room/players/${roomId}`);
        const data = await resp.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        const res = fetchPlayersList();

        console.log(res);
        // { id: '1', name: 'ArtMaster99', score: 245, isDrawing: true, avatar: '🎨' },
        setPlayers([{ id: '1', name: 'ArtMaster99', score: 245, isDrawing: true, }]);
    }, [])

    // Canvas drawing functionality
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDrawing(true);
        lastPosRef.current = { x, y }; // start point
        // const ctx = canvas.getContext('2d');
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';

            ctx.beginPath();
            if (lastPosRef.current) {
                ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
            } else {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.stroke();
            lastPosRef.current = { x, y };
            const message = {
                instruction: "draw",
                tool: currentTool,
                x: x,
                y: y,
                width: brushSize,
                color: currentColor
            };
            socket?.send(JSON.stringify({ type: "sketch", roomId, message: message }));
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        lastPosRef.current = null;
        const message = {
            instruction: "stop"
        };
        socket?.send(JSON.stringify({ type: "sketch", roomId, message: message }));
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            const message = {
                instruction: "clear"
            };
            socket?.send(JSON.stringify({ type: "sketch", roomId, message: message }));
        }

    };

    const sendMessage = () => {
        if (chatMessage.trim()) {
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                playerId: 'current-user',
                playerName: 'You',
                message: chatMessage,
                timestamp: Date.now()
            };
            setChatMessages(prev => [...prev, newMessage]);
            setChatMessage('');
        }
    };

    const onClose = () => {
        socket?.send(JSON.stringify({ type: "leave_room", roomId }));
        socket?.close();

        console.log("Connection closed");
        router.push("/");
    };

    // let lastPos: { x: number; y: number } | null = null;
    const RemoteLastPosRef = useRef<{ x: number; y: number } | null>(null);
    const handleMessage = (event: MessageEvent) => {
        // console.log("type", typeof event.data);
        const chat: ChatProps = JSON.parse(event.data);
        if (chat.type == "join_room") {
            console.log("new user join");
        }
        else if (chat.type == "sketch") {
            const data = chat.message as SketchMessage;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            if (data.instruction == "draw") {
                ctx.globalCompositeOperation = data.tool == "eraser" ? 'destination-out' : 'source-over';

                ctx.beginPath();

                if (RemoteLastPosRef && RemoteLastPosRef.current) {
                    ctx.moveTo(RemoteLastPosRef.current.x, RemoteLastPosRef.current.y); // previous point
                } else {
                    ctx.moveTo(data.x, data.y); // first point
                }

                ctx.lineTo(data.x, data.y);
                ctx.strokeStyle = data.color;
                ctx.lineWidth = data.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                RemoteLastPosRef.current = { x: data.x, y: data.y };

            }
            else if (data.instruction == "clear") {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            else if (data.instruction == "stop") {
                RemoteLastPosRef.current = null;
            }
        }
    };

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
        <div className="fixed inset-0 bg-[#e0f2fe] paper-texture flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b-4 border-[#000] p-4 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-[#87ceeb] border-2 border-[#000] rounded-full flex items-center justify-center text-[#1e3a8a] hover:bg-[#fef08a] transition-colors transform hover:rotate-90"
                    >
                        ✕
                    </button>

                    <div className="flex items-center space-x-2">
                        <Pencil className="w-6 h-6 text-[#87ceeb]" />
                        <h1 className="text-xl font-bold text-[#1e3a8a] font-mono transform -rotate-1">
                            Room: {roomId}
                        </h1>
                    </div>
                </div>

                {/* Timer and Word */}
                <div className="flex items-center space-x-6">
                    <motion.div
                        className="bg-[#87ceeb] border-3 border-[#000] rounded-2xl px-4 py-2 flex items-center space-x-2 transform -rotate-1"
                        animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                    >
                        <Timer className="w-5 h-5 text-[#1e3a8a]" />
                        <span className={`font-bold font-mono ${timeLeft <= 10 ? 'text-red-600' : 'text-[#1e3a8a]'}`}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    </motion.div>

                    <div className="bg-[#fef08a] border-3 border-[#000] rounded-2xl px-6 py-2 transform rotate-1">
                        <span className="font-bold text-[#1e3a8a] font-mono text-lg tracking-wider">
                            {currentWord}
                        </span>
                    </div>
                </div>

                {/* Round Info */}
                <div className="text-[#1e3a8a] font-bold">
                    Round 2/3
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Players/Leaderboard */}
                <motion.div
                    className="bg-white border-r-4 border-[#000] flex flex-col relative"
                    initial={{ width: '280px' }}
                    animate={{ width: isLeaderboardExpanded ? '320px' : '280px' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="p-4 border-b-3 border-[#000] bg-[#bfdbfe]">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <Trophy className="w-5 h-5 text-[#1e3a8a]" />
                                <h3 className="font-bold text-[#1e3a8a] transform -rotate-1">Leaderboard</h3>
                            </div>
                            <button
                                onClick={() => setIsLeaderboardExpanded(!isLeaderboardExpanded)}
                                className="w-8 h-8 bg-[#87ceeb] border-2 border-[#000] rounded-full flex items-center justify-center text-[#1e3a8a] hover:bg-[#fef08a] transition-colors"
                            >
                                {isLeaderboardExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-[#1e3a8a]">
                            <Users className="w-4 h-4" />
                            <span>{players.length}/8 Players</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {sortedPlayers.map((player, index) => (
                            <motion.div
                                key={player.id}
                                className={`p-3 border-3 border-[#000] rounded-2xl relative transition-all duration-300 ${player.isDrawing
                                    ? 'bg-[#fef08a] shadow-md transform rotate-1'
                                    : 'bg-white hover:bg-[#bfdbfe]/30 transform -rotate-1'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            {index === 0 && (
                                                <motion.div
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#fef08a] border border-[#000] rounded-full flex items-center justify-center"
                                                    animate={{ rotate: [0, 10, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <Crown className="w-3 h-3 text-[#1e3a8a]" />
                                                </motion.div>
                                            )}
                                            {player.isDrawing && (
                                                <motion.div
                                                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#fef08a] border border-[#000] rounded-full flex items-center justify-center"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                >
                                                    <Pencil className="w-2 h-2 text-[#1e3a8a]" />
                                                </motion.div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#1e3a8a] text-sm">
                                                {player.name}
                                                {player.isDrawing && <span className="ml-2 text-xs">(Drawing)</span>}
                                            </div>
                                            <div className="text-xs text-[#1e3a8a]/70">
                                                Rank #{index + 1}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-[#1e3a8a]">{player.score}</div>
                                        <div className="text-xs text-[#1e3a8a]/70">points</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Center Panel - Drawing Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Drawing Tools */}
                    <div className="p-4 border-b-3 border-[#000] bg-[#bfdbfe] flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Tool Selection */}
                            <div className="flex bg-white border-3 border-[#000] rounded-2xl p-1 transform -rotate-1">
                                <button
                                    onClick={() => setCurrentTool('pen')}
                                    className={`p-2 rounded-xl transition-all duration-300 ${currentTool === 'pen'
                                        ? 'bg-[#87ceeb] text-[#1e3a8a] shadow-md'
                                        : 'text-[#1e3a8a] hover:bg-[#bfdbfe]/30'
                                        }`}
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentTool('eraser')}
                                    className={`p-2 rounded-xl transition-all duration-300 ${currentTool === 'eraser'
                                        ? 'bg-[#87ceeb] text-[#1e3a8a] shadow-md'
                                        : 'text-[#1e3a8a] hover:bg-[#bfdbfe]/30'
                                        }`}
                                >
                                    <Eraser className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Color Palette */}
                            <div className="flex items-center space-x-2">
                                <Palette className="w-5 h-5 text-[#1e3a8a]" />
                                <div className="grid grid-cols-5 gap-1 bg-white border-3 border-[#000] rounded-2xl p-2 transform rotate-1">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setCurrentColor(color)}
                                            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${currentColor === color
                                                ? 'border-[#000] scale-110 shadow-md'
                                                : 'border-gray-300 hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Brush Size */}
                            <div className="flex items-center space-x-2 bg-white border-3 border-[#000] rounded-2xl p-2 transform -rotate-1">
                                <span className="text-xs font-bold text-[#1e3a8a]">Size:</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={brushSize}
                                    onChange={(e) => setBrushSize(Number(e.target.value))}
                                    className="w-16 accent-[#87ceeb]"
                                />
                                <div
                                    className="w-4 h-4 bg-[#87ceeb] border border-[#000] rounded-full"
                                    style={{
                                        width: `${brushSize}px`,
                                        height: `${brushSize}px`,
                                        minWidth: '4px',
                                        minHeight: '4px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Clear Button */}
                        <button
                            onClick={clearCanvas}
                            className="doodle-btn flex items-center space-x-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 p-6 flex items-center justify-center">
                        <div className="bg-white border-4 border-[#000] rounded-3xl p-4 shadow-lg transform rotate-1">
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={500}
                                className="border-2 border-[#87ceeb] rounded-2xl cursor-crosshair"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                style={{
                                    cursor: currentTool === 'eraser' ? 'grab' : 'crosshair',
                                    background: 'white'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Chat */}
                <div className="w-80 bg-white border-l-4 border-[#000] flex flex-col">
                    <div className="p-4 border-b-3 border-[#000] bg-[#bfdbfe]">
                        <div className="flex items-center space-x-2">
                            <MessageCircle className="w-5 h-5 text-[#1e3a8a]" />
                            <h3 className="font-bold text-[#1e3a8a] transform rotate-1">Chat & Guesses</h3>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <AnimatePresence>
                            {chatMessages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    className={`p-3 border-2 border-[#000] rounded-2xl relative transform ${message.isCorrectGuess
                                        ? 'bg-[#fef08a] rotate-1'
                                        : message.playerId === 'current-user'
                                            ? 'bg-[#87ceeb] -rotate-1 ml-4'
                                            : 'bg-white rotate-1'
                                        }`}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-start space-x-2">
                                        <div className="w-6 h-6 bg-[#bfdbfe] border border-[#000] rounded-full flex items-center justify-center text-xs font-bold text-[#1e3a8a]">
                                            {message.playerName[0]}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-xs text-[#1e3a8a] mb-1">
                                                {message.playerName}
                                                {message.isCorrectGuess && (
                                                    <span className="ml-2 text-[#000]">🎉 Correct!</span>
                                                )}
                                            </div>
                                            <div className="text-sm text-[#1e3a8a]">{message.message}</div>
                                        </div>
                                    </div>

                                    {message.isCorrectGuess && (
                                        <motion.div
                                            className="absolute -top-1 -right-1 w-6 h-6 bg-[#fef08a] border-2 border-[#000] rounded-full flex items-center justify-center"
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            ⭐
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t-3 border-[#000] bg-[#bfdbfe]">
                        <div className="flex space-x-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    className="doodle-input text-sm"
                                    placeholder="Type your guess..."
                                />
                            </div>
                            <button
                                onClick={sendMessage}
                                className="w-12 h-12 bg-[#87ceeb] border-3 border-[#000] rounded-full flex items-center justify-center text-[#1e3a8a] hover:bg-[#fef08a] transition-colors transform hover:rotate-12"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}