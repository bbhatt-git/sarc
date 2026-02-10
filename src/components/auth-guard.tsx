'use client';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, claims, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user OR the user is not an admin, redirect.
    if (!loading && (!user || !claims?.admin)) {
      router.push('/login');
    }
  }, [user, claims, loading, router]);

  // While loading or if the user is not a valid admin (before redirect), show a loader.
  if (loading || !user || !claims?.admin) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If the user is an authenticated admin, render the children.
  return <>{children}</>;
}
