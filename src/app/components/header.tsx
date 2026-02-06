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
import { ThemeToggle } from './theme-toggle';

const DesktopNavItem = ({ link, pathname }: { link: (typeof NAV_LINKS)[number], pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (link.children) {
    const isChildActive = link.children.some(child => pathname.startsWith(child.href));
    return (
      <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button
          className={cn(
            'flex items-center gap-1.5 uppercase text-[12px] tracking-wider font-bold transition-colors',
            isChildActive ? 'text-sarc-green' : 'text-sarc-main dark:text-slate-300 hover:text-sarc-green'
          )}
        >
          {link.label}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-5 z-20"
            >
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl shadow-xl rounded-2xl border border-white/20">
                 <ul className="space-y-1 p-2">
                  {link.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className='bg-sarc-green/10 text-sarc-green p-2 rounded-md'>
                            <child.icon className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <div>
                          <span className="font-bold text-sarc-main dark:text-white">{child.label}</span>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{child.description}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
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
        'uppercase text-[12px] tracking-wider font-bold transition-colors',
        isActive ? 'text-sarc-green' : 'text-sarc-main dark:text-slate-300 hover:text-sarc-green'
      )}
    >
      {link.label}
    </Link>
  );
};

const MobileNavItem = ({ link, closeMenu, isOpen, onToggle }: { link: (typeof NAV_LINKS)[number], closeMenu: () => void, isOpen: boolean, onToggle: () => void }) => {
  if (!link.children) {
    return (
      <Link href={link.href} className="text-slate-700 dark:text-slate-200 hover:text-sarc-green text-lg font-semibold" onClick={closeMenu}>
        {link.label}
      </Link>
    );
  }

  return (
    <div className='overflow-hidden'>
      <button onClick={onToggle} className="w-full flex justify-between items-center text-lg font-semibold text-slate-700 dark:text-slate-200">
        <span>{link.label}</span>
        <ChevronDown className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')} />
      </button>
      <motion.div
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
            open: { opacity: 1, height: 'auto', marginTop: '12px' },
            collapsed: { opacity: 0, height: 0, marginTop: '0px' },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='overflow-hidden'
      >
        <div className='flex flex-col gap-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700'>
          {link.children.map((child: any) => (
            <Link key={child.label} href={child.href} className="text-slate-600 dark:text-slate-400 hover:text-sarc-green" onClick={closeMenu}>
                <span className='font-medium text-slate-700 dark:text-slate-300'>{child.label}</span>
                <p className='text-sm'>{child.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-heavy-out flex justify-center",
          scrolled ? 'pt-2' : 'pt-0'
      )}>
        <div className={cn(
            "mx-auto transition-all duration-700 ease-heavy-out",
            scrolled ? 'w-[96%] md:w-[95%] lg:w-[80%]' : 'w-full'
        )}>
            <nav className={cn(
                "flex items-center justify-between p-4 transition-all duration-700 ease-heavy-out",
                scrolled 
                    ? 'rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]' 
                    : 'rounded-none bg-white/40 dark:bg-slate-900/40 border-b border-white/20 dark:border-slate-700'
            )}>
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} className='transition-transform duration-300 group-hover:scale-110' />
                  <div className="flex flex-col">
                      <span className="font-extrabold text-sarc-green leading-tight">SARC EDU.</span>
                      <span className="text-xs text-sarc-main dark:text-slate-300 tracking-[0.2em] font-medium">FOUNDATION</span>
                  </div>
              </Link>
              
              <div className="hidden lg:flex items-center lg:gap-x-8 xl:gap-x-12">
                {NAV_LINKS.map((link) => (
                  <DesktopNavItem key={link.label} link={link} pathname={pathname} />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button asChild className='hidden lg:flex rounded-full bg-sarc-main dark:bg-white text-white dark:text-sarc-main uppercase text-xs font-bold tracking-widest transition-transform hover:-translate-y-0.5'>
                  <Link href="/admissions">Admissions</Link>
                </Button>
                <div className="lg:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="text-sarc-main dark:text-white">
                    <Menu />
                  </Button>
                </div>
              </div>
            </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl p-6 overflow-y-auto shadow-[-20px_0_40px_rgba(0,0,0,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className='text-slate-600 dark:text-slate-300'>
                    <X />
                  </Button>
                </div>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map(link => (
                  <MobileNavItem 
                    key={link.label} 
                    link={link} 
                    closeMenu={() => setMobileMenuOpen(false)}
                    isOpen={activeDropdown === link.label}
                    onToggle={() => setActiveDropdown(prev => prev === link.label ? null : link.label)}
                  />
                ))}
              </nav>
              <Button asChild className="w-full mt-12 bg-sarc-main text-white uppercase text-sm font-bold tracking-widest" size="lg">
                <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>Admissions</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
