'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const NavItem = ({ link }: { link: (typeof NAV_LINKS)[number] & { children?: any[] } }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (link.children) {
    const isChildActive = link.children.some(child => pathname.startsWith(child.href));
    return (
      <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button
          className={cn(
            'flex items-center gap-1 transition-colors text-base font-medium',
            isChildActive ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'
          )}
        >
          {link.label}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
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
              className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-20"
            >
              <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-slate-200/50 min-w-[280px]">
                 <ul className="space-y-1 p-2">
                  {link.children.map((child) => (
                    child.icon && child.description ? (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-slate-100"
                          onClick={() => setIsOpen(false)}
                        >
                          <child.icon className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-800">{child.label}</span>
                            <p className="text-sm text-slate-500">{child.description}</p>
                          </div>
                        </Link>
                      </li>
                    ) : (
                      <li key={child.label}>
                          <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md"
                              onClick={() => setIsOpen(false)}
                          >
                              {child.label}
                          </Link>
                      </li>
                    )
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
        'transition-colors text-base font-medium',
        isActive ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'
      )}
    >
      {link.label}
    </Link>
  );
};

const MobileNavItem = ({ link, closeMenu, isOpen, onToggle }) => {
  if (!link.children) {
    return (
      <Link href={link.href} className="text-slate-700 hover:text-emerald-600 border-b border-slate-200 pb-4" onClick={closeMenu}>
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button onClick={onToggle} className="w-full flex justify-between items-center text-slate-500 mb-3 text-sm uppercase tracking-wider">
        {link.label}
        <ChevronRight className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-90')} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='overflow-hidden'
          >
            <div className='flex flex-col gap-4 pl-4 border-l border-slate-200'>
              {link.children.map((child: any) => (
                <Link key={child.label} href={child.href} className="text-slate-600 hover:text-emerald-600" onClick={closeMenu}>
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/80 shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/sarc.png" alt="SARC Logo" width={48} height={48} />
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-800">SARC</span>
              <p className="text-xs text-slate-500">Education Foundation</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild className='rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold'>
              <Link href="/admissions">Admissions</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="text-slate-700">
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/20 backdrop-blur-lg lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white/95 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-3">
                  <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                  <span className="font-bold text-lg tracking-tight text-slate-800">SARC</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className='text-slate-600'>
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {NAV_LINKS.map(link => (
                  <MobileNavItem 
                    key={link.label} 
                    link={link} 
                    closeMenu={() => setIsMobileMenuOpen(false)}
                    isOpen={openMobileDropdown === link.label}
                    onToggle={() => setOpenMobileDropdown(prev => prev === link.label ? null : link.label)}
                  />
                ))}
              </nav>
              <Button asChild className="w-full mt-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" size="lg">
                <Link href="/admissions" onClick={() => setIsMobileMenuOpen(false)}>Admissions</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
