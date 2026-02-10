'use client';

import { useState, useEffect } from 'react';
import { onIdTokenChanged, type User, type IdTokenResult } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

interface UserState {
  user: User | null;
  claims: IdTokenResult['claims'] | null;
  loading: boolean;
}

export function useUser(): UserState {
  const auth = useAuth();
  const [userState, setUserState] = useState<UserState>({
    user: null,
    claims: null,
    loading: true,
  });

  useEffect(() => {
    if (!auth) {
      setUserState({ user: null, claims: null, loading: false });
      return;
    }

    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setUserState({ user, claims: idTokenResult.claims, loading: false });
      } else {
        setUserState({ user: null, claims: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return userState;
}
