import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export interface BlogPost {
  id: string;
  img: string;
  category: string;
  title: string;
  date: string;
  description: string;
}

const defaultPosts: BlogPost[] = [
  { id: "story-of-intention", img: blog1, category: "Architecture", title: "Every designed space tells a story of intention.", date: "Apr 10, 2026", description: "Architecture is more than structure — it is a language of intent. Every wall, window, and corridor speaks to the vision of its creator and the needs of those who inhabit the space. In this article, we explore how deliberate design choices transform ordinary buildings into meaningful environments that resonate with purpose and beauty.\n\nFrom the orientation of a facade to capture natural light, to the selection of materials that age gracefully, each decision in the design process carries weight. Great architecture doesn't happen by accident — it emerges from a deep understanding of context, culture, and human experience.\n\nAt ARCAN Studio, we believe that the most powerful spaces are those where every element has been considered with intention. Whether designing a private residence or a public landmark, our approach begins with listening — to the site, to the client, and to the story waiting to be told through built form." },
  { id: "building-green", img: blog2, category: "Sustainability", title: "Building green is building for the future.", date: "Mar 22, 2026", description: "Sustainable architecture is no longer a trend — it is a responsibility. As the built environment accounts for nearly 40% of global carbon emissions, architects and designers hold a crucial role in shaping a more sustainable future. Green building practices are not just about reducing harm; they are about creating spaces that actively contribute to the health of our planet.\n\nFrom passive solar design and green roofs to the use of reclaimed materials and energy-efficient systems, sustainable strategies can be woven into every stage of a project. The result is architecture that performs better, lasts longer, and leaves a lighter footprint.\n\nAt ARCAN Studio, sustainability is embedded in our design philosophy. We see every project as an opportunity to demonstrate that environmental responsibility and exceptional design are not opposing forces — they are complementary. Building green is not a compromise; it is an elevation of the craft." },
  { id: "function-with-beauty", img: blog3, category: "Interior", title: "The art of combining function with beauty.", date: "Feb 15, 2026", description: "The finest interiors are those where beauty and utility exist in perfect harmony. A space that looks stunning but fails to serve its occupants is merely decoration; a space that functions well but lacks aesthetic consideration feels incomplete. The true art of interior design lies in the seamless integration of both.\n\nThis balance requires a deep understanding of how people move through and interact with their environments. Thoughtful material choices, intuitive layouts, and carefully curated lighting all contribute to spaces that feel as good as they look.\n\nAt ARCAN Studio, we approach interior design with the same rigor we bring to our architectural work. Every surface, fixture, and piece of furniture is selected not just for its visual appeal, but for how it enhances the daily experience of the space. The result is interiors that are timeless, functional, and deeply personal." },
];

const STORAGE_KEY = "arcan_blog_posts";

export function getBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // fall through to defaults
  }
  return defaultPosts;
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function addBlogPost(post: BlogPost) {
  const posts = getBlogPosts();
  posts.push(post);
  saveBlogPosts(posts);
}

export function updateBlogPost(id: string, updated: BlogPost) {
  const posts = getBlogPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    posts[idx] = updated;
    saveBlogPosts(posts);
  }
}

export function deleteBlogPost(id: string) {
  const posts = getBlogPosts().filter((p) => p.id !== id);
  saveBlogPosts(posts);
}

export function generateBlogId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
