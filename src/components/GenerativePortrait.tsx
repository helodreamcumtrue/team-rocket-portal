import React from 'react';

interface GenerativePortraitProps {
  name: string;
  accentColor: string;
  seed: number;
  className?: string;
}

/**
 * Fluid organic wave & circular orbital emblem for each team member.
 * Avoids boxy squares in favor of curved waves and circular medallions.
 */
export const GenerativePortrait: React.FC<GenerativePortraitProps> = ({
  name,
  accentColor,
  seed,
  className = 'w-full h-44',
}) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const rings = [1, 2, 3].map((idx) => {
    const r = 28 + idx * 13 + ((seed * idx) % 5);
    const dash = `${18 + ((seed + idx * 11) % 26)} ${10 + ((seed * 3 + idx) % 12)}`;
    return { r, dash, rotation: (seed * idx * 29) % 360 };
  });

  const waveOffset = (seed % 18) + 8;

  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-stone)] flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 280 160"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-label={`Architectural emblem for ${name}`}
      >
        {/* Soft flowing harmonic wave curves */}
        <path
          d={`M0 ${110 + (seed % 14)} Q 70 ${65 - waveOffset} 140 ${105} T 280 ${95 - (seed % 12)} L 280 160 L 0 160 Z`}
          fill={accentColor}
          fillOpacity="0.11"
        />
        <path
          d={`M0 ${125} Q 90 ${90 + waveOffset} 170 ${120} T 280 ${110}`}
          fill="none"
          stroke={accentColor}
          strokeOpacity="0.32"
          strokeWidth="1.4"
        />

        {/* Concentric orbital circles */}
        <g transform="translate(140, 80)">
          {rings.map((ring, idx) => (
            <circle
              key={idx}
              r={ring.r}
              fill="none"
              stroke={idx === 1 ? accentColor : 'currentColor'}
              strokeOpacity={idx === 1 ? 0.55 : 0.14}
              strokeWidth={idx === 1 ? 1.5 : 1}
              strokeDasharray={ring.dash}
              strokeLinecap="round"
              transform={`rotate(${ring.rotation})`}
            />
          ))}

          {/* Smooth circular medallion */}
          <circle
            cx="0"
            cy="0"
            r="27"
            fill="var(--bg-elevated)"
            stroke={accentColor}
            strokeWidth="1.8"
          />
          <circle cx="20" cy="-18" r="4.5" fill={accentColor} />
          <text
            x="0"
            y="7"
            textAnchor="middle"
            className="font-serif italic"
            fontSize="22"
            fill="currentColor"
          >
            {initials}
          </text>
        </g>
      </svg>
    </div>
  );
};
