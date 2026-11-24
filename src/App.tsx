import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { PresentationPage } from './pages/PresentationPage';
import { ReportPage } from './pages/ReportPage';
import { TeamPage } from './pages/TeamPage';

const PortalShell: React.FC<{ isDark: boolean; onToggleTheme: () => void }> = ({
  isDark,
  onToggleTheme,
}) => {
  const location = useLocation();

  // Initialize Lenis smooth scrolling on non-stage routes
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top when navigating between pages (unless hash anchor is present)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDark={isDark} onToggleTheme={onToggleTheme} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage isDark={isDark} />} />
              <Route path="/present" element={<PresentationPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="*" element={<LandingPage isDark={isDark} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aether-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('aether-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  return (
    <HashRouter>
      <PortalShell isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />
    </HashRouter>
  );
};

export default App;
