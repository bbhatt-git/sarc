'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

interface UserState {
  user: User | null;
  loading: boolean;
}

export function useUser(): UserState {
  const auth = useAuth();
  const [userState, setUserState] = useState<UserState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    if (!auth) {
      setUserState({ user: null, loading: false });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserState({ user, loading: false });
    });

    return () => unsubscribe();
  }, [auth]);

  return userState;
}
