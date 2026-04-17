import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isHomePage = typeof window !== "undefined" && window.location.pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const id = href.replace("#", "");
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24">
        <a href="/" className={`font-display text-2xl font-bold tracking-tight transition-colors duration-500 ${scrolled ? "text-foreground" : "text-dark-foreground"}`}>
          ARCAN
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 hover:opacity-60 ${
                scrolled ? "text-foreground" : "text-dark-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden transition-colors ${scrolled ? "text-foreground" : "text-dark-foreground"}`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-lg absolute top-full left-0 right-0 py-8 px-6 border-b border-border">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { setMenuOpen(false); handleNavClick(e, link.href); }}
              className="block py-3 text-sm uppercase tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
