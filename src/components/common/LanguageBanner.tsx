import React, { useEffect, useState } from 'react';

interface LanguageBannerProps {
  currentLocale: string;
  onSwitchLocale: (locale: string) => void;
}

export const LanguageBanner: React.FC<LanguageBannerProps> = ({
  currentLocale,
  onSwitchLocale,
}) => {
  const [suggestedLocale, setSuggestedLocale] = useState<{ code: string; label: string; native: string } | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    const isDismissed = localStorage.getItem('flipandcoin_lang_banner_dismissed') === 'true';
    if (isDismissed) return;

    const browserLang = (navigator.language || 'en').toLowerCase().split('-')[0];
    const supported: Record<string, { code: string; label: string; native: string }> = {
      fr: { code: 'fr', label: 'French', native: 'Français' },
      es: { code: 'es', label: 'Spanish', native: 'Español' },
      ar: { code: 'ar', label: 'Arabic', native: 'العربية' },
      pt: { code: 'pt', label: 'Portuguese', native: 'Português' },
      de: { code: 'de', label: 'German', native: 'Deutsch' },
    };

    if (browserLang && supported[browserLang] && browserLang !== currentLocale) {
      setSuggestedLocale(supported[browserLang]);
      setDismissed(false);
    }
  }, [currentLocale]);

  if (dismissed || !suggestedLocale) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('flipandcoin_lang_banner_dismissed', 'true');
    }
  };

  const handleSwitch = () => {
    onSwitchLocale(suggestedLocale.code);
    handleDismiss();
  };

  return (
    <div className="w-full bg-amber-950/40 border-b border-amber-500/20 text-xs font-mono py-2 px-4 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
          <span>
            Prefer to use Flip &amp; Coin in <strong className="text-amber-100">{suggestedLocale.native}</strong>?
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSwitch}
            className="text-amber-300 font-semibold underline underline-offset-4 hover:text-amber-100 transition-colors"
          >
            Switch to {suggestedLocale.native}
          </button>
          <button
            onClick={handleDismiss}
            className="text-zinc-400 hover:text-zinc-200 transition-colors ml-2"
            aria-label="Dismiss language suggestion"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
