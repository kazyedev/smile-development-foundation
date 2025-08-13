"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ target, duration = 1200, locale = 'en' }: { target: number; duration?: number; locale?: 'en' | 'ar' }) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  const nf = useRef(new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US'));
  return <p className="text-4xl md:text-5xl font-extrabold" style={{ letterSpacing: "0.5px" }}>{nf.current.format(value)}</p>;
}


