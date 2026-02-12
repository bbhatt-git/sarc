'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.96 13.91a1.2 1.2 0 1 0-1.69 1.7 1.2 1.2 0 0 0 1.7-1.7zm3.09-10.91h-3.09v12.4a2.75 2.75 0 1 1-5.5 0V9.11a.25.25 0 0 1 .25-.25h3.09V6.07H7a3.07 3.07 0 0 0-3.07 3.07v5.82A5.82 5.82 0 1 0 9.75 9.1v-.01h.01a.25.25 0 0 1 .25-.25h3.09v-3.5a.25.25 0 0 1 .25-.25h3.09A3.07 3.07 0 0 0 15.05 3z" />
    </svg>
);

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null;
  }
  
  return (
    <footer className="mt-20 z-10">
      <div className="container mx-auto">
        <div className="bg-card/60 backdrop-blur-xl border-t border-border/50 rounded-t-3xl text-foreground p-8 md:p-12 shadow-2xl shadow-slate-500/10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Column 1: About & Socials */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                <span className="font-bold text-xl tracking-tight text-foreground">SARC</span>
              </Link>
              <p className="text-sm text-muted-foreground pr-4">
                Fostering a legacy of excellence and innovation in education since 2017.
              </p>
               <div className="space-y-3 pt-2">
                 <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.tiktok.com/@sarceducationfoun" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/70 rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <TikTokIcon className="h-5 w-5" />
                  </a>
                </div>
             </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="hidden lg:block space-y-4">
               <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Quick Links</h3>
               <ul className="space-y-2 text-sm">
                <li><Link href="/about/us" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/admissions" className="text-muted-foreground hover:text-primary transition-colors">Admissions</Link></li>
                <li><Link href="/academics/programs" className="text-muted-foreground hover:text-primary transition-colors">Our Programs</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
             <div className="space-y-4">
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
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SARC Education Foundation. All Rights Reserved.</p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs">
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
