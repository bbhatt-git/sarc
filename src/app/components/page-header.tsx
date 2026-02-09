'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    imageUrl: string;
}

export default function PageHeader({ title, subtitle, imageUrl }: PageHeaderProps) {
    return (
        <section className="relative w-full h-80 text-white overflow-hidden">
            <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mb-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
                >
                    <p className="text-sm font-medium text-slate-200">{subtitle}</p>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-shadow-lg max-w-4xl">
                    {title}
                </h1>
            </motion.div>
        </section>
    );
}
