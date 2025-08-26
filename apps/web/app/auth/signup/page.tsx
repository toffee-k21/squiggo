"use client";
import React, { useRef } from "react";
import { backend_url } from "../../utils.json";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const username = usernameRef.current?.value;
        const res = await fetch(`${backend_url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username })
        });
        const token = await res.json();
        if (typeof token == "string") {
            document.cookie = `token=${token}; path=/; max-age=2592000`;
            router.push("/");
        } else {
            alert("Invalid User !")
        };
    };
    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center mt-20'>
                <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-neutral-900">
                    <div className="text-2xl font-bold mb-2 text-pink-700 text-center">Welcome to <span className="text-pink-500">Sketch_Stream</span></div>
                    <div className="text-sm font-normal mb-4 text-center text-gray-500">Sign up your account</div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="block relative">
                            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
                            <input type="text" ref={usernameRef} id="username" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                        </div>
                        <div className="block relative">
                            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                            <input type="text" ref={emailRef} id="email" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                        </div>
                        <div className="block relative">
                            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                            <input type="text" ref={passwordRef} id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />

                        </div>
                        <div>
                            <a className="text-sm text-pink-500" href="#">Forgot your password?
                            </a></div>
                        <button type="submit" className="bg-pink-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

                    </form>
                    <div className="text-sm text-center mt-[1.6rem] text-white">Already have an account yet? <Link className="text-sm text-pink-500" href="/auth/signin">Click here to login</Link></div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;