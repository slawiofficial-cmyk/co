'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, LOCALES_CONFIG } from '@/i18n/routing';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (code: string) => {
    setLangMenuOpen(false);
    router.replace(pathname, { locale: code as any });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-black/15 dark:border-white/10 text-[#474239] dark:text-[#dedad2] hover:text-[#18191c] dark:hover:text-white hover:border-black/30 dark:hover:border-white/20 transition-colors"
        aria-label="Select Language"
      >
        <span className="uppercase font-semibold">{currentLocale}</span>
        <svg className="w-3 h-3 text-[#7a7366] dark:text-zinc-400" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {langMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-[#1d1f25] border border-black/15 dark:border-white/10 py-1 shadow-2xl z-50 text-xs font-mono"
          onClick={() => setLangMenuOpen(false)}
        >
          {Object.values(LOCALES_CONFIG).map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleSelect(loc.code)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                currentLocale === loc.code
                  ? 'text-amber-800 dark:text-amber-400 font-bold'
                  : 'text-[#474239] dark:text-[#dedad2]'
              }`}
            >
              <span>{loc.nativeName}</span>
              <span className="text-[10px] text-[#7a7366] dark:text-zinc-500 uppercase">{loc.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
