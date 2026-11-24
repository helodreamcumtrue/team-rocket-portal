import React, { useEffect, useRef } from 'react';

interface InteractiveFieldProps {
  isDark: boolean;
}

/**
 * Fluid wave-ribbon and orbital constellation canvas.
 * Replaces rigid grid lines with smooth harmonic waves that respond gently to the pointer.
 */
export const InteractiveField: React.FC<InteractiveFieldProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -1000, y: -1000, active: false };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    let t = 0;
    const ribbonCount = 7;

    const render = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < ribbonCount; r++) {
        const baseY = height * (0.2 + (r / (ribbonCount - 1)) * 0.65);
        const isCopper = r % 3 === 1;

        ctx.beginPath();
        const steps = 36;
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * width;
          const wave =
            Math.sin(t + s * 0.22 + r * 0.8) * 18 +
            Math.cos(t * 0.7 - s * 0.14 + r) * 10;

          let y = baseY + wave;

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const dist = Math.hypot(dx, dy);
            const radius = 210;
            if (dist < radius) {
              const pull = Math.pow(1 - dist / radius, 2) * 28;
              y += dy >= 0 ? pull : -pull;
            }
          }

          if (s === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        if (isCopper) {
          ctx.strokeStyle = isDark ? 'rgba(232, 132, 90, 0.20)' : 'rgba(212, 106, 60, 0.18)';
        } else {
          ctx.strokeStyle = isDark ? 'rgba(47, 181, 176, 0.18)' : 'rgba(15, 110, 110, 0.14)';
        }
        ctx.lineWidth = isCopper ? 1.5 : 1.2;
        ctx.stroke();

        // Flowing orbital nodes riding each curve
        const nodePhase = ((t * 0.12 + r * 0.19) % 1) * width;
        const nx = nodePhase;
        const ny =
          baseY +
          Math.sin(t + (nx / Math.max(width, 1)) * steps * 0.22 + r * 0.8) * 18 +
          Math.cos(t * 0.7 - (nx / Math.max(width, 1)) * steps * 0.14 + r) * 10;

        ctx.beginPath();
        ctx.arc(nx, ny, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = isCopper
          ? isDark
            ? '#E8845A'
            : '#D46A3C'
          : isDark
            ? '#2FB5B0'
            : '#0F6E6E';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-90"
      aria-hidden="true"
    />
  );
};
