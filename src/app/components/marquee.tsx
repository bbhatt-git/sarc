'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex w-full overflow-hidden [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <div
        className={cn('flex shrink-0 items-center justify-around [gap:var(--gap)]', {
          'animate-marquee flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          '[animation-direction:reverse]': reverse,
        })}
      >
        {children}
      </div>
      <div
        className={cn('flex shrink-0 items-center justify-around [gap:var(--gap)]', {
          'animate-marquee flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          '[animation-direction:reverse]': reverse,
        })}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
