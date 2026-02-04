import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("font-headline text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors", className)}>
      SARC
    </Link>
  );
}
