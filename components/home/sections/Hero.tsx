import { ArrowRightIcon } from "@/components/home/Icons";
import { heroPoints, stats, tickerItems } from "@/components/home/data";
import { HeroComparison } from "@/components/home/sections/HeroComparison";
import { HeroStats } from "@/components/home/sections/HeroStats";

export function Hero() {
  return (
    <main id="top" className="hero">
      <div className="container">
        <section className="hero-shell" aria-label="Hero section">
          <div className="hero-redbar" />

          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-top">
                <div className="badge hero-rating-badge" title="5-Star Rated">
                  <span className="stars hero-rating-stars">★★★★★</span>
                  <span className="hero-rating-text">
                    5-star rated on{" "}
                    <a
                      className="hero-rating-link"
                      href="https://www.google.com/search?sca_esv=04742f9a7359bbd1&sxsrf=ANbL-n5g3Nl5oq_BIbh_v5FPhe5fLdlHVw:1773015668532&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOVfJzB89XAjJdEet14-tP45hozqLR1DRjIx9_e7CK06JE0m4YaWuIxQ8eSQGZvgopaWSAiFZPVg97j_--qUE9_P7dD-I68Aj-AR7h4OHvmFW2c6jGw%3D%3D&q=Phamo%27s+Wash+%26+Detailing,+LLC+Reviews&sa=X&ved=2ahUKEwiPnuqIxpGTAxX4mWoFHQp9G4IQ0bkNegQIOBAD&biw=1512&bih=736&dpr=2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google
                    </a>
                    {" and "}
                    <a
                      className="hero-rating-link"
                      href="https://www.yelp.com/biz/phamos-personal-auto-detailing-jersey-village-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Yelp
                    </a>
                  </span>
                  <span className="dot" aria-hidden="true" />
                </div>
                <div className="kicker">Houston, TX</div>
              </div>

              <h1 className="hero-h1 h1">
                <span className="line1">Protect</span>
                <span className="line2">Perfect</span>
                <span className="line3">your paint. forever.</span>
              </h1>

              <p className="p lead hero-sub">
                Clean work, fast replies, and a finish you&apos;ll be proud of. We keep it simple and
                easy to book.
              </p>

              <div className="hero-ctas">
                <a className="btn btn-primary" href="#quote">
                  Request a Quote
                  <ArrowRightIcon className="icon" />
                </a>
                <a className="btn btn-secondary" href="#pricing">
                  See Menu
                </a>
              </div>

              <div className="hero-trust" aria-label="Trust signals">
                <span>Insured</span>
                <span>Drop-off service</span>
                <span>Same-day response</span>
              </div>

              <div className="hero-points" aria-label="Highlights">
                {heroPoints.map((point) => (
                  <div className="point" key={point.title}>
                    <strong>{point.title}</strong>
                    <span>{point.description}</span>
                  </div>
                ))}
              </div>

              <div className="ticker" aria-label="Service ticker">
                <div className="ticker-track">
                  {[...tickerItems, ...tickerItems].map((item, index) => (
                    <div className="ticker-item" key={`${item}-${index}`}>
                      <span className="ticker-dot" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <HeroStats stats={stats} />
            </div>

            <div className="hero-right" aria-label="Hero media">
              <HeroComparison
                beforeSrc="/gallery-seq-before.jpg"
                afterSrc="/gallery-seq-after-ceramic.jpg"
                beforeAlt="Blue paint before correction with swirl marks"
                afterAlt="Blue paint after ceramic coating with improved gloss"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
