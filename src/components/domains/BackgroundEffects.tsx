"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export function BackgroundEffects() {
  const reduceMotion = useReducedMotion();
  return <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden="true"><div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]" /><div className="absolute inset-x-0 top-[24%] h-px bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent" /><div className="absolute -left-20 h-full w-40 border-x border-white/10 bg-black/40 shadow-[20px_0_70px_rgba(0,0,0,.9)]" /><div className="absolute -right-20 h-full w-40 border-x border-white/10 bg-black/40 shadow-[-20px_0_70px_rgba(0,0,0,.9)]" /><motion.div className="absolute left-[8%] top-[-10%] h-[60%] w-px origin-top bg-gradient-to-b from-transparent via-cyan-100/60 to-transparent" animate={reduceMotion ? undefined : { rotate: [-9, 8, -9] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} /><motion.div className="absolute -bottom-20 left-[10%] h-40 w-[75%] rounded-[50%] bg-white/[.045] blur-3xl" animate={reduceMotion ? undefined : { x: [-30, 45, -30], opacity: [.25, .55, .25] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} /><FloatingParticles /></div>;
}
