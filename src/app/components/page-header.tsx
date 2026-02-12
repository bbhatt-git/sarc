'use client';

import { Sparkles } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 text-primary-foreground relative overflow-hidden py-20 text-center">
            <div className="container relative z-10">
                <div className="mb-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white/90" />
                    <p className="font-semibold uppercase tracking-wider text-white/90 text-xs">{subtitle}</p>
                    <Sparkles className="w-4 h-4 text-white/90" />
                </div>
                <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl text-shadow-md shadow-black/30">
                    {title}
                </h1>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-1/3 -left-1/4 h-full w-2/3 rounded-full bg-white/5" />
            <div className="absolute -top-1/2 -right-1/4 h-full w-1/2 rounded-full bg-white/5" />
        </section>
    );
}
