import Image from 'next/image';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
    return (
        <section className="relative py-32 md:py-40 w-full text-white -mt-20 pt-40">
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt={`${title} header background`}
                    fill
                    className="object-cover"
                    priority
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
            <div className="relative container mx-auto px-4 z-10 text-center animated-fade-in">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-shadow font-headline">
                    {title}
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 text-shadow">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
