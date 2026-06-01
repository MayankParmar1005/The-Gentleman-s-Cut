import { X, ZoomIn } from "lucide-react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const galleryImages = [
  {
    src: "/assets/generated/gallery-haircut-1.dim_800x800.jpg",
    alt: "Precision haircut by master barber",
    category: "Haircuts",
    title: "The Classic Taper",
  },
  {
    src: "/assets/generated/gallery-beard-1.dim_800x800.jpg",
    alt: "Expert beard styling and shaping",
    category: "Beard",
    title: "Beard Sculpture",
  },
  {
    src: "/assets/generated/gallery-tools.dim_800x800.jpg",
    alt: "Professional barber tools",
    category: "Tools",
    title: "Tools of the Trade",
  },
  {
    src: "/assets/generated/gallery-styling.dim_800x800.jpg",
    alt: "Premium hair styling",
    category: "Styling",
    title: "Modern Pompadour",
  },
  {
    src: "/assets/generated/gallery-shave.dim_800x800.jpg",
    alt: "Hot towel straight razor shave",
    category: "Shave",
    title: "The Royal Shave",
  },
  {
    src: "/assets/generated/gallery-shop.dim_800x800.jpg",
    alt: "The Gentleman's Cut shop interior",
    category: "Interior",
    title: "Our Space",
  },
  {
    src: "/assets/generated/shop-interior.dim_1200x800.jpg",
    alt: "Premium barber shop interior",
    category: "Interior",
    title: "The Gentleman's Cut",
  },
];

const categories = [
  "All",
  "Haircuts",
  "Beard",
  "Styling",
  "Shave",
  "Interior",
  "Tools",
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  const filtered =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

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
              Portfolio
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="section-heading text-5xl md:text-6xl"
            >
              Our <span className="text-gold">Gallery</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold mx-auto" />
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              A visual showcase of our craft — from precision cuts to masterful
              beard work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-section-mid border-y border-border py-6 sticky top-20 z-30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 text-xs tracking-widest uppercase px-5 py-2 transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-gold text-background"
                    : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
                style={{ letterSpacing: "0.12em" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-section-dark py-16">
        <div className="container mx-auto px-6">
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((image, idx) => (
              <motion.div
                key={image.src}
                variants={fadeUp}
                className={`group relative overflow-hidden cursor-pointer ${idx === 0 && activeFilter === "All" ? "sm:col-span-2 sm:row-span-2" : ""}`}
                onClick={() => setSelectedImage(image)}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    paddingBottom:
                      idx === 0 && activeFilter === "All" ? "60%" : "100%",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-400 flex flex-col items-center justify-center gap-3">
                    <ZoomIn
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-center px-4">
                      <p
                        className="text-gold text-xs tracking-widest uppercase"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {image.category}
                      </p>
                      <p className="text-white font-display text-lg font-bold mt-1">
                        {image.title}
                      </p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-gold/90 text-background px-3 py-1 text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p
                  className="text-gold text-xs tracking-widest uppercase"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {selectedImage.category}
                </p>
                <p className="text-white font-display text-xl font-bold">
                  {selectedImage.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-background/80 flex items-center justify-center hover:bg-gold hover:text-background transition-all duration-200"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram strip */}
      <section className="bg-section-mid border-t border-border py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            <motion.p variants={fadeUp} className="section-subheading text-xs">
              Follow Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold"
            >
              @GentlemansCut on <span className="text-gold">Instagram</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-sm"
            >
              Follow us for daily inspiration and behind-the-scenes content.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-xs"
              >
                Follow on Instagram
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
