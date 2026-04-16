import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import caseStudyImg from "@/assets/case-study.jpg";

const awards = [
  { year: "2008", title: "Architecture project of the year", cat: "Architecture" },
  { year: "2014", title: "Best interior design award", cat: "Interior" },
  { year: "2020", title: "Outstanding landscape project", cat: "Landscape" },
  { year: "2024", title: "Studio of the year finalist", cat: "Architecture" },
];

export default function CaseStudySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative">
      {/* Large visual */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img src={caseStudyImg} alt="Featured case study" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <p className="label-text text-olive mb-4">Case highlight</p>
            <h2 className="heading-lg text-dark-foreground max-w-3xl mx-auto">
              We love architecture and interior design
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Awards */}
      <div className="section-padding bg-secondary" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="label-text mb-4">International awards</p>
            <h3 className="heading-md text-foreground">These awards reflect the hard work.</h3>
          </motion.div>

          <div className="space-y-0">
            {awards.map((a, i) => (
              <motion.div
                key={a.year}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center justify-between py-6 border-b border-border group cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  <span className="font-display text-2xl font-bold text-olive">{a.year}</span>
                  <span className="body-lg text-foreground group-hover:text-olive transition-colors">{a.title}</span>
                </div>
                <span className="label-text hidden md:block">{a.cat}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
