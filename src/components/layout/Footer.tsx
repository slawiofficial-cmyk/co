import React from 'react';
import { Link } from '@/i18n/routing';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-black/10 dark:border-white/5 bg-[#eae5dc] dark:bg-[#0e0f12] text-[#524d43] dark:text-[#a6a095] py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <span className="text-lg font-serif font-bold text-[#18191c] dark:text-[#f5f2eb]">
              Flip &amp; Coin
            </span>
            <p className="mt-2 text-xs text-[#6e685d] dark:text-[#a6a095] leading-relaxed font-sans">
              Handcrafted tactile 3D decision tool with cryptographic randomness and real-time acoustic sound synthesis.
            </p>
          </div>

          {/* Tools */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400/90 mb-3">
              Tools
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#18191c] dark:hover:text-[#f5f2eb] transition-colors"
                >
                  Classic 3D Coin Toss
                </Link>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="hover:text-[#18191c] dark:hover:text-[#f5f2eb] transition-colors"
                >
                  Custom Sides (Yes/No)
                </Link>
              </li>
              <li>
                <Link
                  href="/multi"
                  className="hover:text-[#18191c] dark:hover:text-[#f5f2eb] transition-colors"
                >
                  Multi-Flip (Best of 3/5)
                </Link>
              </li>
              <li>
                <Link
                  href="/currencies"
                  className="hover:text-[#18191c] dark:hover:text-[#f5f2eb] transition-colors"
                >
                  World Currency Mints
                </Link>
              </li>
            </ul>
          </div>

          {/* Provenance */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400/90 mb-3">
              Randomness &amp; Tech
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#6e685d] dark:text-[#8f897f]">Web Cryptography API</span>
              </li>
              <li>
                <span className="text-[#6e685d] dark:text-[#8f897f]">Web Audio API Synthesis</span>
              </li>
              <li>
                <span className="text-[#6e685d] dark:text-[#8f897f]">CSS 3D Hardware Transforms</span>
              </li>
              <li>
                <span className="text-[#6e685d] dark:text-[#8f897f]">WCAG 2.2 AA Accessibility</span>
              </li>
            </ul>
          </div>

          {/* Legal / Disclosure */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400/90 mb-3">
              Integrity
            </span>
            <p className="text-xs text-[#6e685d] dark:text-[#8f897f] leading-relaxed">
              Flip &amp; Coin is strictly a decision-making and entertainment utility. No wagering, gambling, or monetary prizes are hosted or supported.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#6e685d] dark:text-[#8f897f] gap-4">
          <div>
            &copy; {new Date().getFullYear()} flipandcoin.com · All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#18191c] dark:hover:text-[#dedad2] transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#18191c] dark:hover:text-[#dedad2] transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-[#18191c] dark:hover:text-[#dedad2] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
