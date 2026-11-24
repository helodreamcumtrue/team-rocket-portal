import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECT_META, SLIDES } from '../data/projectData';
import { PptxCanvasViewer } from '../components/PptxCanvasViewer';
import {
  ChronoIcon,
  CueNotesIcon,
  FrameExpandIcon,
  ImportDeckIcon,
  MatrixGridIcon,
  ReticleIcon,
  StepArrow,
} from '../components/Icons';

type DeckMode = 'original' | 'external';

export const PresentationPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [slideCount, setSlideCount] = useState(SLIDES.length);

  const initialSlide = Math.min(
    Math.max(1, Number(searchParams.get('slide')) || 1),
    slideCount
  );

  const [currentIdx, setCurrentIdx] = useState(initialSlide - 1);
  const [showNotes, setShowNotes] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [laserEnabled, setLaserEnabled] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: -100, y: -100, visible: false });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Speaker Chronometer
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // External Deck Mode (Load another .pptx or .pdf or embed link)
  const [deckMode, setDeckMode] = useState<DeckMode>('original');
  const [customPptxFile, setCustomPptxFile] = useState<File | null>(null);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [embedInput, setEmbedInput] = useState('');
  const [activeEmbedUrl, setActiveEmbedUrl] = useState('');

  const stageRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const goToSlide = useCallback(
    (nextIdx: number) => {
      const clamped = Math.max(0, Math.min(slideCount - 1, nextIdx));
      setCurrentIdx(clamped);
      setSearchParams({ slide: String(clamped + 1) }, { replace: true });
    },
    [slideCount, setSearchParams]
  );

  const toggleFullscreen = useCallback(async () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      await stageRef.current.requestFullscreen().catch(() => { });
    } else {
      await document.exitFullscreen().catch(() => { });
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Speaker Timer tick
  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  // Keyboard shortcuts for presenter control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (deckMode === 'original' || customPptxFile) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          goToSlide(currentIdx + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToSlide(currentIdx - 1);
        } else if (e.key.toLowerCase() === 'g' && deckMode === 'original') {
          setShowGrid((v) => !v);
        } else if (e.key.toLowerCase() === 'n' && deckMode === 'original') {
          setShowNotes((v) => !v);
        }
      }

      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'l') {
        setLaserEnabled((v) => !v);
      } else if (e.key === 'Escape') {
        setShowGrid(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, customPptxFile, deckMode, goToSlide, toggleFullscreen]);

  // Cleanup object URL on unmount or replace
  useEffect(() => {
    return () => {
      if (uploadedPdfUrl) URL.revokeObjectURL(uploadedPdfUrl);
    };
  }, [uploadedPdfUrl]);

  const handleFileUpload = (file: File | undefined) => {
    if (!file) return;
    if (uploadedPdfUrl) URL.revokeObjectURL(uploadedPdfUrl);
    setUploadedPdfUrl(null);
    setActiveEmbedUrl('');

    if (file.name.toLowerCase().endsWith('.pptx')) {
      setCustomPptxFile(file);
      setUploadedFileName(file.name);
      setCurrentIdx(0);
      setDeckMode('external');
      return;
    }

    const url = URL.createObjectURL(file);
    setCustomPptxFile(null);
    setUploadedPdfUrl(url);
    setUploadedFileName(file.name);
    setDeckMode('external');
  };

  const handleApplyEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!embedInput.trim()) return;
    setActiveEmbedUrl(embedInput.trim());
    setCustomPptxFile(null);
    if (uploadedPdfUrl) {
      URL.revokeObjectURL(uploadedPdfUrl);
      setUploadedPdfUrl(null);
    }
    setDeckMode('external');
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentSlideMeta = SLIDES[currentIdx];
  const nextSlideMeta = SLIDES[currentIdx + 1];
  const progressPct = ((currentIdx + 1) / Math.max(1, slideCount)) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Top Presenter Control Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-vermilion)]">
            01 // Original PPTX Stage
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium mt-0.5">
            {PROJECT_META.projectTitle} — Presentation Deck
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Deck Source Toggle */}
          <div className="inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-1">
            <button
              type="button"
              onClick={() => {
                setDeckMode('original');
                setSlideCount(SLIDES.length);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs transition-colors ${deckMode === 'original'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-elevated)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
            >
              Original PPTX [{SLIDES.length}]
            </button>
            <button
              type="button"
              onClick={() => setDeckMode('external')}
              className={`px-3 py-1.5 rounded font-mono text-xs transition-colors inline-flex items-center gap-1.5 ${deckMode === 'external'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-elevated)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
            >
              <ImportDeckIcon className="w-3.5 h-3.5" />
              <span>Upload PPTX / PDF</span>
            </button>
          </div>

          {/* Chronometer */}
          <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-3 py-2 font-mono text-xs">
            <ChronoIcon className="w-3.5 h-3.5" />
            <span className="tabular-nums font-semibold">{formatTime(elapsedSec)}</span>
            <button
              type="button"
              onClick={() => setTimerRunning((r) => !r)}
              className="text-[var(--accent-vermilion)] hover:underline ml-1"
            >
              {timerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setElapsedSec(0);
              }}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Reset
            </button>
          </div>

          {/* Laser Pointer Toggle */}
          <button
            type="button"
            onClick={() => setLaserEnabled((v) => !v)}
            title="Toggle Laser Pointer (L)"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md border font-mono text-xs transition-colors ${laserEnabled
                ? 'border-[var(--accent-pine)] bg-[var(--accent-pine)] text-white'
                : 'border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--text-primary)]'
              }`}
          >
            <ReticleIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Laser</span>
          </button>

          {deckMode === 'original' && (
            <>
              <button
                type="button"
                onClick={() => setShowNotes((v) => !v)}
                title="Toggle Speaker Cues (N)"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md border font-mono text-xs transition-colors ${showNotes
                    ? 'border-[var(--text-primary)] bg-[var(--bg-stone)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-elevated)]'
                  }`}
              >
                <CueNotesIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cues</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGrid((v) => !v)}
                title="Slide Grid Overview (G)"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--text-primary)] font-mono text-xs transition-colors"
              >
                <MatrixGridIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={toggleFullscreen}
            title="Fullscreen Stage (F)"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[var(--text-primary)] text-[var(--bg-elevated)] font-mono text-xs hover:opacity-90 transition-opacity"
          >
            <FrameExpandIcon className="w-3.5 h-3.5" />
            <span>{isFullscreen ? 'Exit' : 'Present'}</span>
          </button>

          <a
            href={PROJECT_META.pptxDownloadUrl}
            download="Digital_Graveyard_Final_Demo.pptx"
            title="Download Original PowerPoint (.pptx)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--accent-vermilion)] font-mono text-xs transition-colors"
          >
            <ImportDeckIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">.pptx</span>
          </a>
        </div>
      </div>

      {/* STAGE CONTAINER */}
      <div
        ref={stageRef}
        onMouseMove={(e) => {
          if (!laserEnabled || !stageRef.current) return;
          const rect = stageRef.current.getBoundingClientRect();
          setLaserPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            visible: true,
          });
        }}
        onMouseLeave={() => setLaserPos((p) => ({ ...p, visible: false }))}
        className={`relative border border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card overflow-hidden ${isFullscreen
            ? 'w-screen h-screen flex flex-col rounded-none'
            : 'aspect-[16/9] min-h-[420px] rounded-lg'
          } ${laserEnabled ? 'cursor-none' : ''}`}
      >
        {/* Laser Pointer Reticle */}
        {laserEnabled && laserPos.visible && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-1/2"
            style={{ left: laserPos.x, top: laserPos.y }}
          >
            <div className="w-4 h-4 rounded-full bg-[#D46A3C] shadow-[0_0_16px_5px_rgba(212,106,60,0.75)] ring-2 ring-white" />
          </div>
        )}

        {deckMode === 'original' ? (
          <div className="relative w-full h-full flex flex-col">
            {/* Progress hairline */}
            <div className="h-1 w-full bg-[var(--bg-stone)] shrink-0">
              <motion.div
                className="h-full bg-[var(--accent-vermilion)]"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {/* Untouched Original PPTX Rendered Directly on Canvas */}
            <div className="relative flex-1 min-h-0 overflow-hidden">
              <PptxCanvasViewer
                pptxUrl={PROJECT_META.pptxDownloadUrl}
                slideIndex={currentIdx}
                onLoaded={(count) => {
                  if (count > 0) setSlideCount(count);
                }}
              />
            </div>

            {/* Bottom Stage Navigation Overlay */}
            <div className="shrink-0 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-5 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToSlide(currentIdx - 1)}
                  disabled={currentIdx === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] font-mono text-xs disabled:opacity-30 hover:border-[var(--text-primary)] transition-colors"
                >
                  <StepArrow direction="left" className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(currentIdx + 1)}
                  disabled={currentIdx >= slideCount - 1}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] font-mono text-xs disabled:opacity-30 hover:border-[var(--text-primary)] transition-colors"
                >
                  <span>Next</span>
                  <StepArrow direction="right" className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="hidden md:flex items-center gap-1.5">
                {Array.from({ length: slideCount }, (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${idx === currentIdx
                        ? 'w-7 bg-[var(--accent-vermilion)]'
                        : 'w-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]'
                      }`}
                  />
                ))}
              </div>

              <div className="font-mono text-xs text-[var(--text-muted)]">
                <span className="text-[var(--text-primary)] font-semibold">
                  {String(currentIdx + 1).padStart(2, '0')}
                </span>{' '}
                / {String(slideCount).padStart(2, '0')}
              </div>
            </div>
          </div>
        ) : (
          /* EXTERNAL PPTX / PDF / CLOUD EMBED STAGE */
          <div className="w-full h-full flex flex-col">
            {customPptxFile ? (
              <div className="w-full h-full flex flex-col">
                <div className="px-5 py-2.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center justify-between text-xs font-mono">
                  <span>LOADED PPTX: {uploadedFileName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPptxFile(null);
                      setUploadedFileName('');
                      setSlideCount(SLIDES.length);
                    }}
                    className="text-[var(--accent-vermilion)] hover:underline"
                  >
                    Clear File
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <PptxCanvasViewer
                    pptxFile={customPptxFile}
                    slideIndex={currentIdx}
                    onLoaded={(count) => {
                      if (count > 0) setSlideCount(count);
                    }}
                  />
                </div>
                <div className="shrink-0 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-5 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToSlide(currentIdx - 1)}
                      disabled={currentIdx === 0}
                      className="px-3 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] font-mono text-xs disabled:opacity-30"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSlide(currentIdx + 1)}
                      disabled={currentIdx >= slideCount - 1}
                      className="px-3 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] font-mono text-xs disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {String(currentIdx + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ) : uploadedPdfUrl ? (
              <div className="w-full h-full flex flex-col">
                <div className="px-5 py-2.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center justify-between text-xs font-mono">
                  <span>LOADED DECK: {uploadedFileName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(uploadedPdfUrl);
                      setUploadedPdfUrl(null);
                      setUploadedFileName('');
                    }}
                    className="text-[var(--accent-vermilion)] hover:underline"
                  >
                    Clear File
                  </button>
                </div>
                <iframe
                  src={uploadedPdfUrl}
                  title="Uploaded Presentation PDF"
                  className="w-full flex-1 border-0 bg-white"
                />
              </div>
            ) : activeEmbedUrl ? (
              <div className="w-full h-full flex flex-col">
                <div className="px-5 py-2.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] flex items-center justify-between text-xs font-mono">
                  <span className="truncate max-w-md">EMBEDDED DECK: {activeEmbedUrl}</span>
                  <button
                    type="button"
                    onClick={() => setActiveEmbedUrl('')}
                    className="text-[var(--accent-vermilion)] hover:underline"
                  >
                    Change URL
                  </button>
                </div>
                <iframe
                  src={activeEmbedUrl}
                  title="Embedded External Presentation"
                  className="w-full flex-1 border-0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files?.[0]);
                }}
                className="w-full h-full flex items-center justify-center p-6 sm:p-10 bg-[var(--bg-canvas)]"
              >
                <div className="max-w-xl w-full rounded-lg border border-dashed border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card p-8 text-center space-y-6">
                  <div className="inline-flex p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
                    <ImportDeckIcon className="w-6 h-6 text-[var(--accent-vermilion)]" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-serif text-3xl font-medium">Load Another PPTX / PDF</h2>
                    <p className="text-sm text-[var(--text-muted)]">
                      Drop any <code>.pptx</code> or <code>.pdf</code> file here to present it
                      directly on stage, or paste a Google Slides / PowerPoint Online embed URL.
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-md bg-[var(--accent-vermilion)] text-white font-semibold text-xs tracking-wide hover:opacity-90 transition-opacity"
                  >
                    Select Local .pptx or .pdf
                  </button>

                  <form
                    onSubmit={handleApplyEmbed}
                    className="pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="url"
                      value={embedInput}
                      onChange={(e) => setEmbedInput(e.target.value)}
                      placeholder="https://docs.google.com/presentation/d/.../embed"
                      className="flex-1 px-3.5 py-2 rounded-md text-xs font-mono border border-[var(--border-hairline)] bg-[var(--bg-canvas)] focus:outline-none focus:border-[var(--accent-vermilion)]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md border border-[var(--text-primary)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--text-primary)] hover:text-[var(--bg-elevated)] transition-colors"
                    >
                      Load Embed
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SPEAKER NOTES & NEXT SLIDE CUE DRAWER */}
      {deckMode === 'original' && showNotes && currentSlideMeta && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] elevated-card p-6"
        >
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--accent-vermilion)]">
              <CueNotesIcon className="w-4 h-4" />
              <span>Speaker Notes — Slide {currentSlideMeta.number}</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed">{currentSlideMeta.speakerNotes}</p>
          </div>
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--border-hairline)] pt-4 lg:pt-0 lg:pl-5 space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
              Up Next
            </span>
            {nextSlideMeta ? (
              <button
                type="button"
                onClick={() => goToSlide(currentIdx + 1)}
                className="block text-left w-full p-3.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--accent-vermilion)] transition-colors"
              >
                <div className="font-mono text-[10px] text-[var(--accent-vermilion)]">
                  SLIDE {nextSlideMeta.number}
                </div>
                <div className="font-semibold text-sm truncate">{nextSlideMeta.title}</div>
              </button>
            ) : (
              <div className="p-3.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas)] font-mono text-xs text-[var(--text-muted)]">
                End of Deck · Q&amp;A Stage
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* SLIDE GRID OVERVIEW MODAL */}
      <AnimatePresence>
        {showGrid && deckMode === 'original' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B1517]/75 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setShowGrid(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[85vh] overflow-y-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] elevated-card p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-vermilion)]">
                    Slide Index
                  </span>
                  <h2 className="font-serif text-2xl font-medium">Jump to Any Slide</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGrid(false)}
                  className="font-mono text-xs px-3.5 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--text-primary)]"
                >
                  ESC // Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      goToSlide(idx);
                      setShowGrid(false);
                    }}
                    className={`text-left p-4 rounded-lg border transition-colors ${idx === currentIdx
                        ? 'border-[var(--accent-vermilion)] bg-[var(--bg-elevated)] elevated-card'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--text-primary)]'
                      }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] mb-1.5">
                      <span className="text-[var(--accent-vermilion)] font-semibold">
                        SLIDE {s.number}
                      </span>
                      <span className="uppercase">Original PPTX</span>

                    </div>
                    <div className="font-semibold text-sm line-clamp-1">{s.title}</div>
                    <div className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
                      {s.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
