import { cn } from '@/lib/utils';

interface SectionTitleProps {
    title: string;
    subtitle: string;
    align?: 'left' | 'center';
    className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className }: SectionTitleProps) {
    return (
        <div 
            className={cn(
                'flex flex-col gap-3', 
                align === 'center' ? 'items-center text-center' : 'items-start text-left',
                className
            )}
        >
            <p className="text-sm font-semibold text-emerald-600 tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                {title}
            </h2>
        </div>
    );
}
