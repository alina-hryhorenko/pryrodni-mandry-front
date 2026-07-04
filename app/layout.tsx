import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
