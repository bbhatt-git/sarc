'use client';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 text-primary-foreground relative overflow-hidden py-20 text-center">
            <div className="container relative z-10">
                <p className="font-semibold uppercase tracking-wider text-primary-foreground/80">{subtitle}</p>
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
