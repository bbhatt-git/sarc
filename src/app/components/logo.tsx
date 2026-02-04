import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 font-headline", className)}>
      <Image
        src="/images/sarc.png"
        alt="SARC Logo"
        width={40}
        height={40}
        priority
        className="h-10 w-10"
      />
      <span className="font-bold text-2xl tracking-tight">SARC</span>
    </Link>
  );
}
