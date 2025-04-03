'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Brain } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-blue-500 mb-2">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to Cognify</h1>
          <p className="text-gray-200">Unlock the power of brain-driven learning!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-200">Email / Username</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-200">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-between text-sm text-gray-200">
          <Link href="#" className="hover:text-blue-400">Forgot Password?</Link>
          <Link href="/signup" className="hover:text-blue-400">Sign Up</Link>
        </div>

        <p className="text-xs text-center text-gray-300">
          By logging in, you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}