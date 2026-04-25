"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroComparisonProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function HeroComparison({ beforeSrc, afterSrc, beforeAlt, afterAlt }: HeroComparisonProps) {
  const [position, setPosition] = useState(34);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = 34 + (76 - 34) * eased;
      setPosition(next);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="hero-media hero-compare" aria-label="Before and after ceramic coating comparison">
      <div className="hero-compare-inner">
        <div className="hero-shot">
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            width={1200}
            height={900}
            priority
            sizes="(max-width: 1120px) 100vw, 38vw"
            className="hero-shot-image"
          />
        </div>

        <div className="hero-shot hero-shot-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={afterSrc}
            alt={afterAlt}
            width={1200}
            height={900}
            priority
            sizes="(max-width: 1120px) 100vw, 38vw"
            className="hero-shot-image"
          />
        </div>

        <div className="hero-handle" style={{ left: `${position}%` }} aria-hidden="true" />

        <div className="hero-label hero-label-before">Before</div>
        <div className="hero-label hero-label-after">After</div>

        <input
          className="hero-range"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Drag to compare before and after"
        />
      </div>

      <div className="hero-compare-copy">Drag the slider. Swirl marks reduced. Gloss restored.</div>
    </div>
  );
}
