'use client';

import React, { useState, useEffect } from 'react';
import { LOCALES_CONFIG, useRouter, usePathname } from '@/i18n/routing';
import { Globe, X } from 'lucide-react';

interface Props {
  currentLocale: string;
}

export function LanguageSuggestionBanner({ currentLocale }: Props) {
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('dismissed_lang_suggestion');
      if (dismissed) return;

      const browserLangs = navigator.languages || [navigator.language || ''];
      for (const lang of browserLangs) {
        const code = lang.slice(0, 2).toLowerCase();
        if (code && code !== currentLocale && LOCALES_CONFIG[code]) {
          setSuggestedLocale(code);
          break;
        }
      }
    } catch {
      // Ignore localStorage access errors in private browsing
    }
  }, [currentLocale]);

  if (!suggestedLocale) return null;

  const targetConfig = LOCALES_CONFIG[suggestedLocale];
  if (!targetConfig) return null;

  const handleDismiss = () => {
    setSuggestedLocale(null);
    try {
      localStorage.setItem('dismissed_lang_suggestion', 'true');
    } catch {
      // Ignore
    }
  };

  const handleSwitch = () => {
    try {
      localStorage.setItem('dismissed_lang_suggestion', 'true');
    } catch {
      // Ignore
    }
    router.replace(pathname, { locale: suggestedLocale as any });
  };

  return (
    <aside
      aria-label="Language recommendation"
      className="bg-amber-500/10 dark:bg-amber-400/10 border-b border-amber-500/20 text-[#18191c] dark:text-[#f5f2eb] px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between gap-3 sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 max-w-2xl mx-auto flex-1">
        <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="text-[#3c3830] dark:text-[#d4cebd]">
          Prefer {targetConfig.nativeName} ({targetConfig.name})?
        </span>
        <button
          onClick={handleSwitch}
          className="ml-2 font-semibold text-amber-700 dark:text-amber-300 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
        >
          Switch to {targetConfig.nativeName}
        </button>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss language suggestion"
        className="p-1 rounded text-[#8c8577] hover:text-[#18191c] dark:hover:text-[#f5f2eb] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}
