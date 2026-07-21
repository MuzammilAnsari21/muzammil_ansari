import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Star, ChevronLeft, ChevronRight } from "../utils/icons.jsx";

export default function Testimonials() {
  const { content } = useContent();
  const { testimonials } = content;
  const [index, setIndex] = useState(0);
  const items = testimonials.items;

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#EBF0DA]/50 py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#5f8f5a]">{testimonials.tag}</span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">{testimonials.title}</h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-1">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white p-6 shadow-md"
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      

        {/* Mobile carousel */}
        <div className="relative md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl bg-white p-6 shadow-md"
            >
              <TestimonialCard t={items[index]} />
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-[#83B17F]" : "bg-slate-300"}`}
              />
            ))}
            <button
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-slate-900">{t.name}</p>
          <p className="text-xs text-slate-500">{t.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">"{t.text}"</p>
      <div className="mt-3 flex gap-0.5">
        {Array.from({ length: t.rating || 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
    </div>
  );
}
