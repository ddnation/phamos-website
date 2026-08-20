import { addOns, ceramicCoatingTiers, services } from "@/components/home/data";

const PHONE_TEL = "+12813239855";

export function Pricing() {
  return (
    <section id="pricing" className="section-tight">
      <div className="container">
        <div className="menu-head">
          <div>
            <div className="kicker">Services</div>
            <h2 className="h2 section-title">
              Protection made <em>for your vehicle.</em>
            </h2>
          </div>

          <div className="menu-aside">
            <div className="menu-note">
              Every vehicle is different. Call for a quote or fill out our inquiry form and we&apos;ll recommend the right service.
            </div>
            <div className="menu-card-cta">
              <a className="btn btn-secondary" href={`tel:${PHONE_TEL}`}>Call for a Quote</a>
              <a className="btn btn-primary" href="#quote">Fill Out Inquiry</a>
            </div>
          </div>
        </div>

        <div className="menu-grid" aria-label="Services we offer">
          {services.map((service) => (
            <div key={service.title} className={`card menu-card${service.featured ? " featured" : ""}`}>
              <div className="menu-top">
                <div>
                  <div className="menu-title">{service.title}</div>
                  <div className="menu-sub">{service.subtitle}</div>
                </div>
                {service.featured ? <div className="bad-pill">Popular</div> : null}
              </div>
              <ul className="menu-list">
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="menu-card-cta">
                <a className="btn btn-secondary full" href={`/?service=${encodeURIComponent(service.title)}#quote`}>
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="coating-wrap">
          <div className="coating-head">
            <div className="kicker">Ceramic Coating</div>
            <h3>Long-term paint protection options</h3>
          </div>
          <div className="coating-grid">
            {ceramicCoatingTiers.map((tier) => (
              <article key={tier.name} className={`card coating-card${tier.featured ? " featured" : ""}`}>
                <div className="coating-top">
                  <div className="coating-name">{tier.name}</div>
                  <div className="coating-tag-group">
                    {tier.featured ? <div className="coating-popular">Popular</div> : null}
                    <span className="coating-badge">{tier.badge}</span>
                  </div>
                </div>
                <p className="coating-description">{tier.description}</p>
                <p className="coating-process">{tier.process}</p>
                <a className="btn btn-secondary full" href={`/?service=${encodeURIComponent(tier.name)}#quote`}>
                  Get a Quote
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="card soft addons" aria-label="Additional services">
          <div className="addons-head">
            <div className="addons-title">Additional services</div>
            <div className="kicker addons-subtitle">Ask us for a custom quote</div>
          </div>
          <div className="chips">
            {addOns.map((addOn) => <span className="chip" key={addOn}>{addOn}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
