import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import NextAuthProvider from '@/app/provider';
import StoreProvider from '@/app/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params: { session, ...params },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-mode-body`}>
        <StoreProvider>
          <NextAuthProvider {...params}>{children}</NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
