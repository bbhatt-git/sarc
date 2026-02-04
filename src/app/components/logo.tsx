import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/images/sarc.png"
        alt="SARC Logo"
        width={120}
        height={40}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
