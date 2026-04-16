import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetailPage,
  head: ({ params }) => {
    const service = services.find((s) => s.id === params.serviceId);
    const title = service ? `${service.title} — ARCAN Studio` : "Service — ARCAN Studio";
    const desc = service?.description?.slice(0, 155) ?? "Architecture service by ARCAN Studio.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6">
      <h1 className="heading-lg">Service not found</h1>
      <Link to="/" className="label-text hover:text-foreground transition-colors">← Back to home</Link>
    </div>
  ),
});

/* ── Lightbox ── */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];
  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-dark-foreground/70 hover:text-dark-foreground transition-colors z-10">
          <X size={28} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-dark-foreground/50 hover:text-dark-foreground transition-colors z-10"
        >
          <ChevronLeft size={36} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-dark-foreground/50 hover:text-dark-foreground transition-colors z-10"
        >
          <ChevronRight size={36} />
        </button>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.src} alt={img.caption} className="max-w-full max-h-[75vh] object-contain" />
          <p className="text-dark-foreground/70 text-sm tracking-wide">{img.caption}</p>
          <p className="text-dark-foreground/40 text-xs">{index + 1} / {images.length}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Page ── */
function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const service = services.find((s) => s.id === serviceId);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6">
        <h1 className="heading-lg">Service not found</h1>
        <Link to="/" className="label-text hover:text-foreground transition-colors">← Back to home</Link>
      </div>
    );
  }

  const currentIndex = services.findIndex((s) => s.id === serviceId);
  const nextService = services[(currentIndex + 1) % services.length];
  const fade = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + service.gallery.length) % service.gallery.length : null));
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % service.gallery.length : null));

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox images={service.gallery} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 pb-12 md:pb-20">
          <motion.div {...fade} transition={{ duration: 0.8, delay: 0.3 }}>
            <p className="label-text text-olive mb-4">Our Services</p>
            <h1 className="heading-xl text-dark-foreground mb-4">{service.title}</h1>
            <p className="text-dark-foreground/70 text-lg md:text-xl max-w-xl italic">{service.tagline}</p>
          </motion.div>
        </div>
        <Link to="/" hash="services" className="absolute top-24 left-6 md:left-12 lg:left-24 flex items-center gap-2 text-dark-foreground/70 hover:text-dark-foreground transition-colors text-sm">
          <ArrowLeft size={16} />
          <span className="uppercase tracking-widest text-xs">Back</span>
        </Link>
      </section>

      {/* Overview + What We Offer */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">Overview</p>
            <h2 className="heading-md text-foreground mb-6">About This Service</h2>
            <p className="body-lg text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">What we offer</p>
            <div className="space-y-4 mt-2">
              {service.features.map((feature, i) => (
                <div key={i} className={`flex items-start gap-3 pb-3 ${i < service.features.length - 1 ? "border-b border-border" : ""}`}>
                  <CheckCircle size={16} className="text-olive mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery — Masonry Bento Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial" className="mb-12">
            <p className="label-text mb-4">Gallery</p>
            <h2 className="heading-md text-foreground">Our Work</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
            {service.gallery.map((img, i) => {
              const spanClass =
                img.span === "wide"
                  ? "col-span-2 row-span-1"
                  : img.span === "tall"
                    ? "col-span-1 row-span-2"
                    : "col-span-1 row-span-1";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`group relative overflow-hidden cursor-pointer ${spanClass}`}
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/60 transition-all duration-500 flex items-end">
                    <div className="p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-dark-foreground text-sm font-medium">{img.caption}</p>
                      <p className="text-dark-foreground/50 text-xs mt-1">Click to enlarge</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial" className="mb-12">
            <p className="label-text mb-4">How we work</p>
            <h2 className="heading-md text-foreground">Our Process</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-6 hover:border-muted-foreground/30 transition-colors"
              >
                <span className="text-olive text-3xl font-light">{step.step}</span>
                <h3 className="heading-sm text-foreground mt-4 mb-3">{step.title}</h3>
                <p className="body-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">Ready to start?</p>
            <h2 className="heading-lg text-foreground mb-8">Let's discuss your project</h2>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Next Service */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <p className="label-text mb-4">Explore next</p>
          <Link to="/services/$serviceId" params={{ serviceId: nextService.id }} className="group inline-flex flex-col items-center gap-4">
            <h2 className="heading-lg text-foreground group-hover:text-muted-foreground transition-colors">{nextService.title}</h2>
            <ArrowUpRight size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
