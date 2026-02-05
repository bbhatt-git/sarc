import Image from 'next/image';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
    return (
        <section className="relative py-24 md:py-32 w-full text-white bg-gray-800 -mt-20 pt-40">
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt={`${title} header background`}
                    fill
                    className="object-cover"
                    priority
                />
            )}
            <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-4 z-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-shadow">
                    {title}
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 text-shadow">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
