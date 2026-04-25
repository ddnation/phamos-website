import { ArrowRightIcon } from "@/components/home/Icons";
import { GalleryRail } from "@/components/home/sections/GalleryRail";
import { paintGalleryItems, trimGalleryItems } from "@/components/home/data";

export function Gallery() {
  return (
    <section id="gallery" className="section-tight">
      <div className="container">
        <div className="gallery-head">
          <div>
            <div className="kicker">The Transformation</div>
            <h2 className="h2 section-title">See the <em>difference.</em></h2>
          </div>
          <div className="gallery-hint">
            Drag to explore
            <ArrowRightIcon className="icon" />
          </div>
        </div>

        <div className="gallery-block">
          <div className="gallery-subhead">Paint Journey</div>
          <GalleryRail items={paintGalleryItems} showCta />
        </div>

        <div className="gallery-block">
          <div className="gallery-subhead">Trim Restoration</div>
          <GalleryRail items={trimGalleryItems} />
        </div>
      </div>
    </section>
  );
}
