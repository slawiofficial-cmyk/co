import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export interface LocaleMeta {
  code: string;
  name: string;
  nativeName: string;
  translated: boolean;
  dir: 'ltr' | 'rtl';
}

export const LOCALES_CONFIG: Record<string, LocaleMeta> = {
  en: { code: 'en', name: 'English', nativeName: 'English', translated: true, dir: 'ltr' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', translated: false, dir: 'ltr' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', translated: false, dir: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', translated: false, dir: 'rtl' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', translated: false, dir: 'ltr' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', translated: false, dir: 'ltr' },
};

export const routing = defineRouting({
  locales: ['en', 'fr', 'es', 'ar', 'pt', 'de'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
