import { Link } from "@tanstack/react-router";
import {
  Award,
  ChevronRight,
  Clock,
  Gem,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetBarbers, useGetTestimonials } from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const services = [
  {
    icon: Scissors,
    name: "Classic Haircut",
    description:
      "Precision cuts tailored to your face shape and personal style by our master barbers.",
    price: "from $35",
  },
  {
    icon: Gem,
    name: "Signature Shave",
    description:
      "Traditional hot towel straight razor shave with premium pre and post-shave treatments.",
    price: "from $45",
  },
  {
    icon: Sparkles,
    name: "Beard Sculpting",
    description:
      "Expert beard shaping, trimming, and conditioning for a distinguished, refined look.",
    price: "from $25",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "text-gold fill-gold" : "text-border"}
        />
      ))}
    </div>
  );
}

const galleryImages = [
  {
    src: "/assets/generated/gallery-haircut-1.dim_800x800.jpg",
    alt: "Precision haircut",
  },
  {
    src: "/assets/generated/gallery-beard-1.dim_800x800.jpg",
    alt: "Beard styling",
  },
  {
    src: "/assets/generated/gallery-tools.dim_800x800.jpg",
    alt: "Professional tools",
  },
  {
    src: "/assets/generated/gallery-shop.dim_800x800.jpg",
    alt: "Shop interior",
  },
];

export default function HomePage() {
  const { data: testimonials, isLoading: testimonialsLoading } =
    useGetTestimonials();
  const { data: barbers } = useGetBarbers();

  const displayBarbers = barbers?.slice(0, 3) ?? [];
  const barberImages = [
    "/assets/generated/barber-1.dim_600x800.jpg",
    "/assets/generated/barber-2.dim_600x800.jpg",
    "/assets/generated/barber-3.dim_600x800.jpg",
  ];

  const displayTestimonials = testimonials ?? [
    {
      customerName: "Marcus J.",
      review:
        "Absolutely the best barbershop in the city. The attention to detail is unmatched, and the hot towel shave is a religious experience.",
      rating: BigInt(5),
    },
    {
      customerName: "David R.",
      review:
        "Been coming here for three years. The Gentleman's Cut has redefined my grooming routine entirely. Worth every penny.",
      rating: BigInt(5),
    },
    {
      customerName: "James K.",
      review:
        "The ambiance, the service, the results — everything is top tier. My go-to for any important occasion.",
      rating: BigInt(5),
    },
  ];

  return (
    <main>
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-barber.dim_1920x1080.jpg)",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              ✦ Est. 2010 · New York City ✦
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-shadow-lg leading-tight"
            >
              Premium Grooming
              <br />
              <span className="text-gold">for the Modern</span>
              <br />
              Gentleman
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg md:text-xl max-w-lg mx-auto text-shadow-sm"
            >
              Where tradition meets contemporary style. Experience grooming
              elevated to an art form.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link
                to="/book"
                data-ocid="hero.primary_button"
                className="btn-gold text-xs min-w-[200px] justify-center"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="btn-outline-gold text-xs min-w-[200px] justify-center"
              >
                View Services
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span
            className="text-white/40 text-xs tracking-widest uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </section>

      {/* ─── About Intro ──────────────────────────────────────────────── */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-6"
            >
              <motion.p
                variants={fadeUp}
                className="section-subheading text-xs"
              >
                Our Story
              </motion.p>
              <motion.h2 variants={fadeUp} className="section-heading">
                More Than a Haircut.{" "}
                <span className="text-gold">An Experience.</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="divider-gold mx-auto" />
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                Since 2010, The Gentleman's Cut has been the premier destination
                for discerning gentlemen who demand excellence in their
                grooming. Our five master barbers bring decades of combined
                expertise, blending time-honored techniques with modern
                artistry.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/about" className="btn-outline-gold text-xs">
                  Our Story
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services Highlight ───────────────────────────────────────── */}
      <section className="bg-section-dark py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              Signature Services
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-heading">
              Crafted for the <span className="text-gold">Discerning Man</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={fadeUp}
                className="bg-section-card border border-border p-8 group hover:border-gold transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 border border-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-background transition-all duration-300">
                  <service.icon
                    size={22}
                    className="text-gold group-hover:text-background transition-colors duration-300"
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-gold text-sm font-semibold">
                  {service.price}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-outline-gold text-xs">
              View All Services & Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Barbers Preview ──────────────────────────────────────────── */}
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
              Master Craftsmen
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-heading">
              Meet Our <span className="text-gold">Barbers</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {(displayBarbers.length > 0
              ? displayBarbers
              : [
                  {
                    name: "Alexander Reid",
                    specialty: "Classic & Modern Cuts",
                    experience: BigInt(12),
                  },
                  {
                    name: "Marcus Donovan",
                    specialty: "Beard Sculpting",
                    experience: BigInt(9),
                  },
                  {
                    name: "James Whitfield",
                    specialty: "Fade Specialist",
                    experience: BigInt(7),
                  },
                ]
            ).map((barber, idx) => (
              <motion.div
                key={barber.name}
                variants={fadeUp}
                className="group relative overflow-hidden bg-section-card border border-border hover:border-gold transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={barberImages[idx]}
                    alt={barber.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {barber.name}
                  </h3>
                  <p className="text-gold text-sm mt-1">{barber.specialty}</p>
                  <p className="text-white/60 text-xs mt-1">
                    {Number(barber.experience)} years experience
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/barbers" className="btn-outline-gold text-xs">
              Meet All Barbers
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Gallery Preview ──────────────────────────────────────────── */}
      <section className="bg-section-dark py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              Gallery
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-heading">
              The Art of <span className="text-gold">Grooming</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {galleryImages.map((img) => (
              <motion.div
                key={img.src}
                variants={fadeUp}
                className="group relative overflow-hidden aspect-square"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span
                    className="text-white/0 group-hover:text-white/90 text-xs tracking-widest uppercase transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    View
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/gallery" className="btn-outline-gold text-xs">
              View Full Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────── */}
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
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-heading">
              What Our <span className="text-gold">Clients Say</span>
            </motion.h2>
          </motion.div>

          {testimonialsLoading ? (
            <div
              data-ocid="testimonials.loading_state"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-section-card border border-border p-8 animate-pulse"
                >
                  <div className="h-4 bg-border rounded mb-4 w-24" />
                  <div className="space-y-2">
                    <div className="h-3 bg-border rounded w-full" />
                    <div className="h-3 bg-border rounded w-4/5" />
                    <div className="h-3 bg-border rounded w-3/5" />
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {displayTestimonials.slice(0, 3).map((testimonial, idx) => {
                const ocids = [
                  "testimonials.item.1",
                  "testimonials.item.2",
                  "testimonials.item.3",
                ];
                return (
                  <motion.div
                    key={testimonial.customerName}
                    variants={fadeUp}
                    data-ocid={ocids[idx]}
                    className="bg-section-card border border-border p-8 relative"
                  >
                    <div className="text-gold text-5xl font-display leading-none mb-4 opacity-30">
                      "
                    </div>
                    <StarRating rating={Number(testimonial.rating)} />
                    <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-6 italic">
                      "{testimonial.review}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold flex items-center justify-center">
                        <span className="text-background text-xs font-bold">
                          {testimonial.customerName.charAt(0)}
                        </span>
                      </div>
                      <span className="text-foreground text-sm font-semibold">
                        {testimonial.customerName}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/assets/generated/shop-interior.dim_1200x800.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto space-y-6"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              Ready for a Transformation?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold text-white"
            >
              Your Best Look Starts Here
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg">
              Book your appointment today and experience the art of premium
              grooming.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
            >
              <Link to="/book" className="btn-gold text-xs">
                Book Appointment
              </Link>
              <a href="tel:+15551234567" className="btn-outline-gold text-xs">
                <Phone size={16} className="mr-2" />
                Call Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Info Strip ───────────────────────────────────────── */}
      <section className="bg-section-dark border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-gold flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-gold" />
              </div>
              <div>
                <p
                  className="text-xs text-muted-foreground uppercase tracking-widest mb-1"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Location
                </p>
                <p className="text-foreground text-sm">
                  123 Barber Street, New York, NY
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-gold flex items-center justify-center shrink-0">
                <Phone size={20} className="text-gold" />
              </div>
              <div>
                <p
                  className="text-xs text-muted-foreground uppercase tracking-widest mb-1"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Phone
                </p>
                <a
                  href="tel:+15551234567"
                  className="text-foreground text-sm hover:text-gold transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-gold flex items-center justify-center shrink-0">
                <Clock size={20} className="text-gold" />
              </div>
              <div>
                <p
                  className="text-xs text-muted-foreground uppercase tracking-widest mb-1"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Hours
                </p>
                <p className="text-foreground text-sm">
                  Mon–Sat 9am–8pm · Sun 10am–6pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
