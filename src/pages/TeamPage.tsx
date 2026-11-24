import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { REPORT_CHAPTERS, TEAM_MEMBERS, TeamMember } from '../data/projectData';
import { GenerativePortrait } from '../components/GenerativePortrait';
import { DiagonalArrow } from '../components/Icons';

export const TeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <header className="border-b border-[var(--border-hairline)] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-vermilion)]">
            03 // Team Rocket · 04 Contributors
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium leading-[1.0]">
            The Team Behind Digital Graveyard.
          </h1>
          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            Every layer of Digital Graveyard—from legal license screening and GitHub commit
            autopsies to PostgreSQL schema safety and 39/39 automated checks—was engineered by Team
            Rocket. Select any member dossier to inspect their roll number, GitHub, chapters, and
            slides.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card px-5 py-3.5 shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            Team Rocket
          </div>
          <div className="font-serif text-3xl font-medium mt-1">
            04 <span className="text-base font-sans text-[var(--text-muted)]">Engineers</span>
          </div>
        </div>
      </header>

      {/* 4-Person Editorial Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEAM_MEMBERS.map((member, idx) => (
          <motion.article
            key={member.id}
            layoutId={`member-card-${member.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            onClick={() => setSelected(member)}
            className="cursor-pointer group rounded-lg overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card hover:border-[var(--text-primary)] transition-colors flex flex-col justify-between"
          >
            <div>
              <GenerativePortrait
                name={member.name}
                accentColor={member.accentColor}
                seed={member.patternSeed}
                photo={member.photo}
                className="w-full h-64"
              />

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: member.accentColor }}
                  >
                    ROLL NO // {member.rollNo}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--bg-stone)] text-[var(--text-muted)]">
                    {member.ledChapters.length} Ch · {member.ledSlides.length} Slides
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl font-medium group-hover:text-[var(--accent-vermilion)] transition-colors">
                    {member.name}
                  </h2>
                  <p className="font-mono text-xs text-[var(--text-muted)] mt-1">{member.role}</p>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  “{member.tagline}”
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.ownership.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
              <span>Inspect Dossier</span>
              <DiagonalArrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.article>
        ))}
      </section>

      {/* INTERACTIVE MEMBER DOSSIER MODAL (Clean dimmed scrim — no muddy blur) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-[#0B1517]/75 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              layoutId={`member-card-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <GenerativePortrait
                name={selected.name}
                accentColor={selected.accentColor}
                seed={selected.patternSeed}
                photo={selected.photo}
                className="w-full h-64 sm:h-72"
              />
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{ color: selected.accentColor }}
                    >
                      ROLL NO // {selected.rollNo} — {selected.discipline}
                    </span>
                    <h2 className="font-serif text-4xl font-medium mt-1">{selected.name}</h2>
                    <p className="font-mono text-xs text-[var(--text-muted)] mt-1">
                      {selected.role}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="font-mono text-xs px-3.5 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--text-primary)]"
                  >
                    Close
                  </button>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
                  {selected.bio}
                </p>

                {/* Skill Matrix */}
                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                    Technical Focus
                  </p>
                  {selected.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--bg-stone)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selected.accentColor }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Links to Owned Slides & Chapters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-hairline)]">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                      Led Report Chapters
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.ledChapters.map((chId) => {
                        const ch = REPORT_CHAPTERS.find((c) => c.id === chId);
                        return (
                          <button
                            key={chId}
                            type="button"
                            onClick={() => {
                              setSelected(null);
                              navigate(`/report#${chId}`);
                            }}
                            className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent-vermilion)]"
                          >
                            Ch {ch?.number}: {ch?.title.split(' ')[0]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                      Presenting Slides
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.ledSlides.map((sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            setSelected(null);
                            navigate(`/present?slide=${sIdx + 1}`);
                          }}
                          className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent-vermilion)]"
                        >
                          Slide {String(sIdx + 1).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[var(--border-hairline)] font-mono text-xs">
                  {selected.links.github && (
                    <a
                      href={selected.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--accent-vermilion)] hover:underline"
                    >
                      <span>GitHub Profile</span>
                      <DiagonalArrow className="w-3 h-3" />
                    </a>
                  )}
                  <a
                    href={selected.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--accent-vermilion)]"
                  >
                    <span>Digital Graveyard Repo</span>
                    <DiagonalArrow className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
