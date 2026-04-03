import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solai Rajan | Cloud Engineer',
  description: 'Personal portfolio highlighting Cloud Engineering projects, experience, and skills.',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="main-layout">
          {children}
        </div>
      </body>
    </html>
  );
}
