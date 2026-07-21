import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";

export default function TechStack() {
  const { content } = useContent();
  const { techStack } = content;

  return (
    <section className="relative bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#5f8f5a]">{techStack.tag}</span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">{techStack.title}</h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.items.map((t, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="rounded-full border border-slate-200 bg-[#EBF0DA]/60 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
            >
              {t.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
