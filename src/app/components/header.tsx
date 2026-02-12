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

const DesktopNavItem = ({ link, pathname, hasScrolled, openMenuLabel, setOpenMenuLabel }: { link: (typeof NAV_LINKS)[number], pathname: string, hasScrolled: boolean, openMenuLabel: string | null, setOpenMenuLabel: (label: string | null) => void }) => {
  const isOpen = openMenuLabel === link.label;

  if (link.children) {
    const isChildActive = link.children.some(child => pathname.startsWith(child.href));

    return (
      <div className="relative" onMouseEnter={() => setOpenMenuLabel(link.label)} onMouseLeave={() => setOpenMenuLabel(null)}>
        <button
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            isChildActive 
                ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200' 
                : hasScrolled 
                    ? 'text-foreground hover:bg-primary/10 hover:text-primary'
                    : 'text-white hover:bg-white/10'
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
                className="w-80 rounded-2xl bg-popover/50 backdrop-blur-2xl p-2 text-card-foreground shadow-lg border border-border/20"
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
                            isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                          )}
                          onClick={() => setOpenMenuLabel(null)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'flex-shrink-0 rounded-lg p-2 transition-colors duration-200',
                               isActive ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary group-hover/navlink:bg-primary group-hover/navlink:text-primary-foreground'
                            )}>
                              <child.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className={cn("font-semibold", isActive ? "text-primary-foreground" : "text-foreground")}>{child.label}</span>
                              <p className={cn("text-sm", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>{child.description}</p>
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
         isActive 
            ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200' 
            : hasScrolled
                ? 'text-foreground hover:bg-primary/10 hover:text-primary'
                : 'text-white hover:bg-white/10'
      )}
    >
      {link.label}
    </Link>
  );
};

const MobileNavItem = ({ link, closeMenu, pathname, openAccordion, setOpenAccordion }: { link: (typeof NAV_LINKS)[number], closeMenu: () => void, pathname: string, openAccordion: string | null, setOpenAccordion: (label: string | null) => void }) => {
  const isParentActive = link.children ? link.children.some(child => pathname.startsWith(child.href)) : false;
  const isOpen = openAccordion === link.label;

  if (!link.children) {
    const isActive = pathname === link.href;
    return (
      <Link href={link.href} onClick={closeMenu} className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold transition-colors",
          isActive 
              ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200" 
              : "text-foreground hover:bg-muted"
      )}>
          {link.label}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button onClick={() => setOpenAccordion(isOpen ? null : link.label)} className={cn(
          "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-base font-semibold text-foreground transition-colors hover:bg-muted",
          isParentActive && !isOpen && "bg-emerald-100/60 dark:bg-emerald-900/30"
      )}>
        <span>{link.label}</span>
        <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="pl-4"
          >
            <div className="flex flex-col gap-1 border-l-2 border-border/50 pl-4 py-1">
              {link.children.map((child: any) => {
                const isChildActive = pathname.startsWith(child.href);
                return (
                  <Link key={child.label} href={child.href} onClick={closeMenu} className={cn(
                    "group flex items-center gap-3 rounded-md p-2 transition-colors",
                    isChildActive 
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                    <div className={cn(
                      "flex-shrink-0 rounded-md p-1.5 transition-colors duration-200",
                      isChildActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    )}>
                       <child.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{child.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
  const activeParentOnLoad = NAV_LINKS.find(l => l.children && l.children.some(c => pathname.startsWith(c.href)));
  const [openAccordion, setOpenAccordion] = useState<string | null>(activeParentOnLoad?.label || null);

  useEffect(() => {
    const handleMouseEnter = (label: string) => setOpenMenuLabel(label);
    const handleMouseLeave = () => setOpenMenuLabel(null);

    const navItems = document.querySelectorAll('[data-menu-label]');
    navItems.forEach(item => {
      const label = item.getAttribute('data-menu-label');
      if (label) {
        item.addEventListener('mouseenter', () => handleMouseEnter(label));
        item.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      navItems.forEach(item => {
        const label = item.getAttribute('data-menu-label');
        if (label) {
          item.removeEventListener('mouseenter', () => handleMouseEnter(label));
          item.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, []);

  useEffect(() => {
    const activeParent = NAV_LINKS.find(l => l.children && l.children.some(c => pathname.startsWith(c.href)));
    setOpenAccordion(activeParent ? activeParent.label : null);
  }, [pathname]);

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
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        hasScrolled ? "pt-2" : "p-0"
      )}>
        <nav className={cn(
            "flex items-center justify-between transition-all duration-500 ease-heavy-out",
            hasScrolled
                ? 'mx-auto p-3 w-full md:w-[95%] lg:w-[90%] rounded-full border border-slate-200/20 dark:border-white/10 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl'
                : 'w-full rounded-none bg-transparent px-4 md:px-6 py-3'
        )}>
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} className='transition-transform duration-300 group-hover:scale-110' />
                  <div className="flex flex-col">
                      <span className={cn(
                        "font-extrabold leading-tight transition-colors",
                        hasScrolled ? 'text-primary' : 'text-white'
                      )}>SARC EDU.</span>
                      <span className={cn(
                        "text-xs tracking-[0.2em] font-medium transition-colors",
                        hasScrolled ? 'text-foreground' : 'text-white'
                      )}>FOUNDATION</span>
                  </div>
              </Link>
              
              <div className="hidden lg:flex items-center lg:gap-x-1">
                {NAV_LINKS.map((link) => (
                  <DesktopNavItem 
                    key={link.label} 
                    link={link} 
                    pathname={pathname} 
                    hasScrolled={hasScrolled}
                    openMenuLabel={openMenuLabel}
                    setOpenMenuLabel={setOpenMenuLabel}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button asChild className={cn(
                    'hidden lg:flex rounded-full text-sm font-semibold transition-all hover:scale-105',
                    hasScrolled 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                )}>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <div className="lg:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className={cn(hasScrolled ? "text-foreground" : "text-white")}>
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
            className="fixed inset-0 z-[100] bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-4 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.1)] border-l border-white/20 dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8 px-2">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="/images/sarc.png" alt="SARC Logo" width={32} height={32} />
                  <span className="font-bold text-lg text-foreground">SARC Foundation</span>
                </Link>
                <div className="flex items-center gap-1">
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className='text-muted-foreground -mr-2'>
                    <X />
                  </Button>
                </div>
              </div>
              <nav className="flex-1 flex flex-col gap-2 overflow-y-auto px-1">
                {NAV_LINKS.map(link => (
                  <MobileNavItem 
                    key={link.label} 
                    link={link}
                    pathname={pathname}
                    closeMenu={() => setMobileMenuOpen(false)}
                    openAccordion={openAccordion}
                    setOpenAccordion={setOpenAccordion}
                  />
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-border/50">
                <Button asChild className="w-full bg-primary text-primary-foreground uppercase text-sm font-bold tracking-widest" size="lg">
                  <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
