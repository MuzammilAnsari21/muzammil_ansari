import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Icon } from "../utils/icons.jsx";

export default function Contact() {
  const { content } = useContent();
  const { contact } = content;
  const [sent, setSent] = useState(false);
  const projectTypes = contact.projectTypes.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    e.target.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#EBF0DA]/60 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#5f8f5a]">{contact.tag}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">{contact.title}</h2>
            <p className="mt-4 max-w-md text-slate-600">{contact.description}</p>

            <div className="mt-8 space-y-4">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-slate-700 hover:text-[#5f8f5a]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
                  <Icon name="mail" className="h-5 w-5 text-[#5f8f5a]" />
                </span>
                {contact.email}
              </a>
              <p className="flex items-center gap-3 text-slate-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
                  <Icon name="pin" className="h-5 w-5 text-[#5f8f5a]" />
                </span>
                {contact.location}
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              {contact.socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow transition-transform hover:-translate-y-1 hover:text-[#5f8f5a]"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 rounded-3xl bg-white p-6 shadow-xl md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Your Name"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
              />
            </div>
            <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500 outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30">
              <option value="">Project Type</option>
              {projectTypes.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#83B17F] focus:ring-2 focus:ring-[#83B17F]/30"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-xl bg-[#83B17F] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#83B17F]/30"
            >
              {sent ? "Message Sent ✓" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
