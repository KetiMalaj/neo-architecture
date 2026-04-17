import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import team1 from "@/assets/team-1.jpg";

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="label-text mb-4">Our people</p>
          <h2 className="heading-lg text-foreground">Creative Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="img-hover-zoom aspect-[3/4]">
              <img
                src={team1}
                alt="Marcus Hale"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                width={600}
                height={800}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="label-text text-olive mb-3">Principal Architect</p>
            <h3 className="heading-md text-foreground mb-6">Marcus Hale</h3>
            <p className="body-lg text-muted-foreground leading-relaxed mb-6">
              With over 18 years of experience shaping modern spaces, Marcus
              founded ARCAN Studio with a singular vision — architecture that
              serves people first. His work bridges the gap between bold
              contemporary form and quiet, everyday functionality.
            </p>
            <p className="body-lg text-muted-foreground leading-relaxed mb-8">
              A graduate of the Architectural Association in London, Marcus has
              led projects spanning residential estates, cultural institutions,
              and mixed-use developments across Europe and the Mediterranean. His
              design philosophy centers on honest materials, natural light, and
              spaces that age gracefully.
            </p>
            <div className="space-y-4">
              {[
                ["Experience", "18+ years"],
                ["Projects Led", "120+"],
                ["Specialization", "Modern residential & cultural spaces"],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className={`flex justify-between pb-3 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-muted-foreground text-sm">{label}</span>
                  <span className="text-foreground text-sm font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
