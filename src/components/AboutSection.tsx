import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <AnimatedBlock>
              <p className="label-text mb-4">About our studio</p>
              <h2 className="heading-md text-foreground mb-8">
                Delivering outstanding quality, effective and inspiring built spaces.
              </h2>
            </AnimatedBlock>
            <AnimatedBlock delay={0.2}>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-7xl font-bold text-olive">16</span>
                <span className="text-muted-foreground body-sm">Established for 16 years.</span>
              </div>
              <p className="body-lg text-muted-foreground max-w-lg">
                We are dedicated to providing outstanding architectural and design services that meet the functional and aesthetic needs of modern living.
              </p>
            </AnimatedBlock>
          </div>

          {/* Right - Stats */}
          <div className="space-y-8 pt-4 lg:pt-16">
            {[
              { num: "350+", text: "Very satisfied clients around the worldwide." },
              { num: "200+", text: "Award winning architecture agency." },
              { num: "500+", text: "Buildings constructed with our studio." },
            ].map((stat, i) => (
              <AnimatedBlock key={i} delay={0.1 * (i + 1)}>
                <div className="flex gap-6 items-start border-b border-border pb-6">
                  <span className="label-text text-olive">0{i + 1}</span>
                  <div>
                    <span className="font-display text-2xl font-bold text-foreground">{stat.num}</span>
                    <p className="body-sm text-muted-foreground mt-1">{stat.text}</p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
