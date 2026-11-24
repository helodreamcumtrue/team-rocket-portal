import React from 'react';
import { NavLink } from 'react-router-dom';
import { PROJECT_META } from '../data/projectData';
import { BrandMark, DiagonalArrow } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <BrandMark className="w-7 h-7" />
            <span className="font-serif text-2xl font-medium">{PROJECT_META.shortTitle}</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
            {PROJECT_META.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              GH-PAGES READY
            </span>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              {PROJECT_META.cohort}
            </span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            Portal Sections
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-[var(--accent-vermilion)] transition-colors">
                00 // Overview Landing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/present"
                className="hover:text-[var(--accent-vermilion)] transition-colors"
              >
                01 // Interactive PPT Stage
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/report"
                className="hover:text-[var(--accent-vermilion)] transition-colors"
              >
                02 // Technical Project Report
              </NavLink>
            </li>
            <li>
              <NavLink to="/team" className="hover:text-[var(--accent-vermilion)] transition-colors">
                03 // Team Rocket (4 Members)
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            Presenter Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[var(--text-muted)]">
            <div className="px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              <span className="text-[var(--text-primary)] font-semibold">← / →</span> Step Slides
            </div>
            <div className="px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              <span className="text-[var(--text-primary)] font-semibold">F</span> Fullscreen
            </div>
            <div className="px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              <span className="text-[var(--text-primary)] font-semibold">N</span> Speaker Cues
            </div>
            <div className="px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              <span className="text-[var(--text-primary)] font-semibold">L</span> Laser Pointer
            </div>
          </div>
          <a
            href={PROJECT_META.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-vermilion)] hover:underline pt-2 mr-4"
          >
            <span>digitalgraveyard.cv</span>
            <DiagonalArrow className="w-3.5 h-3.5" />
          </a>
          <a
            href={PROJECT_META.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-vermilion)] hover:underline pt-2"
          >
            <span>GitHub Repository</span>
            <DiagonalArrow className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--border-hairline)] py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)]">
        <span>{PROJECT_META.institution}</span>
        <span>Built for static deployment on GitHub Pages · No external backend required</span>
      </div>
    </footer>
  );
};
