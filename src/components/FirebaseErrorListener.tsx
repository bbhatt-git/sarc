'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// This component is a client-side component that listens for Firebase permission errors
// and throws them as uncaught exceptions to be picked up by Next.js's error overlay.
// This is only for development and should not be used in production.
export default function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // This will be caught by the Next.js error overlay
      throw error;
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
