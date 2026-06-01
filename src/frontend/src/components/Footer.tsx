import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Scissors } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/barbers", label: "Our Barbers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/book", label: "Book Appointment" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-section-dark border-t border-border">
      {/* Main footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Scissors className="text-gold" size={22} />
              <span className="font-display text-lg font-bold">
                The Gentleman's Cut
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium grooming for the modern gentleman. Where tradition meets
              contemporary style.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="Instagram"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="Facebook"
              >
                <SiFacebook size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <SiX size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase text-gold mb-6"
              style={{ letterSpacing: "0.2em" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase text-gold mb-6"
              style={{ letterSpacing: "0.2em" }}
            >
              Services
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>Classic Haircut</li>
              <li>Beard Trim</li>
              <li>Haircut + Beard</li>
              <li>Hot Towel Shave</li>
              <li>Hair Styling</li>
              <li>Kids Haircut</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-body text-xs tracking-widest uppercase text-gold mb-6"
              style={{ letterSpacing: "0.2em" }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>
                  123 Barber Street, Manhattan
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Clock size={16} className="text-gold mt-0.5 shrink-0" />
                <span>
                  Mon–Sat: 9am–8pm
                  <br />
                  Sun: 10am–6pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {year} The Gentleman's Cut. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with <span className="text-gold">♥</span> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
