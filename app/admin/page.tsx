'use client'

import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function LoginPage() {

    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://dark-blue-dibbler-toga.cyclic.app/login', { username, password });
            router.push('/dashboard'); 
            // Redirect or handle successful login here
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid Details.');
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center my-32">
            <form className="w-1/3 p-8  border rounded-lg shadow-lg" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
                <div className="mb-8 flex items-center">
                    <AiOutlineUser className="mr-2 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="border-b border-gray-400 w-full focus:outline-none focus:border-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-8 flex items-center">
                    <AiOutlineLock className="mr-2 text-gray-600" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border-b border-gray-400 w-full focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <BiLogInCircle className="text-4xl text-blue-500" />
            </div>
        </div>
    );
}

export default LoginPage;
