import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export interface BlogPost {
  id: string;
  img: string;
  category: string;
  title: string;
  date: string;
}

const defaultPosts: BlogPost[] = [
  { id: "story-of-intention", img: blog1, category: "Architecture", title: "Every designed space tells a story of intention.", date: "Apr 10, 2026" },
  { id: "building-green", img: blog2, category: "Sustainability", title: "Building green is building for the future.", date: "Mar 22, 2026" },
  { id: "function-with-beauty", img: blog3, category: "Interior", title: "The art of combining function with beauty.", date: "Feb 15, 2026" },
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
