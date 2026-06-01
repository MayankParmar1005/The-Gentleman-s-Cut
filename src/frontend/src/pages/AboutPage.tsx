import { Link } from "@tanstack/react-router";
import { Award, CheckCircle, Scissors, Users } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const values = [
  "Precision cuts tailored to each individual",
  "Premium products from top grooming brands",
  "Clean, hygienic tools sterilized between every client",
  "Warm, welcoming atmosphere for all gentlemen",
  "Continuous education in modern barbering techniques",
  "Personalized consultations with every visit",
];

const stats = [
  { icon: Award, value: "15+", label: "Years of Excellence" },
  { icon: Users, value: "5,000+", label: "Happy Clients" },
  { icon: Scissors, value: "5", label: "Master Barbers" },
];

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-section-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(/assets/generated/hero-barber.dim_1920x1080.jpg)",
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              About Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="section-heading text-5xl md:text-6xl"
            >
              Our <span className="text-gold">Story</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold mx-auto" />
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              A legacy of craftsmanship, precision, and gentlemanly service
              since 2010.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold/10 border-y border-gold/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <stat.icon size={28} className="text-gold mb-3" />
                <span className="font-display text-4xl font-bold text-gold">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-sm mt-1 tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src="/assets/generated/shop-interior.dim_1200x800.jpg"
                alt="The Gentleman's Cut interior"
                className="w-full h-auto object-cover"
              />
              {/* Gold accent frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold -z-10" />
              {/* Badge */}
              <div className="absolute -top-4 -left-4 bg-gold text-background px-6 py-3">
                <span className="font-display text-sm font-bold">
                  Est. 2010
                </span>
              </div>
            </motion.div>

            {/* Text */}
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
                Who We Are
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold"
              >
                The Art of the <span className="text-gold">Perfect Cut</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="divider-gold" />
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed"
              >
                The Gentleman's Cut was born from a simple yet powerful belief:
                every man deserves to look and feel his absolute best. Founded
                in 2010 by master barber Jonathan Cross, our shop has grown from
                a single chair to one of New York's most celebrated grooming
                destinations.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed"
              >
                We combine the timeless traditions of classic barbering — the
                hot towel, the straight razor, the meticulous detail work — with
                the freshness and versatility demanded by today's modern
                gentleman. Every visit is a ritual, every cut a masterpiece.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/book" className="btn-gold text-xs">
                  Book Your Experience
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-section-dark py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Mission */}
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
                Our Mission
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl font-bold"
              >
                Elevating the Standard of{" "}
                <span className="text-gold">Men's Grooming</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="divider-gold" />
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed"
              >
                Our mission is to provide an unparalleled grooming experience
                that honors the craft of barbering while embracing modern style.
                We believe in creating a welcoming space where every gentleman
                feels valued, respected, and leaves looking his very best.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed"
              >
                We invest in ongoing education for our barbers, sourcing only
                the finest tools and premium products to ensure that every
                service we deliver is nothing short of exceptional.
              </motion.p>
            </motion.div>

            {/* Values */}
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
                Our Values
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl font-bold"
              >
                The <span className="text-gold">Principles</span> We Live By
              </motion.h2>
              <motion.div variants={fadeUp} className="divider-gold" />
              <motion.ul variants={stagger} className="space-y-4">
                {values.map((value) => (
                  <motion.li
                    key={value}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      size={18}
                      className="text-gold mt-0.5 shrink-0"
                    />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {value}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-mid py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto space-y-6"
          >
            <motion.h2 variants={fadeUp} className="section-heading">
              Come Experience <span className="text-gold">The Difference</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg"
            >
              Join thousands of satisfied clients who trust us with their
              grooming needs.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/book" className="btn-gold text-xs">
                Book Appointment
              </Link>
              <Link to="/barbers" className="btn-outline-gold text-xs">
                Meet Our Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
