"use client";

import { motion } from "framer-motion";

/* =======================
    DATA SKILLS (Unchanged)
======================= */

const coreSkills = [
  { label: "HTML", color: "hover:text-orange-500", glow: "hover:shadow-orange-500/20", icon: "https://cdn.simpleicons.org/html5" },
  { label: "JavaScript", color: "hover:text-yellow-400", glow: "hover:shadow-yellow-400/20", icon: "https://cdn.simpleicons.org/javascript" },
  { label: "PHP", color: "hover:text-indigo-400", glow: "hover:shadow-indigo-400/20", icon: "https://cdn.simpleicons.org/php" },
  { label: "Laravel", color: "hover:text-red-500", glow: "hover:shadow-red-500/20", icon: "https://cdn.simpleicons.org/laravel" },
  { label: "Next.js", color: "hover:text-slate-100", glow: "hover:shadow-slate-100/20", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
];

const frontendSkills = [
  { label: "CSS", color: "hover:text-blue-500", glow: "hover:shadow-blue-500/20", icon: "/icons/css.png" },
  { label: "React", color: "hover:text-cyan-400", glow: "hover:shadow-cyan-400/20", icon: "https://cdn.simpleicons.org/react" },
  { label: "Tailwind", color: "hover:text-teal-400", glow: "hover:shadow-teal-400/20", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { label: "Bootstrap", color: "hover:text-purple-500", glow: "hover:shadow-purple-500/20", icon: "https://cdn.simpleicons.org/bootstrap" },
];

/* =======================
    MAIN COMPONENT
======================= */

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-28 bg-[#0B0F17] text-slate-100 relative isolate overflow-hidden selection:bg-cyan-500/20 selection:text-cyan-300"
    >
      {/* ========================================================= */}
      {/* BACKGROUND DECORATIONS (DIRECT CONTINUATION OF ABOUT)    */}
      {/* ========================================================= */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden">
        
        {/* 1. Exact Grid Pattern matching About Section */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0H0v24' fill='none' stroke='%23ffffff' stroke-width='0.75'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* 2. Soft Edge Masking (Vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0F17_80%)]" />

        {/* 3. Restrained Ambient Glows (Continuity with About) */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

        {/* 4. Structural Architectural Grid Lines (Identical to About) */}
        <div className="max-w-6xl mx-auto h-full w-full relative px-6 border-x border-slate-800/30">
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
          <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent" />
        </div>

        {/* 5. Subtle Horizontal Blueprint Division Line for Skills Structure */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />

      </div>
      {/* ========================================================= */}

      {/* MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        
        {/* Title Section */}
        <div className="relative pl-8 mb-16">
          <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 to-purple-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]" />
          
          {/* Subtle Technical Label */}
          <div className="font-mono text-[11px] font-semibold text-cyan-400 tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
            <span>///</span>
            <span>TECHNICAL CAPABILITIES</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Technical Skills</h2>
          <p className="text-slate-400 mt-2 italic text-sm sm:text-base">Teknologi yang saya gunakan untuk membangun solusi digital.</p>
        </div>

        {/* Skills Grid Area */}
        <div className="relative">
          {/* Subtle Corner Alignment Indicators */}
          <div className="hidden md:block absolute -top-4 -left-2 font-mono text-[10px] text-slate-800 select-none">+</div>
          <div className="hidden md:block absolute -top-4 -right-2 font-mono text-[10px] text-slate-800 select-none">+</div>

          <div className="grid gap-16 md:grid-cols-2">
            <SkillCategory title="Core & Backend" skills={coreSkills} />
            <SkillCategory title="Frontend & UI" skills={frontendSkills} />
          </div>
        </div>

      </div>
    </section>
  );
}

/* =======================
    SUB COMPONENT (Unchanged)
======================= */

function SkillCategory({ title, skills }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-slate-300 font-semibold mb-8 flex items-center gap-2">
        <span className="w-8 h-[1px] bg-slate-700"></span> {title}
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div key={skill.label} className="group flex flex-col items-center gap-3">
            <div
              className={`
                relative
                w-16 h-16
                flex items-center justify-center
                rounded-2xl
                bg-slate-900/50
                border border-slate-800
                transition-all duration-300
                group-hover:-translate-y-2
                group-hover:border-[#A78BFA]/50
                group-hover:shadow-[0_10px_25px_-10px_rgba(167,139,250,0.3)]
                ${skill.glow}
              `}
            >
              <img 
                src={skill.icon} 
                alt={skill.label} 
                className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => { e.target.src = "https://cdn.simpleicons.org/render"; }}
              />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-slate-200 transition-colors duration-300">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}