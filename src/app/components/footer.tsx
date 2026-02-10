'use client'

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 z-10">
      <div className="container mx-auto px-4">
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
                  <a href="tel:+97714242424" className="hover:text-emerald-600 transition-colors">+977-1-4242424</a>
                </li>
                <li className='flex items-center gap-3'>
                  <Mail size={16} className='shrink-0 text-emerald-600'/>
                  <a href="mailto:info@sarc.edu.np" className="hover:text-emerald-600 transition-colors">info@sarc.edu.np</a>
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
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors"><Facebook size={22} /></Link>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors"><Twitter size={22} /></Link>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors"><Instagram size={22} /></Link>
                  <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors"><Linkedin size={22} /></Link>
                </div>
             </div>
          </div>

          <div className="border-t border-slate-200/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SARC Education Foundation. All Rights Reserved.</p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Designed & Crafted by
                <a href="https://bbhatt.com.np" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-emerald-600 transition-colors">
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
