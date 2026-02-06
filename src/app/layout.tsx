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
  metadataBase: new URL('https://sarc.edu.np'),
  title: {
    template: '%s | SARC Education Foundation',
    default: 'SARC Education Foundation | Pioneering Futures in Nepal',
  },
  description: 'SARC Education Foundation, established in 2017 in Bagbazar, Kathmandu. We offer a legacy of excellence in +2 Science, Management, Law, and CTEVT programs, nurturing future leaders with holistic education.',
  keywords: ['SARC', 'SARC Education', 'Education in Nepal', 'Kathmandu College', '+2 Science', '+2 Management', '+2 Law', 'CTEVT', 'Bridge Course', 'Top College Kathmandu', 'Bagbazar College'],
  authors: [{ name: 'SARC Education Foundation' }],
  creator: 'SARC Education Foundation',
  publisher: 'SARC Education Foundation',
  openGraph: {
    title: 'SARC Education Foundation | Pioneering Futures',
    description: 'A legacy of excellence in education since 2017. Offering +2 programs in Science, Management, Law, and more.',
    url: 'https://sarc.edu.np',
    siteName: 'SARC Education Foundation',
    images: [
      {
        url: '/images/hero/0.jpg',
        width: 1200,
        height: 630,
        alt: 'SARC Education Foundation Campus',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARC Education Foundation | Pioneering Futures',
    description: 'Join SARC for a holistic education experience in Kathmandu. Discover our +2 programs in Science, Management, and Law.',
    images: ['/images/hero/0.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/sarc.png',
    apple: '/images/sarc.png',
  },
  manifest: '/manifest.json',
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
          <main className="flex-grow z-10 pt-28">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
