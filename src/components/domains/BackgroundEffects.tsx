"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export function BackgroundEffects({ isHovered }: { isHovered?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#07080a]" aria-hidden="true">
      <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${isHovered ? 'opacity-40 blur-sm scale-[1.02]' : 'opacity-100 blur-0 scale-100'}`}>
        {/* Underground bunker walls (Concrete / Grid Texture) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(255,255,255,0.03) 100px), repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(255,255,255,0.03) 100px)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#030304_90%)] pointer-events-none" />

      {/* Steel beams (Horizontal and Vertical) */}
      <div className="absolute top-[12%] left-0 right-0 h-3 bg-[#111317] border-y border-[#252830] shadow-[0_10px_20px_rgba(0,0,0,0.8)] opacity-50" />
      <div className="absolute top-[75%] left-0 right-0 h-5 bg-[#0d0e12] border-y border-[#20222a] shadow-[0_15px_30px_rgba(0,0,0,0.9)] opacity-60" />
      <div className="absolute left-[12%] top-0 bottom-0 w-6 bg-gradient-to-r from-[#08090b] to-[#121419] border-x border-[#1e2027] shadow-[15px_0_30px_rgba(0,0,0,0.7)] opacity-40" />
      <div className="absolute right-[12%] top-0 bottom-0 w-8 bg-gradient-to-l from-[#08090b] to-[#121419] border-x border-[#1e2027] shadow-[-15px_0_30px_rgba(0,0,0,0.7)] opacity-40" />

      {/* Hanging cables */}
      <motion.div 
        className="absolute top-[-5%] left-[25%] w-[8%] h-[55%] border-l-[3px] border-b-[3px] border-[#181a1f] rounded-bl-[100%] opacity-40 origin-top"
        animate={reduceMotion ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[-10%] right-[30%] w-[12%] h-[45%] border-r-[4px] border-b-[4px] border-[#111216] rounded-br-[100%] opacity-50 origin-top"
        animate={reduceMotion ? undefined : { rotate: [1, -1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 left-[55%] w-[2px] h-[35%] bg-gradient-to-b from-[#1a1c22] to-transparent opacity-50 origin-top"
        animate={reduceMotion ? undefined : { rotate: [-2, 2, -2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Survey Corps Emblem (Subtle Outline) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-screen scale-[1.3] md:scale-150">
        <svg viewBox="0 0 120 150" className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px]">
          <path d="M10,10 L110,10 L110,90 C110,130 60,140 60,140 C60,140 10,130 10,90 Z" fill="none" stroke="white" strokeWidth="3" />
          <path d="M60,110 L50,90 L20,100 L40,70 L15,70 L45,45 L25,40 L60,30" fill="none" stroke="white" strokeWidth="2" />
          <path d="M60,110 L70,90 L100,100 L80,70 L105,70 L75,45 L95,40 L60,30" fill="white" />
        </svg>
      </div>

      {/* Mechanical consoles at bottom */}
      <div className="absolute bottom-0 left-[6%] w-24 h-12 bg-[#08090c] border-t border-r border-[#15171d] rounded-tr-lg opacity-70 shadow-[5px_-5px_15px_rgba(0,0,0,0.9)] flex gap-2 p-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
      </div>
      <div className="absolute bottom-0 right-[9%] w-40 h-20 bg-[#08090c] border-t border-l border-[#15171d] rounded-tl-xl opacity-60 shadow-[-10px_-10px_20px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center gap-2">
        <div className="w-[70%] h-[2px] bg-[#121419]" />
        <div className="w-[70%] h-[2px] bg-[#121419]" />
      </div>

      {/* Red warning lights */}
      <motion.div 
        className="absolute top-[8%] left-[8%] w-40 h-40 bg-[radial-gradient(circle,rgba(255,0,0,0.06)_0%,transparent_60%)] rounded-full mix-blend-screen pointer-events-none"
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[18%] right-[10%] w-32 h-32 bg-[radial-gradient(circle,rgba(255,0,0,0.04)_0%,transparent_60%)] rounded-full mix-blend-screen pointer-events-none"
        animate={reduceMotion ? undefined : { opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 4.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moving fog & smoke */}
      <motion.div 
        className="absolute bottom-[-20%] left-[-20%] w-[150%] h-[60%] bg-[radial-gradient(ellipse,rgba(150,180,220,0.03)_0%,transparent_50%)] blur-[60px] mix-blend-screen pointer-events-none"
        animate={reduceMotion ? undefined : { x: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[50%] bg-[radial-gradient(ellipse,rgba(200,200,210,0.02)_0%,transparent_50%)] blur-[50px] mix-blend-screen pointer-events-none"
        animate={reduceMotion ? undefined : { x: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 22, delay: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dust particles */}
      <FloatingParticles count={60} />
      </div>
    </div>
  );
}
