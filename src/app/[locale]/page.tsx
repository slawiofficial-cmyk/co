import React from 'react';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { CoinStage } from '@/components/home/CoinStage';
import { EditorialContent } from '@/components/home/EditorialContent';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { IconSparklesCoin } from '@/components/icons/CustomIcons';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const contentByLocale: Record<
    string,
    { kicker: string; title: string; subtitle: string; heads: string; tails: string }
  > = {
    en: {
      kicker: 'Truly random, fair 50/50 · Unbiased 3D Coin Toss',
      title: 'Instant, Unbiased Coin Flip',
      subtitle: 'Clean physics simulation with 3D metal coins, authentic sound, and unbiased random flips.',
      heads: 'HEADS',
      tails: 'TAILS',
    },
    fr: {
      kicker: 'Aléatoire équitable 50/50 · Lancer de pièce 3D impartial',
      title: 'Lancer de pièce instantané et impartial',
      subtitle: 'Simulation physique soignée avec des pièces métalliques 3D, un rendu sonore réaliste et des tirages aléatoires.',
      heads: 'FACE',
      tails: 'PILE',
    },
    es: {
      kicker: 'Totalmente aleatorio, 50/50 justo · Lanzamiento 3D imparcial',
      title: 'Tirada de moneda instantánea e imparcial',
      subtitle: 'Simulación física realista con monedas de metal en 3D, sonido acústico y resultados perfectamente aleatorios.',
      heads: 'CARA',
      tails: 'CRUZ',
    },
    ar: {
      kicker: 'عشوائية تامة، ونسبة 50/50 عادلة · قرعة ثلاثية الأبعاد محايدة',
      title: 'رمي عملة فوري وغير منحاز',
      subtitle: 'محاكاة فيزيائية متقنة بعملات معدنية ثلاثية الأبعاد، وصوت حقيقي ونتائج عشوائية متكافئة تماماً.',
      heads: 'وجه',
      tails: 'ظهر',
    },
    pt: {
      kicker: 'Verdadeiramente aleatório, 50/50 justo · Lançamento 3D imparcial',
      title: 'Cara ou coroa instantâneo e imparcial',
      subtitle: 'Simulação física refinada com moedas de metal em 3D, áudio acústico e resultados totalmente justos.',
      heads: 'CARA',
      tails: 'COROA',
    },
    de: {
      kicker: 'Echter Zufall, 50/50 fair · Unparteiischer 3D-Münzwurf',
      title: 'Sofortiger und unparteiischer Münzwurf',
      subtitle: 'Präzise Physiksimulation mit 3D-Metallmünzen, akustischem Klang und unvoreingenommenen Zufallsergebnissen.',
      heads: 'KOPF',
      tails: 'ZAHL',
    },
  };

  const current = contentByLocale[locale] || contentByLocale.en;
  const canonicalUrl = locale === 'en' ? 'https://flipandcoin.com' : `https://flipandcoin.com/${locale}`;

  // Structured Data (WebApplication + FAQPage)
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Flip & Coin',
    url: canonicalUrl,
    description: current.subtitle,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Realistic 3D coin physics simulation',
      'Hardware-based cryptographic entropy',
      'Real-time Web Audio API sound synthesis',
      'Customizable heads and tails labels',
      'Session streak and outcome tracking',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is flipping an online coin truly random?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Unlike ordinary software that uses pseudo-random Math.random() algorithms, this tool queries system entropy via the Web Cryptography API (crypto.getRandomValues). The 32-bit entropy value is processed with zero modulo bias, delivering pure 50.000% mathematical probability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the starting face affect the result?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. While physical coins have a measured 50.8% tendency to land on the face that was facing up before launch (demonstrated by Diaconis et al. in 2007 and reconfirmed in 2023 by Bartoš et al. across 350,757 coin flips), a digital cryptographic toss evaluates fresh system entropy independently of whatever face was displayed previously.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the odds of flipping heads 5 or 10 times in a row?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each individual toss remains strictly 1-in-2 (50%). Consecutive streaks follow powers of two: 5 consecutive heads has an odds of 1 in 32 (3.125%), while 10 consecutive heads occurs roughly once in 1,024 sequences (0.098%).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can this tool be used for sports matches and formal tiebreakers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Referees, coaches, and board game players use this tool for kickoff possession, side selection, and sudden-death tiebreakers because the outcome cannot be manipulated by thumb angle, launch height, or catch dexterity.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f6f3eb] dark:bg-[#131417] text-[#18191c] dark:text-[#f5f2eb] bg-guilloche-light dark:bg-guilloche transition-colors duration-300">
      {/* Server-Rendered JSON-LD Structured Data */}
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />

      {/* Strict Top Bar Contract Navigation */}
      <Navbar currentLocale={locale} />

      <main className="relative pt-4 sm:pt-8 pb-16">
        <section className="max-w-4xl mx-auto px-4 text-center">
          {/* Header Title with Zero-Pill Restraint (Server-rendered in raw HTML) */}
          <div className="mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-amber-800 dark:text-amber-400/90 uppercase">
              <IconSparklesCoin className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>{current.kicker}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-balance text-[#18191c] dark:text-[#f5f2eb]">
              {current.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#6c675e] dark:text-[#a6a095] max-w-md sm:max-w-lg mx-auto font-sans leading-relaxed">
              {current.subtitle}
            </p>
          </div>

          {/* Interactive Client Component: 3D Coin, Triggers, Controls, History Tape */}
          <CoinStage initialLabels={{ heads: current.heads, tails: current.tails }} />
        </section>

        {/* Fixed Non-Shifting Advertising Slot Reservation (Below the tool fold) */}
        <div className="w-full max-w-4xl mx-auto px-4 mt-12">
          <div
            className="w-full h-[50px] sm:h-[90px] rounded-lg border border-dashed border-black/15 dark:border-white/10 flex items-center justify-center text-xs font-mono text-[#6c675e] dark:text-[#a6a095] overflow-hidden"
            aria-hidden="true"
          >
            <span className="opacity-60">SPONSORED PLACEMENT · ZERO CLS</span>
          </div>
        </div>

        {/* Server-Rendered Editorial & FAQ Content (100% in raw HTML without JavaScript) */}
        <EditorialContent />
      </main>

      {/* Discreet, Professional Footer (Server-rendered) */}
      <Footer />
    </div>
  );
}
