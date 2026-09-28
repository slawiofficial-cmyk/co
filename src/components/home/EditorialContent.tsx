import React from 'react';
import { IconShieldFairness } from '../icons/CustomIcons';

export const EditorialContent: React.FC = () => {
  const faqs = [
    {
      q: 'Is flipping an online coin truly random?',
      a: 'Yes. Unlike ordinary software that uses pseudo-random Math.random() algorithms, this tool queries system entropy via the Web Cryptography API (crypto.getRandomValues). The 32-bit entropy value is processed with zero modulo bias, delivering pure 50.000% mathematical probability.',
    },
    {
      q: 'Does the starting face affect the result?',
      a: 'No. While physical coins have a measured 50.8% tendency to land on the face that was facing up before launch (demonstrated by Diaconis et al. in 2007 and reconfirmed in 2023 by Bartoš et al. across 350,757 coin flips), a digital cryptographic toss evaluates fresh system entropy independently of whatever face was displayed previously.',
    },
    {
      q: 'What are the odds of flipping heads 5 or 10 times in a row?',
      a: 'Each individual toss remains strictly 1-in-2 (50%). Consecutive streaks follow powers of two: 5 consecutive heads has an odds of 1 in 32 (3.125%), while 10 consecutive heads occurs roughly once in 1,024 sequences (0.098%).',
    },
    {
      q: 'Can this tool be used for sports matches and formal tiebreakers?',
      a: 'Yes. Referees, coaches, and board game players use this tool for kickoff possession, side selection, and sudden-death tiebreakers because the outcome cannot be manipulated by thumb angle, launch height, or catch dexterity.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-16 pt-12 border-t border-black/10 dark:border-white/5 space-y-16">
      {/* Intent Section 1: How Digital Coin Flipping Works vs Physical Coins */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <span className="block text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-500/90 mb-2">
            01. Probability &amp; Mechanics
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18191c] dark:text-[#f5f2eb] leading-tight">
            Physical coin bias vs. cryptographic randomness.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-4 text-sm text-[#474239] dark:text-[#c8c4bc] leading-relaxed font-sans">
          <p>
            Many assume physical coin tossing is a textbook 50/50 event. However, research by Persi Diaconis, Susan Holmes, and Richard Montgomery (2007) revealed that human hand flips introduce dynamical precession, causing a coin to spend slightly more time in flight with its initial face upward. This yields a measured <strong className="text-amber-900 dark:text-amber-300 font-mono font-medium">~51% same-side bias</strong>.
          </p>
          <p>
            In 2023, an international team led by František Bartoš collected data from 350,757 controlled physical coin tosses across 48 participants, definitively confirming this same-side bias at <strong className="text-amber-900 dark:text-amber-300 font-mono font-medium">50.8%</strong>.
          </p>
          <p>
            Flip &amp; Coin eliminates physical precession and catching friction. Instead of relying on manual dexterity, each toss samples the client device&rsquo;s cryptographic entropy subsystem (<code className="text-amber-900 dark:text-amber-300 text-xs px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 font-mono">crypto.getRandomValues</code>), distributing outcomes with true unbiased 50/50 probability.
          </p>
          <div className="pt-2 flex items-center gap-2.5 text-xs font-mono text-[#6e685d] dark:text-[#a6a095]">
            <IconShieldFairness className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <span>Entropy sampling · Uniform binary distribution</span>
          </div>
        </div>
      </section>

      {/* Intent Section 2: Practical Decision Making & Psychological Value */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <span className="block text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-500/90 mb-2">
            02. Everyday Utility
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18191c] dark:text-[#f5f2eb] leading-tight">
            How a two-second toss resolves analysis paralysis.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-4 text-sm text-[#474239] dark:text-[#c8c4bc] leading-relaxed font-sans">
          <p>
            When faced with evenly matched alternatives—such as choosing between two projects, deciding who handles a chore, or settling a debate—deliberation often hits diminishing returns. A coin toss provides immediate resolution without lingering doubt.
          </p>
          <p>
            Beyond settling ties, a coin toss serves a well-documented psychological purpose often associated with Danish inventor Piet Hein and Sigmund Freud: during the brief moment the coin is rotating in mid-air, your conscious hesitation dissolves, and you frequently realize which outcome you were internally rooting for all along.
          </p>
        </div>
      </section>

      {/* Planned Standalone Knowledge Pages (Preview links for Phase 4) */}
      <section className="p-6 rounded-2xl bg-[#eee9df] dark:bg-[#1b1c21] border border-black/10 dark:border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 dark:border-white/5 gap-2">
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-500/90">
              Reference Library
            </span>
            <h3 className="text-lg font-serif font-bold text-[#18191c] dark:text-[#f5f2eb]">
              Comprehensive Coin Toss Guides
            </h3>
          </div>
          <span className="text-xs font-mono text-[#6e685d] dark:text-[#a6a095]">Standalone Editorial Articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-amber-500/30 transition-colors">
            <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400/90 block mb-1">Empirical Study</span>
            <h4 className="text-sm font-serif font-semibold text-[#18191c] dark:text-[#f5f2eb] mb-1">
              Is a Coin Flip Really 50/50?
            </h4>
            <p className="text-xs text-[#6e685d] dark:text-[#a6a095] leading-relaxed">
              A comprehensive breakdown of the 350,757 tosses study by Bartoš et al. and the mechanics of physical coin precession.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-amber-500/30 transition-colors">
            <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400/90 block mb-1">Cultural History</span>
            <h4 className="text-sm font-serif font-semibold text-[#18191c] dark:text-[#f5f2eb] mb-1">
              Capita aut Navia: 2,000 Years
            </h4>
            <p className="text-xs text-[#6e685d] dark:text-[#a6a095] leading-relaxed">
              From Roman legal arbitrations under the Caesars to the strictly audited rules of modern professional sports kickoffs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-amber-500/30 transition-colors">
            <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400/90 block mb-1">Decision Theory</span>
            <h4 className="text-sm font-serif font-semibold text-[#18191c] dark:text-[#f5f2eb] mb-1">
              The Airborne Realization Effect
            </h4>
            <p className="text-xs text-[#6e685d] dark:text-[#a6a095] leading-relaxed">
              Why tossing a coin unmasks subconscious preferences and cuts through decision fatigue when logic reaches a deadlock.
            </p>
          </div>
        </div>
      </section>

      {/* Intent Section 4: Home FAQ (Native HTML <details> for 100% Raw HTML Visibility Without JS) */}
      <section className="space-y-4">
        <div>
          <span className="block text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-500/90 mb-1">
            03. Common Questions
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#18191c] dark:text-[#f5f2eb]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-black/10 dark:divide-white/5 border-y border-black/10 dark:border-white/5">
          {faqs.map((item, idx) => (
            <details key={idx} className="group py-3.5" open={idx === 0}>
              <summary className="w-full flex items-center justify-between text-left text-sm font-medium text-[#18191c] dark:text-[#f5f2eb] hover:text-amber-800 dark:hover:text-amber-300 transition-colors py-1 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-base">{item.q}</span>
                <span className="text-base text-amber-700 dark:text-amber-400 font-mono ml-4 shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 text-xs sm:text-sm text-[#474239] dark:text-[#c8c4bc] leading-relaxed pl-1">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};
