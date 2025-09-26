"use client"
import CreateRoom from "./components/CreateRoom";
import { Pencil, Github, Twitter, Instagram } from 'lucide-react';
import Navbar from "./components/Navbar";
import { motion } from 'framer-motion';
import { DoodlePencil, DoodleThoughtBubble, DoodleTrophy, SketchArrow } from './components/DoodleIcons';
import { useState } from "react";
import Auth from "./components/Auth";
import { useRouter } from "next/navigation";

export default function Home() {

  const [showAuth, setShowAuth] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#e0f2fe] paper-texture">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ rotate: -5 }}
              animate={{ rotate: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Pencil className="w-8 h-8 text-[#87ceeb]" />
              <h1 className="text-3xl font-bold text-[#1e3a8a] font-mono transform -rotate-1">
                Squiggo
              </h1>
            </motion.div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-[#1e3a8a] hover:text-[#87ceeb] transition-colors transform hover:rotate-1">Home</a>
              <a href="#how" className="text-[#1e3a8a] hover:text-[#87ceeb] transition-colors transform hover:rotate-1">How to Play</a>
              <button
                onClick={() => setShowAuth(true)}
                className="doodle-btn-secondary"
              >
                Login
              </button>
              <button
                onClick={() => setShowCreateRoom(true)}
                className="doodle-btn"
              >
                Create Game
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-[#1e3a8a] hover:text-[#87ceeb]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-6xl font-bold mb-4 transform -rotate-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="draw-on-text">Draw.</span>
                <span className="text-[#87ceeb] sketchy-underline draw-on-text" style={{ animationDelay: '1s' }}> Guess.</span>
                <span className="text-[#bfdbfe] draw-on-text" style={{ animationDelay: '2s' }}> Laugh.</span>
              </motion.h2>
              <p className="text-xl text-[#1e3a8a] mb-8 transform rotate-1">
                The ultimate multiplayer drawing and guessing game that brings friends together for endless fun!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                {/* Input Fields */}
                <div>
                  <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    {/* Username input */}
                    <div className="relative group w-full sm:w-auto">
                      <div className="
                        bg-white 
                        rounded-2xl 
                        border-4 
                        border-dashed 
                        border-[#87ceeb] 
                        shadow-[4px_4px_0_0_#1e3a8a] 
                        px-8 py-4 
                        transform 
                        group-hover:-rotate-1 
                        transition-all 
                        duration-300 
                        w-full sm:w-64">
                        <input
                          type="text"
                          placeholder="Your awesome name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-transparent outline-none text-lg text-[#1e3a8a] placeholder:text-[#1e3a8a]/60"
                        />
                      </div>
                      <span className="absolute -top-3 left-6 bg-[#87ceeb] text-white text-xs px-3 py-1 rounded-full transform -rotate-3">
                        Player Name
                      </span>
                    </div>

                    {/* Room ID input */}
                    <div className="relative group w-full sm:w-auto">
                      <div className="
                        bg-white 
                        rounded-2xl 
                        border-4 
                        border-dashed 
                        border-[#87ceeb] 
                        shadow-[4px_4px_0_0_#1e3a8a] 
                        px-8 py-4
                        transform 
                        group-hover:rotate-1 
                        transition-all 
                        duration-300 
                        w-full sm:w-64">
                        <input
                          type="text"
                          placeholder="Magic Room Code"
                          value={roomId}
                          onChange={(e) => setRoomId(e.target.value)}
                          className="w-full bg-transparent outline-none text-lg text-[#1e3a8a] placeholder:text-[#1e3a8a]/60"
                        />
                      </div>
                      <span className="absolute -top-3 left-6 bg-[#1e3a8a] text-white text-xs px-3 py-1 rounded-full transform rotate-3">
                        Room ID
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <motion.button
                    className="doodle-btn text-lg px-8 py-4 mr-4"
                    // onClick={() => setShowAuth(true)}
                    onClick={() => router.push(`/room/${roomId}?username=${username}`)}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎮 Join Game
                  </motion.button>
                  <motion.button
                    className="doodle-btn-secondary text-lg px-8 py-4"
                    onClick={() => setShowCreateRoom(true)}
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✨ Create Game
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Doodle Canvas */}
              <div className="bg-white border-4 border-[#000] rounded-3xl p-8 transform rotate-2 shadow-lg">
                <div className="w-full h-64 bg-white rounded-2xl relative overflow-hidden">
                  {/* Sketch lines and doodles */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256">
                    <motion.path
                      d="M50 100 Q100 50 150 100 T250 100"
                      stroke="#87ceeb"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.circle
                      cx="100"
                      cy="150"
                      r="30"
                      stroke="#1e3a8a"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 2 }}
                    />
                    <motion.path
                      d="M200 120 L240 160 M200 160 L240 120"
                      stroke="#bfdbfe"
                      strokeWidth="6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 3 }}
                    />
                    <motion.path
                      d="M300 80 Q320 60 340 80 Q320 100 340 80"
                      stroke="#fef08a"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 3.5 }}
                    />
                  </svg>

                  {/* Grid lines like notebook paper */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                      linear-gradient(rgba(30, 58, 138, 0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(30, 58, 138, 0.2) 1px, transparent 1px)
                    `,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                </div>
              </div>

              {/* Floating doodle elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-[#87ceeb] border-3 border-[#000] rounded-full flex items-center justify-center text-2xl transform -rotate-12"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎨
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#fef08a] border-3 border-[#000] rounded-full flex items-center justify-center text-2xl transform rotate-12"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ✏️
              </motion.div>

              {/* Small doodle stars */}
              <motion.div
                className="absolute top-8 right-8 text-2xl text-[#bfdbfe]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16" id="how">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-[#1e3a8a] mb-4 transform -rotate-1">
            How It Works
          </h3>
          <p className="text-lg text-[#1e3a8a]">
            Three simple steps to endless fun!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {[
            {
              component: DoodlePencil,
              title: "Draw",
              description: "Get a word and draw it for your friends to guess. No artistic skills required!"
            },
            {
              component: DoodleThoughtBubble,
              title: "Guess",
              description: "Watch others draw and try to guess what they're creating. First to guess wins!"
            },
            {
              component: DoodleTrophy,
              title: "Score",
              description: "Earn points for correct guesses and good drawings. Climb the leaderboard!"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <step.component className="w-24 h-24" />
              </div>
              <h4 className="text-2xl font-bold text-[#1e3a8a] mb-3 transform rotate-1">
                {step.title}
              </h4>
              <p className="text-[#1e3a8a] mb-6">
                {step.description}
              </p>

              {/* Sketch arrows between steps */}
              {index < 2 && (
                <div className="hidden md:block absolute" style={{
                  transform: `translateX(${index === 0 ? '200px' : '200px'})`
                }}>
                  <SketchArrow className="w-16 h-16" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Play with Friends Callout */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="doodle-bubble bg-white text-center max-w-md mx-auto">
            <h4 className="text-2xl font-bold text-[#1e3a8a] mb-4">
              Play with Friends! 👥
            </h4>
            <p className="text-[#1e3a8a] mb-6">
              Create private rooms, invite your friends, and have the best time drawing silly pictures together!
            </p>
            <button
              className="doodle-btn"
              onClick={() => setShowAuth(true)}
            >
              🚀 Start Playing Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Pencil className="w-8 h-8 text-[#87ceeb]" />
              <span className="text-2xl font-bold font-mono transform -rotate-1">Squiggo</span>
            </div>

            <div className="flex items-center space-x-6">
              <motion.a
                href="#"
                className="text-white hover:text-[#87ceeb] transition-colors doodle-icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white hover:text-[#bfdbfe] transition-colors doodle-icon"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                className="text-white hover:text-[#fef08a] transition-colors doodle-icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-[#87ceeb]/30">
            <p className="text-sm text-[#bfdbfe]">
              © 2025 Squiggo. Made with ❤️ for doodle lovers everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}

      {/* Create Room Modal */}
      {showCreateRoom && <CreateRoom onClose={() => setShowCreateRoom(false)} />}
    </div>
  );
}
