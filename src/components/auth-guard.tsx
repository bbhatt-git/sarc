'use client';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only handle redirection for unauthenticated users
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show a loader while checking auth state or if user is not yet loaded
  if (loading || !user) {
    return (
      <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is admin, show the protected content
  if (isAdmin) {
    return <>{children}</>;
  }

  // If user is logged in but not an admin, show the "Access Denied" message
  return (
    <div className="container mx-auto px-4">
        <Card className="testimonial-card max-w-2xl mx-auto mt-12">
            <CardHeader className="text-center items-center">
                <div className="mx-auto bg-rose-100 dark:bg-rose-900/50 p-4 rounded-full w-fit">
                    <ShieldAlert className="h-10 w-10 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle className="text-3xl mt-4">Access Denied</CardTitle>
                <CardDescription>
                    You do not have the necessary permissions to access the admin dashboard. 
                    Please contact the site administrator if you believe this is an error.
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
