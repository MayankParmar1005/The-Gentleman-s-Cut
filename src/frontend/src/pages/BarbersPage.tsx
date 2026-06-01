import { Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { motion } from "motion/react";
import { useGetBarbers } from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const barberImages = [
  "/assets/generated/barber-1.dim_600x800.jpg",
  "/assets/generated/barber-2.dim_600x800.jpg",
  "/assets/generated/barber-3.dim_600x800.jpg",
  "/assets/generated/barber-4.dim_600x800.jpg",
  "/assets/generated/barber-5.dim_600x800.jpg",
];

const defaultBarbers = [
  {
    name: "Alexander Reid",
    specialty: "Classic & Modern Cuts",
    experience: BigInt(12),
  },
  {
    name: "Marcus Donovan",
    specialty: "Beard Sculpting & Shaping",
    experience: BigInt(9),
  },
  {
    name: "James Whitfield",
    specialty: "Fade & Taper Specialist",
    experience: BigInt(7),
  },
  {
    name: "Carlos Mendez",
    specialty: "Creative & Textured Styles",
    experience: BigInt(6),
  },
  {
    name: "Ethan Brooks",
    specialty: "Hot Towel & Straight Razor",
    experience: BigInt(11),
  },
];

const ocids = [
  "barbers.item.1",
  "barbers.item.2",
  "barbers.item.3",
  "barbers.item.4",
  "barbers.item.5",
];

export default function BarbersPage() {
  const { data: barbers, isLoading } = useGetBarbers();
  const displayBarbers =
    barbers && barbers.length > 0 ? barbers : defaultBarbers;

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
              Our Team
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="section-heading text-5xl md:text-6xl"
            >
              Master <span className="text-gold">Barbers</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold mx-auto" />
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Five exceptional craftsmen, each a master in their specialty.
              United by a passion for precision, style, and the art of grooming.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Barbers Grid */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div
              data-ocid="barbers.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-section-card border border-border animate-pulse"
                >
                  <div className="aspect-[3/4] bg-border" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-border rounded w-3/4" />
                    <div className="h-3 bg-border rounded w-1/2" />
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayBarbers.map((barber, idx) => (
                <motion.div
                  key={barber.name}
                  variants={fadeUp}
                  data-ocid={ocids[idx]}
                  className="group bg-section-card border border-border hover:border-gold transition-all duration-400 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={barberImages[idx]}
                      alt={barber.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-400 flex items-center justify-center">
                      <Link
                        to="/book"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 btn-gold text-xs transform translate-y-4 group-hover:translate-y-0"
                      >
                        Book with {barber.name.split(" ")[0]}
                      </Link>
                    </div>

                    {/* Experience badge */}
                    <div className="absolute top-4 right-4 bg-gold text-background px-3 py-1">
                      <span className="text-xs font-bold">
                        {Number(barber.experience)}+ yrs
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 border-t border-border group-hover:border-gold transition-colors duration-300">
                    <h3 className="font-display text-xl font-bold group-hover:text-gold transition-colors duration-200 mb-1">
                      {barber.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Scissors size={12} className="text-gold" />
                      <p className="text-gold text-xs tracking-wide">
                        {barber.specialty}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs mt-2">
                      {Number(barber.experience)} years of professional
                      experience
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* "Our Team" decorative card */}
              <motion.div
                variants={fadeUp}
                className="bg-section-dark border border-gold/20 p-8 flex flex-col items-center justify-center text-center gap-6 sm:col-span-2 lg:col-span-1"
              >
                <div className="w-16 h-16 border border-gold flex items-center justify-center">
                  <Scissors size={28} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    Join Our <span className="text-gold">Team</span>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Are you a passionate barber looking to elevate your craft?
                    We're always looking for exceptional talent.
                  </p>
                  <a
                    href="mailto:careers@gentlemanscut.com"
                    className="btn-outline-gold text-xs"
                  >
                    Get in Touch
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
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
              Ready to Book with a <span className="text-gold">Master?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground">
              Choose your preferred barber and schedule your appointment today.
            </motion.p>
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
