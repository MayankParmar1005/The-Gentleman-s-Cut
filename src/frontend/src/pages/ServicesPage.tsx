import { Link } from "@tanstack/react-router";
import {
  Baby,
  Droplets,
  Gem,
  Scissors,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetServices } from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const serviceIcons = [Scissors, Gem, Sparkles, Baby, Wand2, Droplets];
const defaultServices = [
  { name: "Classic Haircut", price: BigInt(35) },
  { name: "Beard Trim", price: BigInt(25) },
  { name: "Haircut + Beard Combo", price: BigInt(55) },
  { name: "Kids Haircut", price: BigInt(22) },
  { name: "Hair Styling", price: BigInt(30) },
  { name: "Hair Wash & Blow-Dry", price: BigInt(20) },
];

const serviceDescriptions: Record<string, string> = {
  "Classic Haircut":
    "A precision cut tailored to your face shape and personal style. Includes a consultation, wash, cut, and finish.",
  "Beard Trim":
    "Expert beard shaping, lining, and conditioning to keep you looking sharp and distinguished.",
  "Haircut + Beard Combo":
    "Our most popular service — a full cut combined with beard sculpting for a complete transformation.",
  "Kids Haircut":
    "Gentle, patient service for the young gentlemen in your life. Ages 12 and under.",
  "Hair Styling":
    "Professional styling with premium products. Perfect for special occasions or a polished everyday look.",
  "Hair Wash & Blow-Dry":
    "A luxurious scalp massage, deep cleanse, and professional blow-dry finish.",
  "Hot Towel Shave":
    "The classic straight-razor shave experience with hot towel preparation and aftershave treatment.",
};

function getServiceDescription(name: string): string {
  return (
    serviceDescriptions[name] ??
    "Premium grooming service delivered by our expert barbers using the finest tools and products."
  );
}

export default function ServicesPage() {
  const { data: services, isLoading } = useGetServices();
  const displayServices =
    services && services.length > 0 ? services : defaultServices;

  const ocids = [
    "services.item.1",
    "services.item.2",
    "services.item.3",
    "services.item.4",
    "services.item.5",
    "services.item.6",
  ];

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
              What We Offer
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="section-heading text-5xl md:text-6xl"
            >
              Services &amp; <span className="text-gold">Pricing</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold mx-auto" />
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Every service is a bespoke experience crafted by our master
              barbers using the finest techniques and premium products.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div
              data-ocid="services.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-section-card border border-border p-8 animate-pulse"
                >
                  <div className="w-12 h-12 bg-border mb-6" />
                  <div className="h-5 bg-border rounded w-3/4 mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-border rounded w-full" />
                    <div className="h-3 bg-border rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayServices.map((service, idx) => {
                const Icon = serviceIcons[idx % serviceIcons.length];
                return (
                  <motion.div
                    key={service.name}
                    variants={fadeUp}
                    data-ocid={ocids[idx]}
                    className="bg-section-card border border-border p-8 group hover:border-gold transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Background decorative */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 -translate-y-12 translate-x-12 rotate-45 group-hover:bg-gold/10 transition-colors duration-300" />

                    <div className="w-12 h-12 border border-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:shadow-gold-sm transition-all duration-300">
                      <Icon
                        size={20}
                        className="text-gold group-hover:text-background transition-colors duration-300"
                      />
                    </div>

                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-xl font-bold group-hover:text-gold transition-colors duration-200">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {getServiceDescription(service.name)}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span
                        className="text-xs text-muted-foreground uppercase tracking-widest"
                        style={{ letterSpacing: "0.15em" }}
                      >
                        Starting from
                      </span>
                      <span className="font-display text-2xl font-bold text-gold">
                        ${Number(service.price)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Premium Package Banner */}
      <section className="bg-section-dark py-16 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="bg-section-card border border-gold/30 p-10 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Star size={16} className="text-gold fill-gold" />
                  <span
                    className="text-gold text-xs tracking-widest uppercase"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    Premium Experience
                  </span>
                  <Star size={16} className="text-gold fill-gold" />
                </div>
                <h3 className="font-display text-3xl font-bold">
                  The Gentleman's{" "}
                  <span className="text-gold">Full Package</span>
                </h3>
                <p className="text-muted-foreground max-w-lg">
                  Haircut + Hot Towel Shave + Beard Sculpt + Scalp Massage. The
                  ultimate grooming ritual for the discerning gentleman.
                </p>
              </div>
              <div className="text-center shrink-0">
                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
                  Package Price
                </p>
                <p className="font-display text-5xl font-bold text-gold">$95</p>
                <Link to="/book" className="btn-gold text-xs mt-4 block">
                  Book Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              The Difference
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-heading">
              Why Choose <span className="text-gold">Us</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Master Craftsmen",
                description:
                  "Our barbers bring decades of combined expertise and continually refine their skills.",
                icon: "✦",
              },
              {
                title: "Premium Products",
                description:
                  "We use only the finest grooming products from leading luxury brands worldwide.",
                icon: "◆",
              },
              {
                title: "Personalized Service",
                description:
                  "Every client receives a tailored consultation to achieve their ideal look.",
                icon: "◈",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center space-y-4"
              >
                <span className="text-gold text-2xl">{item.icon}</span>
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-dark py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-xl mx-auto space-y-6"
          >
            <motion.h2 variants={fadeUp} className="section-heading">
              Ready to Book Your <span className="text-gold">Service?</span>
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link to="/book" className="btn-gold text-xs">
                Book Appointment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
