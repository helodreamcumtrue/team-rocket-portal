import React, { useState } from 'react';

interface GenerativePortraitProps {
  name: string;
  accentColor: string;
  seed: number;
  photo?: string;
  className?: string;
}

/**
 * Renders the teammate's uploaded photograph with clean editorial framing,
 * falling back to a bespoke geometric emblem if an image is unavailable.
 */
export const GenerativePortrait: React.FC<GenerativePortraitProps> = ({
  name,
  accentColor,
  seed,
  photo,
  className = 'w-full h-64',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (photo && !imgFailed) {
    return (
      <div
        className={`relative overflow-hidden bg-[var(--bg-stone)] border-b border-[var(--border-hairline)] ${className}`}
      >
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Subtle bottom edge fade & corner accent tag */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
        />
        <span
          className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full ring-2 ring-white/80"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    );
  }

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
        <path
          d={`M0 ${110 + (seed % 14)} Q 70 ${65 - waveOffset} 140 ${105} T 280 ${95 - (seed % 12)} L 280 160 L 0 160 Z`}
          fill={accentColor}
          fillOpacity="0.11"
        />
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
