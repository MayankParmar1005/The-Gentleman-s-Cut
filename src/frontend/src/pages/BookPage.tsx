import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Loader2,
  Phone,
  Scissors,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  useBookAppointment,
  useGetBarbers,
  useGetServices,
} from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function BookPage() {
  const { data: services } = useGetServices();
  const { data: barbers } = useGetBarbers();
  const { mutateAsync: bookAppointment, isPending } = useBookAppointment();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    barber: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.name ||
      !form.phone ||
      !form.service ||
      !form.date ||
      !form.time ||
      !form.barber
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      // Combine date + time into a BigInt nanosecond timestamp
      const dateTimeString = `${form.date}T${form.time}:00`;
      const dateMs = new Date(dateTimeString).getTime();
      const appointmentTime = BigInt(dateMs) * BigInt(1_000_000); // ms to nanoseconds

      await bookAppointment({
        customerName: form.name,
        phone: form.phone,
        service: form.service,
        preferredBarber: form.barber,
        appointmentTime,
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to book appointment. Please try again or call us directly.",
      );
    }
  };

  const defaultServices = [
    "Classic Haircut",
    "Beard Trim",
    "Haircut + Beard Combo",
    "Kids Haircut",
    "Hair Styling",
    "Hair Wash & Blow-Dry",
    "Hot Towel Shave",
  ];

  const defaultBarbers = [
    "Alexander Reid",
    "Marcus Donovan",
    "James Whitfield",
    "Carlos Mendez",
    "Ethan Brooks",
  ];

  const serviceOptions =
    services && services.length > 0
      ? services.map((s) => s.name)
      : defaultServices;

  const barberOptions =
    barbers && barbers.length > 0 ? barbers.map((b) => b.name) : defaultBarbers;

  // Minimum date = today
  const today = new Date().toISOString().split("T")[0];

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
              Schedule Your Visit
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="section-heading text-5xl md:text-6xl"
            >
              Book an <span className="text-gold">Appointment</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold mx-auto" />
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Reserve your chair with one of our master barbers. We'll see you
              soon.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-section-mid py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {submitted ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  data-ocid="book.success_state"
                  className="bg-section-card border border-gold/40 p-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 border-2 border-gold flex items-center justify-center mx-auto">
                    <CheckCircle size={36} className="text-gold" />
                  </div>
                  <h2 className="font-display text-3xl font-bold">
                    Appointment <span className="text-gold">Confirmed!</span>
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-sm">
                      Thank you,{" "}
                      <strong className="text-foreground">{form.name}</strong>!
                      Your appointment has been booked.
                    </p>
                    <p className="text-sm">
                      We've noted your preference for{" "}
                      <strong className="text-gold">{form.barber}</strong> on{" "}
                      <strong className="text-foreground">{form.date}</strong>{" "}
                      at{" "}
                      <strong className="text-foreground">{form.time}</strong>.
                    </p>
                    <p className="text-sm mt-4">
                      We'll reach you at{" "}
                      <strong className="text-foreground">{form.phone}</strong>{" "}
                      to confirm.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          phone: "",
                          service: "",
                          date: "",
                          time: "",
                          barber: "",
                        });
                      }}
                      className="btn-outline-gold text-xs"
                    >
                      Book Another
                    </button>
                    <Link to="/" className="btn-gold text-xs">
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* Form */
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-section-card border border-border p-8 md:p-10 space-y-6"
                >
                  {/* Form header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center">
                      <Scissors size={18} className="text-gold" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold">
                        Your Details
                      </h2>
                      <p className="text-muted-foreground text-xs">
                        All fields are required
                      </p>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="book-name"
                      className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      <User size={12} className="text-gold" />
                      Full Name
                    </label>
                    <input
                      id="book-name"
                      data-ocid="book.name_input"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-section-dark border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-200"
                      autoComplete="name"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label
                      htmlFor="book-phone"
                      className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      <Phone size={12} className="text-gold" />
                      Phone Number
                    </label>
                    <input
                      id="book-phone"
                      data-ocid="book.phone_input"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-section-dark border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-200"
                      autoComplete="tel"
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label
                      htmlFor="book-service"
                      className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      <Scissors size={12} className="text-gold" />
                      Service
                    </label>
                    <div className="relative">
                      <select
                        id="book-service"
                        data-ocid="book.service_select"
                        value={form.service}
                        onChange={(e) =>
                          handleChange("service", e.target.value)
                        }
                        className="w-full bg-section-dark border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-200 appearance-none cursor-pointer"
                      >
                        <option
                          value=""
                          disabled
                          className="text-muted-foreground"
                        >
                          Select a service
                        </option>
                        {serviceOptions.map((svc) => (
                          <option
                            key={svc}
                            value={svc}
                            className="bg-section-dark"
                          >
                            {svc}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="book-date"
                        className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest"
                        style={{ letterSpacing: "0.12em" }}
                      >
                        <Calendar size={12} className="text-gold" />
                        Date
                      </label>
                      <input
                        id="book-date"
                        data-ocid="book.date_input"
                        type="date"
                        value={form.date}
                        min={today}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className="w-full bg-section-dark border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-200 [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="book-time"
                        className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest"
                        style={{ letterSpacing: "0.12em" }}
                      >
                        <Clock size={12} className="text-gold" />
                        Time
                      </label>
                      <input
                        id="book-time"
                        data-ocid="book.time_input"
                        type="time"
                        value={form.time}
                        min="09:00"
                        max="20:00"
                        onChange={(e) => handleChange("time", e.target.value)}
                        className="w-full bg-section-dark border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-200 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Barber */}
                  <div className="space-y-2">
                    <label
                      htmlFor="book-barber"
                      className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      <User size={12} className="text-gold" />
                      Preferred Barber
                    </label>
                    <div className="relative">
                      <select
                        id="book-barber"
                        data-ocid="book.barber_select"
                        value={form.barber}
                        onChange={(e) => handleChange("barber", e.target.value)}
                        className="w-full bg-section-dark border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-200 appearance-none cursor-pointer"
                      >
                        <option
                          value=""
                          disabled
                          className="text-muted-foreground"
                        >
                          Select a barber
                        </option>
                        <option
                          value="No Preference"
                          className="bg-section-dark"
                        >
                          No Preference
                        </option>
                        {barberOptions.map((barber) => (
                          <option
                            key={barber}
                            value={barber}
                            className="bg-section-dark"
                          >
                            {barber}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Error state */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      data-ocid="book.error_state"
                      className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 px-4 py-3"
                    >
                      <AlertCircle
                        size={16}
                        className="text-destructive shrink-0"
                      />
                      <p className="text-destructive text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    data-ocid="book.submit_button"
                    disabled={isPending}
                    className="w-full btn-gold justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <Loader2
                          size={18}
                          className="mr-2 animate-spin"
                          data-ocid="book.loading_state"
                        />
                        Booking...
                      </>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </button>

                  <p className="text-muted-foreground text-xs text-center">
                    By booking, you agree to our cancellation policy. Need to
                    cancel?{" "}
                    <Link to="/contact" className="text-gold hover:underline">
                      Contact us
                    </Link>
                    .
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-section-dark border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "⏱",
                title: "Punctual Service",
                desc: "We respect your time. Appointments start as scheduled.",
              },
              {
                icon: "✂",
                title: "Free Consultation",
                desc: "Not sure what to book? Come in for a free 10-min consultation.",
              },
              {
                icon: "📞",
                title: "Easy Cancellation",
                desc: "Cancel or reschedule up to 24 hours before your appointment.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="space-y-3"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-display text-base font-bold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
