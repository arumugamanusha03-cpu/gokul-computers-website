import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CookieConsent from '@/components/ui/CookieConsent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "Gokul Computers – Trichy's Trusted Laptop Destination",
    template: '%s | Gokul Computers',
  },
  description: 'Gokul Computers – Your One Stop Solution For All Laptop Needs in Trichy. Lenovo Authorized Dealer. Multi-brand laptops, repairs, upgrades and accessories. 31+ years of experience.',
  keywords: ['laptop shop trichy', 'lenovo dealer trichy', 'laptop repair trichy', 'gokul computers', 'thillai nagar laptop shop'],
  authors: [{ name: 'Gokul Computers' }],
  creator: 'Gokul Computers',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gokulcomputers.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Gokul Computers',
    title: "Gokul Computers – Trichy's Trusted Laptop Destination",
    description: 'Your One Stop Solution For All Laptop Needs in Trichy. Lenovo Authorized Dealer with 31+ years of experience.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Gokul Computers',
  description: "Trichy's Trusted Laptop Destination – Lenovo Authorized Dealer",
  url: 'https://gokulcomputers.in',
  telephone: '+91-7947130911',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No B-7, Vignesh Plaza, Near Dominos Pizza, 1st Cross, Thillai Nagar',
    addressLocality: 'Trichy',
    addressRegion: 'Tamil Nadu',
    postalCode: '620018',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 09:30-20:00',
  priceRange: '₹₹',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        <LoadingScreen />
        {children}
        <CookieConsent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              border: '1px solid #F1F5F9',
              padding: '14px 18px',
              color: '#0F172A',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}