import {
  CheckShieldIcon,
  ShieldIcon,
  StarIcon,
  SunIcon,
} from "@/components/home/Icons";
import { benefits } from "@/components/home/data";

function BenefitIcon({ icon }: { icon: (typeof benefits)[number]["icon"] }) {
  if (icon === "shield") {
    return <ShieldIcon className="icon" />;
  }

  if (icon === "sun") {
    return <SunIcon className="icon" />;
  }

  if (icon === "star") {
    return <StarIcon className="icon" />;
  }

  return <CheckShieldIcon className="icon" />;
}

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="grid-2">
          <div>
            <div className="kicker">The Science</div>
            <h2 className="h2 section-title">What is ceramic <em>coating?</em></h2>
            <p className="p section-copy">
              Ceramic coating is a liquid polymer applied to your vehicle&apos;s exterior that chemically
              bonds with the paint. It creates a long-lasting layer of protection that enhances gloss,
              repels water, and helps protect against contaminants.
            </p>
          </div>

          <div className="card soft highlight-card">
            <h3 className="small-heading">What you&apos;ll notice</h3>
            <p className="p section-copy">Deeper gloss, easier washes, and paint that stays cleaner longer.</p>
          </div>
        </div>

        <div className="benefits" aria-label="Benefits">
          {benefits.map((benefit) => (
            <div className="benefit" key={benefit.title}>
              <div className="mini" aria-hidden="true">
                <BenefitIcon icon={benefit.icon} />
              </div>
              <strong>{benefit.title}</strong>
              <span>{benefit.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
