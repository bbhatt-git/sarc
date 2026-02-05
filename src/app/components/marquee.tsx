'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Marquee = ({ children, direction = 'left', className }: { children: React.ReactNode, direction?: 'left' | 'right', className?: string }) => {
    const marqueeVariants = {
        animate: {
            x: direction === 'left' ? [0, '-50%'] : ['-50%', 0],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className={cn("w-full overflow-hidden", className)}>
            <motion.div
                className="flex whitespace-nowrap"
                variants={marqueeVariants}
                animate="animate"
            >
                {children}{children}
            </motion.div>
        </div>
    );
};

export default Marquee;
