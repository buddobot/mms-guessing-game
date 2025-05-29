export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const ALLOWED_DOMAINS = [
  'buddobot.com',
  'hud.buddobot.com',
  'siaoms.buddobot.com',
  'mccog.buddobot.com',
  'jspida.buddobot.com',
  'medstar.buddobot.com',
  'uscg.buddobot.com',
  'velocityxinc.com',
  'racktopsystems.com',
  'velocityblack.io',
];

export async function POST(req: Request) {
  const body = await req.json();
  const { email, guess } = body;

  if (!email || !guess) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
    return NextResponse.json({ error: 'Email domain not allowed' }, { status: 403 });
  }

  const docRef = db.collection('submissions').doc(email.toLowerCase());
  const doc = await docRef.get();

  if (doc.exists) {
    return NextResponse.json({ error: 'Email has already submitted a guess' }, { status: 409 });
  }

  await docRef.set({
    email: email.toLowerCase(),
    guess: parseInt(guess, 10),
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
