import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Icon } from "../utils/icons.jsx";

export default function Process() {
  const { content } = useContent();
  const { process } = content;

  return (
    <section id="process" className="relative bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#5f8f5a]">{process.tag}</span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">{process.title}</h2>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-[#83B17F]/40 to-transparent lg:block" />
          {process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="relative">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#83B17F] text-white shadow-xl shadow-[#83B17F]/30">
                  <Icon name={step.icon} className="h-7 w-7" />
                </span>
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
