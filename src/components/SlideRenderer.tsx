import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PROJECT_META, SlideData, TEAM_MEMBERS } from '../data/projectData';
import { BrandMark, DiagonalArrow } from './Icons';

interface SlideRendererProps {
  slide: SlideData;
  onJumpToReport?: (chapterId: string) => void;
}

const ACCENT_MAP = {
  vermilion: '#0F6E6E',
  pine: '#D46A3C',
  brass: '#3A5F7D',
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, onJumpToReport }) => {
  const accent = ACCENT_MAP[slide.accent ?? 'vermilion'];

  const triggerApplause = () => {
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#0F6E6E', '#2FB5B0', '#D46A3C', '#EEF3F2'],
    });
  };

  return (
    <motion.div
      key={slide.id}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[var(--bg-elevated)] text-[var(--text-primary)] overflow-y-auto select-none"
    >
      {/* Top Slide Header Strip */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-3 shrink-0"
      >
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {slide.kicker}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {slide.relatedChapterId && onJumpToReport && (
            <button
              type="button"
              onClick={() => onJumpToReport(slide.relatedChapterId!)}
              className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-[var(--border-hairline)] hover:border-[var(--accent-vermilion)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <span>Report Ref</span>
              <DiagonalArrow className="w-3 h-3" />
            </button>
          )}
          <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[var(--bg-stone)] text-[var(--text-primary)]">
            SLIDE {slide.number}
          </span>
        </div>
      </motion.div>

      {/* Main Slide Body by Layout */}
      <div className="flex-1 flex flex-col justify-center py-4 sm:py-5 min-h-0">
        {slide.layout === 'cover' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5">
                <BrandMark className="w-8 h-8" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-vermilion)]">
                  {PROJECT_META.portalName} · Software Engineering Project
                </span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.98]"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2"
              >
                {TEAM_MEMBERS.map((member) => (
                  <div
                    key={member.id}
                    className="px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
                  >
                    <div className="font-semibold text-xs">{member.name}</div>
                    <div className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
                      {member.rollNo}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-3">
              {slide.stats?.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-baseline justify-between gap-4"
                >
                  <span className="font-serif text-4xl font-medium" style={{ color: accent }}>
                    {stat.value}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-right text-[var(--text-muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {slide.layout === 'statement' && (
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="max-w-3xl space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl font-medium leading-tight">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-sm sm:text-lg text-[var(--text-muted)]">{slide.subtitle}</p>
              )}
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {slide.bullets?.map((b, i) => (
                <motion.div
                  key={b.label}
                  variants={itemVariants}
                  className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-semibold" style={{ color: accent }}>
                      0{i + 1} //
                    </span>
                    <h3 className="font-semibold text-base sm:text-lg">{b.label}</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                      {b.detail}
                    </p>
                  </div>
                  <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accent }} />
                </motion.div>
              ))}
            </div>
            {slide.stats && slide.stats.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-stone)] flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <span className="font-mono text-xs font-semibold" style={{ color: accent }}>
                    REAL EXAMPLE · {slide.stats[0].label}
                  </span>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{slide.stats[0].delta}</p>
                </div>
                <span className="font-serif text-2xl font-medium">{slide.stats[0].value}</span>
              </motion.div>
            )}
          </div>
        )}

        {slide.layout === 'split-visual' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            <div className={`${slide.stats ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              <motion.div variants={itemVariants} className="space-y-1.5">
                <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-sm text-[var(--text-muted)]">{slide.subtitle}</p>
                )}
              </motion.div>
              <div
                className={`grid gap-3 ${
                  slide.stats ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {slide.bullets?.map((b, idx) => (
                  <motion.div
                    key={b.label}
                    variants={itemVariants}
                    className="p-4 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex gap-3 items-start"
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: accent }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{b.label}</p>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 leading-relaxed">
                        {b.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {slide.stats && (
              <div className="lg:col-span-5 grid grid-cols-1 gap-3">
                {slide.stats.map((s) => (
                  <motion.div
                    key={s.label}
                    variants={itemVariants}
                    className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="font-serif text-4xl sm:text-5xl font-medium"
                        style={{ color: accent }}
                      >
                        {s.value}
                      </span>
                      {s.delta && (
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-muted)]">
                          {s.delta}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mt-2">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {slide.layout === 'architecture' && (
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-1.5 max-w-3xl">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium">{slide.title}</h2>
              <p className="text-sm text-[var(--text-muted)]">{slide.subtitle}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
              {slide.architectureNodes?.map((node, idx) => (
                <motion.div
                  key={node.tier}
                  variants={itemVariants}
                  className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex flex-col justify-between gap-4 relative"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: accent }}
                      >
                        {node.tier}
                      </span>
                      <span className="w-6 h-6 rounded-md bg-[var(--bg-stone)] flex items-center justify-center font-mono text-[10px] text-[var(--text-muted)]">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base mb-1.5">{node.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{node.spec}</p>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                      Proof / Layer
                    </span>
                    <span className="font-mono text-xs font-semibold" style={{ color: accent }}>
                      {node.latency}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {slide.layout === 'metrics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <motion.div variants={itemVariants} className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-4xl font-medium">{slide.title}</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">{slide.subtitle}</p>
              </motion.div>

              <div className="space-y-3.5">
                {slide.chartData?.map((row) => {
                  const pct = Math.min(100, (row.value / row.max) * 100);
                  return (
                    <motion.div key={row.label} variants={itemVariants} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span>{row.label}</span>
                        <span className="font-semibold" style={{ color: accent }}>
                          {row.value}
                          {row.unit}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-[var(--bg-stone)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.75, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              {slide.stats?.map((s) => (
                <motion.div
                  key={s.label}
                  variants={itemVariants}
                  className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
                >
                  <span className="font-serif text-3xl sm:text-4xl font-medium" style={{ color: accent }}>
                    {s.value}
                  </span>
                  <p className="font-semibold text-sm mt-1">{s.label}</p>
                  {s.delta && (
                    <p className="font-mono text-xs text-[var(--text-muted)] mt-1">{s.delta}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {slide.layout === 'comparison' && (
          <div className="space-y-5">
            <motion.div variants={itemVariants} className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium">{slide.title}</h2>
              <p className="text-sm text-[var(--text-muted)]">{slide.subtitle}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="rounded-lg border border-[var(--border-hairline)] overflow-x-auto overflow-hidden"
            >
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[var(--bg-stone)] font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3 border-b border-[var(--border-hairline)]">Feature</th>
                    <th className="p-3 border-b border-[var(--border-hairline)] text-[var(--text-muted)]">
                      What It Does
                    </th>
                    <th
                      className="p-3 border-b border-[var(--border-hairline)]"
                      style={{ color: accent }}
                    >
                      Implementation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {slide.comparisonRows?.map((r) => (
                    <tr
                      key={r.dimension}
                      className="border-b border-[var(--border-hairline)] last:border-b-0 bg-[var(--bg-canvas)]"
                    >
                      <td className="p-3 font-semibold">{r.dimension}</td>
                      <td className="p-3 text-[var(--text-muted)]">{r.legacy}</td>
                      <td className="p-3 font-mono text-xs font-medium">{r.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        )}

        {slide.layout === 'catalogue' && (
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <motion.div variants={itemVariants} className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-4xl font-medium">{slide.title}</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">{slide.subtitle}</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                {slide.stats?.map((s) => (
                  <div
                    key={s.label}
                    className="px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs"
                  >
                    <span className="font-serif text-lg font-medium mr-1.5" style={{ color: accent }}>
                      {s.value}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
            >
              {slide.catalogueItems?.map((item) => (
                <div
                  key={item.repo}
                  className={`px-3 py-2 rounded-md border flex items-center justify-between gap-2 text-xs ${
                    item.active
                      ? 'border-[var(--accent-pine)] bg-[var(--accent-pine)]/10'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-semibold truncate">
                      {item.repo}
                      {item.active && (
                        <span className="ml-1.5 font-mono text-[9px] uppercase text-[var(--accent-pine)]">
                          ● Reviving
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--text-muted)]">
                      {item.license}
                    </div>
                  </div>
                  <span
                    className="font-mono text-xs font-semibold shrink-0"
                    style={{ color: item.score >= 75 ? accent : 'var(--text-primary)' }}
                  >
                    {item.score}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {slide.layout === 'roadmap' && (
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-1">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium">{slide.title}</h2>
              <p className="text-sm text-[var(--text-muted)]">{slide.subtitle}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {slide.roadmapPhases?.map((p) => (
                <motion.div
                  key={p.phase}
                  variants={itemVariants}
                  className="p-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold" style={{ color: accent }}>
                        {p.phase}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-md border border-[var(--accent-vermilion)] text-[var(--accent-vermilion)]">
                        {p.status}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[var(--text-muted)]">{p.window}</p>
                    <p className="text-xs sm:text-sm leading-relaxed">{p.milestone}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {slide.layout === 'qa' && (
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div variants={itemVariants} className="inline-flex justify-center">
              <BrandMark className="w-12 h-12" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="font-serif text-4xl sm:text-6xl font-medium">
              {slide.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-lg text-[var(--text-muted)]">
              {slide.subtitle}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 pt-2 max-w-xl mx-auto"
            >
              {slide.stats?.map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
                >
                  <div className="font-serif text-3xl font-medium" style={{ color: accent }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
            {slide.links && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-3 pt-1"
              >
                {slide.links.map((lk) => (
                  <a
                    key={lk.url}
                    href={lk.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent-vermilion)] font-mono text-xs transition-colors"
                  >
                    <span>{lk.label}</span>
                    <DiagonalArrow className="w-3.5 h-3.5" />
                  </a>
                ))}
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={triggerApplause}
                className="font-mono text-xs uppercase tracking-widest px-6 py-2.5 rounded-md border border-[var(--accent-vermilion)] text-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] hover:text-white transition-colors"
              >
                Conclude Presentation ✦
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Slide Running Footer */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] border-t border-[var(--border-hairline)] pt-3 shrink-0"
      >
        <span>TEAM ROCKET // DIGITAL GRAVEYARD</span>
        <span>HARSHITA · PARTH · LAKSHAY · ARSHDEEP</span>
      </motion.div>
    </motion.div>
  );
};
