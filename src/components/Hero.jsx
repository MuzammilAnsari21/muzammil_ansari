import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { ArrowRight, Phone, Icon } from "../utils/icons.jsx";
import AnimatedBackground from "./AnimatedBackground";

export default function Hero() {
  const { content } = useContent();
  const { hero, stats } = content;
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#EBF0DA] pb-12 pt-28 md:pb-20 md:pt-36">
      <AnimatedBackground />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#3f5d3b] shadow-sm ring-1 ring-[#83B17F]/30"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#83B17F]" />
            {hero.badge}
          </motion.span>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            {hero.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-[#5f8f5a] to-[#83B17F] bg-clip-text text-transparent">
              {hero.titleLine2}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-slate-600 md:text-lg">{hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href={hero.primaryBtnHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#83B17F] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#83B17F]/30"
            >
              {hero.primaryBtnText} <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href={hero.secondaryBtnHref}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700"
            >
              {hero.secondaryBtnText} <Phone className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right: 3D tilted portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-lg"
        >
          <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="relative flex aspect-square w-full items-center justify-center"
          >
            {/* glow ring */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#83B17F]/40 to-transparent blur-2xl" />

            {/* 3D tilted image — only the image inside preserve-3d to avoid clipping tags */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative h-[80%] w-[80%]"
            >
              <div className="absolute inset-4 rounded-[2.5rem] border border-[#83B17F]/30" />
              <img
                src={hero.image}
                alt="Portrait"
                className="relative z-10 h-full w-full rounded-[2.5rem] object-cover shadow-2xl"
                style={{ transform: "translateZ(40px)" }}
              />
            </motion.div>

            {/* ── Floating tags — OUTSIDE preserve-3d so they are never clipped ── */}

            {/* Tag 1 — left side */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-10 z-30 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xl shadow-black/10 backdrop-blur ring-1 ring-black/5"
            >
              <Icon name="code" className="h-4 w-4 text-[#5f8f5a]" />
              {hero.tagOne}
            </motion.div>

            {/* Tag 2 — right side */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-1/2 z-30 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xl shadow-black/20"
            >
              <Icon name="globe" className="h-4 w-4 text-[#83B17F]" />
              {hero.tagTwo}
            </motion.div>

            {/* Code snippet card — bottom */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 left-1/2 z-30 w-56 -translate-x-1/2 rounded-xl bg-slate-900/95 p-3 text-left font-mono text-[10px] leading-relaxed text-[#a9d4a3] shadow-2xl"
            >
              <pre className="whitespace-pre-wrap">{hero.codeSnippet}</pre>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="relative mx-auto mt-16 max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur md:grid-cols-4 md:gap-6"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF0DA] text-[#5f8f5a]">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-extrabold text-slate-900 md:text-2xl">{s.value}</p>
                <p className="text-xs text-slate-500 md:text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
