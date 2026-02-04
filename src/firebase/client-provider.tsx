'use client';
import { initializeFirebase } from './init';
import { FirebaseProvider } from './provider';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

// This provider is responsible for initializing Firebase on the client
// and wrapping the application with the FirebaseProvider.
// It ensures that Firebase is initialized only once.
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firebaseApp, auth, firestore } = initializeFirebase();
  return (
    <FirebaseProvider value={{ firebaseApp, auth, firestore }}>
      {children}
      <FirebaseErrorListener />
    </FirebaseProvider>
  );
}
