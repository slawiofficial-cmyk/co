import React from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing, LOCALES_CONFIG } from '@/i18n/routing';
import { LanguageSuggestionBanner } from '@/components/LanguageSuggestionBanner';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl = 'https://flipandcoin.com';
  const canonicalUrl = isEn ? baseUrl : `${baseUrl}/${locale}`;
  const localeMeta = LOCALES_CONFIG[locale] || LOCALES_CONFIG.en;

  const titles: Record<string, string> = {
    en: 'Flip a Coin — Instant, Fair & Unbiased 3D Coin Toss',
    fr: 'Pile ou Face — Lancer de pièce 3D instantané et équitable',
    es: 'Cara o Cruz — Lanzamiento de moneda 3D justo e instantáneo',
    ar: 'رمي عملة نقدية — قرعة ثلاثية الأبعاد فورية وعادلة',
    pt: 'Cara ou Coroa — Cara ou Coroa 3D instantâneo e justo',
    de: 'Kopf oder Zahl — Sofortiger, fairer 3D-Münzwurf',
  };

  const descriptions: Record<string, string> = {
    en: 'Flip a coin online with realistic 3D physics, authentic metal sounds, and truly random 50/50 outcomes. Simple, fast, and free.',
    fr: 'Lancez une pièce en ligne avec une physique 3D réaliste, un son métallique authentique et un résultat aléatoire 50/50 garanti.',
    es: 'Lanza una moneda en línea con física 3D realista, sonido metálico y resultados aleatorios 50/50 comprobados.',
    ar: 'ارمِ عملة نقدية أونلاين بفيزياء ثلاثية الأبعاد وصوت معدني واقعي مع نتائج عادلة 50/50 دون أي انحياز.',
    pt: 'Jogue cara ou coroa online com física 3D realista, som metálico autêntico e resultados verdadeiramente aleatórios 50/50.',
    de: 'Münze online werfen mit realistischer 3D-Physik, authentischem Münzklang und garantiert zufälligem 50/50-Ergebnis.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  // Build hreflang alternates: ONLY translated locales + x-default
  const alternateLanguages: Record<string, string> = {
    'x-default': baseUrl,
    en: baseUrl,
  };

  Object.entries(LOCALES_CONFIG).forEach(([code, config]) => {
    if (config.translated && code !== 'en') {
      alternateLanguages[code] = `${baseUrl}/${code}`;
    }
  });

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    robots: {
      index: localeMeta.translated,
      follow: true,
      nocache: false,
      googleBot: {
        index: localeMeta.translated,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Flip & Coin',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const isRtl = locale === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LanguageSuggestionBanner currentLocale={locale} />
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
