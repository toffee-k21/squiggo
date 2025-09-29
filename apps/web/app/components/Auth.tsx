import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { backend_url } from "../utils.json"
import Image from 'next/image';

export default function Auth({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let res;
    if (isLogin) {
      res = await fetch(`${backend_url}/signin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
    }
    else {
      res = await fetch(`${backend_url}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
    }
    const token = await res.json();
    console.log(token);
    document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-[#e0f2fe] rounded-3xl p-8 max-w-md w-full relative paper-texture"
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

        {/* Header with logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image src="/images/squiggo_logo.png" alt="Squiggo Logo" width={100} height={100} />
            <h1 className="text-3xl font-bold text-[#1e3a8a] font-mono transform -rotate-1">
              Squiggo
            </h1>
          </div>

          <motion.h2
            className="text-2xl font-bold text-[#1e3a8a] transform rotate-1"
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? 'Welcome Back!' : 'Join the Fun!'}
          </motion.h2>
          <p className="text-[#1e3a8a] mt-2">
            {isLogin ? 'Ready to draw and guess?' : 'Create your doodle account'}
          </p>
        </motion.div>

        {/* Auth Toggle */}
        <div className="flex bg-white border-3 border-[#000] rounded-2xl p-1 mb-6 transform -rotate-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-xl transition-all duration-300 font-bold ${isLogin
              ? 'bg-[#87ceeb] text-[#1e3a8a] shadow-md'
              : 'text-[#1e3a8a] hover:bg-[#bfdbfe]/30'
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-xl transition-all duration-300 font-bold ${!isLogin
              ? 'bg-[#87ceeb] text-[#1e3a8a] shadow-md'
              : 'text-[#1e3a8a] hover:bg-[#bfdbfe]/30'
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-form' : 'signup-form'}
              initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Username field (signup only) */}
              {!isLogin && (
                <motion.div
                  className="doodle-input-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-[#1e3a8a] font-bold mb-2 transform rotate-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#87ceeb]" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="doodle-input pl-10"
                      placeholder="Choose a fun username!"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}

              {/* Email field */}
              <motion.div
                className="doodle-input-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.1 : 0.2 }}
              >
                <label className="block text-[#1e3a8a] font-bold mb-2 transform -rotate-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#87ceeb]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="doodle-input pl-10"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div
                className="doodle-input-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.2 : 0.3 }}
              >
                <label className="block text-[#1e3a8a] font-bold mb-2 transform rotate-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#87ceeb]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="doodle-input pl-10 pr-10"
                    placeholder="Your secret password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#87ceeb] hover:text-[#1e3a8a] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password field (signup only) */}
              {/* {!isLogin && (
                <motion.div
                  className="doodle-input-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-[#1e3a8a] font-bold mb-2 transform -rotate-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#87ceeb]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="doodle-input pl-10"
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )} */}
            </motion.div>
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="doodle-btn w-full text-lg py-4 mt-6"
            whileHover={{ scale: 1.02, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isLogin ? '🎮 Start Drawing!' : '🚀 Join Squiggo!'}
          </motion.button>

          {/* Additional options */}
          {isLogin && (
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#"
                className="text-[#87ceeb] hover:text-[#1e3a8a] transition-colors underline transform hover:rotate-1 inline-block"
              >
                Forgot your password?
              </a>
            </motion.div>
          )}
        </form>

        {/* Decorative doodles */}
        <motion.div
          className="absolute -top-2 -left-2 w-8 h-8 bg-[#fef08a] border-2 border-[#000] rounded-full flex items-center justify-center text-sm transform -rotate-12"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#bfdbfe] border-2 border-[#000] rounded-full flex items-center justify-center text-sm transform rotate-12"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🎨
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-4 w-6 h-6 bg-[#87ceeb] border-2 border-[#000] rounded-full flex items-center justify-center text-xs transform rotate-45"
          animate={{
            rotate: [45, 55, 45],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⭐
        </motion.div>
      </motion.div>
    </div>
  );
}


// import React from "react";
// import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/router";

// function useAuth() {
//   const token = document.cookie.split("; ")
//     .find(row => row.startsWith("token="))
//     ?.split("=")[1];
//   if (!token) {
//     return null;
//   }
//   const id = jwtDecode(token);
//   return id;
//   //   const res = await() : todo - build and endpoint to check the user exixts or not
// }

// const Auth = ({ children }: {
//   children: React.ReactNode;
// }) => {
//   const router = useRouter();
//   const id = useAuth();
//   if (!id) {
//     router.push("/auth/login");
//     return;
//   }
//   return (
//     <div>{children}</div>
//   );
// };

// export default Auth;