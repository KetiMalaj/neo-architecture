export default function Footer() {
  return (
    <footer className="bg-dark section-padding-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-dark-foreground mb-4">ARCAN</h3>
            <p className="body-sm text-warm-grey max-w-sm">
              A collaborative architectural studio dedicated to creating spaces that inspire and endure. Based in New York, designing worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="label-text text-dark-foreground mb-4">Studio</h4>
            <ul className="space-y-3">
              {["About", "Services", "Projects", "Careers"].map((l) => (
                <li key={l}>
                  <a href="#" className="body-sm text-warm-grey hover:text-dark-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="label-text text-dark-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              {["Instagram", "LinkedIn", "Pinterest", "Behance"].map((l) => (
                <li key={l}>
                  <a href="#" className="body-sm text-warm-grey hover:text-dark-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-grey/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="body-sm text-warm-grey">© 2026 ARCAN Studio. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="body-sm text-warm-grey hover:text-dark-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
