'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
}

export function Marquee({
  className,
  reverse,
  children,
  vertical = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex w-full overflow-hidden p-0 [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <div
        className={cn('flex shrink-0 items-center justify-around [gap:var(--gap)]', {
          'animate-marquee': !vertical,
          'animate-marquee-vertical': vertical,
          '[animation-direction:reverse]': reverse,
        })}
      >
        {children}
      </div>
      <div
        className={cn('flex shrink-0 items-center justify-around [gap:var(--gap)]', {
          'animate-marquee': !vertical,
          'animate-marquee-vertical': vertical,
          '[animation-direction:reverse]': reverse,
        })}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
