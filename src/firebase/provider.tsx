'use client';

import React, { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export function FirebaseProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FirebaseContextValue;
}) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
}

// Helper hooks
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirebaseApp = () => {
    const context = useContext(FirebaseContext);
    if (!context) throw new Error('useFirebaseApp must be used within a FirebaseProvider');
    return context.firebaseApp;
};

export const useFirestore = () => {
    const context = useContext(FirebaseContext);
    if (!context) throw new Error('useFirestore must be used within a FirebaseProvider');
    return context.firestore;
};

export const useAuth = () => {
    const context = useContext(FirebaseContext);
    if (!context) throw new Error('useAuth must be used within a FirebaseProvider');
    return context.auth;
};
