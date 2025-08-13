"use client";

import { Children, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AutoCarousel({ children, interval = 4000 }: { children: React.ReactNode; interval?: number }) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const showV2 = items.length >= 3;

  // Fallback simple layout when fewer than 3 items
  if (!showV2) {
    return (
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((node, idx) => (
            <div key={idx} className="shrink-0">
              {node}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const GAP = 16; // matches gap-4

  const clampIndex = (i: number) => (i + items.length) % items.length;
  const prev = () => setCurrent((c) => clampIndex(c - 1));
  const next = () => setCurrent((c) => clampIndex(c + 1));

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // autoplay
  useEffect(() => {
    if (isHover) return;
    const id = setInterval(() => next(), interval);
    return () => clearInterval(id);
  }, [interval, isHover]);

  // swipe on mobile
  useEffect(() => {
    if (!isMobile) return;
    const el = outerRef.current;
    if (!el) return;
    let startX = 0;
    let dx = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; dx = 0; };
    const onTouchMove = (e: TouchEvent) => { dx = e.touches[0].clientX - startX; };
    const onTouchEnd = () => {
      if (dx > 50) prev();
      else if (dx < -50) next();
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMobile]);

  // compute widths and transform
  const { centerWidth, sideWidth } = useMemo(() => {
    const outer = outerRef.current;
    if (!outer) return { centerWidth: 0, sideWidth: 0 };
    const W = outer.clientWidth;
    if (isMobile) {
      return { centerWidth: W, sideWidth: 0 };
    }
    const c = Math.round(W * 0.62);
    const s = Math.round(W * 0.38);
    return { centerWidth: c, sideWidth: s };
  }, [isMobile, outerRef.current]);

  const [translateX, setTranslateX] = useState(0);

  // center current card by measuring DOM
  useEffect(() => {
    if (isMobile) { setTranslateX(0); return; }
    const outer = outerRef.current;
    const track = trackRef.current;
    const currentEl = currentRef.current;
    if (!outer || !track || !currentEl) return;
    const outerRect = outer.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const currRect = currentEl.getBoundingClientRect();
    const currCenter = (currRect.left - trackRect.left) + currRect.width / 2;
    const newTranslate = (outerRect.width / 2) - currCenter;
    setTranslateX(newTranslate);
  }, [centerWidth, sideWidth, current, isMobile]);

  const prevIdx = clampIndex(current - 1);
  const nextIdx = clampIndex(current + 1);

  return (
    <div
      ref={outerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Arrows overlay on desktop */}
      {!isMobile && (
        <>
          <button
            type="button"
            onClick={prev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full border bg-background shadow hover:bg-accent"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full border bg-background shadow hover:bg-accent"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Track */}
      <div className="py-2">
        {isMobile ? (
          <div className="flex justify-center">
            <div className="w-full" style={{ maxWidth: centerWidth }}>
              {items[current]}
            </div>
          </div>
        ) : (
          <div ref={trackRef} className="flex items-center gap-4" style={{ transform: `translateX(${translateX}px)`, transition: 'transform 400ms ease' }}>
            <div className="shrink-0 opacity-70 scale-95 overflow-hidden rounded-xl" style={{ width: sideWidth }}>
              {items[prevIdx]}
            </div>
            <div ref={currentRef} className="shrink-0 scale-100 overflow-hidden rounded-xl" style={{ width: centerWidth }}>
              {items[current]}
            </div>
            <div className="shrink-0 opacity-70 scale-95 overflow-hidden rounded-xl" style={{ width: sideWidth }}>
              {items[nextIdx]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


