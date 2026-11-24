import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PROJECT_META,
  REPORT_CHAPTERS,
  SLIDES,
  TEAM_MEMBERS,
} from '../data/projectData';
import {
  DiagonalArrow,
  FolioIcon,
  ImportDeckIcon,
  StageIcon,
  StepArrow,
} from '../components/Icons';

interface LandingPageProps {
  isDark: boolean;
}

const THREE_QUESTIONS = [
  {
    index: '01',
    question: 'Am I allowed to continue it?',
    resolution: 'Verified Open-Source License',
    detail:
      'Automated screening via the GitHub API admits only abandoned repositories with permissive or copyleft open licenses (MIT, Apache-2.0, GPL-3.0).',
  },
  {
    index: '02',
    question: 'Why did the project die?',
    resolution: 'Automated Commit Autopsy',
    detail:
      'Lifetime commits, contributor drop-off, and issue backlog compile into diagnoseDecline() and a 0–100 Revival Score weighted by freshness.',
  },
  {
    index: '03',
    question: 'Will anyone know it was me?',
    resolution: 'Git-Commit Proof of Work',
    detail:
      'Revivals are verified via GitHub Compare API—credit is granted strictly for real, new commits authored after claiming the grave.',
  },
];

const SYSTEM_SPECS = [
  { label: 'Live Platform', value: 'digitalgraveyard.cv', href: PROJECT_META.liveSiteUrl },
  {
    label: 'Source Code',
    value: 'Harshita445/digital_graveyard_swe',
    href: PROJECT_META.repoUrl,
  },
  { label: 'Frontend & API', value: 'Next.js 14 · React 18 · GraphQL Yoga' },
  { label: 'Data & Auth', value: 'PostgreSQL (Neon) · Prisma ORM · GitHub OAuth' },
  { label: 'Catalogue Scale', value: '22 Archived Repos · 16 MIT · 3 Apache · 3 GPL' },
  { label: 'Verification', value: '39 / 39 Automated Checks Passing · Zero ESLint Warnings' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ isDark }) => {
  return (
    <div className="relative">
      {/* CLEAN EDITORIAL HERO SECTION */}
      <section className="relative border-b border-[var(--border-hairline)] overflow-hidden">
        {/* Subtle ambient gradient glow (clean, non-distracting) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(47, 181, 176, 0.12), transparent 70%)'
              : 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(15, 110, 110, 0.08), transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto space-y-7"
          >
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-vermilion)]">
              <span>{PROJECT_META.portalName}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)]">{PROJECT_META.institution}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.25rem] font-medium leading-[0.98] tracking-tight">
              Digital Graveyard — giving abandoned code a{' '}
              <span className="italic text-[var(--accent-pine)]">verified</span> second life.
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              {PROJECT_META.subtitle}
            </p>

            {/* Primary Action Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <NavLink
                to="/present"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[var(--accent-vermilion)] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <StageIcon className="w-4 h-4" />
                <span>Present {SLIDES.length}-Slide Deck</span>
                <DiagonalArrow className="w-3.5 h-3.5" />
              </NavLink>

              <NavLink
                to="/report"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--text-primary)] transition-colors font-semibold text-sm"
              >
                <FolioIcon className="w-4 h-4" />
                <span>Read Project Report</span>
              </NavLink>

              <a
                href={PROJECT_META.pptxDownloadUrl}
                download="Digital_Graveyard_Final_Demo.pptx"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--accent-vermilion)] transition-colors font-mono text-xs"
              >
                <ImportDeckIcon className="w-4 h-4" />
                <span>Download .pptx</span>
              </a>
            </div>
          </motion.div>

          {/* Clean 4-Metric Typographic Ledger */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-16 pt-10 border-t border-[var(--border-hairline)] grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-medium">22</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1.5">
                Open-Licensed Graves
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-medium text-[var(--accent-vermilion)]">
                39 / 39
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1.5">
                Automated Checks
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-medium text-[var(--accent-pine)]">
                0–100
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1.5">
                Revival Score Engine
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-medium">04</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1.5">
                Team Rocket Engineers
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 01: THE PROBLEM & THREE CORE QUESTIONS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-vermilion)]">
              Core Thesis
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium leading-tight">
              Good projects die quietly. We answer the three questions that stop revivals.
            </h2>
          </div>
          <p className="lg:col-span-6 text-base text-[var(--text-muted)] leading-relaxed">
            Maintainers burn out or move on, leaving popular repositories like{' '}
            <span className="font-mono text-[var(--text-primary)]">atom/atom</span> (60,682 ★, MIT)
            and <span className="font-mono text-[var(--text-primary)]">adobe/brackets</span> (33k
            ★, MIT) frozen. Digital Graveyard replaces guesswork with verifiable Git and license
            proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_QUESTIONS.map((item) => (
            <div
              key={item.index}
              className="p-6 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--accent-vermilion)] font-semibold">{item.index}</span>
                  <span className="text-[var(--text-muted)]">{item.resolution}</span>
                </div>
                <h3 className="font-serif text-2xl font-medium">{item.question}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 02: SYSTEM SPECIFICATION & LIVE LINKS */}
      <section className="border-y border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-pine)]">
              Production Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight">
              Built in one language, shipped on every push to main.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {PROJECT_META.abstract}
            </p>
            <div className="pt-2">
              <a
                href={PROJECT_META.liveSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent-vermilion)] hover:underline"
              >
                <span>Visit digitalgraveyard.cv</span>
                <DiagonalArrow className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]">
            {SYSTEM_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  {spec.label}
                </span>
                {spec.href ? (
                  <a
                    href={spec.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm font-medium text-[var(--accent-vermilion)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{spec.value}</span>
                    <DiagonalArrow className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
                    {spec.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: CLEAN PORTAL DIRECTORY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-6">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Portal Directory
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {TEAM_MEMBERS.length} Engineers · {SLIDES.length} Slides · {REPORT_CHAPTERS.length}{' '}
            Chapters
          </span>
        </div>

        <div className="divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]">
          <NavLink
            to="/present"
            className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:px-3 transition-all"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-[var(--accent-vermilion)]">
                01 // PRESENTATION STAGE
              </div>
              <h3 className="font-serif text-3xl font-medium group-hover:text-[var(--accent-vermilion)] transition-colors">
                Digital Graveyard Final Demo ({SLIDES.length} Slides)
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Original PowerPoint slides rendered intact on canvas with speaker notes, timer, and
                fullscreen presenter mode.
              </p>
            </div>
            <StepArrow className="w-5 h-5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-vermilion)] group-hover:translate-x-1 transition-all" />
          </NavLink>

          <NavLink
            to="/report"
            className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:px-3 transition-all"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-[var(--accent-pine)]">
                02 // TECHNICAL REPORT
              </div>
              <h3 className="font-serif text-3xl font-medium group-hover:text-[var(--accent-vermilion)] transition-colors">
                Software Engineering Report ({REPORT_CHAPTERS.length} Chapters)
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Architecture, Revival Score formulation, autopsy diagnostics, 39/39 test verification,
                and Print-to-PDF export.
              </p>
            </div>
            <StepArrow className="w-5 h-5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-vermilion)] group-hover:translate-x-1 transition-all" />
          </NavLink>

          <NavLink
            to="/team"
            className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:px-3 transition-all"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-[var(--text-muted)]">03 // TEAM ROCKET</div>
              <h3 className="font-serif text-3xl font-medium group-hover:text-[var(--accent-vermilion)] transition-colors">
                Harshita · Parth Garg · Lakshay Jain · Arshdeep Kaur
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Inspect roll numbers, GitHub profiles, and individual project dossiers.
              </p>
            </div>
            <StepArrow className="w-5 h-5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-vermilion)] group-hover:translate-x-1 transition-all" />
          </NavLink>
        </div>
      </section>
    </div>
  );
};
