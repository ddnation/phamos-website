import Image from "next/image";
import { footerLinks } from "@/components/home/data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <Image
                className="brand-logo"
                src="/phamos-logo.svg"
                alt="Phamo's Detailing logo"
                width={200}
                height={44}
              />
            </div>
            <p>
              Professional washes, ceramic maintenance, and paint protection for Houston drivers who care.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="tel:+2813239855">(281) 323-9855</a>
              <a href="mailto:quote@phamosdetailing.com">quote@phamosdetailing.com</a>
              <span className="footer-location">Houston, TX</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Phamo&apos;s Wash and Detailing. All rights reserved.</div>
          <div className="footer-rating-links">
            ★★★★★ 5-star rated{" | "}
            <a
              className="footer-rating-link"
              href="https://www.google.com/search?sca_esv=04742f9a7359bbd1&sxsrf=ANbL-n5g3Nl5oq_BIbh_v5FPhe5fLdlHVw:1773015668532&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOVfJzB89XAjJdEet14-tP45hozqLR1DRjIx9_e7CK06JE0m4YaWuIxQ8eSQGZvgopaWSAiFZPVg97j_--qUE9_P7dD-I68Aj-AR7h4OHvmFW2c6jGw%3D%3D&q=Phamo%27s+Wash+%26+Detailing,+LLC+Reviews&sa=X&ved=2ahUKEwiPnuqIxpGTAxX4mWoFHQp9G4IQ0bkNegQIOBAD&biw=1512&bih=736&dpr=2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a>
            {" and "}
            <a className="footer-rating-link" href="https://www.yelp.com/biz/phamos-personal-auto-detailing-jersey-village-2" target="_blank" rel="noopener noreferrer">
              Yelp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
