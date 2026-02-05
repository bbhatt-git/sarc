'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const NavItem = ({ link }: { link: (typeof NAV_LINKS)[0] }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (link.children) {
    const isChildActive = link.children.some(child => pathname.startsWith(child.href));
    return (
      <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button
          className={cn(
            'flex items-center gap-1 transition-colors text-sm font-medium',
            isChildActive ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
          )}
        >
          {link.label}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} >
             <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-20"
            >
              <div className="bg-slate-900/80 border-slate-700 text-slate-200 backdrop-blur-md rounded-xl shadow-lg p-2 min-w-[200px]">
                {link.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const isActive = pathname === link.href;
  return (
    <Link
      href={link.href}
      className={cn(
        'transition-colors text-sm font-medium',
        isActive ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
      )}
    >
      {link.label}
    </Link>
  );
};
  
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300",
        )}
      >
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
            className={cn(
                'transition-all duration-300 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-lg',
                isScrolled ? 'shadow-lg shadow-slate-950/20' : ''
            )}
        >
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-3">
                <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                <span className="font-bold text-lg tracking-tight text-white">SARC</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.label} link={link} />
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
                <Button asChild className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white'>
                    <Link href="/admissions">Admissions</Link>
                </Button>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="text-white">
                <Menu />
              </Button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-lg md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                 <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 border-l border-slate-800 p-6"
                    onClick={(e) => e.stopPropagation()}
                 >
                    <div className="flex justify-between items-center mb-12">
                         <Link href="/" className="flex items-center gap-3">
                            <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                            <span className="font-bold text-lg tracking-tight text-white">SARC</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className='text-white'>
                            <X/>
                        </Button>
                    </div>
                    <nav className="flex flex-col gap-6 text-lg font-medium">
                        {NAV_LINKS.map(link => {
                             if (link.children) {
                                return (
                                    <div key={link.label}>
                                        <h3 className="text-slate-400 mb-3">{link.label}</h3>
                                        <div className='flex flex-col gap-4 pl-4 border-l border-slate-700'>
                                        {link.children.map(child => (
                                            <Link key={child.label} href={child.href} className="text-slate-200 hover:text-emerald-500" onClick={() => setIsMobileMenuOpen(false)}>
                                                {child.label}
                                            </Link>
                                        ))}
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                 <Link key={link.href} href={link.href} className="text-slate-200 hover:text-emerald-500 border-b border-slate-800 pb-4" onClick={() => setIsMobileMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                     <Button asChild className="w-full mt-12 bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
                        <Link href="/admissions" onClick={() => setIsMobileMenuOpen(false)}>Admissions</Link>
                    </Button>
                 </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
