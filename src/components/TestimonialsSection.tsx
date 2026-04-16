import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Their collaborative approach to architectural design resulted in a space that perfectly balances form and function. An exceptional team to work with.",
    author: "Herman Sterling",
    role: "Property Developer",
  },
  {
    text: "From concept to completion, the attention to detail and creative vision exceeded every expectation. Our offices have been transformed into an inspiring workspace.",
    author: "Joanna Mercer",
    role: "CEO, Apex Holdings",
  },
  {
    text: "A design studio that truly listens. They understood our vision and delivered a home that feels both timeless and thoroughly modern. Highly recommended.",
    author: "Michael Rosen",
    role: "Private Client",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  return (
    <section className="section-padding bg-dark">
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="text-olive mx-auto mb-8" size={40} />

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="heading-sm text-dark-foreground leading-relaxed italic mb-8 font-normal">
              "{testimonials[current].text}"
            </p>
            <p className="text-dark-foreground font-medium">{testimonials[current].author}</p>
            <p className="body-sm text-warm-grey mt-1">{testimonials[current].role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={prev} className="p-2 border border-warm-grey/30 hover:border-olive transition-colors">
            <ChevronLeft size={18} className="text-warm-grey" />
          </button>
          <span className="text-xs text-warm-grey tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button onClick={next} className="p-2 border border-warm-grey/30 hover:border-olive transition-colors">
            <ChevronRight size={18} className="text-warm-grey" />
          </button>
        </div>
      </div>
    </section>
  );
}
