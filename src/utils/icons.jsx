import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Grid2x2,
  Globe,
  Code2,
  LayoutTemplate,
  PenTool,
  Search,
  Rocket,
  Star,
  Mail,
  MapPin,
  ArrowRight,
  Phone,
  Menu,
  X,
  Settings,
  Plus,
  Trash2,
  Upload,
  Download,
  RotateCcw,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// lucide-react no longer ships brand/logo icons (Github, Linkedin, Twitter, Behance),
// so simple inline SVGs are used for those instead.
const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);
const Linkedin = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.42v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
const Twitter = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.9 2H22l-7.5 8.57L23.3 22h-6.9l-5.4-7.06L4.8 22H1.7l8.03-9.18L1 2h7.07l4.88 6.45L18.9 2Zm-1.2 18.17h1.7L6.4 3.75H4.6l13.1 16.42Z" />
  </svg>
);
const Dribbble = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm7.94 5.52a10.4 10.4 0 0 1 2.36 6.4c-.34-.07-3.75-.76-7.19-.33-.08-.18-.15-.37-.23-.55a29 29 0 0 0-.72-1.55c3.8-1.55 5.53-3.76 5.78-3.97ZM12 1.6c2.4 0 4.6.87 6.3 2.32-.22.2-1.78 2.26-5.44 3.63a71 71 0 0 0-3.83-6.03c.94-.28 1.94-.42 2.97-.42ZM7.5 2.13a68 68 0 0 1 3.8 5.98c-4.79 1.27-9.02 1.26-9.47 1.25a10.44 10.44 0 0 1 5.67-7.23Zm-6.1 8.83v-.32c.43.01 5.44.07 10.55-1.45.3.57.57 1.15.83 1.73l-.44.13c-5.27 1.7-8.08 6.35-8.31 6.75a10.4 10.4 0 0 1-2.63-6.84ZM12 22.4a10.36 10.36 0 0 1-6.42-2.22c.18-.37 2.24-4.44 8.02-6.4l.07-.02a45 45 0 0 1 2.16 8.06 10.4 10.4 0 0 1-3.83.58Zm5.3-1.34a47 47 0 0 0-1.97-7.51c3.23-.51 6.06.33 6.4.44a10.46 10.46 0 0 1-4.43 7.07Z" />
  </svg>
);

// Map of selectable icon keys used across editable content (stats, services, process).
export const iconMap = {
  zap: Zap,
  shield: ShieldCheck,
  check: CheckCircle2,
  grid: Grid2x2,
  globe: Globe,
  code: Code2,
  layout: LayoutTemplate,
  pen: PenTool,
  search: Search,
  rocket: Rocket,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  behance: Dribbble,
  star: Star,
  mail: Mail,
  pin: MapPin,
};

export const iconOptions = Object.keys(iconMap);

export const socialIconOptions = ["github", "linkedin", "twitter", "behance"];

export const Icon = ({ name, className }) => {
  const Cmp = iconMap[name] || Star;
  return <Cmp className={className} />;
};

export {
  ArrowRight,
  Phone,
  Menu,
  X,
  Settings,
  Plus,
  Trash2,
  Upload,
  Download,
  RotateCcw,
  Save,
  Star,
  ChevronLeft,
  ChevronRight,
};
