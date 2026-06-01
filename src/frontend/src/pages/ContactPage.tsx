import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const hours = [
  { day: "Monday", hours: "9:00 AM – 8:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
  { day: "Friday", hours: "9:00 AM – 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 8:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-section-dark py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              Get in Touch
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="section-heading text-5xl md:text-6xl"
            >
              Contact <span className="text-gold">Us</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold mx-auto" />
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg"
            >
              We'd love to hear from you. Reach us any way you like.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="space-y-2">
                <p className="section-subheading text-xs">Reach Us</p>
                <h2 className="font-display text-3xl font-bold">
                  We're Here for <span className="text-gold">You</span>
                </h2>
              </motion.div>

              {/* Info cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: "123 Barber Street, Manhattan\nNew York, NY 10001",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "+1 (555) 123-4567",
                    href: "tel:+15551234567",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "hello@gentlemanscut.com",
                    href: "mailto:hello@gentlemanscut.com",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="flex items-start gap-4 bg-section-card border border-border p-5 hover:border-gold transition-all duration-200"
                  >
                    <div className="w-10 h-10 border border-gold flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p
                        className="text-xs text-muted-foreground uppercase tracking-widest mb-1"
                        style={{ letterSpacing: "0.15em" }}
                      >
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground text-sm hover:text-gold transition-colors whitespace-pre-line"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.div variants={fadeUp}>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_button"
                  className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 hover:brightness-110 transition-all duration-200 w-fit"
                >
                  <SiWhatsapp size={22} />
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest font-semibold"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      Chat on WhatsApp
                    </p>
                    <p className="text-white/80 text-xs">
                      Typically replies in minutes
                    </p>
                  </div>
                </a>
              </motion.div>

              {/* Book CTA */}
              <motion.div variants={fadeUp} className="pt-2">
                <Link to="/book" className="btn-gold text-xs">
                  Book an Appointment
                </Link>
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="w-full h-[400px] overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="400"
                  style={{
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Gentleman's Cut location"
                  data-ocid="contact.map_marker"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-background/90 border border-gold px-4 py-2 backdrop-blur-sm">
                <p className="text-gold text-xs font-bold">
                  The Gentleman's Cut
                </p>
                <p className="text-muted-foreground text-xs">
                  123 Barber Street, NY
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="bg-section-dark py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="text-center space-y-4">
                <p className="section-subheading text-xs">Schedule</p>
                <h2 className="section-heading">
                  Opening <span className="text-gold">Hours</span>
                </h2>
                <div className="divider-gold mx-auto" />
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-section-card border border-border overflow-hidden"
              >
                {hours.map((row, idx) => {
                  const isToday = row.day === today;
                  return (
                    <div
                      key={row.day}
                      className={`flex items-center justify-between px-6 py-4 ${
                        idx < hours.length - 1 ? "border-b border-border" : ""
                      } ${isToday ? "bg-gold/10 border-l-2 border-l-gold" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        {isToday && (
                          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        )}
                        <span
                          className={`text-sm font-medium ${isToday ? "text-gold font-bold" : "text-foreground"}`}
                        >
                          {row.day}
                          {isToday && (
                            <span className="ml-2 text-xs text-gold/60">
                              (Today)
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock
                          size={12}
                          className={
                            isToday ? "text-gold" : "text-muted-foreground"
                          }
                        />
                        <span
                          className={`text-sm ${isToday ? "text-gold font-semibold" : "text-muted-foreground"}`}
                        >
                          {row.hours}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-xs text-center"
              >
                * Hours may vary on public holidays. Call ahead to confirm.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
