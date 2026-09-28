'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Coin3D } from '../coin/Coin3D';
import { FlipControls } from './FlipControls';
import { FlipStatsTape } from './FlipStatsTape';
import { CoinFinish, CoinLabels, FlipHistoryItem, FlipResult } from '../../types/coin';
import { soundEngine } from '../../lib/sound';

interface CoinStageProps {
  initialLabels?: CoinLabels;
}

export const CoinStage: React.FC<CoinStageProps> = ({
  initialLabels = { heads: 'HEADS', tails: 'TAILS' },
}) => {
  const [finish, setFinish] = useState<CoinFinish>('gold');
  const [labels, setLabels] = useState<CoinLabels>(initialLabels);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [history, setHistory] = useState<FlipHistoryItem[]>([]);
  const [latestResult, setLatestResult] = useState<FlipResult | null>(null);

  const coinWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
  }, []);

  const handleToggleMute = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleFlipComplete = (result: FlipResult) => {
    setLatestResult(result);
    const label = result.outcome === 'heads' ? labels.heads : labels.tails;
    const historyItem: FlipHistoryItem = {
      id: `${result.timestamp}-${Math.random().toString(36).substring(2, 6)}`,
      outcome: result.outcome,
      label,
      timestamp: result.timestamp,
      durationMs: 1350,
      rotations: 5,
      hash: result.provenanceHash,
      entropySample: result.entropySample,
    };
    setHistory((prev) => [...prev, historyItem]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const triggerCoinFlipFromButton = () => {
    if (coinWrapperRef.current) {
      const coinElement = coinWrapperRef.current.querySelector('[role="button"]') as HTMLElement | null;
      if (coinElement) {
        coinElement.click();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Coin Stage (Thumb-optimized height) */}
      <div ref={coinWrapperRef} className="my-1 sm:my-2 flex flex-col items-center justify-center">
        <Coin3D
          finish={finish}
          labels={labels}
          size={215}
          onFlipComplete={handleFlipComplete}
        />
      </div>

      {/* Primary Action Button (Tactile, Thumb-Friendly, ≥48px target) */}
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={triggerCoinFlipFromButton}
          className="btn-tactile w-full sm:w-auto min-w-[210px] min-h-[50px] px-8 py-3.5 rounded-xl font-serif font-bold text-base tracking-wide bg-gradient-to-b from-[#f2d579] via-[#cda22b] to-[#9c7310] dark:from-[#f5dc83] dark:via-[#c59822] dark:to-[#91660d] text-[#332002] shadow-lg shadow-amber-900/20 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>FLIP COIN</span>
          <span className="hidden sm:inline text-xs font-mono font-normal opacity-75 px-1.5 py-0.5 rounded bg-black/15">
            SPACE
          </span>
        </button>
      </div>

      {/* Result Announcement (High-contrast, elegant serif) */}
      {latestResult && (
        <div className="mt-4 inline-flex flex-col items-center px-6 py-2 rounded-xl bg-amber-600/10 dark:bg-amber-950/25 border border-amber-600/25 dark:border-amber-500/30 transition-all animate-in fade-in zoom-in-95 duration-200">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400/90">
            Latest Landing
          </span>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-amber-900 dark:text-amber-200 uppercase mt-0.5">
            {latestResult.outcome === 'heads' ? labels.heads : labels.tails}
          </span>
          <span className="text-[10px] font-mono text-[#6c675e] dark:text-[#a6a095] mt-0.5">
            ID: {latestResult.provenanceHash.substring(0, 14)}
          </span>
        </div>
      )}

      {/* Finish & Custom Side Controls */}
      <FlipControls
        finish={finish}
        onFinishChange={setFinish}
        labels={labels}
        onLabelsChange={setLabels}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isCustomizing={isCustomizing}
        setIsCustomizing={setIsCustomizing}
      />

      {/* Live Session Statistics & Last 10 Flips Ribbon */}
      <FlipStatsTape
        history={history}
        onClearHistory={handleClearHistory}
        headsLabel={labels.heads}
        tailsLabel={labels.tails}
      />
    </div>
  );
};
