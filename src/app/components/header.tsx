'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';
import { Input } from '@/components/ui/input';

const DesktopNavItem = ({ link, pathname, hasScrolled, openMenuLabel, setOpenMenuLabel }: { link: (typeof NAV_LINKS)[number], pathname: string, hasScrolled: boolean, openMenuLabel: string | null, setOpenMenuLabel: (label: string | null) => void }) => {
  const isOpen = openMenuLabel === link.label;
  const isParentActive = link.children ? link.children.some(child => pathname.startsWith(child.href)) : false;

  if (link.children) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setOpenMenuLabel(link.label)}
        onMouseLeave={() => setOpenMenuLabel(null)}
      >
        <button
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            (isParentActive || isOpen)
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground hover:bg-muted'
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
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-20"
            >
              <div
                className="w-80 p-2 text-card-foreground bg-card rounded-2xl border shadow-2xl"
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
                            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          )}
                          onClick={() => setOpenMenuLabel(null)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'flex-shrink-0 rounded-lg p-2 transition-colors duration-200',
                               isActive ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary group-hover/navlink:bg-accent'
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
            ? 'bg-primary/10 text-primary' 
            : 'text-foreground hover:bg-muted'
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
          "flex items-center gap-4 rounded-lg px-3 py-2 text-base font-semibold transition-colors",
          isActive 
              ? "bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200" 
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
                        ? "bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-200" 
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
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);


  const activeParentOnLoad = NAV_LINKS.find(l => l.children && l.children.some(c => pathname.startsWith(c.href)));
  const [openAccordion, setOpenAccordion] = useState<string | null>(activeParentOnLoad?.label || null);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        router.push(`/search?q=${searchQuery.trim()}`);
        setSearchQuery('');
        setIsSearchOpen(false);
        setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  
  useEffect(() => {
    if (mobileMenuOpen) return;
    const activeParent = NAV_LINKS.find(l => l.children && l.children.some(c => pathname.startsWith(c.href)));
    setOpenAccordion(activeParent ? activeParent.label : null);
  }, [pathname, mobileMenuOpen]);

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
    if (mobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isSearchOpen]);

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
                ? 'mx-auto p-3 w-full md:w-[95%] lg:w-[90%] rounded-full border border-slate-200/20 dark:border-white/10 shadow-lg bg-card/80 backdrop-blur-2xl'
                : 'w-full rounded-none bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl px-4 md:px-6 py-3 border-b border-black/10 dark:border-white/10'
        )}>
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} className='transition-transform duration-300 group-hover:scale-110' />
                  <div className="flex flex-col">
                      <span className="text-lg font-bold leading-tight text-sky-600 dark:text-sky-400 transition-colors whitespace-nowrap">
                        SARC EDU.
                      </span>
                      <div className="text-xs font-bold text-foreground transition-colors flex justify-between w-full">
                          {'FOUNDATION'.split('').map((char, i) => <span key={i}>{char}</span>)}
                      </div>
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
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-foreground hidden lg:flex">
                  <Search />
                </Button>
                <ThemeToggle />
                <Button asChild className="hidden lg:flex rounded-full text-sm font-semibold transition-all hover:scale-105 bg-primary text-primary-foreground">
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
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm p-4 flex flex-col bg-card"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                    <Image src="/images/sarc.png" alt="SARC Logo" width={32} height={32} />
                    <span className="font-bold text-lg text-foreground">SARC</span>
                  </Link>
                  <div className="flex items-center gap-1">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className='text-muted-foreground -mr-2'>
                      <X />
                    </Button>
                  </div>
                </div>

                 <form onSubmit={handleSearchSubmit} className="relative mb-4">
                    <Input
                      placeholder="Search..."
                      className="pl-10 bg-muted"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute left-0 top-0 h-full px-3 text-muted-foreground">
                      <Search className="h-5 w-5" />
                    </button>
                </form>

                <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-2 -mr-2">
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

       <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-[15vh]"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Input
                ref={searchInputRef}
                placeholder="Search the site..."
                className="w-full h-14 rounded-full pl-6 pr-14 text-lg border-2 border-primary/50 bg-background/80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute top-0 right-0 h-14 w-14 flex items-center justify-center text-muted-foreground">
                  <Search />
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
