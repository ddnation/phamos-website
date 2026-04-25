import { howItWorksSteps } from "@/components/home/data";

export function HowItWorks() {
  return (
    <section className="section-tight" id="how-it-works">
      <div className="container">
        <div className="how-head">
          <div className="kicker">Simple Process</div>
          <h2 className="h2 section-title">How it <em>works.</em></h2>
        </div>

        <div className="how-grid" aria-label="How it works steps">
          {howItWorksSteps.map((step, index) => (
            <article key={step.title} className="card how-card">
              <div className="how-num">0{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
