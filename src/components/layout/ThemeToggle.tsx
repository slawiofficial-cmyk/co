'use client';

import React, { useState, useEffect } from 'react';
import { IconMoon, IconSun } from '../icons/CustomIcons';

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Check local preference or document class
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleToggle = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('flipandcoin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('flipandcoin_theme', 'light');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg border border-black/15 dark:border-white/10 text-[#474239] dark:text-[#dedad2] hover:text-[#18191c] dark:hover:text-white hover:border-black/30 dark:hover:border-white/20 transition-colors"
      title={isDarkMode ? 'Switch to warm parchment light mode' : 'Switch to dark charcoal mode'}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
    </button>
  );
};
