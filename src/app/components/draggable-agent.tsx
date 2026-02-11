'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';

export default function DraggableAgent() {
    return (
        <div className="fixed bottom-8 right-8 z-[100] group cursor-grab">
            <motion.div
                drag
                dragConstraints={{ top: -500, left: -1000, right: 50, bottom: 50 }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
                whileTap={{ cursor: 'grabbing' }}
                className="relative"
            >
                <motion.div
                    className="w-32 h-32 md:w-40 md:h-40"
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Image
                        src="/images/ai-bot.png"
                        alt="AI Agent"
                        width={160}
                        height={160}
                        className="drop-shadow-2xl pointer-events-none"
                    />
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
