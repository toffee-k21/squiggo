'use client'
import React, { useRef } from 'react'
import {backend_url} from '../../utils.json'

const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const username = usernameRef.current?.value;
        const res = await fetch(`${backend_url}/signup`,{
            method :"POST",
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({email,password,username})
        })
        const token = await res.json();
        document.cookie = `token=${token}; path=/; max-age=2592000`
    }
    return (
        <div className='m-60'>
            <h1 className='text-white'>SignUp</h1>
            <div>
                <form onSubmit={handleSubmit}>
                <input ref={usernameRef} type="text" />
                <input ref={emailRef} type="email" />
                <input ref={passwordRef} type="password" />
                    <button type='submit'>Singup</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp