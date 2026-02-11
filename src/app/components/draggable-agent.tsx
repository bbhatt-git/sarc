'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DraggableAgent() {
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => {
                setIsBlinking(false);
            }, 150);
        };

        const intervalId = setInterval(() => {
            blink();
        }, Math.random() * 4000 + 2000); // Blink every 2-6 seconds

        return () => clearInterval(intervalId);
    }, []);

    const eyeLidVariants = {
        open: { scaleY: 1 },
        closed: { scaleY: 0 },
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] group cursor-grab">
            <motion.div
                drag
                dragConstraints={{ top: -500, left: -1000, right: 50, bottom: 50 }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
                whileTap={{ cursor: 'grabbing', scale: 1.05 }}
                className="relative"
            >
                <motion.div
                    className="w-40 h-40 relative"
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {/* Robot Head */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full border-2 border-slate-300 dark:border-slate-700 shadow-2xl flex items-center justify-center">
                        {/* Eyes */}
                        <div className="flex gap-4">
                            {/* Left Eye */}
                            <div className="w-6 h-6 bg-emerald-400 dark:bg-emerald-500 rounded-full border-2 border-slate-800/20 dark:border-black/50 flex items-center justify-center overflow-hidden">
                                <motion.div
                                    className="w-full h-full bg-slate-100 dark:bg-slate-800 origin-bottom"
                                    variants={eyeLidVariants}
                                    animate={isBlinking ? 'closed' : 'open'}
                                    transition={{ duration: 0.075, ease: 'easeOut' }}
                                />
                            </div>
                            {/* Right Eye */}
                            <div className="w-6 h-6 bg-emerald-400 dark:bg-emerald-500 rounded-full border-2 border-slate-800/20 dark:border-black/50 flex items-center justify-center overflow-hidden">
                                <motion.div
                                    className="w-full h-full bg-slate-100 dark:bg-slate-800 origin-bottom"
                                    variants={eyeLidVariants}
                                    animate={isBlinking ? 'closed' : 'open'}
                                    transition={{ duration: 0.075, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                        {/* Mouth */}
                        <div className="absolute bottom-6 w-6 h-3 border-b-4 border-slate-400 dark:border-slate-600 rounded-b-full"></div>
                    </div>

                    {/* Robot Body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-20 bg-slate-200 dark:bg-slate-800/80 rounded-t-3xl border-2 border-b-0 border-slate-300 dark:border-slate-700 shadow-lg">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-8 bg-emerald-400/20 rounded-md border-2 border-emerald-400/50 flex items-center justify-center">
                            <div className="w-8 h-4 bg-emerald-400/30 rounded-sm animate-pulse"></div>
                        </div>
                    </div>
                    
                    {/* Antenna */}
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-1 h-6 bg-slate-400 dark:bg-slate-600"></div>
                    <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                </motion.div>

                <div className="absolute top-1/2 -left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-full p-3 shadow-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary"/>
                        <span className="text-sm font-medium text-foreground pr-2">Chat with me!</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
