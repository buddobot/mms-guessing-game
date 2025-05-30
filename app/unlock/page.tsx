'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnlockPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'TwentyTwo=10110') {
      document.cookie = `site_access=launch2025; path=/`;
      router.push('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#270B65] bg-[url('/logo.png')] bg-repeat bg-cover">
      <form
        onSubmit={handleSubmit}
        className="bg-[#270B65] border border-[#6A11CB] rounded-lg p-8 max-w-md w-full shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">🔒 Unlock Access</h1>
        <input
          type="password"
          placeholder="Enter launch password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 text-black rounded"
          required
        />
        {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#2575FC] hover:bg-[#6A11CB] text-white font-semibold py-2 px-4 rounded transition"
        >
          Enter
        </button>
      </form>
    </main>
   
  );
}
