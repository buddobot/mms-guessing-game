'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnlockPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === 'launch2025') {
      document.cookie = `site_access=launch2025; path=/`;
      router.push('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1E045C] text-white px-4">
      <h1 className="text-2xl font-bold mb-4">🔒 Enter Launch Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded text-black"
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="bg-[#2575FC] hover:bg-[#6A11CB] text-white py-2 px-4 rounded"
        >
          Unlock
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </main>
  );
}