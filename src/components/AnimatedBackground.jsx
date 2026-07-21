import { motion } from "framer-motion";

// Soft, slowly-floating gradient blobs used behind sections for a subtle
// depth / 3D atmosphere without hurting performance.
export default function AnimatedBackground({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#83B17F]/30 blur-3xl md:h-96 md:w-96"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-[#EBF0DA]/60 blur-3xl md:h-[28rem] md:w-[28rem]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#83B17F]/20 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
