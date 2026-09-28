import React from 'react';
import { CoinOutcome, CoinThemeConfig } from '../../types/coin';

interface CoinArtworkProps {
  side: CoinOutcome;
  theme: CoinThemeConfig;
  label?: string;
  subLabel?: string;
  size?: number;
}

// Pre-computed fixed-precision dentils for hydration consistency
const DENTIL_COUNT = 60;
const PRECOMPUTED_DENTILS = Array.from({ length: DENTIL_COUNT }, (_, i) => {
  const angle = (i * 360) / DENTIL_COUNT;
  const rad = (angle * Math.PI) / 180;
  const cx = Number((120 + 109 * Math.cos(rad)).toFixed(2));
  const cy = Number((120 + 109 * Math.sin(rad)).toFixed(2));
  return { cx, cy, angle };
});

const PRECOMPUTED_SUN_RAYS = Array.from({ length: 16 }).map((_, i) => {
  const angle = (i * 360) / 16;
  const rad = (angle * Math.PI) / 180;
  return {
    x2: Number((50 + 44 * Math.cos(rad)).toFixed(2)),
    y2: Number((50 + 44 * Math.sin(rad)).toFixed(2)),
    strokeWidth: i % 2 === 0 ? '1.8' : '1',
    opacity: i % 2 === 0 ? '0.7' : '0.4',
  };
});

const PRECOMPUTED_TAILS_PETALS = Array.from({ length: 8 }).map((_, i) => {
  const rad = (i * Math.PI) / 4;
  return {
    cx: Number((50 + 16 * Math.cos(rad)).toFixed(2)),
    cy: Number((50 + 16 * Math.sin(rad)).toFixed(2)),
  };
});

export const CoinArtwork: React.FC<CoinArtworkProps> = ({
  side,
  theme,
  label,
  subLabel,
}) => {
  const isHeads = side === 'heads';
  const displayLabel = label || (isHeads ? 'HEADS' : 'TAILS');
  const displaySub = subLabel || (isHeads ? 'FORTUNA · EST. 2026' : 'EQUIPOISE · I');

  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden select-none"
      style={{
        background: theme.baseGradient,
        boxShadow: `inset 0 0 14px ${theme.rimColor}, 0 0 1px ${theme.rimColor}`,
      }}
    >
      {/* Outer Reeded Dentil Ring */}
      <svg
        viewBox="0 0 240 240"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: theme.reliefHighlight }}
      >
        <circle
          cx="120"
          cy="120"
          r="115"
          fill="none"
          stroke={theme.rimColor}
          strokeWidth="3.5"
          opacity="0.8"
        />
        <circle
          cx="120"
          cy="120"
          r="104"
          fill="none"
          stroke={theme.innerBorderColor}
          strokeWidth="1.5"
        />
        <circle
          cx="120"
          cy="120"
          r="101"
          fill="none"
          stroke={theme.rimColor}
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.7"
        />

        {/* Dentils dots around rim */}
        {PRECOMPUTED_DENTILS.map((d, idx) => (
          <circle
            key={idx}
            cx={d.cx}
            cy={d.cy}
            r="1.8"
            fill={theme.textColor}
            opacity="0.65"
          />
        ))}

        {/* Inner concentric ring */}
        <circle
          cx="120"
          cy="120"
          r="74"
          fill="none"
          stroke={theme.innerBorderColor}
          strokeWidth="1.5"
        />
        <circle
          cx="120"
          cy="120"
          r="71"
          fill="none"
          stroke={theme.rimColor}
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Arched text paths */}
        <defs>
          <path
            id={`topArc-${side}-${theme.id}`}
            d="M 32,120 A 88,88 0 0,1 208,120"
            fill="none"
          />
          <path
            id={`bottomArc-${side}-${theme.id}`}
            d="M 208,120 A 88,88 0 0,1 32,120"
            fill="none"
          />
        </defs>

        {/* Top Text (Curved) */}
        <text
          fill={theme.textColor}
          fontSize="13.5"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="700"
          letterSpacing="2.5"
          style={{ textShadow: theme.embossShadow }}
        >
          <textPath
            href={`#topArc-${side}-${theme.id}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {displayLabel}
          </textPath>
        </text>

        {/* Bottom Text (Curved) */}
        <text
          fill={theme.textColor}
          fontSize="9.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="600"
          letterSpacing="2"
          opacity="0.8"
          style={{ textShadow: theme.embossShadow }}
        >
          <textPath
            href={`#bottomArc-${side}-${theme.id}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {displaySub}
          </textPath>
        </text>
      </svg>

      {/* Central Relief Artwork */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ filter: theme.reliefHighlight }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-[110px] h-[110px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isHeads ? (
            /* HEADS ARTWORK: Sovereign Crowned Sunburst & Laurels */
            <g transform="translate(10, 10)">
              {/* Radiating Sun Rays */}
              {PRECOMPUTED_SUN_RAYS.map((ray, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={ray.x2}
                  y2={ray.y2}
                  stroke={theme.textColor}
                  strokeWidth={ray.strokeWidth}
                  opacity={ray.opacity}
                />
              ))}

              {/* Central Embossed Sun Disc */}
              <circle
                cx="50"
                cy="50"
                r="24"
                fill={theme.innerBorderColor}
                stroke={theme.textColor}
                strokeWidth="2"
              />

              {/* Noble Profile / Imperial Sun Face */}
              <circle cx="50" cy="50" r="19" stroke={theme.textColor} strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* Stylized Star / Sol Iconography */}
              <path
                d="M50 33 L54 44 L66 45 L57 53 L60 65 L50 59 L40 65 L43 53 L34 45 L46 44 Z"
                fill={theme.textColor}
                opacity="0.85"
              />

              {/* Laurel Wreath on Left and Right */}
              <path
                d="M24 64 C20 48 30 32 40 26 C36 34 35 46 42 54"
                stroke={theme.textColor}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
              <path
                d="M76 64 C80 48 70 32 60 26 C64 34 65 46 58 54"
                stroke={theme.textColor}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </g>
          ) : (
            /* TAILS ARTWORK: Sovereign Numeral I & Classical Wreath */
            <g transform="translate(10, 10)">
              {/* Guilloche Fine Interlocking Petals */}
              {PRECOMPUTED_TAILS_PETALS.map((petal, i) => (
                <circle
                  key={i}
                  cx={petal.cx}
                  cy={petal.cy}
                  r="20"
                  stroke={theme.textColor}
                  strokeWidth="0.8"
                  opacity="0.25"
                  fill="none"
                />
              ))}

              {/* Outer Classical Wreath */}
              <circle
                cx="50"
                cy="50"
                r="36"
                stroke={theme.textColor}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
                fill="none"
              />

              {/* Roman Numeral I in deep relief */}
              <g transform="translate(42, 28)">
                {/* Top serif bar */}
                <rect x="0" y="0" width="16" height="4.5" rx="1" fill={theme.textColor} />
                {/* Central column */}
                <rect x="5.5" y="4.5" width="5" height="34" fill={theme.textColor} />
                {/* Bottom serif bar */}
                <rect x="0" y="38.5" width="16" height="4.5" rx="1" fill={theme.textColor} />
              </g>

              {/* Star Ornaments Left & Right */}
              <polygon
                points="24,50 26,46 30,46 27,43 28,39 24,42 20,39 21,43 18,46 22,46"
                fill={theme.textColor}
                opacity="0.75"
              />
              <polygon
                points="76,50 78,46 82,46 79,43 80,39 76,42 72,39 73,43 70,46 74,46"
                fill={theme.textColor}
                opacity="0.75"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Dynamic Specular Highlights & Brushed Luster */}
      <div className="absolute inset-0 specular-sweep opacity-75" />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: `inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(0,0,0,0.65)`,
        }}
      />
    </div>
  );
};
