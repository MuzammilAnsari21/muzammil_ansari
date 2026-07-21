import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { ArrowRight } from "../utils/icons.jsx";
import TiltCard from "./TiltCard";

export default function Projects() {
  const { content } = useContent();
  const { projects } = content;

  return (
    <section id="work" className="relative bg-[#EBF0DA]/50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5f8f5a]">{projects.tag}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">{projects.title}</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.items.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <a
                href={p.link && p.link !== "#" ? (p.link.startsWith("http") ? p.link : `https://${p.link}`) : "#"}
                target={p.link && p.link !== "#" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="block"
                aria-label={p.title}
              >
                <TiltCard maxTilt={8} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl">

                 {/* === UPDATED IMAGE SECTION - Replace this part === */}
                  {/* === FULL TOP TO BOTTOM SCROLL IMAGE === */}
                    {/* === BEST DYNAMIC SCROLL EFFECT === */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-auto min-h-[320%] object-cover transition-transform duration-900 ease-out
                                  group-hover:-translate-y-[62%]"
                      />
                      
                      {/* hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full bg-[#0000002c] text-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                          View Project <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-2 p-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                      <p className="mt-1 text-xs text-slate-500">{p.tags}</p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF0DA] text-[#5f8f5a] transition-transform group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}