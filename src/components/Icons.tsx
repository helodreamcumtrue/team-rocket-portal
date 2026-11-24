import React from 'react';

interface IconProps {
  className?: string;
}

/** Custom Circular Aperture Brand Glyph */
export const BrandMark: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="13.5" stroke="currentColor" strokeWidth="1.6" />
    <circle
      cx="16"
      cy="16"
      r="9.5"
      stroke="var(--accent-vermilion)"
      strokeOpacity="0.45"
      strokeWidth="1.2"
      strokeDasharray="4 3"
    />
    <path
      d="M10.5 21.5C12.5 13 14.2 10 16 10C17.8 10 19.5 13 21.5 21.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2 17.2C14.2 15.8 17.8 15.8 19.8 17.2"
      stroke="var(--accent-pine)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="16" cy="10" r="2" fill="var(--accent-vermilion)" />
  </svg>
);

/** Rounded Slide Stage / Presentation Icon */
export const StageIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect
      x="2.5"
      y="4"
      width="19"
      height="13"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 17V20.5M8.5 20.5H15.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M10.2 8.4C10.2 7.8 10.9 7.45 11.4 7.8L15 10.1C15.45 10.4 15.45 11.05 15 11.35L11.4 13.65C10.9 14 10.2 13.65 10.2 13.05V8.4Z"
      fill="var(--accent-pine)"
    />
  </svg>
);

/** Soft Rounded Monograph Folio Icon */
export const FolioIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6.5 3.5H14.2C14.9 3.5 15.5 3.75 16 4.2L18.3 6.5C18.75 7 19 7.6 19 8.3V18.5C19 19.88 17.88 21 16.5 21H6.5C5.12 21 4 19.88 4 18.5V6C4 4.62 5.12 3.5 6.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8 11.5H15M8 14.8H15M8 18H11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="9.2" cy="7.8" r="1.4" fill="var(--accent-pine)" />
  </svg>
);

/** Orbital Five-Node Team Collective Icon */
export const CollectiveIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="7.5"
      stroke="currentColor"
      strokeOpacity="0.28"
      strokeWidth="1.2"
      strokeDasharray="3 3"
    />
    <circle cx="12" cy="4.5" r="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="10" r="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="10" r="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7.5" cy="18.2" r="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16.5" cy="18.2" r="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.2" fill="var(--accent-pine)" />
  </svg>
);

/** Curved Directional Diagonal Arrow */
export const DiagonalArrow: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M5.5 14.5L14.5 5.5M14.5 5.5H8M14.5 5.5V12"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Rounded Step Arrow */
export const StepArrow: React.FC<IconProps & { direction?: 'left' | 'right' }> = ({
  className = 'w-4 h-4',
  direction = 'right',
}) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className={`${className} ${direction === 'left' ? 'rotate-180' : ''}`}
    aria-hidden="true"
  >
    <path
      d="M4.5 10H15.5M15.5 10L11 5.5M15.5 10L11 14.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Rounded Fullscreen Expand Frame */
export const FrameExpandIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M3.5 7.5V5.5C3.5 4.4 4.4 3.5 5.5 3.5H7.5M12.5 3.5H14.5C15.6 3.5 16.5 4.4 16.5 5.5V7.5M16.5 12.5V14.5C16.5 15.6 15.6 16.5 14.5 16.5H12.5M7.5 16.5H5.5C4.4 16.5 3.5 15.6 3.5 14.5V12.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Soft Rounded Pill Matrix Overview Icon */
export const MatrixGridIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <rect x="2.8" y="3" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11.2" y="3" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2.8" y="11" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14.2" cy="14" r="3" fill="var(--accent-pine)" fillOpacity="0.3" stroke="var(--accent-pine)" strokeWidth="1.5" />
  </svg>
);

/** Rounded Speaker Notes / Cue Icon */
export const CueNotesIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="3.5" width="14" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.5 11.5H16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M6.5 14H11.5" stroke="var(--accent-pine)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/** Orbital Laser Pointer / Reticle Icon */
export const ReticleIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3.5 2.5" />
    <circle cx="10" cy="10" r="2.6" fill="var(--accent-pine)" />
  </svg>
);

/** Rounded Upload / Deck Import Icon */
export const ImportDeckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M10 12.5V4M10 4L6.8 7.2M10 4L13.2 7.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 12.5V14.5C3.5 15.6 4.4 16.5 5.5 16.5H14.5C15.6 16.5 16.5 15.6 16.5 14.5V12.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/** Crescent / Sun Luminance Dial */
export const LuminanceIcon: React.FC<IconProps & { isDark: boolean }> = ({
  className = 'w-4 h-4',
  isDark,
}) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    {isDark ? (
      <path
        d="M15.8 12.3A6 6 0 0 1 7.7 4.2a6.2 6.2 0 1 0 8.1 8.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <>
        <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 2.5V4M10 16V17.5M2.5 10H4M16 10H17.5M4.7 4.7L5.8 5.8M14.2 14.2L15.3 15.3M15.3 4.7L14.2 5.8M5.8 14.2L4.7 15.3"
          stroke="var(--accent-pine)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

/** Rounded Print / Export Folio Icon */
export const PrintFolioIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M5.5 7V4.5C5.5 3.67 6.17 3 7 3H13C13.83 3 14.5 3.67 14.5 4.5V7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect x="2.5" y="7" width="15" height="7" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <rect
      x="5.5"
      y="11.5"
      width="9"
      height="5.5"
      rx="1.5"
      fill="var(--bg-elevated)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="14.2" cy="9.5" r="1" fill="var(--accent-pine)" />
  </svg>
);

/** Rounded Copy / Citation Glyph */
export const CopyGlyph: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <rect x="6.5" y="6.5" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13.5 6.5V5C13.5 4.17 12.83 3.5 12 3.5H5C4.17 3.5 3.5 4.17 3.5 5V12C3.5 12.83 4.17 13.5 5 13.5H6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/** Rounded Chronometer / Timer Glyph */
export const ChronoIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <circle cx="10" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8.2 2.5H11.8M10 11L12.8 8.2"
      stroke="var(--accent-pine)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
