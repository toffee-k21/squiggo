import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        < header className="relative z-10" >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ rotate: -5 }}
                        animate={{ rotate: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image src="/images/squiggo_logo.png" alt="Logo" width={40} height={40} />

                        <h1 className="text-3xl font-bold text-[#1e3a8a] font-mono transform -rotate-1">
                            Squiggo
                        </h1>
                    </motion.div>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-[#1e3a8a] hover:text-[#87ceeb] transition-colors transform hover:rotate-1">Home</a>
                        <a href="#how" className="text-[#1e3a8a] hover:text-[#87ceeb] transition-colors transform hover:rotate-1">How to Play</a>
                        <button className="doodle-btn-secondary">Join Game</button>
                        <button className="doodle-btn">Create Game</button>
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
        </header >
    );
};

export default Navbar;
