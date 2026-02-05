import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { FirebaseClientProvider } from '@/firebase';
import { Poppins } from 'next/font/google';
import BackgroundBlobs from './components/background-blobs';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'SARC | Education Foundation',
  description: 'SARC Education Foundation - A Legacy of Excellence',
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
    <html lang="en" className={cn(poppins.variable)}>
      <body
        className={cn(
          'font-sans antialiased min-h-screen flex flex-col bg-background relative'
        )}
      >
        <BackgroundBlobs />
        <FirebaseClientProvider>
          <Header />
          <main className="flex-grow z-10">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
