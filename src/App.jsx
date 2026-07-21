import { useEffect } from "react";
import { ContentProvider } from "@/context/ContentContext";
import { useContent } from "@/context/ContentContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminPanel from "@/admin/AdminPanel";
import Loader from "@/components/Loader";

// Convert hex to HSL array [h, s, l]
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Inner wrapper that reads theme from context and injects CSS overrides
function ThemedApp() {
  const { content, isLoading } = useContent();
  const primary = content.theme?.primary || "#83B17F";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7ef]">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  useEffect(() => {
    const immediateStyle = document.getElementById('immediate-theme');
    if (immediateStyle) {
      immediateStyle.remove();
    }
    const [h, s, l] = hexToHsl(primary);
    const dark   = `hsl(${h}, ${s}%, ${Math.max(l - 18, 10)}%)`;
    const darker = `hsl(${h}, ${s}%, ${Math.max(l - 28, 5)}%)`;
    const light  = `hsl(${h}, ${Math.max(s - 5, 0)}%, ${Math.min(l + 28, 95)}%)`;
    const muted  = `hsl(${h}, ${Math.max(s - 15, 0)}%, ${Math.min(l + 40, 97)}%)`;
    const muted2 = `hsl(${h}, ${Math.max(s - 15, 0)}%, ${Math.min(l + 44, 98)}%)`;

    // Get or create the injected style tag
    let el = document.getElementById("portfolio-theme");
    if (!el) {
      el = document.createElement("style");
      el.id = "portfolio-theme";
      document.head.appendChild(el);
    }

    // CSS that overrides ALL hardcoded colour usages in this project
    // Using !important to beat Tailwind's specificity
    el.textContent = `
      /* ── Primary (was #83B17F) ── */
      [class*="bg-[#83B17F]"]   { background-color: ${primary}  !important; }
      [class*="text-[#83B17F]"] { color: ${primary}             !important; }
      [class*="border-[#83B17F]"] { border-color: ${primary}    !important; }
      [class*="from-[#83B17F]"] { --tw-gradient-from: ${primary} !important; }
      [class*="to-[#83B17F]"]   { --tw-gradient-to: ${primary}   !important; }
      [class*="fill-[#83B17F]"] { fill: ${primary}              !important; }
      [class*="shadow-[#83B17F]"] { --tw-shadow-color: ${primary} !important; }
      [class*="ring-[#83B17F]"] { --tw-ring-color: ${primary}   !important; }
      [class*="outline-[#83B17F]"] { outline-color: ${primary}  !important; }

      /* ── Dark primary (was #5f8f5a) ── */
      [class*="text-[#5f8f5a]"]   { color: ${dark}              !important; }
      [class*="bg-[#5f8f5a]"]     { background-color: ${dark}   !important; }
      [class*="from-[#5f8f5a]"]   { --tw-gradient-from: ${dark}  !important; }
      [class*="to-[#5f8f5a]"]     { --tw-gradient-to: ${dark}    !important; }
      [class*="border-[#5f8f5a]"] { border-color: ${dark}        !important; }
      [class*="hover:text-[#5f8f5a]"]:hover { color: ${dark}    !important; }
      [class*="hover:bg-[#5f8f5a]"]:hover   { background-color: ${dark} !important; }
      [class*="text-[#3f5d3b]"]   { color: ${darker}            !important; }

      /* ── Muted / light (was #EBF0DA) ── */
      [class*="bg-[#EBF0DA]"]     { background-color: ${muted}  !important; }
      [class*="from-[#EBF0DA]"]   { --tw-gradient-from: ${muted} !important; }
      [class*="to-[#EBF0DA]"]     { --tw-gradient-to: ${muted}   !important; }

      /* ── Hero section background ── */
      section#home { background-color: ${muted2} !important; }

      /* ── Scrollbar thumb ── */
      ::-webkit-scrollbar-thumb { background: ${light} !important; }
      ::-webkit-scrollbar-thumb:hover { background: ${primary} !important; }

      /* ── Selection ── */
      ::selection { background: color-mix(in srgb, ${primary} 35%, transparent) !important; }

      /* ── Focus ring (used in Contact form inputs) ── */
      [class*="focus:border-[#83B17F]"]:focus { border-color: ${primary} !important; }
      [class*="focus:ring-[#83B17F]"]:focus { --tw-ring-color: color-mix(in srgb, ${primary} 30%, transparent) !important; }
    `;
  }, [primary]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(131,177,127,0.12),_transparent_30%),linear-gradient(180deg,_#f8f7ef_0%,_#f5f3e8_100%)] font-sans antialiased">
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <ThemedApp />
    </ContentProvider>
  );
}
