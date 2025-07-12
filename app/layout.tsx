import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Cinzel, Cormorant_Garamond } from 'next/font/google';

// Magical serif fonts for logos and hero titles
const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Clean fonts for body text
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hogwarts Studios - Where Stories Come to Life',
  description: 'Professional creative studio bringing your vision to reality through stunning visuals, compelling content, and magical storytelling experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable} ${cinzel.variable} ${cormorantGaramond.variable}`}>
        {children}
      </body>
    </html>
  );
}