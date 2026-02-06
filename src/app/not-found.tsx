import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-160px)] min-h-[400px] flex-col items-center justify-center text-center">
      <div className="glass-card p-12 shadow-2xl">
        <h1 className="text-9xl font-extrabold tracking-tighter text-slate-800">404</h1>
        <p className="mt-2 text-2xl font-semibold text-slate-600">
          Page Not Found
        </p>
        <p className="mt-4 max-w-sm text-slate-500">
          Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
