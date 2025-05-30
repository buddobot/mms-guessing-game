'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UnlockPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'launch2025') {
      document.cookie = `site_access=launch2025; path=/`;
      router.push('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <main className="min-h-screen bg-[#270B65] text-white flex items-center justify-center px-4">
      <div className="bg-[#1E045C] p-8 rounded-xl shadow-xl w-full max-w-md text-center border border-[#6A11CB]">
        <h1 className="text-2xl font-bold mb-4">🔒 Enter Password to Access</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter launch password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#2575FC]"
            required
          />
          <button
            type="submit"
            className="bg-[#2575FC] hover:bg-[#6A11CB] text-white py-2 px-4 rounded font-semibold"
          >
            Unlock
          </button>
        </form>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </main>
  );
}
