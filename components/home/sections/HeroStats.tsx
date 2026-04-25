"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  label: string;
  value: number;
  suffix: string;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useCountUp(target: number, shouldAnimate: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldAnimate, target]);

  return value;
}

function Stat({ item, shouldAnimate }: { item: StatItem; shouldAnimate: boolean }) {
  const value = useCountUp(item.value, shouldAnimate);

  return (
    <div className="stat">
      <div className="num">{`${value}${item.suffix}`}</div>
      <div className="lbl">{item.label}</div>
    </div>
  );
}

export function HeroStats({ stats }: { stats: readonly StatItem[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stats" aria-label="Quick stats">
      {stats.map((item) => (
        <Stat key={item.label} item={item} shouldAnimate={isVisible} />
      ))}
    </div>
  );
}
