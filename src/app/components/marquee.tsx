'use client';
import { cn } from '@/lib/utils';
import React from 'react';

const Marquee = ({
    children,
    direction = 'left',
    className,
    paused = false
}: {
    children: React.ReactNode;
    direction?: 'left' | 'right';
    className?: string;
    paused?: boolean;
}) => {
    return (
        <div className={cn("w-full overflow-hidden", className)}>
            <div
                className={cn(
                    'flex w-max animate-marquee-scroll',
                    direction === 'right' ? '[animation-direction:reverse]' : '',
                    paused ? '[animation-play-state:paused]' : ''
                )}
            >
                <div className="flex-shrink-0 flex">{children}</div>
                <div className="flex-shrink-0 flex" aria-hidden="true">{children}</div>
            </div>
        </div>
    );
};

export default Marquee;
