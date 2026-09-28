import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';
import { CoinFinish, CoinLabels, CoinOutcome, FlipResult } from '../../types/coin';
import { COIN_THEMES } from './CoinThemes';
import { CoinArtwork } from './CoinArtwork';
import { soundEngine } from '../../lib/sound';
import { generateCryptoFlip } from '../../lib/cryptoRandom';

interface Coin3DProps {
  finish?: CoinFinish;
  labels?: CoinLabels;
  size?: number;
  onFlipComplete?: (result: FlipResult) => void;
  isLocked?: boolean;
}

export const Coin3D: React.FC<Coin3DProps> = ({
  finish = 'gold',
  labels = { heads: 'HEADS', tails: 'TAILS' },
  size = 230,
  onFlipComplete,
  isLocked = false,
}) => {
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [currentOutcome, setCurrentOutcome] = useState<CoinOutcome>('heads');
  const [flipCount, setFlipCount] = useState<number>(0);
  const [ariaAnnouncement, setAriaAnnouncement] = useState<string>('Ready to flip. Press space or tap coin.');

  const coinControls = useAnimation();
  const shadowControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  // Accumulate rotation so the coin always spins forward smoothly
  const currentRotY = useRef<number>(0);

  // Scoped touch tracking strictly for coin surface gestures
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const theme = COIN_THEMES[finish] || COIN_THEMES.gold;
  const thickness = 12; // 12px realistic coin depth
  const sliceCount = 10; // Number of Z-axis slices for edge thickness

  // Safe Haptic pulse
  const triggerHaptic = (pattern: number[]) => {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch {
      // Fail silently on iOS Safari and browsers without vibration hardware
    }
  };

  // Core trigger flip function
  const triggerFlip = useCallback(async () => {
    if (isFlipping || isLocked) return;

    setIsFlipping(true);
    setAriaAnnouncement('Coin in mid-air...');

    // Cryptographic randomness outcome
    const flipResult = generateCryptoFlip();
    const nextOutcome = flipResult.outcome;

    // Trigger Audio Launch
    soundEngine.playFlick();
    setTimeout(() => {
      soundEngine.playSpin();
    }, 120);

    const flightDuration = shouldReduceMotion ? 0.35 : 1.35; // seconds

    if (shouldReduceMotion) {
      // Reduced motion fallback: gentle scale & instantaneous settle
      await coinControls.start({
        opacity: [1, 0.45, 1],
        scale: [1, 1.04, 1],
        transition: { duration: flightDuration, ease: 'easeInOut' },
      });
      setCurrentOutcome(nextOutcome);
      soundEngine.playLanding();
      triggerHaptic([20, 35]);
      setIsFlipping(false);
      setFlipCount((prev) => prev + 1);
      const outcomeText = nextOutcome === 'heads' ? labels.heads : labels.tails;
      setAriaAnnouncement(`Coin landed on ${outcomeText}`);
      onFlipComplete?.(flipResult);
      return;
    }

    // Physical Flight Dynamics:
    const baseTurns = 4 + Math.floor(Math.random() * 3); // 4, 5, or 6 full turns
    const extraDegrees = nextOutcome === 'heads' ? 0 : 180;
    
    // Ensure final rotation ends up aligned to mod 360 for heads (0) or tails (180)
    const currentTurnCount = Math.ceil(currentRotY.current / 360);
    const targetY = (currentTurnCount + baseTurns) * 360 + extraDegrees;
    currentRotY.current = targetY;

    // Organic subtle random wobble on X and Z axis
    const wobbleX = (Math.random() * 14 - 7); // -7° to +7°
    const wobbleZ = (Math.random() * 10 - 5);

    // Schedule Landing Sound & Haptic right before touchdown
    const landingAudioTimer = setTimeout(() => {
      soundEngine.playLanding();
      triggerHaptic([15, 30, 20]);
    }, (flightDuration - 0.15) * 1000);

    // Simultaneous Coin Flight Animation:
    const coinAnimationPromise = coinControls.start({
      y: [0, -165, -170, 0, -14, 0, -4, 0],
      rotateY: [currentRotY.current - (baseTurns * 360 + extraDegrees), targetY],
      rotateX: [0, wobbleX, -wobbleX * 0.7, 0, wobbleX * 0.2, 0, 0, 0],
      rotateZ: [0, wobbleZ, -wobbleZ * 0.6, 0, wobbleZ * 0.2, 0, 0, 0],
      transition: {
        y: {
          duration: flightDuration,
          times: [0, 0.45, 0.52, 0.85, 0.91, 0.96, 0.98, 1],
          ease: 'easeInOut',
        },
        rotateY: {
          duration: flightDuration,
          ease: [0.22, 1, 0.36, 1],
        },
        rotateX: {
          duration: flightDuration,
          ease: 'easeInOut',
        },
        rotateZ: {
          duration: flightDuration,
          ease: 'easeInOut',
        },
      },
    });

    // Drop Shadow Animation:
    const shadowAnimationPromise = shadowControls.start({
      scale: [1, 0.54, 0.52, 1, 0.92, 1, 0.98, 1],
      opacity: [0.65, 0.2, 0.18, 0.68, 0.55, 0.68, 0.65, 0.65],
      filter: [
        'blur(5px)',
        'blur(20px)',
        'blur(22px)',
        'blur(5px)',
        'blur(7px)',
        'blur(5px)',
        'blur(5px)',
        'blur(5px)',
      ],
      transition: {
        duration: flightDuration,
        times: [0, 0.45, 0.52, 0.85, 0.91, 0.96, 0.98, 1],
        ease: 'easeInOut',
      },
    });

    await Promise.all([coinAnimationPromise, shadowAnimationPromise]);
    clearTimeout(landingAudioTimer);

    setCurrentOutcome(nextOutcome);
    setIsFlipping(false);
    setFlipCount((prev) => prev + 1);

    const outcomeText = nextOutcome === 'heads' ? labels.heads : labels.tails;
    setAriaAnnouncement(`Coin landed on ${outcomeText}`);

    onFlipComplete?.(flipResult);
  }, [isFlipping, isLocked, labels, coinControls, shadowControls, shouldReduceMotion, onFlipComplete]);

  // Spacebar Trigger (Strictly prevents default scroll only when not focused on an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const target = e.target as HTMLElement | null;
      
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable ||
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.tagName === 'SELECT';

      if (isInput) return;

      if (e.code === 'Space') {
        e.preventDefault(); // Stop page scrolling
        triggerFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerFlip]);

  // Touch Gesture handlers (Strictly attached to the coin hit zone, never capturing page scrolls)
  const handleCoinTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleCoinTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchEndY - touchStartY.current;
    const deltaX = touchEndX - touchStartX.current;
    const duration = Date.now() - touchStartTime.current;

    touchStartY.current = null;
    touchStartX.current = null;

    // Must be a deliberate upward flick:
    // 1. Swiped up at least 40px
    // 2. Vertical movement exceeds horizontal movement by 1.5x (not a diagonal/horizontal swipe)
    // 3. Fast flick (< 400ms) so slow downward reading scrolls are completely ignored
    if (deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5 && duration < 400) {
      triggerFlip();
    }
  };

  // Pre-generate edge rim slices along the Z-axis
  const edgeSlices = Array.from({ length: sliceCount }, (_, i) => {
    const zOffset = -thickness / 2 + (i * thickness) / (sliceCount - 1);
    return zOffset;
  });

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ minHeight: `${size + 50}px` }}
    >
      {/* Screen Reader Announcement Live Region */}
      <div className="sr-only" aria-live="polite">
        {ariaAnnouncement}
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="coin-perspective relative flex items-center justify-center cursor-pointer group"
        onClick={triggerFlip}
        onTouchStart={handleCoinTouchStart}
        onTouchEnd={handleCoinTouchEnd}
        role="button"
        tabIndex={0}
        aria-label={`Interactive 3D Coin. Currently showing ${currentOutcome}. Click, tap, or press space to flip.`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Animated 3D Coin Cylinder Body */}
        <motion.div
          animate={coinControls}
          className="coin-object relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
          whileHover={!isFlipping ? { scale: 1.025 } : undefined}
          whileTap={!isFlipping ? { scale: 0.975 } : undefined}
        >
          {/* Front Face: Heads */}
          <div
            className="coin-face coin-frontface absolute inset-0 w-full h-full rounded-full shadow-2xl"
            style={{
              transform: `translateZ(${thickness / 2}px)`,
            }}
          >
            <CoinArtwork
              side="heads"
              theme={theme}
              label={labels.heads}
              subLabel={labels.headsSub}
              size={size}
            />
          </div>

          {/* Realistic Reeded Rim (Layered Z-axis Slices) */}
          {edgeSlices.map((zOffset, idx) => (
            <div
              key={idx}
              className="reeded-rim-slice absolute inset-0 w-full h-full rounded-full pointer-events-none"
              style={{
                transform: `translateZ(${zOffset}px)`,
                backgroundColor: theme.edgeSliceColor,
                borderColor: theme.rimColor,
                opacity: idx === 0 || idx === sliceCount - 1 ? 0.35 : 0.85,
              }}
            />
          ))}

          {/* Back Face: Tails */}
          <div
            className="coin-face coin-backface absolute inset-0 w-full h-full rounded-full shadow-2xl"
            style={{
              transform: `rotateY(180deg) translateZ(${thickness / 2}px)`,
            }}
          >
            <CoinArtwork
              side="tails"
              theme={theme}
              label={labels.tails}
              subLabel={labels.tailsSub}
              size={size}
            />
          </div>
        </motion.div>
      </div>

      {/* Dynamic Ground Contact Shadow */}
      <div
        className="relative flex items-center justify-center pointer-events-none -mt-2"
        style={{ width: `${size * 0.85}px`, height: '20px' }}
      >
        <motion.div
          animate={shadowControls}
          className="w-full h-full rounded-full bg-black/70"
          style={{
            filter: 'blur(5px)',
          }}
        />
      </div>

      {/* Micro gesture and keyboard hints */}
      <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#a6a095] tracking-wider uppercase transition-opacity duration-200">
        <span className="hidden sm:inline">Tap coin or press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/90 font-semibold text-[10px]">Space</kbd></span>
        <span className="sm:hidden">Tap coin or flick up ↑</span>
      </div>
    </div>
  );
};
