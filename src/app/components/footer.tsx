'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Sparkles, Facebook, Instagram, Github } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null;
  }
  
  return (
    <footer className="mt-20 z-10">
      <div className="container mx-auto">
        <div className="bg-card/60 backdrop-blur-xl border-t border-border/50 rounded-t-3xl text-foreground p-8 md:p-12 shadow-2xl shadow-slate-500/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Column 1: About */}
            <div className="space-y-4 order-1">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                <span className="font-bold text-xl tracking-tight text-foreground">SARC</span>
              </Link>
              <p className="text-sm text-muted-foreground pr-4">
                Fostering a legacy of excellence and innovation in education since 2017.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="hidden md:block space-y-4 order-2">
               <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Quick Links</h3>
               <ul className="space-y-2 text-sm">
                <li><Link href="/about/us" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/admissions" className="text-muted-foreground hover:text-primary transition-colors">Admissions</Link></li>
                <li><Link href="/academics/programs" className="text-muted-foreground hover:text-primary transition-colors">Our Programs</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
             <div className="space-y-4 order-3">
                 <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Contact Us</h3>
                <ul className="space-y-3 text-sm">
                  <li className='flex items-center gap-3'>
                    <Phone size={16} className='shrink-0 text-primary'/>
                    <a href="tel:099525271" className="text-muted-foreground hover:text-primary transition-colors">099-525271</a>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Mail size={16} className='shrink-0 text-primary'/>
                    <a href="mailto:contact@sarc.edu.np" className="text-muted-foreground hover:text-primary transition-colors">contact@sarc.edu.np</a>
                  </li>
                   <li className='flex items-start gap-3'>
                      <MapPin size={16} className='mt-1 shrink-0 text-primary' />
                      <span className="text-muted-foreground">Bhimdatta-06, Kanchanpur</span>
                  </li>
                </ul>
             </div>
             
             {/* Column 4: Follow Us */}
             <div className="space-y-4 order-2 md:order-4">
                 <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-9 h-9 flex items-center justify-center">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-9 h-9 flex items-center justify-center">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.tiktok.com/@sarceducationfoun" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-9 h-9 flex items-center justify-center">
                    <i className="fa-brands fa-tiktok fa-lg"></i>
                  </a>
                   <a href="https://github.com/sarceducationfoundation" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-9 h-9 flex items-center justify-center">
                    <Github size={20} />
                  </a>
                </div>
             </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center md:text-left text-sm text-muted-foreground md:flex md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} SARC Education Foundation. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 flex flex-wrap items-center justify-center md:justify-end gap-x-1.5 gap-y-1 text-xs">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="whitespace-nowrap">Designed & Crafted by</span>
                <a href="https://bbhatt.com.np" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap">
                    Bhupesh Bhatt
                </a>
                <Sparkles className="w-3 h-3 text-primary" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
