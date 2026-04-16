import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, User, Maximize, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjects } from "@/lib/projectStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetailPage,
  head: ({ params }) => {
    const allProjects = getProjects();
    const project = allProjects.find((p) => p.id === params.projectId);
    const title = project ? `${project.title} — ARCAN Studio` : "Project — ARCAN Studio";
    const desc = project?.description?.slice(0, 155) ?? "Architecture project by ARCAN Studio.";
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
      <h1 className="heading-lg">Project not found</h1>
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
        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 text-dark-foreground/70 hover:text-dark-foreground transition-colors z-10">
          <X size={28} />
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-dark-foreground/50 hover:text-dark-foreground transition-colors z-10"
        >
          <ChevronLeft size={36} />
        </button>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-dark-foreground/50 hover:text-dark-foreground transition-colors z-10"
        >
          <ChevronRight size={36} />
        </button>

        {/* Image */}
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
function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6">
        <h1 className="heading-lg">Project not found</h1>
        <Link to="/" className="label-text hover:text-foreground transition-colors">← Back to home</Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const fade = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null));
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % project.gallery.length : null));

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox images={project.gallery} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 pb-12 md:pb-20">
          <motion.div {...fade} transition={{ duration: 0.8, delay: 0.3 }}>
            <p className="label-text text-olive mb-4">{project.category}</p>
            <h1 className="heading-xl text-dark-foreground mb-6">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-dark-foreground/70 text-sm">
              <span className="flex items-center gap-2"><MapPin size={14} /> {project.location}</span>
              <span className="flex items-center gap-2"><Calendar size={14} /> {project.year}</span>
              <span className="flex items-center gap-2"><User size={14} /> {project.client}</span>
              <span className="flex items-center gap-2"><Maximize size={14} /> {project.area}</span>
            </div>
          </motion.div>
        </div>
        <Link to="/" className="absolute top-24 left-6 md:left-12 lg:left-24 flex items-center gap-2 text-dark-foreground/70 hover:text-dark-foreground transition-colors text-sm">
          <ArrowLeft size={16} />
          <span className="uppercase tracking-widest text-xs">Back</span>
        </Link>
      </section>

      {/* Overview + Quick Facts */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">Overview</p>
            <h2 className="heading-md text-foreground mb-6">About the Project</h2>
            <p className="body-lg text-muted-foreground leading-relaxed">{project.description}</p>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">Quick facts</p>
            <div className="space-y-4 mt-2">
              {[
                ["Category", project.category],
                ["Year", project.year],
                ["Location", project.location],
                ["Client", project.client],
                ["Area", project.area],
              ].map(([label, value], i, arr) => (
                <div key={label} className={`flex justify-between pb-3 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                  <span className="text-muted-foreground text-sm">{label}</span>
                  <span className="text-foreground text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Photo Gallery — Masonry Bento Grid ── */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial" className="mb-12">
            <p className="label-text mb-4">Gallery</p>
            <h2 className="heading-md text-foreground">Project in Detail</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
            {project.gallery.map((img, i) => {
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
                  {/* Hover overlay with caption */}
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

      {/* Challenge & Solution */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">The Challenge</p>
            <p className="body-lg text-muted-foreground leading-relaxed">{project.challenge}</p>
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <p className="label-text mb-4">Our Solution</p>
            <p className="body-lg text-muted-foreground leading-relaxed">{project.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Technical Schemas */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial" className="mb-12">
            <p className="label-text mb-4">Specifications</p>
            <h2 className="heading-md text-foreground">Technical Schema</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.schemas.map((schema, i) => (
              <motion.div
                key={schema.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-6 hover:border-muted-foreground/30 transition-colors"
              >
                <p className="label-text mb-3">{schema.label}</p>
                <p className="text-foreground font-medium">{schema.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <p className="label-text mb-4">Next project</p>
          <Link to="/projects/$projectId" params={{ projectId: nextProject.id }} className="group inline-flex flex-col items-center gap-4">
            <h2 className="heading-lg text-foreground group-hover:text-muted-foreground transition-colors">{nextProject.title}</h2>
            <ArrowUpRight size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
