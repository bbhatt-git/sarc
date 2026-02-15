
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { FirebaseClientProvider } from '@/firebase';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from './components/theme-provider';
import { BackgroundController } from './components/background-controller';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  description: "Discover SARC in Bhimdatta, Kanchanpur, a top choice for +2 Science, Management, and Law. We have been nurturing Nepal's future leaders with excellence since 2017.",
  keywords: ['SARC', 'SARC Education', 'Education in Nepal', 'Kanchanpur College', 'Bhimdatta College', '+2 Science', '+2 Management', '+2 Law', 'CTEVT', 'Bridge Course', 'Far-West Nepal Education'],
  authors: [{ name: 'SARC Education Foundation' }],
  creator: 'SARC Education Foundation',
  publisher: 'SARC Education Foundation',
  openGraph: {
    title: 'SARC Education Foundation | Pioneering Futures',
    description: "Discover SARC in Bhimdatta, Kanchanpur. We offer a legacy of excellence in +2 Science, Management, and Law, nurturing future leaders with holistic education.",
    url: 'https://sarc.edu.np',
    siteName: 'SARC Education Foundation',
    images: [
      {
        url: '/images/sarc.png',
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
    description: 'Join SARC in Bhimdatta, Kanchanpur for a holistic education. Discover our +2 programs in Science, Management, and Law.',
    images: ['/images/sarc.png'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(poppins.variable)} suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased min-h-screen flex flex-col bg-background'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <BackgroundController />
            <Header />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
            <Toaster />
          </FirebaseClientProvider>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
