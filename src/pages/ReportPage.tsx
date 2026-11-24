import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  PROJECT_META,
  REFERENCES,
  REPORT_CHAPTERS,
  TEAM_MEMBERS,
} from '../data/projectData';
import { CopyGlyph, DiagonalArrow, PrintFolioIcon, StageIcon } from '../components/Icons';

const BIBTEX = `@techreport{digitalgraveyard2026,
  title   = {${PROJECT_META.fullTitle}},
  author  = {Harshita and Garg, Parth and Jain, Lakshay and Kaur, Arshdeep},
  year    = {2026},
  institution = {${PROJECT_META.institution} (Team Rocket)},
  url     = {${PROJECT_META.repoUrl}}
}`;

export const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const [activeId, setActiveId] = useState(REPORT_CHAPTERS[0].id);
  const [query, setQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );

    REPORT_CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const copyText = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const filteredChapters = REPORT_CHAPTERS.filter((ch) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.summary.toLowerCase().includes(q) ||
      ch.paragraphs.some((p) => p.toLowerCase().includes(q))
    );
  });

  const totalReadTime = REPORT_CHAPTERS.reduce((acc, c) => acc + c.readingMinutes, 0);

  return (
    <div className="relative">
      {/* Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="no-print fixed top-0 left-0 right-0 h-[3px] bg-[var(--accent-vermilion)] origin-left z-50"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Monograph Header */}
        <header className="border-b border-[var(--border-hairline)] pb-8 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-vermilion)]">
              <span>02 // Technical Project Report</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)]">{totalReadTime} MIN READ</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-medium leading-[1.0]">
              {PROJECT_META.fullTitle}
            </h1>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              {PROJECT_META.abstract}
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => copyText('bibtex', BIBTEX)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--text-primary)] transition-colors font-mono text-xs uppercase tracking-wider"
            >
              <CopyGlyph className="w-4 h-4" />
              <span>{copiedKey === 'bibtex' ? 'Copied BibTeX!' : 'Copy BibTeX'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--text-primary)] text-[var(--bg-elevated)] hover:opacity-90 transition-opacity font-mono text-xs uppercase tracking-wider"
            >
              <PrintFolioIcon className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </header>

        {/* Main 2-Column Monograph Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky Table of Contents */}
          <aside className="no-print lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card p-5">
              <div>
                <label
                  htmlFor="report-search"
                  className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2"
                >
                  Filter Chapters
                </label>
                <input
                  id="report-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search architecture, p99..."
                  className="w-full px-3 py-2 rounded-md text-xs font-mono border border-[var(--border-hairline)] bg-[var(--bg-canvas)] focus:outline-none focus:border-[var(--accent-vermilion)]"
                />
              </div>

              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] pb-1">
                  Table of Contents
                </p>
                {REPORT_CHAPTERS.map((ch) => {
                  const isActive = activeId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() =>
                        document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-start gap-2.5 ${
                        isActive
                          ? 'bg-[var(--bg-stone)] font-semibold text-[var(--text-primary)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="font-mono text-[10px] mt-0.5 text-[var(--accent-vermilion)]">
                        {ch.number}
                      </span>
                      <span className="leading-snug">{ch.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)]">
                <button
                  type="button"
                  onClick={() => navigate('/present')}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-md bg-[var(--accent-vermilion)] text-white font-semibold text-xs tracking-wide hover:opacity-90 transition-opacity"
                >
                  <span>Open Slide Deck</span>
                  <StageIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Monograph Body */}
          <main className="print-full lg:col-span-8 xl:col-span-9 space-y-14">
            {filteredChapters.length === 0 && (
              <div className="p-8 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] font-mono text-sm text-[var(--text-muted)]">
                No chapters matched “{query}”. Clear the filter to inspect the full report.
              </div>
            )}

            {filteredChapters.map((chapter) => {
              const author = TEAM_MEMBERS.find((m) => m.id === chapter.leadAuthorId);
              return (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  className="scroll-mt-24 border-b border-[var(--border-hairline)] pb-12 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--text-primary)] text-[var(--bg-elevated)]">
                        CHAPTER {chapter.number}
                      </span>
                      {author && (
                        <button
                          type="button"
                          onClick={() => navigate('/team')}
                          className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-vermilion)] transition-colors"
                        >
                          Lead: {author.name}
                        </button>
                      )}
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        · {chapter.readingMinutes} min
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/present?slide=${chapter.relatedSlideIndex + 1}`)}
                      className="no-print inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--accent-vermilion)] transition-colors"
                    >
                      <span>View Slide {String(chapter.relatedSlideIndex + 1).padStart(2, '0')}</span>
                      <DiagonalArrow className="w-3 h-3" />
                    </button>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-medium">{chapter.title}</h2>

                  <p className="text-sm sm:text-base font-medium text-[var(--accent-vermilion)] rounded-lg bg-[var(--bg-stone)] p-4">
                    {chapter.summary}
                  </p>

                  <div className="space-y-4 text-sm sm:text-base leading-[1.85] text-[var(--text-primary)]/90">
                    {chapter.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {chapter.callout && (
                    <div
                      className={`p-5 rounded-lg border ${
                        chapter.callout.type === 'warning'
                          ? 'border-[var(--accent-pine)] bg-[var(--accent-pine)]/10'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-elevated)]'
                      }`}
                    >
                      <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent-pine)] mb-1">
                        {chapter.callout.title}
                      </div>
                      <p className="text-sm leading-relaxed">{chapter.callout.body}</p>
                    </div>
                  )}

                  {chapter.table && (
                    <div className="space-y-2 pt-2">
                      <p className="font-mono text-xs text-[var(--text-muted)]">
                        {chapter.table.caption}
                      </p>
                      <div className="rounded-lg border border-[var(--border-hairline)] overflow-x-auto overflow-hidden">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-[var(--bg-stone)] font-mono text-[11px] uppercase tracking-wider">
                              {chapter.table.headers.map((h) => (
                                <th
                                  key={h}
                                  className="p-3.5 border-b border-[var(--border-hairline)]"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {chapter.table.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="border-b border-[var(--border-hairline)] last:border-b-0 bg-[var(--bg-elevated)]"
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-3.5 ${cIdx === 0 ? 'font-medium' : 'font-mono text-xs'}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {chapter.codeBlock && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-xs text-[var(--text-muted)]">
                          {chapter.codeBlock.caption}
                        </p>
                        <button
                          type="button"
                          onClick={() => copyText(chapter.id, chapter.codeBlock!.code)}
                          className="no-print font-mono text-[11px] text-[var(--accent-vermilion)] hover:underline"
                        >
                          {copiedKey === chapter.id ? 'Copied!' : 'Copy Snippet'}
                        </button>
                      </div>
                      <pre className="p-5 rounded-lg bg-[#0B1517] text-[#EEF3F2] font-mono text-xs leading-relaxed overflow-x-auto border border-[var(--border-hairline)]">
                        <code>{chapter.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}
                </article>
              );
            })}

            {/* Academic References */}
            <section className="space-y-4 pt-2">
              <h2 className="font-serif text-3xl font-medium">References</h2>
              <ol className="space-y-3 list-decimal list-inside text-sm text-[var(--text-muted)]">
                {REFERENCES.map((ref) => (
                  <li key={ref.id} className="leading-relaxed">
                    {ref.citation}
                  </li>
                ))}
              </ol>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
