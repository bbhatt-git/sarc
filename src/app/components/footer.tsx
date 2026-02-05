import Link from 'next/link';
import { navLinks } from '@/lib/data';
import Logo from '@/app/components/logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 text-secondary-foreground border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Fostering a legacy of excellence and innovation in education.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4 font-headline">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className='flex items-start gap-3'>
                <MapPin size={16} className='mt-1 shrink-0 text-primary/70' />
                <span>Padma Kanya Multiple Campus, Bagbazar, Kathmandu, Nepal</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone size={16} className='shrink-0 text-primary/70'/>
                <a href="tel:+97714242424" className="hover:text-primary transition-colors">+977-1-4242424</a>
              </li>
              <li className='flex items-center gap-3'>
                <Mail size={16} className='shrink-0 text-primary/70'/>
                <a href="mailto:info@sarc.edu.np" className="hover:text-primary transition-colors">info@sarc.edu.np</a>
              </li>
            </ul>
          </div>

          <div>
             <h3 className="font-semibold text-foreground mb-4 font-headline">Newsletter</h3>
             <p className="text-sm text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates.</p>
             <form className="flex gap-2">
                <Input type="email" placeholder="Your Email" className="bg-background/50 border-white/20" />
                <Button type="submit" size="sm">Subscribe</Button>
             </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SARC, Padma Kanya Multiple Campus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
