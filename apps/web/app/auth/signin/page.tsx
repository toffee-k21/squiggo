'use client'
import React, { useRef } from 'react'
import { backend_url } from '../../utils.json'

const SignIn = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const res = await fetch(`${backend_url}/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const token = await res.json();
        document.cookie = `token=${token}; path=/; max-age=2592000`
    }
    return (
        <div >
            <h1 className='text-white'>SignUp</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input ref={emailRef} type="email" />
                    <input ref={passwordRef} type="password" />
                    <button type='submit'>Singin</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn