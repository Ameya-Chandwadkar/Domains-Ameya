"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Transform-only dust motes preserve smooth environmental motion on low-power devices. */
export function FloatingParticles({ count = 28 }: { count?: number }) {
  const reduceMotion = useReducedMotion();
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">{Array.from({ length: count }, (_, i) => <motion.i key={i} className="absolute rounded-full bg-white/50" style={{ left: `${(i * 37 + 13) % 100}%`, top: `${(i * 61 + 7) % 100}%`, width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1 }} animate={reduceMotion ? undefined : { y: [0, -34, 0], opacity: [.05, .45, .05] }} transition={{ duration: 5 + i % 6, delay: -(i % 5), repeat: Infinity, ease: "easeInOut" }} />)}</div>;
}
