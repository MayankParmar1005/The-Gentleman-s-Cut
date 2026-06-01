import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Scissors, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home_link" },
  { to: "/about", label: "About", ocid: "nav.about_link" },
  { to: "/services", label: "Services", ocid: "nav.services_link" },
  { to: "/barbers", label: "Our Barbers", ocid: "nav.barbers_link" },
  { to: "/gallery", label: "Gallery", ocid: "nav.gallery_link" },
  { to: "/book", label: "Book", ocid: "nav.book_link" },
  { to: "/contact", label: "Contact", ocid: "nav.contact_link" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <Scissors
                className="text-gold transition-transform duration-300 group-hover:rotate-45"
                size={22}
              />
              <span className="font-display text-lg font-bold text-foreground tracking-wide">
                The Gentleman's Cut
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={link.ocid}
                    className={`nav-link relative ${isActive ? "text-gold" : ""}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                      />
                    )}
                  </Link>
                );
              })}
              <Link to="/book" className="btn-gold text-xs px-6 py-2">
                Book Now
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              data-ocid="nav.mobile_toggle"
              className="lg:hidden text-foreground p-2 hover:text-gold transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.to;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.to}
                      data-ocid={link.ocid}
                      className={`font-display text-3xl font-bold ${isActive ? "text-gold" : "text-foreground hover:text-gold"} transition-colors`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-4"
              >
                <Link to="/book" className="btn-gold inline-block">
                  Book Appointment
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pb-12 text-muted-foreground text-sm">
              <p>123 Barber Street, New York, NY</p>
              <p className="text-gold mt-1">+1 (555) 123-4567</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
