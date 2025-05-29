import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app;

if (!getApps().length) {
  const credentials = JSON.parse(
    Buffer.from(process.env.FIREBASE_CREDENTIALS!, 'base64').toString('utf8')
  );
  app = initializeApp({ credential: cert(credentials) });
}

export const db = getFirestore();
