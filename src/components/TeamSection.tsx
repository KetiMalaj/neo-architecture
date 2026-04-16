import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

const team = [
  { img: team1, name: "Marcus Hale", role: "Principal Architect" },
  { img: team2, name: "Elena Voss", role: "Design Director" },
  { img: team3, name: "David Chen", role: "Project Lead" },
  { img: team4, name: "Sofia Martell", role: "Interior Specialist" },
];

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="label-text mb-4">Our people</p>
          <h2 className="heading-lg text-foreground">Creative Team</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group"
            >
              <div className="img-hover-zoom aspect-[3/4] mb-4">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" width={600} height={800} />
              </div>
              <h4 className="heading-sm text-foreground">{t.name}</h4>
              <p className="body-sm text-muted-foreground mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
