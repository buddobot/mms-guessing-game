'use client';

import { Roboto, Anton } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-roboto' });
const anton = Anton({ subsets: ['latin'], weight: '400' });

export default function RulesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#270B65] bg-[url('/logo.png')] bg-repeat bg-cover">
        <div className="bg-[#1E045C] border border-[#6A11CB] rounded-2xl p-8 max-w-md w-full text-center text-white backdrop-blur-sm bg-opacity-90 shadow-xl shadow-[#2575FC]/30 transition-shadow hover:shadow-2xl hover:shadow-[#2575FC]/40"> 
        <h1 className={`${anton.className} text-4xl mb-4 bg-gradient-to-r from-[#2575FC] to-[#6A11CB] text-transparent bg-clip-text`}>
          🏆 How Winners Are Picked
        </h1>

        <ul className="list-disc list-inside space-y-4 text-sm leading-relaxed text-white/90">
          <li><strong>One entry per person.</strong> Only your first valid submission will be counted.</li>
          <li><strong>Work email required.</strong> Only emails from approved domains are accepted.</li>
          <li><strong>Closest guess wins.</strong> The entry closest to the actual number without going over the number of M&Ms wins.</li>
          <li><strong>Tiebreaker:</strong> If multiple people guess the same closest number, the first person who submitted a guess wins.</li>
          <li><strong>Deadline:</strong> All guesses must be submitted by the posted deadline. Late entries are not counted.</li>
          <li><strong>No hints.</strong> You only get to guess once — no do-overs.</li>
        </ul>

        <p className="mt-6 text-center text-xs text-white/60">
          Winners will be announced after the guessing period ends.
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-block bg-[#2575FC] hover:bg-[#6A11CB] text-white font-semibold py-2 px-4 rounded transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
