import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { services } from "@/data/services";

// Duplicate for seamless loop
const loopedServices = [...services, ...services];

export default function ServicesSection() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(0.5); // px per frame

  // Continuous smooth scroll via rAF
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let running = true;
    const tick = () => {
      if (!paused && el) {
        el.scrollLeft += speedRef.current;
        // When we've scrolled past the first set, jump back seamlessly
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      if (running) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [paused]);

  const scroll = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (cardW + 24), behavior: "smooth" });
  }, []);

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="label-text text-olive mb-4">Architecture services</p>
            <h2 className="heading-lg text-dark-foreground">
              We create<br />
              <span className="italic font-normal text-warm-grey">modernity</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => { setPaused(true); scroll(-1); setTimeout(() => setPaused(false), 1500); }}
              className="w-11 h-11 rounded-full border border-warm-grey/30 flex items-center justify-center text-warm-grey hover:text-dark-foreground hover:border-dark-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => { setPaused(true); scroll(1); setTimeout(() => setPaused(false), 1500); }}
              className="w-11 h-11 rounded-full border border-warm-grey/30 flex items-center justify-center text-warm-grey hover:text-dark-foreground hover:border-dark-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {loopedServices.map((s, i) => (
            <motion.div
              key={`${s.title}-${i}`}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: (i % services.length) * 0.15 }}
              className="group shrink-0 w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(25%-18px)]"
            >
              <Link to="/services/$serviceId" params={{ serviceId: s.id }} className="block cursor-pointer">
                <div className="img-hover-zoom aspect-[4/5] mb-5">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" width={600} height={600} />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="heading-sm text-dark-foreground group-hover:text-olive transition-colors duration-300">{s.title}</h3>
                    <p className="body-sm text-warm-grey mt-2 max-w-[220px]">{s.desc}</p>
                  </div>
                  <ArrowUpRight className="text-warm-grey group-hover:text-olive transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 mt-1 shrink-0" size={18} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
