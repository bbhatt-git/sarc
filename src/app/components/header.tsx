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
      <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            isChildActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'text-foreground hover:bg-primary/10 hover:text-primary'
          )}
        >
          {link.label}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-20"
            >
              <div
                className="w-64 rounded-2xl border bg-card p-2 text-card-foreground shadow-lg"
              >
                <ul className="space-y-1">
                  {link.children.map((child) => {
                    const isActive = pathname.startsWith(child.href);
                    return (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={cn(
                            "group/navlink block rounded-xl p-3 transition-colors",
                            isActive ? "bg-primary/10" : "hover:bg-primary/10"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'flex-shrink-0 rounded-lg bg-primary/10 p-2 text-primary group-hover/navlink:bg-primary group-hover/navlink:text-primary-foreground transition-colors duration-200',
                              isActive && 'bg-primary text-primary-foreground'
                            )}>
                              <child.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-semibold text-foreground">{child.label}</span>
                              <p className="text-sm text-muted-foreground">{child.description}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
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
        'rounded-full px-4 py-2 text-sm font-medium transition-colors',
        isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'text-foreground hover:bg-primary/10 hover:text-primary'
      )}
    >
      {link.label}
    </Link>
  );
};

const MobileNavItem = ({ link, closeMenu, isOpen, onToggle }: { link: (typeof NAV_LINKS)[number], closeMenu: () => void, isOpen: boolean, onToggle: () => void }) => {
  if (!link.children) {
    return (
      <Link href={link.href} className="text-foreground hover:text-primary text-lg font-semibold" onClick={closeMenu}>
        {link.label}
      </Link>
    );
  }

  return (
    <div className='overflow-hidden'>
      <button onClick={onToggle} className="w-full flex justify-between items-center text-lg font-semibold text-foreground">
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
            <Link key={child.label} href={child.href} className="text-muted-foreground hover:text-primary" onClick={closeMenu}>
                <span className='font-medium text-foreground'>{child.label}</span>
                <p className='text-sm'>{child.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null;
  }
  
  const hasScrolled = mounted && scrolled;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-0 md:p-2 transition-all duration-300 ease-in-out">
        <nav className={cn(
            "mx-auto flex items-center justify-between p-3 transition-all duration-500 ease-heavy-out",
            "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl",
            hasScrolled
                ? 'w-full md:w-[95%] lg:w-[90%] rounded-full border border-slate-200/20 dark:border-white/10 shadow-lg'
                : 'w-full rounded-none border-b border-transparent'
        )}>
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} className='transition-transform duration-300 group-hover:scale-110' />
                  <div className="flex flex-col">
                      <span className="font-extrabold text-primary leading-tight">SARC EDU.</span>
                      <span className="text-xs text-foreground tracking-[0.2em] font-medium">FOUNDATION</span>
                  </div>
              </Link>
              
              <div className="hidden lg:flex items-center lg:gap-x-1">
                {NAV_LINKS.map((link) => (
                  <DesktopNavItem key={link.label} link={link} pathname={pathname} />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button asChild className='hidden lg:flex rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-transform hover:-translate-y-0.5'>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <div className="lg:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="text-foreground">
                    <Menu />
                  </Button>
                </div>
              </div>
            </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 overflow-y-auto shadow-[-20px_0_40px_rgba(0,0,0,0.1)] border-l border-white/20 dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className='text-muted-foreground'>
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
              <Button asChild className="w-full mt-12 bg-primary text-primary-foreground uppercase text-sm font-bold tracking-widest" size="lg">
                <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
