import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  X,
  Save,
  Image,
  ChevronDown,
  ChevronUp,
  GripVertical,
  FileText,
  FolderOpen,
} from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  generateId,
} from "@/lib/projectStore";
import {
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  generateBlogId,
  type BlogPost,
} from "@/lib/blogStore";
import type { Project, ProjectSchema } from "@/data/projects";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  head: () => ({
    meta: [{ title: "Admin Dashboard — ARCAN Studio" }],
  }),
});

/* ── Empty schema / gallery helpers ── */
const emptySchema = (): ProjectSchema => ({ label: "", value: "" });
const emptyGallery = () => ({ src: "", caption: "", span: "normal" as const });

const emptyProject = (): Omit<Project, "id"> => ({
  img: "",
  title: "",
  category: "Architecture",
  tall: false,
  year: new Date().getFullYear().toString(),
  location: "",
  client: "",
  area: "",
  description: "",
  challenge: "",
  solution: "",
  schemas: [emptySchema()],
  gallery: [emptyGallery()],
});

const categories = ["Architecture", "Interior", "Landscape", "Residential", "Commercial", "Hospitality"];

const blogCategories = ["Architecture", "Sustainability", "Interior", "Design", "Technology", "Landscape"];

const emptyBlogPost = (): Omit<BlogPost, "id"> => ({
  img: "",
  category: "Architecture",
  title: "",
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  description: "",
});

/* ── Dashboard ── */
function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    details: false,
    specs: false,
    gallery: false,
  });

  /* Blog state */
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [deletePostConfirm, setDeletePostConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      navigate({ to: "/admin/login" });
    }
    setProjects(getProjects());
    setBlogPosts(getBlogPosts());
  }, [navigate]);

  const refresh = () => {
    setProjects(getProjects());
    setBlogPosts(getBlogPosts());
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const handleNew = () => {
    setEditing({ id: "", ...emptyProject() });
    setIsNew(true);
    setExpandedSections({ basic: true, details: false, specs: false, gallery: false });
  };

  const handleEdit = (p: Project) => {
    setEditing({ ...p, schemas: [...p.schemas], gallery: [...p.gallery] });
    setIsNew(false);
    setExpandedSections({ basic: true, details: false, specs: false, gallery: false });
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    refresh();
    setDeleteConfirm(null);
  };

  const handleSave = () => {
    if (!editing) return;
    const project: Project = {
      ...editing,
      id: isNew ? generateId(editing.title) : editing.id,
      schemas: editing.schemas.filter((s) => s.label && s.value),
      gallery: editing.gallery.filter((g) => g.src),
    };

    if (!project.title) return;

    if (isNew) {
      addProject(project);
    } else {
      updateProject(project.id, project);
    }
    setEditing(null);
    setIsNew(false);
    refresh();
  };

  const updateField = <K extends keyof Project>(key: K, value: Project[K]) => {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ── Schema helpers ── */
  const addSchema = () => {
    if (!editing) return;
    setEditing({ ...editing, schemas: [...editing.schemas, emptySchema()] });
  };

  const updateSchema = (i: number, field: keyof ProjectSchema, val: string) => {
    if (!editing) return;
    const schemas = [...editing.schemas];
    schemas[i] = { ...schemas[i], [field]: val };
    setEditing({ ...editing, schemas });
  };

  const removeSchema = (i: number) => {
    if (!editing) return;
    setEditing({ ...editing, schemas: editing.schemas.filter((_, idx) => idx !== i) });
  };

  /* ── Gallery helpers ── */
  const addGalleryItem = () => {
    if (!editing) return;
    setEditing({ ...editing, gallery: [...editing.gallery, emptyGallery()] });
  };

  const updateGalleryItem = (i: number, field: string, val: string) => {
    if (!editing) return;
    const gallery = [...editing.gallery];
    gallery[i] = { ...gallery[i], [field]: val };
    setEditing({ ...editing, gallery });
  };

  const removeGalleryItem = (i: number) => {
    if (!editing) return;
    setEditing({ ...editing, gallery: editing.gallery.filter((_, idx) => idx !== i) });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ── Blog handlers ── */
  const handleNewPost = () => {
    setEditingPost({ id: "", ...emptyBlogPost() });
    setIsNewPost(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsNewPost(false);
  };

  const handleDeletePost = (id: string) => {
    deleteBlogPost(id);
    refresh();
    setDeletePostConfirm(null);
  };

  const handleSavePost = () => {
    if (!editingPost || !editingPost.title) return;
    const post: BlogPost = {
      ...editingPost,
      id: isNewPost ? generateBlogId(editingPost.title) : editingPost.id,
    };
    if (isNewPost) {
      addBlogPost(post);
    } else {
      updateBlogPost(post.id, post);
    }
    setEditingPost(null);
    setIsNewPost(false);
    refresh();
  };

  const updatePostField = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    if (!editingPost) return;
    setEditingPost({ ...editingPost, [key]: value });
  };

  /* ── Section toggle component ── */
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-3 border-b border-border mb-4"
    >
      <span className="label-text text-foreground">{title}</span>
      {expandedSections[id] ? (
        <ChevronUp size={16} className="text-muted-foreground" />
      ) : (
        <ChevronDown size={16} className="text-muted-foreground" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl font-bold text-foreground">
              ARCAN
            </a>
            <span className="text-xs uppercase tracking-widest text-olive bg-olive/10 px-2 py-1">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-border">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium uppercase tracking-widest transition-colors border-b-2 -mb-px ${
              activeTab === "projects"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderOpen size={16} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium uppercase tracking-widest transition-colors border-b-2 -mb-px ${
              activeTab === "blog"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText size={16} />
            Blog
          </button>
        </div>

        {/* ══════════ PROJECTS TAB ══════════ */}
        {activeTab === "projects" && (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="heading-md text-foreground">Projects</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={handleNew}
                className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border bg-card group"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {p.img ? (
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Image size={32} className="text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-widest bg-dark/70 text-dark-foreground px-2 py-1 backdrop-blur-sm">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.location} · {p.year}</p>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                    <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                      <button onClick={() => handleEdit(p)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil size={14} /> Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-20">
                <Image size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No projects yet. Add your first one.</p>
              </div>
            )}
          </>
        )}

        {/* ══════════ BLOG TAB ══════════ */}
        {activeTab === "blog" && (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="heading-md text-foreground">Blog Posts</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {blogPosts.length} article{blogPosts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={handleNewPost}
                className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                <Plus size={16} />
                Add Post
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border bg-card group"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {post.img ? (
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Image size={32} className="text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-widest bg-dark/70 text-dark-foreground px-2 py-1 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                    {post.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{post.description}</p>
                    )}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                      <button onClick={() => handleEditPost(post)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil size={14} /> Edit
                      </button>
                      <button onClick={() => setDeletePostConfirm(post.id)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="text-center py-20">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No blog posts yet. Add your first one.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Delete confirmation modal ── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border p-8 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Delete Project
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-border py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-destructive text-destructive-foreground py-2.5 text-sm font-medium hover:bg-destructive/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Blog delete confirmation modal ── */}
      <AnimatePresence>
        {deletePostConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setDeletePostConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border p-8 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Delete Post</h3>
              <p className="text-sm text-muted-foreground mb-6">Are you sure? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletePostConfirm(null)} className="flex-1 border border-border py-2.5 text-sm text-foreground hover:bg-muted transition-colors">Cancel</button>
                <button onClick={() => handleDeletePost(deletePostConfirm)} className="flex-1 bg-destructive text-destructive-foreground py-2.5 text-sm font-medium hover:bg-destructive/90 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Blog Edit / Add modal ── */}
      <AnimatePresence>
        {editingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-6"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-card border border-border w-full max-w-2xl my-auto"
            >
              <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {isNewPost ? "New Blog Post" : "Edit Blog Post"}
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={handleSavePost} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium uppercase tracking-widest hover:bg-foreground/90 transition-colors">
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => { setEditingPost(null); setIsNewPost(false); }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* Cover image */}
                <div>
                  <label className="label-text mb-2 block">Cover Image</label>
                  <div className="flex items-start gap-4">
                    {editingPost.img && (
                      <img src={editingPost.img} alt="Cover" className="w-32 h-24 object-cover border border-border" />
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => updatePostField("img", url))}
                        className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:text-sm file:bg-muted file:text-foreground hover:file:bg-muted/80 file:cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground">Or paste an image URL:</p>
                      <input
                        type="text"
                        value={editingPost.img}
                        onChange={(e) => updatePostField("img", e.target.value)}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="label-text mb-2 block">Title *</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => updatePostField("title", e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                    placeholder="Article title"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="label-text mb-2 block">Description</label>
                  <textarea
                    value={editingPost.description}
                    onChange={(e) => updatePostField("description", e.target.value)}
                    rows={8}
                    className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground resize-y"
                    placeholder="Write the full article content here. Use double line breaks to separate paragraphs."
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate paragraphs with empty lines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="label-text mb-2 block">Category</label>
                    <select
                      value={editingPost.category}
                      onChange={(e) => updatePostField("category", e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                    >
                      {blogCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="label-text mb-2 block">Date</label>
                    <input
                      type="text"
                      value={editingPost.date}
                      onChange={(e) => updatePostField("date", e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                      placeholder="Apr 10, 2026"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Project Edit / Add modal ── */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-6"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-card border border-border w-full max-w-3xl my-auto"
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {isNew ? "New Project" : "Edit Project"}
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium uppercase tracking-widest hover:bg-foreground/90 transition-colors"
                  >
                    <Save size={14} />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(null);
                      setIsNew(false);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* ── Basic info ── */}
                <div>
                  <SectionHeader id="basic" title="Basic Information" />
                  {expandedSections.basic && (
                    <div className="space-y-4">
                      {/* Cover image */}
                      <div>
                        <label className="label-text mb-2 block">Cover Image</label>
                        <div className="flex items-start gap-4">
                          {editing.img && (
                            <img
                              src={editing.img}
                              alt="Cover"
                              className="w-32 h-24 object-cover border border-border"
                            />
                          )}
                          <div className="flex-1 space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(e, (url) => updateField("img", url))
                              }
                              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:text-sm file:bg-muted file:text-foreground hover:file:bg-muted/80 file:cursor-pointer"
                            />
                            <p className="text-xs text-muted-foreground">Or paste an image URL:</p>
                            <input
                              type="text"
                              value={editing.img}
                              onChange={(e) => updateField("img", e.target.value)}
                              className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label-text mb-2 block">Title *</label>
                          <input
                            type="text"
                            value={editing.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            placeholder="Project title"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-text mb-2 block">Category</label>
                          <select
                            value={editing.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                          >
                            {categories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="label-text mb-2 block">Year</label>
                          <input
                            type="text"
                            value={editing.year}
                            onChange={(e) => updateField("year", e.target.value)}
                            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            placeholder="2024"
                          />
                        </div>
                        <div>
                          <label className="label-text mb-2 block">Location</label>
                          <input
                            type="text"
                            value={editing.location}
                            onChange={(e) => updateField("location", e.target.value)}
                            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            placeholder="City, Country"
                          />
                        </div>
                        <div>
                          <label className="label-text mb-2 block">Area</label>
                          <input
                            type="text"
                            value={editing.area}
                            onChange={(e) => updateField("area", e.target.value)}
                            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            placeholder="2,400 m²"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-text mb-2 block">Client</label>
                        <input
                          type="text"
                          value={editing.client}
                          onChange={(e) => updateField("client", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                          placeholder="Client name"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="tall"
                          checked={editing.tall}
                          onChange={(e) => updateField("tall", e.target.checked)}
                          className="accent-olive w-4 h-4"
                        />
                        <label htmlFor="tall" className="text-sm text-foreground">
                          Tall layout (spans 2 rows in project grid)
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Details ── */}
                <div>
                  <SectionHeader id="details" title="Description & Details" />
                  {expandedSections.details && (
                    <div className="space-y-4">
                      <div>
                        <label className="label-text mb-2 block">Description</label>
                        <textarea
                          value={editing.description}
                          onChange={(e) => updateField("description", e.target.value)}
                          rows={4}
                          className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground resize-y"
                          placeholder="Project description..."
                        />
                      </div>
                      <div>
                        <label className="label-text mb-2 block">Challenge</label>
                        <textarea
                          value={editing.challenge}
                          onChange={(e) => updateField("challenge", e.target.value)}
                          rows={3}
                          className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground resize-y"
                          placeholder="What was the design challenge?"
                        />
                      </div>
                      <div>
                        <label className="label-text mb-2 block">Solution</label>
                        <textarea
                          value={editing.solution}
                          onChange={(e) => updateField("solution", e.target.value)}
                          rows={3}
                          className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-muted-foreground resize-y"
                          placeholder="How did you solve it?"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Specifications ── */}
                <div>
                  <SectionHeader id="specs" title="Technical Specifications" />
                  {expandedSections.specs && (
                    <div className="space-y-3">
                      {editing.schemas.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <GripVertical
                            size={16}
                            className="text-muted-foreground mt-3 shrink-0"
                          />
                          <input
                            type="text"
                            value={s.label}
                            onChange={(e) => updateSchema(i, "label", e.target.value)}
                            className="flex-1 bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            placeholder="Label (e.g. Structure)"
                          />
                          <input
                            type="text"
                            value={s.value}
                            onChange={(e) => updateSchema(i, "value", e.target.value)}
                            className="flex-[2] bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            placeholder="Value (e.g. Reinforced concrete)"
                          />
                          <button
                            onClick={() => removeSchema(i)}
                            className="text-muted-foreground hover:text-destructive transition-colors mt-2"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addSchema}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
                      >
                        <Plus size={14} />
                        Add specification
                      </button>
                    </div>
                  )}
                </div>

                {/* ── Gallery ── */}
                <div>
                  <SectionHeader id="gallery" title="Gallery Images" />
                  {expandedSections.gallery && (
                    <div className="space-y-4">
                      {editing.gallery.map((g, i) => (
                        <div key={i} className="border border-border p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="label-text">Image {i + 1}</span>
                            <button
                              onClick={() => removeGalleryItem(i)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex items-start gap-4">
                            {g.src && (
                              <img
                                src={g.src}
                                alt={g.caption}
                                className="w-24 h-18 object-cover border border-border"
                              />
                            )}
                            <div className="flex-1 space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) =>
                                    updateGalleryItem(i, "src", url)
                                  )
                                }
                                className="w-full text-sm text-muted-foreground file:mr-4 file:py-1.5 file:px-3 file:border file:border-border file:text-xs file:bg-muted file:text-foreground hover:file:bg-muted/80 file:cursor-pointer"
                              />
                              <input
                                type="text"
                                value={g.src}
                                onChange={(e) => updateGalleryItem(i, "src", e.target.value)}
                                className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                                placeholder="Image URL"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={g.caption}
                              onChange={(e) =>
                                updateGalleryItem(i, "caption", e.target.value)
                              }
                              className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                              placeholder="Caption"
                            />
                            <select
                              value={g.span || "normal"}
                              onChange={(e) =>
                                updateGalleryItem(i, "span", e.target.value)
                              }
                              className="bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-muted-foreground"
                            >
                              <option value="normal">Normal</option>
                              <option value="wide">Wide</option>
                              <option value="tall">Tall</option>
                            </select>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addGalleryItem}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus size={14} />
                        Add gallery image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
