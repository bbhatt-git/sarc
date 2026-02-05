import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
    subtitle: string;
    align?: 'left' | 'center';
    className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className }: SectionTitleProps) {
    return (
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className={cn(
                'flex flex-col gap-2', 
                align === 'center' ? 'items-center text-center' : 'items-start text-left',
                className
            )}
        >
            <p className="text-sm font-semibold text-blue-600 tracking-widest uppercase">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                {title}
            </h2>
        </motion.div>
    );
}
