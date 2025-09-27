import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Users, Clock, GamepadIcon, HelpCircle, Copy, Check } from 'lucide-react';
import { backend_url } from "../utils.json";

export default function CreateRoom({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        roomName: '',
        hint: 0,
        mode: 'normal',
        rounds: '3',
        drawTime: 60
    });
    const [roomCode, setRoomCode] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    function getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('token');
        const res = await fetch(`${backend_url}/room/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        const roomId = await res.json();
        setRoomCode(roomId);
        console.log("created", roomId);
        alert(`Here is your roomId : ${roomId} : copy it and paste in ROOM ID`);
        // setIsCreated(true);
    };

    const copyRoomCode = async () => {
        try {
            await navigator.clipboard.writeText(roomCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy room code');
        }
    };

    const modeOptions = [
        { value: 'normal', label: '🎨 Normal', description: 'Classic drawing and guessing' },
        { value: 'quick', label: '⚡ Quick Draw', description: 'Fast-paced 30-second rounds' },
        { value: 'themed', label: '🎭 Themed', description: 'Category-based words only' }
    ];

    const roundOptions = ['1', '2', '3', '5', '8', '10'];
    const timeOptions = [
        { value: '30', label: '30s - Lightning' },
        { value: '45', label: '45s - Quick' },
        { value: '60', label: '60s - Normal' },
        { value: '90', label: '90s - Relaxed' },
        { value: '120', label: '2m - Masterpiece' }
    ];

    if (isCreated) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <motion.div
                    className="bg-[#e0f2fe] rounded-3xl p-8 max-w-md w-full relative paper-texture text-center"
                    initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-[#87ceeb] border-2 border-[#000] rounded-full flex items-center justify-center text-[#1e3a8a] hover:bg-[#fef08a] transition-colors transform hover:rotate-90"
                    >
                        ✕
                    </button>

                    {/* Success animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 bg-[#fef08a] border-4 border-[#000] rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                    >
                        🎉
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold text-[#1e3a8a] mb-2 transform -rotate-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Room Created!
                    </motion.h2>

                    <motion.p
                        className="text-[#1e3a8a] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Share this code with your friends:
                    </motion.p>

                    {/* Room code display */}
                    <motion.div
                        className="bg-white border-4 border-[#000] rounded-2xl p-6 mb-6 transform rotate-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                    >
                        <div className="text-4xl font-bold text-[#1e3a8a] font-mono mb-4 tracking-wider">
                            {roomCode}
                        </div>
                        <button
                            onClick={copyRoomCode}
                            className="doodle-btn-secondary flex items-center space-x-2 mx-auto"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span>Copy Code</span>
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Game settings summary */}
                    <motion.div
                        className="text-left text-sm text-[#1e3a8a] bg-[#bfdbfe]/30 border-2 border-[#87ceeb] rounded-2xl p-4 mb-6 transform -rotate-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <div><strong>Mode:</strong> {modeOptions.find(m => m.value === formData.mode)?.label}</div>
                            <div><strong>Rounds:</strong> {formData.rounds}</div>
                            <div><strong>Draw Time:</strong> {formData.drawTime}s</div>
                            <div><strong>Players:</strong> 1/8</div>
                        </div>
                    </motion.div>

                    <motion.button
                        className="doodle-btn w-full text-lg py-4"
                        onClick={onClose}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.02, rotate: 1 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        🎮 Start Game!
                    </motion.button>

                    {/* Decorative confetti */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-[#fef08a] border border-[#000] rounded-full"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${10 + Math.random() * 80}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
                className="bg-[#e0f2fe] rounded-3xl p-8 max-w-lg w-full relative paper-texture max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-[#87ceeb] border-2 border-[#000] rounded-full flex items-center justify-center text-[#1e3a8a] hover:bg-[#fef08a] transition-colors transform hover:rotate-90"
                >
                    ✕
                </button>

                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <GamepadIcon className="w-8 h-8 text-[#87ceeb]" />
                        <h1 className="text-3xl font-bold text-[#1e3a8a] font-mono transform -rotate-1">
                            Create Room
                        </h1>
                    </div>

                    <p className="text-[#1e3a8a]">
                        Set up your perfect drawing game!
                    </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Room Name */}
                    <motion.div
                        className="doodle-input-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block text-[#1e3a8a] font-bold mb-2 transform rotate-1">
                            Room Name (Optional)
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#87ceeb]" />
                            <input
                                type="text"
                                value={formData.roomName}
                                onChange={(e) => handleInputChange('roomName', e.target.value)}
                                className="doodle-input pl-10"
                                placeholder="Epic Doodle Battle"
                            />
                        </div>
                    </motion.div>

                    {/* Game Mode */}
                    <motion.div
                        className="doodle-input-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-[#1e3a8a] font-bold mb-3 transform -rotate-1">
                            Game Mode
                        </label>
                        <div className="space-y-2">
                            {modeOptions.map((mode, index) => (
                                <motion.label
                                    key={mode.value}
                                    className={`block p-4 border-3 border-[#000] rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-102 ${formData.mode === mode.value
                                        ? 'bg-[#87ceeb] shadow-md rotate-1'
                                        : 'bg-white hover:bg-[#bfdbfe]/30 -rotate-1'
                                        }`}
                                    whileHover={{ scale: 1.02, rotate: formData.mode === mode.value ? 1 : 0.5 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <input
                                        type="radio"
                                        value={mode.value}
                                        checked={formData.mode === mode.value}
                                        onChange={(e) => handleInputChange('mode', e.target.value)}
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-[#1e3a8a]">{mode.label}</div>
                                            <div className="text-sm text-[#1e3a8a]/70">{mode.description}</div>
                                        </div>
                                        <div className={`w-6 h-6 border-2 border-[#000] rounded-full ${formData.mode === mode.value ? 'bg-[#fef08a]' : 'bg-white'
                                            }`} />
                                    </div>
                                </motion.label>
                            ))}
                        </div>
                    </motion.div>

                    {/* Rounds and Draw Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Rounds */}
                        <motion.div
                            className="doodle-input-container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-[#1e3a8a] font-bold mb-2 transform rotate-1">
                                Rounds
                            </label>
                            <select
                                value={formData.rounds}
                                onChange={(e) => handleInputChange('rounds', e.target.value)}
                                className="doodle-input appearance-none cursor-pointer"
                            >
                                {roundOptions.map(round => (
                                    <option key={round} value={round}>{round} Round{round !== '1' ? 's' : ''}</option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Draw Time */}
                        <motion.div
                            className="doodle-input-container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-[#1e3a8a] font-bold mb-2 transform -rotate-1">
                                Draw Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#87ceeb]" />
                                <select
                                    value={formData.drawTime}
                                    onChange={(e) => handleInputChange('drawTime', e.target.value)}
                                    className="doodle-input pl-10 appearance-none cursor-pointer"
                                >
                                    {timeOptions.map(time => (
                                        <option key={time.value} value={time.value}>{time.label}</option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                    </div>

                    {/* Custom Hint */}
                    <motion.div
                        className="doodle-input-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <label className="block text-[#1e3a8a] font-bold mb-2 transform rotate-1">
                            Hint
                        </label>
                        <div className="relative">
                            <HelpCircle className="absolute left-3 top-3 w-5 h-5 text-[#87ceeb]" />
                            <textarea
                                value={formData.hint}
                                onChange={(e) => handleInputChange('hint', e.target.value)}
                                className="doodle-input pl-10 min-h-[80px] resize-none"
                                placeholder="Enter custom words separated by commas (e.g., cat, dog, house, tree)"
                            />
                        </div>
                        <p className="text-xs text-[#1e3a8a]/60 mt-1 transform -rotate-1">
                            Leave empty to use default word lists
                        </p>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="doodle-btn w-full text-lg py-4 mt-8"
                        whileHover={{ scale: 1.02, rotate: 1 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        🚀 Create Room!
                    </motion.button>
                </form>

                {/* Decorative doodles */}
                <motion.div
                    className="absolute -top-2 -left-2 w-8 h-8 bg-[#fef08a] border-2 border-[#000] rounded-full flex items-center justify-center text-sm transform -rotate-12"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    🎨
                </motion.div>

                <motion.div
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#bfdbfe] border-2 border-[#000] rounded-full flex items-center justify-center text-sm transform rotate-12"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    🎮
                </motion.div>

                <motion.div
                    className="absolute top-1/3 -left-4 w-6 h-6 bg-[#87ceeb] border-2 border-[#000] rounded-full flex items-center justify-center text-xs transform rotate-45"
                    animate={{
                        rotate: [45, 55, 45],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    ⚡
                </motion.div>
            </motion.div>
        </div>
    );
}