import React from 'react';
import type { Metadata, Viewport } from 'next';
import { fraunces, manrope, jetbrainsMono, readexPro } from './fonts';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#131417',
};

export const metadata: Metadata = {
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23c59822' stroke='%23f8e59e' stroke-width='2'/><circle cx='16' cy='16' r='10' fill='none' stroke='%23785307' stroke-width='1.5' stroke-dasharray='2 2'/><text x='16' y='21' font-family='serif' font-weight='bold' font-size='15' fill='%23422c03' text-anchor='middle'>F</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} ${readexPro.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#131417] text-[#f5f2eb] antialiased selection:bg-[#c59822]/30 selection:text-[#f8e59e]">
        {children}
      </body>
    </html>
  );
}
