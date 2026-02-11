'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84.01 15.14 0 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.65 4.31 1.72v3.28c-1.18-.13-2.33-.4-3.43-.82a1.49 1.49 0 0 1-1.12-1.3c-.03-2.32-.03-4.64-.03-6.96h-3.28v10.1A3.73 3.73 0 0 1 9.4 20.12a3.73 3.73 0 0 1-3.73-3.73c0-2.04 1.66-3.7 3.73-3.7.18 0 .37 0 .55.02v3.28a1.49 1.49 0 0 1-1.12 1.3c-1.1.42-2.25.69-3.43.82v-3.28a3.73 3.73 0 0 0 3.73-3.73V.02h3.28v10.1a3.73 3.73 0 0 0 3.73 3.73c2.07 0 3.73-1.66 3.73-3.73V.02h3.28v6.4a6.38 6.38 0 0 1-5.1 6.4v-3.28a1.49 1.49 0 0 1 1.12-1.3c1.1-.42 2.25-.69 3.43-.82v-3.28c-1.61-.07-3.2-.6-4.31-1.72-1.12-1.08-1.67-2.64-1.75-4.17z"/>
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
        <div className="bg-white/30 backdrop-blur-xl border-t border-slate-200/50 rounded-t-3xl text-foreground p-8 md:p-12 shadow-2xl shadow-slate-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo & About */}
            <div className="space-y-4 md:col-span-1">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/sarc.png" alt="SARC Logo" width={40} height={40} />
                <span className="font-bold text-xl tracking-tight text-foreground">SARC</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Fostering a legacy of excellence and innovation in education since 2017.
              </p>
            </div>

            {/* Column 2: Contact Info */}
            <div className="space-y-4">
               <h3 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-sm">Contact Us</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                <li className='flex items-center gap-3'>
                  <Phone size={16} className='shrink-0 text-emerald-600'/>
                  <a href="tel:099525271" className="hover:text-emerald-600 transition-colors">099525271</a>
                </li>
                <li className='flex items-center gap-3'>
                  <Mail size={16} className='shrink-0 text-emerald-600'/>
                  <a href="mailto:contact@sarc.edu.np" className="hover:text-emerald-600 transition-colors">contact@sarc.edu.np</a>
                </li>
                 <li className='flex items-start gap-3'>
                    <MapPin size={16} className='mt-1 shrink-0 text-emerald-600' />
                    <span>Bhimdatta-06, Kanchanpur</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Links */}
             <div className="space-y-4">
                 <h3 className="font-semibold text-foreground mb-2 uppercase tracking-wider text-sm">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link href="https://www.facebook.com/sarc.edu.np" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-600 transition-colors"><Facebook size={22} /></Link>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors"><Instagram size={22} /></Link>
                  <Link href="https://www.tiktok.com/@sarceducationfoun" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-600 transition-colors"><TikTokIcon className="h-[22px] w-[22px]" /></Link>
                </div>
             </div>
          </div>

          <div className="border-t border-slate-200/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SARC Education Foundation. All Rights Reserved.</p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span className="whitespace-nowrap">Designed & Crafted by</span>
                <a href="https://bbhatt.com.np" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-emerald-600 transition-colors whitespace-nowrap">
                    Bhupesh Bhatt
                </a>
                <Sparkles className="w-3 h-3 text-emerald-600" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
