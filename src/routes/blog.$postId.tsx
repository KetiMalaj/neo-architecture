import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/blogStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/blog/$postId")({
  component: BlogDetailPage,
  head: ({ params }) => {
    const posts = getBlogPosts();
    const post = posts.find((p) => p.id === params.postId);
    const title = post ? `${post.title} — ARCAN Studio` : "Blog — ARCAN Studio";
    const desc = post?.description?.slice(0, 155) ?? "Blog article by ARCAN Studio.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6">
      <h1 className="heading-lg">Article not found</h1>
      <Link to="/" className="label-text hover:text-foreground transition-colors">
        ← Back to home
      </Link>
    </div>
  ),
});

const fade = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

function BlogDetailPage() {
  const { postId } = Route.useParams();
  const posts = getBlogPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-6">
        <h1 className="heading-lg">Article not found</h1>
        <Link to="/" className="label-text hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </div>
    );
  }

  const currentIndex = posts.findIndex((p) => p.id === postId);
  const otherPosts = posts.filter((p) => p.id !== postId);

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <motion.img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 pb-12 md:pb-20">
          <motion.div {...fade} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="label-text text-olive">{post.category}</span>
              <span className="w-6 h-px bg-dark-foreground/30" />
              <span className="text-dark-foreground/70 text-sm flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </span>
            </div>
            <h1 className="heading-xl text-dark-foreground max-w-4xl">{post.title}</h1>
          </motion.div>
        </div>
        <Link
          to="/"
          className="absolute top-24 left-6 md:left-12 lg:left-24 flex items-center gap-2 text-dark-foreground/70 hover:text-dark-foreground transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          <span className="uppercase tracking-widest text-xs">Back</span>
        </Link>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial">
            <div className="flex items-center gap-3 mb-8">
              <Tag size={14} className="text-olive" />
              <span className="label-text text-olive">{post.category}</span>
              <span className="w-6 h-px bg-border" />
              <span className="body-sm text-muted-foreground">{post.date}</span>
            </div>
            <div className="prose prose-lg max-w-none">
              {post.description ? (
                post.description.split("\n\n").map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="body-lg text-muted-foreground leading-relaxed mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))
              ) : (
                <p className="body-lg text-muted-foreground leading-relaxed">
                  This article is coming soon. Check back later for the full content.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Articles */}
      {otherPosts.length > 0 && (
        <section className="section-padding bg-card">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade} transition={{ duration: 0.7 }} viewport={{ once: true }} whileInView="animate" initial="initial" className="mb-12">
              <p className="label-text mb-4">Keep reading</p>
              <h2 className="heading-md text-foreground">More Articles</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherPosts.slice(0, 3).map((other, i) => (
                <motion.div
                  key={other.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to="/blog/$postId" params={{ postId: other.id }} className="group block">
                    <div className="img-hover-zoom aspect-[4/3] mb-5">
                      <img src={other.img} alt={other.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label-text text-olive">{other.category}</span>
                      <span className="w-6 h-px bg-border" />
                      <span className="body-sm text-muted-foreground">{other.date}</span>
                    </div>
                    <h3 className="heading-sm text-foreground group-hover:text-olive transition-colors duration-300 leading-snug">
                      {other.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
