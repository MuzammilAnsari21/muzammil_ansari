import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../context/ContentContext";
import { Menu, X } from "../utils/icons.jsx";

export default function Navbar() {
  const { content, setIsAdminOpen, isOwnerUnlocked } = useContent();
  const { brand, nav, hero } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace("#", "")).filter(Boolean);
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.3, 0.6], rootMargin: "-20% 0px -45% 0px" }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [nav]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-white/80 shadow-md backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#83B17F] to-[#5f8f5a] font-display font-extrabold text-white shadow-lg shadow-[#83B17F]/30">
            {brand.initials}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-slate-800 md:text-base">{brand.name}</span>
            <span className="block text-[10px] text-slate-500 md:text-xs">{brand.role}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-all ${
                  isActive ? "bg-[#EBF0DA] text-[#5f8f5a] shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {isOwnerUnlocked && (
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#83B17F] hover:text-[#5f8f5a]"
            >
              Edit Portal
            </button>
          )}
          <a
            href={hero.secondaryBtnHref}
            className="rounded-full bg-[#83B17F] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#83B17F]/30 transition-transform hover:scale-105 active:scale-95"
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EBF0DA] text-slate-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {nav.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isActive ? "bg-[#EBF0DA] text-[#5f8f5a]" : "text-slate-700 hover:bg-[#EBF0DA]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              {isOwnerUnlocked && (
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminOpen(true);
                    setOpen(false);
                  }}
                  className="mt-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-center text-sm font-semibold text-slate-700"
                >
                  Edit Portal
                </button>
              )}
              <a
                href={hero.secondaryBtnHref}
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#83B17F] px-6 py-2.5 text-center text-sm font-semibold text-white"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
