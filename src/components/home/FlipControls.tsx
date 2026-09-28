import React from 'react';
import { CoinFinish, CoinLabels } from '../../types/coin';
import { COIN_THEMES } from '../coin/CoinThemes';
import { IconVolume, IconVolumeMute } from '../icons/CustomIcons';

interface FlipControlsProps {
  finish: CoinFinish;
  onFinishChange: (finish: CoinFinish) => void;
  labels: CoinLabels;
  onLabelsChange: (labels: CoinLabels) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isCustomizing: boolean;
  setIsCustomizing: (val: boolean) => void;
}

export const FlipControls: React.FC<FlipControlsProps> = ({
  finish,
  onFinishChange,
  labels,
  onLabelsChange,
  isMuted,
  onToggleMute,
  isCustomizing,
  setIsCustomizing,
}) => {
  const finishes: CoinFinish[] = ['gold', 'silver', 'brass', 'bronze', 'obsidian'];

  const setPreset = (heads: string, tails: string) => {
    onLabelsChange({ heads, tails });
    setIsCustomizing(false);
  };

  const isHeadsTails = labels.heads === 'HEADS' && labels.tails === 'TAILS';
  const isYesNo = labels.heads === 'YES' && labels.tails === 'NO';
  const isChoice = labels.heads === 'OPTION A' && labels.tails === 'OPTION B';

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-5">
      {/* Finish & Sound Row */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/5">
        {/* Metal Finishes Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {finishes.map((f) => {
            const theme = COIN_THEMES[f];
            const isSelected = finish === f;
            return (
              <button
                key={f}
                onClick={() => onFinishChange(f)}
                className={`relative px-3 py-1.5 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-600/15 dark:bg-white/10 text-amber-900 dark:text-amber-300 ring-1 ring-amber-600/40 dark:ring-amber-500/40 font-semibold'
                    : 'text-[#6c675e] dark:text-[#a6a095] hover:text-[#18191c] dark:hover:text-[#f5f2eb] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title={theme.name}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-xs"
                  style={{ background: theme.baseGradient }}
                />
                <span>{theme.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Mute Audio Toggle */}
        <button
          onClick={onToggleMute}
          className={`p-2 rounded-lg border transition-colors shrink-0 ${
            isMuted
              ? 'bg-black/5 dark:bg-zinc-800/60 border-black/10 dark:border-zinc-700 text-[#857f73] dark:text-zinc-500 hover:text-[#18191c] dark:hover:text-zinc-300'
              : 'bg-amber-600/10 dark:bg-amber-950/20 border-amber-600/30 text-amber-800 dark:text-amber-300 hover:bg-amber-600/20'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <IconVolumeMute className="w-4 h-4" /> : <IconVolume className="w-4 h-4" />}
        </button>
      </div>

      {/* Decision Presets & Custom Labels */}
      <div className="pt-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#6c675e] dark:text-[#a6a095] mb-2">
          <span>COIN SIDES</span>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline underline-offset-4 text-[11px]"
          >
            {isCustomizing ? 'Done' : 'Custom Labels...'}
          </button>
        </div>

        {!isCustomizing ? (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPreset('HEADS', 'TAILS')}
              className={`py-2 px-3 text-xs font-mono rounded-lg border transition-all text-center ${
                isHeadsTails
                  ? 'bg-amber-600/15 dark:bg-amber-950/30 border-amber-600/40 dark:border-amber-500/50 text-amber-900 dark:text-amber-200 font-semibold'
                  : 'bg-black/5 dark:bg-zinc-900/60 border-black/10 dark:border-white/5 text-[#6c675e] dark:text-[#a6a095] hover:text-[#18191c] dark:hover:text-[#f5f2eb] hover:bg-black/10 dark:hover:bg-zinc-800/40'
              }`}
            >
              Heads / Tails
            </button>
            <button
              onClick={() => setPreset('YES', 'NO')}
              className={`py-2 px-3 text-xs font-mono rounded-lg border transition-all text-center ${
                isYesNo
                  ? 'bg-amber-600/15 dark:bg-amber-950/30 border-amber-600/40 dark:border-amber-500/50 text-amber-900 dark:text-amber-200 font-semibold'
                  : 'bg-black/5 dark:bg-zinc-900/60 border-black/10 dark:border-white/5 text-[#6c675e] dark:text-[#a6a095] hover:text-[#18191c] dark:hover:text-[#f5f2eb] hover:bg-black/10 dark:hover:bg-zinc-800/40'
              }`}
            >
              Yes / No
            </button>
            <button
              onClick={() => setPreset('OPTION A', 'OPTION B')}
              className={`py-2 px-3 text-xs font-mono rounded-lg border transition-all text-center ${
                isChoice
                  ? 'bg-amber-600/15 dark:bg-amber-950/30 border-amber-600/40 dark:border-amber-500/50 text-amber-900 dark:text-amber-200 font-semibold'
                  : 'bg-black/5 dark:bg-zinc-900/60 border-black/10 dark:border-white/5 text-[#6c675e] dark:text-[#a6a095] hover:text-[#18191c] dark:hover:text-[#f5f2eb] hover:bg-black/10 dark:hover:bg-zinc-800/40'
              }`}
            >
              Choice A / B
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-black/5 dark:bg-zinc-900/80 border border-amber-600/30 dark:border-amber-500/20">
            <div>
              <label className="block text-[10px] font-mono uppercase text-amber-800 dark:text-amber-400 mb-1">
                Heads Face
              </label>
              <input
                type="text"
                maxLength={12}
                value={labels.heads}
                onChange={(e) => onLabelsChange({ ...labels, heads: e.target.value.toUpperCase() })}
                placeholder="HEADS"
                className="w-full px-3 py-1.5 text-xs font-mono rounded bg-white dark:bg-zinc-950 border border-black/15 dark:border-zinc-700 text-[#18191c] dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#6c675e] dark:text-[#dedad2] mb-1">
                Tails Face
              </label>
              <input
                type="text"
                maxLength={12}
                value={labels.tails}
                onChange={(e) => onLabelsChange({ ...labels, tails: e.target.value.toUpperCase() })}
                placeholder="TAILS"
                className="w-full px-3 py-1.5 text-xs font-mono rounded bg-white dark:bg-zinc-950 border border-black/15 dark:border-zinc-700 text-[#18191c] dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
