import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="label-text mb-4">Get in touch</p>
            <h2 className="heading-lg text-foreground mb-8">
              Let's start a<br />
              <span className="italic font-normal text-muted-foreground">conversation</span>
            </h2>
            <p className="body-lg text-muted-foreground mb-10 max-w-md">
              Have a project in mind? We'd love to hear about it. Reach out and let's create something remarkable together.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: "48 Arch Avenue, Design District, NY 10012" },
                { icon: Phone, text: "+1 (555) 284-7630" },
                { icon: Mail, text: "studio@arcan.design" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <Icon size={18} className="text-olive mt-0.5 shrink-0" />
                  <span className="body-sm text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { key: "name" as const, label: "Your Name", type: "text" },
              { key: "email" as const, label: "Email Address", type: "email" },
            ].map((field) => (
              <div key={field.key}>
                <label className="label-text block mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-olive transition-colors body-sm"
                />
              </div>
            ))}
            <div>
              <label className="label-text block mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-olive transition-colors body-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-olive transition-colors duration-300"
            >
              Send Message
              <ArrowUpRight size={14} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
