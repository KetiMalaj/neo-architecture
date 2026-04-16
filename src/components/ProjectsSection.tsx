import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getProjects } from "@/lib/projectStore";

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState(getProjects());

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="label-text mb-4">Featured work</p>
          <h2 className="heading-lg text-foreground">Recent Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`group cursor-pointer ${p.tall ? "md:row-span-2" : ""}`}
            >
              <Link to="/projects/$projectId" params={{ projectId: p.id }} className="block">
                <div className={`img-hover-zoom relative ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-all duration-500 flex items-end p-6 md:p-8">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="label-text text-olive mb-2">{p.category}</p>
                      <h3 className="heading-sm text-dark-foreground">{p.title}</h3>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs uppercase tracking-widest text-dark-foreground/80">Explore</span>
                        <ArrowUpRight size={14} className="text-dark-foreground/80" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
