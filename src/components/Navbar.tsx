import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECT_META } from '../data/projectData';
import {
  BrandMark,
  CollectiveIcon,
  DiagonalArrow,
  FolioIcon,
  LuminanceIcon,
  StageIcon,
} from './Icons';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Overview' },
  { to: '/present', label: 'Presentation', icon: StageIcon },
  { to: '/report', label: 'Project Report', icon: FolioIcon },
  { to: '/team', label: 'Team (4)', icon: CollectiveIcon },
];

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const location = useLocation();

  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
          <BrandMark className="w-7 h-7 text-[var(--text-primary)] transition-transform duration-300 group-hover:rotate-6" />
          <div className="leading-none flex items-baseline gap-2.5">
            <span className="font-serif text-xl font-medium tracking-tight text-[var(--text-primary)]">
              {PROJECT_META.shortTitle}
            </span>
            <span className="hidden md:inline-block font-mono text-[11px] text-[var(--text-muted)]">
              {PROJECT_META.version}
            </span>
          </div>
        </NavLink>

        {/* Clean Underline / Subtle Pill Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 rounded-md ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 bg-[var(--bg-stone)] rounded-md -z-10"
                  />
                )}
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent-vermilion)] transition-colors text-[var(--text-primary)]"
          >
            <LuminanceIcon isDark={isDark} className="w-4 h-4" />
          </button>

          <NavLink
            to="/present"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold tracking-wide bg-[var(--accent-vermilion)] text-white hover:opacity-90 transition-opacity rounded-md"
          >
            <span>Present</span>
            <DiagonalArrow className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
