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
                'flex flex-col gap-3', 
                align === 'center' ? 'items-center text-center' : 'items-start text-left',
                className
            )}
        >
            <div className="bg-emerald-900/50 border border-emerald-800 rounded-full px-4 py-1">
                <p className="text-sm font-medium text-emerald-300 tracking-widest uppercase">{subtitle}</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                {title}
            </h2>
        </motion.div>
    );
}
