import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Icon, ArrowRight } from "../utils/icons.jsx";
import TiltCard from "./TiltCard";

export default function Services() {
  const { content } = useContent();
  const { services } = content;

  return (
    <section id="services" className="relative bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#5f8f5a]">{services.tag}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">{services.title}</h2>
            <p className="mt-4 text-slate-600">{services.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <TiltCard className="group h-full rounded-2xl border border-slate-100 bg-[#EBF0DA]/40 p-6 shadow-sm transition-shadow hover:shadow-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#83B17F] text-white shadow-lg shadow-[#83B17F]/30">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
