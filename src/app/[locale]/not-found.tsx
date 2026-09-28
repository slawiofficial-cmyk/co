import React from 'react';
import { Link } from '@/i18n/routing';

export default function LocaleNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <h1 className="text-3xl font-serif font-bold text-[#18191c] dark:text-[#f5f2eb]">
        404 — Page Not Found
      </h1>
      <p className="mt-2 text-sm text-[#6c675e] dark:text-[#a6a095]">
        The requested coin flip page does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-sm font-medium hover:bg-amber-600/30 transition-colors"
      >
        Return to Coin Flip
      </Link>
    </div>
  );
}
