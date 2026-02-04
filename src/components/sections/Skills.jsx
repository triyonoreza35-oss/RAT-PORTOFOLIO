"use client";

import { motion } from "framer-motion";

/* =======================
    DATA SKILLS (Updated Layout & Fix Icon)
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
    <section id="skills" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 w-full">
        
        {/* Title Section */}
        <div className="relative pl-8 mb-16">
          <span className="absolute left-0 top-0 h-full w-px bg-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.5)]" />
          <h2 className="text-3xl font-bold text-slate-100">Technical Skills</h2>
          <p className="text-slate-400 mt-2 italic">Teknologi yang saya gunakan untuk membangun solusi digital.</p>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <SkillCategory title="Core & Backend" skills={coreSkills} />
          <SkillCategory title="Frontend & UI" skills={frontendSkills} />
        </div>
      </div>
    </section>
  );
}

/* =======================
    SUB COMPONENT
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
                onError={(e) => { e.target.src = "https://cdn.simpleicons.org/render"; }} // Fallback jika link error
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