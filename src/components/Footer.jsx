import { useContent } from "../context/ContentContext";
import { Icon } from "../utils/icons.jsx";

export default function Footer() {
  const { content } = useContent();
  const { brand, nav, footer, contact, theme } = content;
  const primary = theme?.primary || "#83B17F";
  const year = new Date().getFullYear();
  const cardDark = footer.cardBg || `color-mix(in srgb, ${primary} 12%, #0a0a0a)`;

  return (
    <footer className="relative overflow-hidden pt-20 pb-10 text-sm text-slate-400"
      style={{ backgroundColor: `${primary}67` }}
    >
      {/* Dynamic Radial Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, ${primary}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* ── Top card ── */}
        <div className="mb-12 rounded-3xl border border-white/10 p-7 shadow-2xl shadow-black/30 backdrop-blur-md md:p-10" style={{
            backgroundColor: cardDark,
          }}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            
            {/* Brand block */}
            <div className="max-w-sm">
              {/* Avatar pill - Dynamic Gradient */}
              <div className="mb-5! flex items-center gap-3">
                <span 
                  className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-base font-extrabold text-white shadow-lg shadow-black/50"
                  style={{
                    background: `linear-gradient(to bottom right, ${primary}, ${primary}99)`,
                    boxShadow: `0 10px 15px -3px ${primary}30`
                  }}
                >
                  {brand.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{brand.name}</p>
                  <p className="text-xs text-slate-400">{brand.role}</p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-300">{footer.text}</p>

              {/* Social icons */}
              {contact.socials?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {contact.socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                      style={{
                        "--hover-color": primary
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      <Icon name={s.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Right block */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              {/* Nav links */}
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em]" 
                   style={{ color: primary }}>
                  Navigation
                </p>
                <ul className="flex flex-col gap-2.5">
                  {nav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-slate-300 transition hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact block */}
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em]" 
                   style={{ color: primary }}>
                  Contact
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                  >
                    <span 
                      className="flex h-7 w-7 items-center justify-center rounded-lg transition"
                      style={{ backgroundColor: `${primary}20`, color: primary }}
                    >
                      <Icon name="mail" className="h-3.5 w-3.5" />
                    </span>
                    {contact.email}
                  </a>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span 
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${primary}20`, color: primary }}
                    >
                      <Icon name="pin" className="h-3.5 w-3.5" />
                    </span>
                    {contact.location}
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: primary,
                    boxShadow: `0 10px 15px -3px ${primary}40`
                  }}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} <span className="font-semibold text-slate-400">{brand.name}</span>.
            All rights reserved.
          </p>
          <a
            href="#home"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-white/30 hover:text-white"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}