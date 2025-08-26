import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiUserPlus } from "react-icons/fi";

const Navbar = () => {
    return (
        <div>
            <div className='px-7 md:px-[10%] my-4 flex absolute top-0 font-semibold text-md items-center gap-x-193'>
                <div className='flex justify-center items-center'>
                    <Image className='mr-4' width={40} height={40} src="/images/sketch_stream_logo.png" alt="logo" />
                    <div className='text-pink-500 '><Link href={"/"}>Squiggo{" "}</Link></div> {" "}
                    <div className='text-gray-500'><Link href={"/"}>/Devs</Link></div>
                </div>
                <div className='flex'>
                    {/* <FiLogIn size={24} className="text-gray-400 hover:text-pink-500 transition mr-4" /> */}

                    <Link href={"/auth/signup"}>
                        <FiUserPlus size={24} className="text-gray-400 hover:text-pink-500 transition hover:cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;