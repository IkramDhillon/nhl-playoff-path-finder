'use client';
import { useEffect, useRef, useState } from 'react';
import { Rajdhani } from 'next/font/google';

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['600', '700'] });

export default function Spinner({
  label = 'Fetching Schedule',
  typeDurationMs = 1800,
  typeDelayMs = 150,
  spinnerMs = 1600,
}) {
  const innerRef = useRef(null);
  const [targetWidth, setTargetWidth] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => setTargetWidth(el.offsetWidth);

    // Wait for fonts, then measure once and start the reveal
    const fontsReady = typeof document !== 'undefined' && document.fonts?.ready
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve();

    let rafId;
    fontsReady.then(() => {
      measure();
      rafId = requestAnimationFrame(() => setReady(true));
    });

    // Re-measure if the element’s size changes (font swap, window zoom, etc.)
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
    };
  }, [label]);

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="
        fixed inset-0 z-50 grid place-items-center
        antialiased bg-gray-800 text-white
        bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
        bg-[size:14px_24px]
      "
    >
      {/* stack spinner + label and center the block */}
      <div className="flex flex-col items-center gap-8 text-center">
        {/* single outer spinner */}
        <div
          className="h-24 w-24 md:h-28 md:w-28 animate-spin rounded-full border-4 border-gray-600/60 border-t-cyan-400"
          style={{ animationDuration: `${spinnerMs}ms` }}
        />

        {/* one-line, smooth reveal (Rajdhani), forced no-wrap */}
        <div className={`${rajdhani.className} text-4xl sm:text-5xl md:text-7xl uppercase tracking-[0.14em]`}>
          <span
            className="inline-block overflow-hidden whitespace-nowrap"
            style={{
              width: ready ? `${targetWidth}px` : '0px',
              transition: `width ${typeDurationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              transitionDelay: `${typeDelayMs}ms`,
            }}
          >
            <span ref={innerRef} className="inline-block text-white/95 whitespace-nowrap">
              {label}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}