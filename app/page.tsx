'use client';

import Countdown from 'react-countdown';
import { useState } from 'react';
import { Roboto, Anton } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-roboto' });
const anton = Anton({ subsets: ['latin'], weight: '400' });


export default function Home() {
  const [email, setEmail] = useState('');
  const [guess, setGuess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, guess }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const result = await res.json();
      switch (res.status) {
        case 403:
          setError('Only company emails are allowed.');
          break;
        case 409:
          setError('You’ve already submitted a guess.');
          break;
        default:
          setError(result.error || 'Something went wrong.');
      }
    }
  };

  return (
  <div className={roboto.className}>
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#270B65] bg-[url('/logo.png')] bg-repeat bg-cover">
      <div className="bg-[#1E045C] border border-[#6A11CB] rounded-2xl p-8 max-w-md w-full text-center text-white backdrop-blur-sm bg-opacity-90 shadow-xl shadow-[#2575FC]/30 transition-shadow hover:shadow-2xl hover:shadow-[#2575FC]/40">
        <h1 className={`${anton.className} text-4xl mb-4 bg-gradient-to-r from-[#2575FC] to-[#6A11CB] text-transparent bg-clip-text`}>
          VelocityBlack<br />M&M Challenge
        </h1>


          <div className="text-sm text-white mb-4">
            June 27, 2025 11:59 PM CST <br />
            <Countdown
            date={new Date('2025-06-28T04:59:00Z')} // June 27 at 11:59 PM CDT
            daysInHours={true}
            renderer={({ days, hours, minutes, seconds, completed }) =>
                completed ? (
                <span className="text-red-400 font-semibold ml-2">Guessing closed</span>
                ) : (
                <span className="ml-2">{days}d {hours}h {minutes}m {seconds}s</span>
              )
            }
          />
        </div>
        <img
          src="/mnms.jpg"
          alt="A jar of M&Ms"
          className="mb-6 mx-auto w-64 rounded-lg shadow-lg border border-[#6A11CB]"
        />
        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          Guess how many M&Ms are in the jar.<br />
          Enter your guess along with your work email address below.<br />
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your work email"
              className="bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2575FC]"
            />
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              required
              placeholder="Your guess"
              className="bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2575FC]"
            />
            <button
              type="submit"
              className="bg-[#2575FC] text-white py-2 rounded hover:bg-[#6A11CB] transition font-semibold text-lg transform hover:scale-105 active:scale-95 duration-150 ease-in-out"
            >
              Submit Guess
            </button>          

            {error && (
              <p className="text-red-400 font-medium">{error}</p>
            )}
              <p className="mt-6 text-sm text-white/60">
              <a href="/rules" className="underline hover:text-white">
                See how winners are picked
              </a>
              
              </p>

          </form>

        ) : (
          <p className="text-green-400 font-semibold text-lg">✅ Thanks! Find the snake inside the webpage for a secret preview of the next game.</p>
        )}
      </div>
    </main>
    <>
  <div dangerouslySetInnerHTML={{ __html: '<!-- 👀 Hint: Try /blackmamba in the URL-->' }} />
  <main className="...">
    {/* Secret Message */}
  </main>
</>
  </div>
);
}
