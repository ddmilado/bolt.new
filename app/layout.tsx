import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The World\'s Largest Hackathon',
  description: 'Join 100,000+ developers building the future with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e1e2e',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
