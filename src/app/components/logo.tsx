import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/sarc.png"
        alt="SARC Logo"
        width={48}
        height={48}
        priority
        className="h-12 w-12"
      />
      <div className='flex flex-col'>
      <span className="font-bold text-xl tracking-tight leading-tight">SARC</span>
      <span className="text-xs text-muted-foreground leading-tight">Padma Kanya Campus</span>
      </div>
    </Link>
  );
}
