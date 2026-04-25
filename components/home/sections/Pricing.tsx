"use client";

import { useState } from "react";
import {
  addOns,
  ceramicCoatingTiers,
  services,
  vehicleSizes,
} from "@/components/home/data";

export function Pricing() {
  const [selectedSize, setSelectedSize] = useState<(typeof vehicleSizes)[number]>(
    "Sedan / Coupe",
  );

  const getStartingPrice = (prices: readonly { label: string; price: string }[]) => {
    const lowest = prices.reduce<number | null>((currentLowest, tier) => {
      const matches = tier.price.match(/\$[\d,]+/g);
      if (!matches || matches.length === 0) {
        return currentLowest;
      }

      const first = Number(matches[0].replace("$", "").replace(/,/g, ""));
      if (Number.isNaN(first)) {
        return currentLowest;
      }

      if (currentLowest === null || first < currentLowest) {
        return first;
      }

      return currentLowest;
    }, null);

    return lowest === null ? null : `$${lowest.toLocaleString()}`;
  };

  return (
    <section id="pricing" className="section-tight">
      <div className="container">
        <div className="menu-head">
          <div>
            <div className="kicker">Menu</div>
            <h2 className="h2 section-title">Services <em>we offer.</em></h2>
          </div>

          <div className="menu-aside">
            <div className="menu-note">
              Prices vary by vehicle size and condition. Send a quick request and we&apos;ll text you a quote.
            </div>
            <a className="btn btn-primary" href="#quote">
              Request a Quote
            </a>
          </div>
        </div>

        <div className="size-switch" aria-label="Vehicle size selector">
          <span className="size-switch-label">Select your vehicle size:</span>
          <div className="size-switch-buttons">
            {vehicleSizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-btn ${selectedSize === size ? "active" : ""}`.trim()}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid" aria-label="Service menu grid">
          {services.map((service) => (
            <div
              key={service.title}
              className={`card menu-card${service.featured ? " featured" : ""}`}
            >
              <div className="menu-top">
                <div>
                  <div className="menu-title">{service.title}</div>
                  <div className="menu-sub">{service.subtitle}</div>
                  <div className="menu-starting">
                    Starting at {getStartingPrice(service.priceTiers)}
                  </div>
                </div>
                {service.featured ? <div className="bad-pill">Popular</div> : null}
              </div>
              <ul className="menu-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="live-price">
                <span className="live-price-label">{selectedSize}</span>
                <span className="live-price-value">
                  {service.priceTiers.find((tier) => tier.label === selectedSize)?.price}
                </span>
              </div>
              <div className="menu-card-cta">
                <a className="btn btn-secondary full" href={`/?service=${encodeURIComponent(service.title)}#quote`}>
                  Select & Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="coating-wrap">
          <div className="coating-head">
            <div className="kicker">Ceramic Coat</div>
            <h3>Long-term protection tiers</h3>
          </div>
          <div className="coating-grid">
            {ceramicCoatingTiers.map((tier) => (
              <article
                key={tier.name}
                className={`card coating-card${tier.featured ? " featured" : ""}`}
              >
                <div className="coating-top">
                  <div>
                    <div className="coating-name">{tier.name}</div>
                    <div className="coating-starting">
                      Starting at {getStartingPrice(tier.priceTiers)}
                    </div>
                  </div>
                  <div className="coating-tag-group">
                    {tier.featured ? <div className="coating-popular">Popular</div> : null}
                    <span className="coating-badge">{tier.badge}</span>
                  </div>
                </div>
                <p className="coating-description">{tier.description}</p>
                <div className="coating-price-row">
                  <span>{selectedSize}</span>
                  <strong>
                    {tier.priceTiers.find((price) => price.label === selectedSize)?.price}
                  </strong>
                </div>
                <p className="coating-process">{tier.process}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card soft addons" aria-label="Add-ons section">
          <div className="addons-head">
            <div className="addons-title">Add-ons</div>
            <div className="kicker addons-subtitle">Optional upgrades</div>
          </div>
          <div className="chips">
            {addOns.map((addOn) => (
              <span className="chip" key={addOn}>
                {addOn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
