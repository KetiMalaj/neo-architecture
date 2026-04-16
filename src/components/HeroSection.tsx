import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { image: hero1, title: "Rustic\nInterior", num: "01" },
  { image: hero2, title: "Modern\nLiving", num: "02" },
  { image: hero3, title: "Urban\nOffice", num: "03" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title.replace("\n", " ")}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-dark/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="label-text text-dark-foreground/70 mb-4">EXPLORE PROJECT</p>
            <h1 className="heading-xl text-dark-foreground whitespace-pre-line">{slide.title}</h1>
          </motion.div>
        </AnimatePresence>

        {/* Slide number */}
        <div className="absolute left-6 md:left-12 lg:left-24 bottom-20 md:bottom-32">
          <span className="font-display text-8xl md:text-9xl font-bold text-olive/30 leading-none select-none" style={{ WebkitTextStroke: "1px" }}>
            {slide.num}
          </span>
        </div>

        {/* Indicators */}
        <div className="absolute right-6 md:right-12 lg:right-24 bottom-20 md:bottom-32 flex gap-3 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-500 ${
                i === current ? "w-12 bg-dark-foreground" : "w-6 bg-dark-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 z-10 flex flex-col gap-4">
        {["Fb.", "Tw.", "In."].map((s) => (
          <a key={s} href="#" className="text-xs text-dark-foreground/70 hover:text-dark-foreground transition-colors">{s}</a>
        ))}
      </div>
    </section>
  );
}
