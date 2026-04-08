import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aniket Singh — Software Developer',
  description: 'Portfolio of Aniket Singh — Software Developer & Student at Chandigarh University. Building scalable applications and solving real-world problems.',
  keywords: ['Aniket Singh', 'Software Developer', 'Chandigarh University', 'Full Stack', 'Portfolio'],
  authors: [{ name: 'Aniket Singh' }],
  openGraph: {
    title: 'Aniket Singh — Software Developer',
    description: 'Passionate developer building scalable applications and solving real-world problems.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aniket Singh — Software Developer',
    description: 'Passionate developer building scalable applications.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
