import React, { useEffect, useRef, useState } from 'react';
import { PPTXViewer } from 'pptxviewjs';

interface PptxCanvasViewerProps {
  pptxUrl?: string;
  pptxFile?: File | null;
  slideIndex: number;
  onLoaded?: (slideCount: number) => void;
  onError?: (message: string) => void;
}

/**
 * Renders an untouched .pptx presentation file directly onto an HTML5 Canvas
 * using PptxViewJS—preserving original slides, charts, tables, and embedded images.
 */
export const PptxCanvasViewer: React.FC<PptxCanvasViewerProps> = ({
  pptxUrl,
  pptxFile,
  slideIndex,
  onLoaded,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewerRef = useRef<PPTXViewer | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the .pptx deck once per url/file change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    setStatus('loading');
    setIsLoaded(false);
    setErrorMsg('');

    const viewer = new PPTXViewer({
      canvas,
      slideSizeMode: 'fit',
      backgroundColor: '#FFFFFF',
    });
    viewerRef.current = viewer;

    const loadDeck = async () => {
      try {
        if (pptxFile) {
          await viewer.loadFile(pptxFile);
        } else if (pptxUrl) {
          await viewer.loadFromUrl(pptxUrl);
        } else {
          return;
        }
        if (cancelled) return;
        const count = viewer.getSlideCount();
        setIsLoaded(true);
        setStatus('ready');
        onLoaded?.(count);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Failed to load PowerPoint file.';
        setErrorMsg(msg);
        setStatus('error');
        onError?.(msg);
      }
    };

    loadDeck();

    return () => {
      cancelled = true;
      try {
        viewer.destroy();
      } catch {
        // ignore cleanup errors
      }
      viewerRef.current = null;
    };
  }, [pptxUrl, pptxFile]);

  // Render the requested slide index and handle container resize / fullscreen transitions
  useEffect(() => {
    const viewer = viewerRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!viewer || !canvas || !container || !isLoaded) return;

    let cancelled = false;

    const syncAndRender = async () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${Math.round(rect.width)}px`;
      canvas.style.height = `${Math.round(rect.height)}px`;

      try {
        await viewer.renderSlide(slideIndex, canvas, { quality: 'high' });
        if (cancelled) return;
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Unable to render slide.';
        setErrorMsg(msg);
        setStatus('error');
      }
    };

    syncAndRender();

    const ro = new ResizeObserver(() => {
      syncAndRender();
    });
    ro.observe(container);

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [isLoaded, slideIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-[#181B1C] overflow-hidden"
    >
      <canvas ref={canvasRef} className="block max-w-full max-h-full" />

      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-primary)] gap-3">
          <div className="w-7 h-7 rounded-full border-2 border-[var(--accent-vermilion)] border-t-transparent animate-spin" />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Loading original Digital_Graveyard_Final_Demo.pptx…
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-elevated)] p-6 text-center space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-pine)]">
            PPTX Render Notice
          </p>
          <p className="text-sm text-[var(--text-muted)] max-w-md">{errorMsg}</p>
        </div>
      )}
    </div>
  );
};
