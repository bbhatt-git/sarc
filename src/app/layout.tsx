import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { FirebaseClientProvider } from '@/firebase';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'SARC | Education Foundation',
  description: 'SARC Education Foundation - Fostering Excellence and Character Building for a brighter future.',
  icons: {
    icon: '/images/sarc.png',
    apple: '/images/sarc.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, 'dark')}>
      <body
        className={cn(
          'font-body antialiased min-h-screen flex flex-col bg-background'
        )}
      >
        <FirebaseClientProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
