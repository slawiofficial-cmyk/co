import React from 'react';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentLocale: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLocale }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f6f3eb]/90 dark:bg-[#131417]/90 border-b border-black/10 dark:border-white/5 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display serif */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#18191c] dark:text-[#f5f2eb] hover:text-amber-800 dark:hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          Flip &amp; Coin
        </Link>

        {/* Zone 2: 4-6 clean text navigation links (single-line, subtle underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#524d43] dark:text-[#dedad2]">
          <Link
            href="/"
            className="text-amber-800 dark:text-amber-400 font-semibold transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-200"
          >
            Coin Flip
          </Link>
          <Link
            href="/custom"
            className="transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-200"
          >
            Custom Sides
          </Link>
          <Link
            href="/multi"
            className="transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-200"
          >
            Multi-Flip
          </Link>
          <Link
            href="/currencies"
            className="transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-200"
          >
            Currencies
          </Link>
          <Link
            href="/about"
            className="transition-colors whitespace-nowrap hover:text-amber-800 dark:hover:text-amber-200"
          >
            History &amp; Math
          </Link>
        </nav>

        {/* Zone 3: 1-2 primary actions (Language Selector + Theme Toggle) */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={currentLocale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
