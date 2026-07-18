"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Domain } from "./domains";

export function DomainPod({ domain, active, dimmed, onSelect, onMouseEnter, onMouseLeave }: { domain: Domain; active: boolean; dimmed: boolean; onSelect: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  const reduceMotion = useReducedMotion();
  
  let vibScale = 1;
  let animDuration = "0.5s";
  let leanAngle = 2;
  if (domain.id === "levi") { animDuration = "0.3s"; leanAngle = 1.5; }
  if (domain.id === "mikasa") { animDuration = "0.6s"; leanAngle = 2; }
  if (domain.id === "eren") { vibScale = 2; leanAngle = 3.5; }
  if (domain.id === "armin") { animDuration = "0.45s"; leanAngle = 2; }

  return <motion.button type="button" onClick={onSelect} onHoverStart={onMouseEnter} onHoverEnd={onMouseLeave} aria-pressed={active} aria-label={`Open ${domain.title} domain`} className="group relative h-[29rem] w-full min-w-[17.5rem] flex-1 overflow-hidden rounded-[2rem] bg-[#161719] text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 md:h-[33rem] md:min-w-0 lg:h-[25rem] xl:h-[28rem] animate-vibrate shadow-[inset_0_0_20px_rgba(0,0,0,1),0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[inset_0_0_20px_rgba(0,0,0,1),0_0_30px_rgba(220,38,38,0.3)]" style={{ "--accent": domain.accent, "--vib-scale": vibScale, "--anim-duration": animDuration } as CSSProperties} initial={{ opacity: 0, y: 36 }} animate={{ opacity: dimmed ? .32 : 1, y: 0, scale: active ? 1.025 : 1, filter: dimmed ? "blur(2px) brightness(.45)" : "blur(0) brightness(1)" }} transition={{ type: "spring", stiffness: 110, damping: 18, delay: domain.variation * .1 }} whileHover={reduceMotion ? undefined : { y: -10, scale: 1.15 }}>
    
    {/* Thick Metal Frame Base Casing */}
    <div className="absolute inset-0 border-[8px] border-[#25282d] rounded-[2rem] pointer-events-none z-50" />
    <div className="absolute inset-[8px] bg-gradient-to-b from-[#0a0a0c] to-[#121318] rounded-[1.5rem] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)] pointer-events-none z-0" />

    {/* Inner Chamber Background (Glow & Fog) */}
    <div className="absolute inset-[8px] rounded-[1.5rem] overflow-hidden pointer-events-none z-10">
        {/* Fog & Edge Glow */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[var(--accent)]/40 via-[var(--accent)]/10 to-transparent blur-2xl opacity-60 mix-blend-screen group-hover:opacity-90 group-hover:h-[70%] transition-all duration-1000" />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-white/10 to-transparent blur-md" />
        <div className="absolute inset-0 shadow-[inset_0_0_50px_var(--accent)] opacity-30 mix-blend-screen group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Subtle glowing core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_60%)] opacity-[0.08] mix-blend-screen blur-xl pointer-events-none" />
    </div>

    {/* Pipes entering the top */}
    <div className="absolute top-0 left-[25%] w-8 h-10 bg-gradient-to-b from-[#2a2d33] to-[#111215] border-x-2 border-[#090a0c] shadow-lg rounded-b-sm z-10 pointer-events-none">
        <div className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#090a0c]" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-full bg-gradient-to-b from-black/20 to-transparent" />
    </div>
    <div className="absolute top-0 right-[25%] w-8 h-10 bg-gradient-to-b from-[#2a2d33] to-[#111215] border-x-2 border-[#090a0c] shadow-lg rounded-b-sm z-10 pointer-events-none">
        <div className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#090a0c]" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-full bg-gradient-to-b from-black/20 to-transparent" />
    </div>

    {/* Mechanical locks */}
    <div className="absolute top-[30%] left-0 w-3 h-16 bg-[#25282d] border-y-2 border-r-2 border-[#161719] rounded-r-md shadow-md z-50 flex flex-col items-center justify-center gap-1 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
    </div>
    <div className="absolute top-[60%] left-0 w-3 h-16 bg-[#25282d] border-y-2 border-r-2 border-[#161719] rounded-r-md shadow-md z-50 flex flex-col items-center justify-center gap-1 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
    </div>
    <div className="absolute top-[30%] right-0 w-3 h-16 bg-[#25282d] border-y-2 border-l-2 border-[#161719] rounded-l-md shadow-md z-50 flex flex-col items-center justify-center gap-1 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
    </div>
    <div className="absolute top-[60%] right-0 w-3 h-16 bg-[#25282d] border-y-2 border-l-2 border-[#161719] rounded-l-md shadow-md z-50 flex flex-col items-center justify-center gap-1 pointer-events-none">
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
        <div className="w-1 h-1 rounded-full bg-[#111215]" />
    </div>

    {/* Hydraulic pistons */}
    <div className="absolute bottom-10 left-[14px] w-4 h-32 bg-[#121318] border border-[#090a0c] rounded-full z-10 overflow-hidden shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)] pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-r from-[#4a4d55] via-[#a0a4b0] to-[#2d3038] origin-bottom group-hover:scale-y-[0.8] transition-transform duration-[var(--anim-duration)]" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#25282d] border-t border-[#090a0c]" />
    </div>
    <div className="absolute bottom-10 right-[14px] w-4 h-32 bg-[#121318] border border-[#090a0c] rounded-full z-10 overflow-hidden shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)] pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-r from-[#4a4d55] via-[#a0a4b0] to-[#2d3038] origin-bottom group-hover:scale-y-[0.8] transition-transform duration-[var(--anim-duration)]" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#25282d] border-t border-[#090a0c]" />
    </div>

    {/* Character Container with ODM Gear interactions */}
    <div className="absolute inset-x-8 bottom-12 top-14 origin-bottom transition-transform duration-[var(--anim-duration)] ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:rotate-[2deg] z-20 pointer-events-none">
      <div className="relative w-full h-full group-hover:animate-subtle-breathe">
      
      {/* Blue metallic rim light for gear (waist level back) */}
      <div className="absolute bottom-[20%] left-[30%] right-[30%] h-[15%] bg-[radial-gradient(ellipse_at_center,rgba(100,200,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 blur-[15px] transition-opacity duration-300 mix-blend-screen" />

      {/* Chamber steam vents (bottom) */}
      <div className="absolute -bottom-4 left-[15%] w-20 h-16 bg-white/30 opacity-0 group-hover:animate-gas blur-xl rounded-t-full mix-blend-screen" />
      <div className="absolute -bottom-4 right-[15%] w-20 h-16 bg-white/30 opacity-0 group-hover:animate-gas blur-xl rounded-t-full mix-blend-screen" />
      
      {/* Dust particles drifting up */}
      <div className="absolute bottom-[20%] left-[20%] w-1 h-1 bg-white opacity-0 group-hover:animate-dust rounded-full" style={{ "--spark-dir-x": -1.2, animationDelay: "0.0s" } as CSSProperties} />
      <div className="absolute bottom-[25%] left-[30%] w-1.5 h-1.5 bg-white opacity-0 group-hover:animate-dust rounded-full" style={{ "--spark-dir-x": -0.5, animationDelay: "0.4s" } as CSSProperties} />
      <div className="absolute bottom-[18%] right-[25%] w-1 h-1 bg-white opacity-0 group-hover:animate-dust rounded-full" style={{ "--spark-dir-x": 0.8, animationDelay: "0.2s" } as CSSProperties} />
      <div className="absolute bottom-[22%] right-[35%] w-1.5 h-1.5 bg-white opacity-0 group-hover:animate-dust rounded-full" style={{ "--spark-dir-x": 1.5, animationDelay: "0.7s" } as CSSProperties} />

      {/* Faint Red Glow around head for awakened eyes */}
      <div className="absolute top-[15%] left-[25%] right-[25%] h-[25%] bg-[radial-gradient(ellipse_at_center,rgba(255,50,0,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 blur-[15px] transition-opacity duration-1000 mix-blend-screen z-30" />

      <Image src={domain.image} alt={domain.character} fill sizes="(max-width: 640px) 76vw, (max-width: 1024px) 40vw, 25vw" className={`object-cover object-top drop-shadow-[0_25px_25px_rgba(0,0,0,1)] transition-all duration-[var(--anim-duration)] ${domain.id === "armin" ? "brightness-[0.55] scale-90" : domain.id === "mikasa" ? "brightness-[0.8] scale-90 group-hover:scale-100" : "brightness-[0.8]"} grayscale-[40%] sepia-[20%] contrast-125 group-hover:brightness-[1.1] group-hover:contrast-[1.1] group-hover:grayscale-0 group-hover:sepia-0 group-hover:drop-shadow-[0px_0px_20px_var(--accent)]`} priority={domain.variation < 2} />
      
      {/* Blue metallic rim light (waist level front overlay) */}
      <div className="absolute bottom-[20%] left-[25%] right-[25%] h-[10%] bg-[radial-gradient(ellipse_at_center,rgba(100,200,255,0.4),transparent_60%)] opacity-0 group-hover:opacity-100 blur-[8px] transition-opacity duration-300 mix-blend-screen" />
      </div>
    </div>
    
    {/* Glass reflections & Condensation (Foreground) */}
    <div className="absolute inset-[8px] rounded-[1.5rem] overflow-hidden z-30 pointer-events-none">
        {/* Realistic glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-white/[0.1] to-white/[0.02] group-hover:from-white/[0.06] group-hover:via-white/[0.2] group-hover:to-white/[0.04] transition-colors duration-[1s] mix-blend-overlay" />
        <div className="absolute -inset-[100%] top-0 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-12 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-[1.5s] ease-in-out opacity-50 mix-blend-overlay" />
        
        {/* Scratches */}
        <div className="absolute inset-0 opacity-[0.25] mix-blend-screen" style={{ backgroundImage: "repeating-linear-gradient(65deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px, transparent 3px, transparent 12px, rgba(255,255,255,0.02) 12px, rgba(255,255,255,0.02) 13px)" }} />
        <div className="absolute inset-0 opacity-[0.2] mix-blend-screen" style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 5px, transparent 5px, transparent 20px, rgba(255,255,255,0.01) 20px, rgba(255,255,255,0.01) 21px)" }} />

        {/* Condensation layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)] blur-md backdrop-blur-[1px] opacity-70 group-hover:opacity-0 group-hover:backdrop-blur-none transition-all duration-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_50%)] blur-lg backdrop-blur-[2px] opacity-80 group-hover:opacity-0 group-hover:backdrop-blur-none transition-all duration-700" />
    </div>

    {/* Front UI overlay */}
    <div className="absolute inset-x-8 bottom-8 top-10 z-40 pointer-events-none">
        <div className="absolute -left-2 -top-2 font-mono text-[10px] font-bold tracking-[.25em] text-[var(--accent)] opacity-70 transition-opacity duration-[var(--anim-duration)] group-hover:opacity-100">
            SPECIMEN–0{domain.variation + 1}
        </div>
        
        {/* Warning lights */}
        <div className="absolute -top-3 -right-2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_orange] opacity-80" />
        </div>

        {/* Industrial vents (Front Bottom) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0a0a0c] rounded-[2px] border border-[#25282d] flex flex-col justify-evenly p-1 shadow-[inset_0_2px_5px_rgba(0,0,0,1)]">
            <div className="w-full h-[2px] bg-[#1a1c23]" />
            <div className="w-full h-[2px] bg-[#1a1c23]" />
            <div className="w-full h-[2px] bg-[#1a1c23]" />
        </div>
        
        <div className="absolute -inset-x-2 -bottom-2 translate-y-2 opacity-90 transition-all duration-[var(--anim-duration)] group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-mono text-[9px] tracking-[.2em] text-white/60 group-hover:text-[var(--accent)]">
            CONTAINMENT SECTOR {domain.variation + 1} // {domain.character.toUpperCase()}
          </p>
          <h3 className="mt-1 text-3xl font-black uppercase tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] transition-transform duration-[var(--anim-duration)] origin-left group-hover:scale-[1.05] group-hover:drop-shadow-[0_0_20px_var(--accent)]">
            {domain.title}
          </h3>
        </div>
    </div>

    {/* Reinforced bolts (on frame) */}
    <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#121318] border-2 border-[#33373f] shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5)] z-50 pointer-events-none flex items-center justify-center">
        <div className="w-[60%] h-[2px] bg-[#090a0c] rotate-45" />
    </div>
    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#121318] border-2 border-[#33373f] shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5)] z-50 pointer-events-none flex items-center justify-center">
        <div className="w-[60%] h-[2px] bg-[#090a0c] -rotate-12" />
    </div>
    <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#121318] border-2 border-[#33373f] shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5)] z-50 pointer-events-none flex items-center justify-center">
        <div className="w-[60%] h-[2px] bg-[#090a0c] rotate-90" />
    </div>
    <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#121318] border-2 border-[#33373f] shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5)] z-50 pointer-events-none flex items-center justify-center">
        <div className="w-[60%] h-[2px] bg-[#090a0c] rotate-180" />
    </div>

    {/* Active state doors / overlay */}
    {active && (
      <>
        <motion.div className="absolute inset-y-2 left-2 w-[calc(50%-0.5rem)] rounded-l-2xl border-r border-[#33373f]/50 bg-[#161719]/90 backdrop-blur-md z-[60]" initial={{ x: 0, opacity: 1 }} animate={{ x: "-100%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        <motion.div className="absolute inset-y-2 right-2 w-[calc(50%-0.5rem)] rounded-r-2xl border-l border-[#33373f]/50 bg-[#161719]/90 backdrop-blur-md z-[60]" initial={{ x: 0, opacity: 1 }} animate={{ x: "100%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
        <motion.div layoutId="active-pod" className="absolute inset-[4px] border-4 border-[var(--accent)] rounded-[1.75rem] shadow-[inset_0_0_60px_var(--accent),0_0_30px_var(--accent)] z-[70] pointer-events-none" />
      </>
    )}
  </motion.button>;
}
