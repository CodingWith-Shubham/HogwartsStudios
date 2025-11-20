import './globals.css';
import type { Metadata } from 'next';
import { ThemeWrapper } from '../components/sections/ThemeWrapper';

export const metadata: Metadata = {
  title: 'Hogwarts Studios - Where Stories Come to Life',
  description:
    'Professional creative studio bringing your vision to reality through stunning visuals, compelling content, and magical storytelling experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Removed all fonts — now uses default system font */}
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
