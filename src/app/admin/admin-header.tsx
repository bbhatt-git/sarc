'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from '@/app/components/theme-toggle';

export default function AdminHeader() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2">
      <div className="mx-auto w-[96%] md:w-[95%] lg:w-[90%]">
        <nav className="flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-full border border-slate-200/20 dark:border-white/10 shadow-lg">
          <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
            <div className="flex flex-col">
              <span className="font-extrabold text-primary leading-tight">SARC ADMIN</span>
              <span className="text-xs text-foreground tracking-[0.2em] font-medium">DASHBOARD</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="destructive" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
