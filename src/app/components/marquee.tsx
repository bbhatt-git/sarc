'use client';
import { cn } from '@/lib/utils';
import React from 'react';

// This is a CSS-only implementation for a seamless marquee.
const Marquee = ({ children, direction = 'left', className }: { children: React.ReactNode, direction?: 'left' | 'right', className?: string }) => {
    return (
        <div className={cn("w-full overflow-hidden", className)}>
            <div
                className={cn(
                    'flex w-max animate-marquee-scroll',
                    direction === 'right' ? '[animation-direction:reverse]' : ''
                )}
            >
                <div className="flex-shrink-0 flex">{children}</div>
                <div className="flex-shrink-0 flex" aria-hidden="true">{children}</div>
            </div>
        </div>
    );
};

export default Marquee;
