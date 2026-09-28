import React, { useState } from 'react';
import { FlipHistoryItem } from '../../types/coin';
import { IconHistory, IconRefresh, IconShieldFairness } from '../icons/CustomIcons';

interface FlipStatsTapeProps {
  history: FlipHistoryItem[];
  onClearHistory: () => void;
  headsLabel?: string;
  tailsLabel?: string;
}

export const FlipStatsTape: React.FC<FlipStatsTapeProps> = ({
  history,
  onClearHistory,
  headsLabel = 'HEADS',
  tailsLabel = 'TAILS',
}) => {
  const [selectedAudit, setSelectedAudit] = useState<FlipHistoryItem | null>(null);

  const total = history.length;
  const headsCount = history.filter((h) => h.outcome === 'heads').length;
  const tailsCount = total - headsCount;
  const headsPct = total > 0 ? ((headsCount / total) * 100).toFixed(1) : '50.0';
  const tailsPct = total > 0 ? ((tailsCount / total) * 100).toFixed(1) : '50.0';

  // Calculate current streak & longest streak
  let currentStreak = 0;
  let streakType: 'heads' | 'tails' | null = null;
  let maxStreak = 0;

  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    if (streakType === null) {
      streakType = item.outcome;
      currentStreak = 1;
    } else if (item.outcome === streakType) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate max streak across history
  let tempStreak = 0;
  let tempType: 'heads' | 'tails' | null = null;
  history.forEach((h) => {
    if (h.outcome === tempType) {
      tempStreak++;
    } else {
      tempType = h.outcome;
      tempStreak = 1;
    }
    if (tempStreak > maxStreak) {
      maxStreak = tempStreak;
    }
  });

  return (
    <section className="w-full max-w-3xl mx-auto px-4 mt-8">
      {/* Metrics Row (Zero-pill, high tabular contrast) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#1b1c21] border border-white/5 shadow-inner">
        <div>
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#a6a095]">Total Flips</span>
          <span className="text-2xl font-bold font-mono tracking-tight text-[#f5f2eb] tabular-nums">
            {total}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-mono uppercase tracking-wider text-amber-400/90">{headsLabel}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono tracking-tight text-[#f5f2eb] tabular-nums">
              {headsCount}
            </span>
            <span className="text-xs font-mono text-[#a6a095] tabular-nums">({headsPct}%)</span>
          </div>
        </div>

        <div>
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#dedad2]">{tailsLabel}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono tracking-tight text-[#f5f2eb] tabular-nums">
              {tailsCount}
            </span>
            <span className="text-xs font-mono text-[#a6a095] tabular-nums">({tailsPct}%)</span>
          </div>
        </div>

        <div>
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#a6a095]">Streak / Record</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono tracking-tight text-[#f5f2eb] tabular-nums">
              {currentStreak > 0 ? `${currentStreak}x` : '—'}
            </span>
            <span className="text-xs font-mono text-[#a6a095] tabular-nums">
              (max {maxStreak > 0 ? `${maxStreak}x` : '—'})
            </span>
          </div>
        </div>
      </div>

      {/* History Ribbon (Last 10 Flips) */}
      <div className="mt-4 p-4 rounded-xl bg-[#1b1c21]/70 border border-white/5">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wide text-[#dedad2]">
            <IconHistory className="w-3.5 h-3.5 text-[#a6a095]" />
            <span>SESSION TAPE (LAST {Math.min(history.length, 10)})</span>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 text-[11px] font-mono text-[#a6a095] hover:text-[#f5f2eb] transition-colors"
              title="Reset session count"
            >
              <IconRefresh className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-[#a6a095]">
            No flips recorded yet this session. Tap the coin or press Space to begin.
          </div>
        ) : (
          <div className="pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {history.slice(-10).reverse().map((item, idx) => {
              const isHeads = item.outcome === 'heads';
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedAudit(item)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-transform hover:scale-105 active:scale-95 ${
                    isHeads
                      ? 'bg-amber-950/20 border-amber-600/30 text-amber-200 hover:border-amber-500/50'
                      : 'bg-zinc-800/40 border-zinc-700 text-[#dedad2] hover:border-zinc-500'
                  }`}
                  title="Click to view entropy sample"
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isHeads ? 'bg-amber-500 text-amber-950' : 'bg-[#dedad2] text-zinc-900'
                    }`}
                  >
                    {isHeads ? 'H' : 'T'}
                  </span>
                  <span className="font-medium text-[11px] truncate max-w-[80px]">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#a6a095] opacity-75">
                    #{history.length - idx}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cryptographic Entropy Audit Modal (Accurate terminology: Entropy Audit, not "Provably Fair") */}
      {selectedAudit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setSelectedAudit(null)}
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl bg-[#1d1f25] border border-amber-500/20 text-[#f5f2eb] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <IconShieldFairness className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-amber-200">
                Randomness &amp; Entropy Audit
              </h3>
            </div>

            <div className="mt-4 space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#a6a095]">Outcome:</span>
                <span className="font-bold text-amber-300 uppercase">{selectedAudit.label} ({selectedAudit.outcome})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#a6a095]">Entropy (32-bit CSPRNG uint):</span>
                <span className="tabular-nums text-[#f5f2eb]">{selectedAudit.entropySample ?? 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#a6a095]">Audit Identifier:</span>
                <span className="text-amber-400/90 truncate max-w-[200px]" title={selectedAudit.hash}>
                  {selectedAudit.hash}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#a6a095]">Local Timestamp:</span>
                <span className="text-[#c8c4bc]">{new Date(selectedAudit.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#a6a095]">Flight Revolutions:</span>
                <span className="text-[#c8c4bc]">{selectedAudit.rotations} full turns</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-[#a6a095] leading-relaxed">
              This client-side flip sampled hardware entropy via <code className="text-amber-300">crypto.getRandomValues</code> without modulo bias. Server-verified multi-party commitment schemes are provided in the upcoming Shared Flip tool.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAudit(null)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-800 text-[#f5f2eb] hover:bg-zinc-700 transition-colors"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
