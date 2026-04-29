import Image from "next/image";
import { navLinks } from "@/components/home/data";

export function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Phamo's Home">
          <Image
            className="brand-logo"
            src="/phamos-logo.svg"
            alt="Phamo's Detailing logo"
            width={200}
            height={38}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a className="btn btn-secondary" href="#pricing">
            View Menu
          </a>
          <a className="btn btn-primary" href="#quote">
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
