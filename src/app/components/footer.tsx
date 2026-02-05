'use client'

import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/sarc.png" alt="SARC Logo" width={48} height={48} />
              <span className="font-bold text-xl tracking-tight text-white">SARC</span>
            </Link>
            <p className="text-sm text-slate-400">
              Fostering a legacy of excellence and innovation in education since 2017.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-slate-400 hover:text-emerald-500 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-500 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-500 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-500 transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
               {NAV_LINKS.map(link => (
                    link.children ? link.children.map(child => (
                         <li key={child.label}>
                            <Link href={child.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                {child.label}
                            </Link>
                        </li>
                    )) : (
                        <li key={link.label}>
                            <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    )
                ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className='flex items-start gap-3'>
                <MapPin size={16} className='mt-1 shrink-0 text-emerald-500/70' />
                <span>Padma Kanya Multiple Campus, Bagbazar, Kathmandu, Nepal</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone size={16} className='shrink-0 text-emerald-500/70'/>
                <a href="tel:+97714242424" className="hover:text-emerald-400 transition-colors">+977-1-4242424</a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail size={16} className='shrink-0 text-emerald-500/70'/>
                <a href="mailto:info@sarc.edu.np" className="hover:text-emerald-400 transition-colors">info@sarc.edu.np</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Our Location</h3>
            <div className='aspect-video rounded-lg overflow-hidden border border-slate-700'>
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.391735118744!2d85.31633887546813!3d27.705417076184245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18e2c9a7ab33%3A0x26f1a4c90353a44!2sPadma%20Kanya%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1720272097723!5m2!1sen!2snp" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className='grayscale-[70%] contrast-125'
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SARC, Padma Kanya Multiple Campus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
