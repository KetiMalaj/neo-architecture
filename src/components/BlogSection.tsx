import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const posts = [
  { img: blog1, category: "Architecture", title: "Every designed space tells a story of intention.", date: "Apr 10, 2026" },
  { img: blog2, category: "Sustainability", title: "Building green is building for the future.", date: "Mar 22, 2026" },
  { img: blog3, category: "Interior", title: "The art of combining function with beauty.", date: "Feb 15, 2026" },
];

export default function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="label-text mb-4">Architecture news</p>
            <h2 className="heading-md text-foreground">Latest Articles</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="img-hover-zoom aspect-[4/3] mb-5">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="label-text text-olive">{post.category}</span>
                <span className="w-6 h-px bg-border" />
                <span className="body-sm text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="heading-sm text-foreground group-hover:text-olive transition-colors duration-300 leading-snug">
                {post.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs uppercase tracking-widest text-olive">Read more</span>
                <ArrowUpRight size={14} className="text-olive" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
