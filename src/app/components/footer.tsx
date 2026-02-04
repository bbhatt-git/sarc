import Link from 'next/link';
import { navLinks } from '@/lib/data';
import Logo from '@/app/components/logo';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Fostering Excellence and Character Building for a brighter future.
            </p>
          </div>
          <div className="col-span-1 md:col-start-3">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SARC Education Foundation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
