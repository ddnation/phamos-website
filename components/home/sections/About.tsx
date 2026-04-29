import Image from "next/image";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container about-wrap">
        <div className="card about-story">
          <div className="kicker">Our story</div>
          <h2 className="h2 section-title">What started as a passion quickly became a purpose.</h2>
          <p className="p section-copy">
            Growing up, I&apos;ve always had a deep love for cars. Whether it was working on them, learning every
            detail, or simply appreciating their design, that passion never faded. Over time, what began as a
            hobby turned into a vision to build something of my own rooted in quality, precision, and pride.
          </p>
          <p className="p section-copy">
            As the business grew, my younger brother came along and it didn&apos;t take long before he developed
            the same passion. The process, the transformation, and the satisfaction of perfecting every detail
            pulled us both in completely.
          </p>
          <p className="p section-copy">
            Today, we approach every vehicle as if it were our own. From ceramic coatings to full protection
            services, our goal is simple: deliver unmatched quality and treat every car with the care it
            deserves.
          </p>
          <div className="about-signoff">
            <span className="about-signature">- Steven & Scott </span>
            <div className="about-meta">Founders · Houston, TX</div>
          </div>
        </div>

        <div className="card about-photo">
          <Image
            src="/stevenNscott.JPG"
            alt="Steven and Scott"
            fill
            sizes="(max-width: 980px) 100vw, 40vw"
            className="about-photo-image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
