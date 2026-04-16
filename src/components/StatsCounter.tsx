import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "280+", label: "Projects" },
  { value: "150+", label: "Clients" },
  { value: "45+", label: "Awards" },
  { value: "16", label: "Years" },
];

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section-padding-sm bg-light-grey" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="font-display text-4xl md:text-5xl font-bold text-foreground">{s.value}</span>
            <p className="label-text mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
