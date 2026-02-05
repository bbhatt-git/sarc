import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
    subtitle: string;
    align?: 'left' | 'center';
    className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className }: SectionTitleProps) {
    const variants = {
        initial: { y: 20, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: 'easeOut' },
        viewport: { once: true, amount: 0.3 }
    };
    
    return (
        <motion.div 
            {...variants}
            className={cn(
                'flex flex-col gap-3', 
                align === 'center' ? 'items-center text-center' : 'items-start text-left',
                className
            )}
        >
            <p className="text-sm font-semibold text-emerald-400 tracking-widest uppercase bg-emerald-900/50 px-3 py-1 rounded-full">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">
                {title}
            </h2>
        </motion.div>
    );
}
