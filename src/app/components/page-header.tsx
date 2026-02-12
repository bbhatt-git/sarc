'use client';

import Image from 'next/image';

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
            <div
                className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
            >
                <div
                    className="mb-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
                >
                    <p className="text-sm font-medium text-slate-200">{subtitle}</p>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-shadow-lg max-w-4xl">
                    {title}
                </h1>
            </div>
        </section>
    );
}
