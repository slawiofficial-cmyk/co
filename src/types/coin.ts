export type CoinFinish = 'gold' | 'silver' | 'brass' | 'bronze' | 'obsidian';

export type CoinOutcome = 'heads' | 'tails';

export interface FlipResult {
  outcome: CoinOutcome;
  entropySample: number;
  timestamp: number;
  provenanceHash: string;
}

export interface CoinThemeConfig {
  id: CoinFinish;
  name: string;
  metal: string;
  baseGradient: string;
  rimColor: string;
  innerBorderColor: string;
  textColor: string;
  embossShadow: string;
  reliefHighlight: string;
  edgeSliceColor: string;
  accentGlow: string;
}

export interface CoinLabels {
  heads: string;
  tails: string;
  headsSub?: string;
  tailsSub?: string;
}

export interface FlipHistoryItem {
  id: string;
  outcome: CoinOutcome;
  label: string;
  timestamp: number;
  durationMs: number;
  rotations: number;
  hash: string;
  entropySample?: number;
}
