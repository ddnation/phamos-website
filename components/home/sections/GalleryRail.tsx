"use client";

import Image from "next/image";
import { MouseEvent, useRef } from "react";
import { ArrowRightIcon } from "@/components/home/Icons";
import type { GalleryItem } from "@/components/home/data";

type GalleryRailProps = {
  items: readonly GalleryItem[];
  showCta?: boolean;
};

export function GalleryRail({ items, showCta = false }: GalleryRailProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    dragRef.current = {
      active: true,
      startX: event.pageX - gallery.offsetLeft,
      startScroll: gallery.scrollLeft,
    };
  };

  const onMouseUp = () => {
    dragRef.current.active = false;
  };

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    if (!gallery || !dragRef.current.active) {
      return;
    }

    event.preventDefault();
    const x = event.pageX - gallery.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.5;
    gallery.scrollLeft = dragRef.current.startScroll - walk;
  };

  return (
    <div
      className="gallery"
      ref={galleryRef}
      aria-label="Horizontal gallery"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
    >
      {items.map((item, index) => (
        <article className="gcard" key={`${item.title}-${item.step}-${index}`}>
          <div className="gimg">
            <div className={`gstep gstep-${item.step.toLowerCase()}`}>{item.step}</div>
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 700px) 86vw, 320px"
              className="gimg-photo"
            />
          </div>
          <div className="gbody">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </article>
      ))}

      {showCta ? (
        <article className="gcard">
          <div className="gimg gimg-next">
            <div className="gstep">Next</div>
            <div className="gimg-next-label">Your car</div>
          </div>
          <div className="gbody">
            <h4>Want yours next?</h4>
            <p>Request a quote and we&apos;ll text you back the same day.</p>
            <div className="gcard-cta">
              <a className="btn btn-primary full" href="#quote">
                Request a Quote
                <ArrowRightIcon className="icon" />
              </a>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}
