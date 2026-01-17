import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Smart Labs - Your Partner in Test Preparation',
  description:
    'Smart Labs offers expert coaching and personalized study plans for IELTS, OET, PTE, and TOEFL.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body
        className={cn(
          'min-h-screen font-body antialiased',
          'flex flex-col'
        )}
      >
        <FirebaseClientProvider>
          <Header />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
        <Script type="text/javascript" src="https://sandbox.payhere.lk/lib/payhere.js"></Script>
      </body>
    </html>
  );
}
