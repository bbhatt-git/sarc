import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-160px)] min-h-[500px] flex-col items-center justify-center text-center px-4">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 p-8 sm:p-16 rounded-3xl shadow-2xl shadow-slate-500/10 max-w-lg w-full">
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-emerald-600">404</h1>
        <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-800">
          Page Not Found
        </p>
        <p className="mt-4 max-w-sm mx-auto text-slate-600">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
