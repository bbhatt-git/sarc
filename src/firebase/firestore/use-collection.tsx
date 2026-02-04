'use client';

import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, query, collection, where, orderBy, limit, startAfter, endBefore, type Query, type DocumentData, type Firestore } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// A utility to memoize queries
export const useMemoFirebase = <T>(factory: () => T, deps: React.DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
};

export function useCollection<T = DocumentData>(q: Query<T> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (q === null) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: (q as any)._query.path.segments.join('/'),
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, error, loading };
}
