import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AppLayout from '@/components/layout/AppLayout/AppLayout';
import QueryProvider from '@/components/providers/QueryProvider';

import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Природні Мандри',
    default: 'Природні Мандри',
  },
  description:
    'Платформа для еко-мандрівок Україною, історій мандрівників та корисних маршрутів.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>
        <QueryProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
