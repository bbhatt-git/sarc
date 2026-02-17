'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  className,
  reverse,
  children,
  vertical = false,
  pauseOnHover = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-0 [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        '[gap:var(--gap)]',
        className
      )}
    >
      <div
        className={cn('flex shrink-0 items-center justify-start [gap:var(--gap)]', {
          'animate-marquee': !vertical,
          'animate-marquee-vertical': vertical,
          '[animation-direction:reverse]': reverse,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
        })}
      >
        {children}
      </div>
      <div
        className={cn('flex shrink-0 items-center justify-start [gap:var(--gap)]', {
          'animate-marquee': !vertical,
          'animate-marquee-vertical': vertical,
          '[animation-direction:reverse]': reverse,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
        })}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
