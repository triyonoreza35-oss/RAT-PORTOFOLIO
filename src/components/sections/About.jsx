"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// ==========================================
// TIMELINE DATA STRUCTURE
// ==========================================
const timelineItems = [
  {
    id: "01",
    year: "INTERNSHIP",
    category: "WORK EXPERIENCE",
    title: "Web Development Intern — BKKBN",
    organization:
      "Kementerian Kependudukan dan Pembangunan Keluarga / Badan Kependudukan dan Keluarga Berencana Nasional (BKKBN)",
    badge: "Internship",
    description:
      "Selama menjalani program magang di BKKBN, saya terlibat langsung dalam proses pengembangan aplikasi web untuk mendukung kebutuhan internal. Saya berkontribusi dalam membangun dua aplikasi, yaitu sistem Buku Tamu menggunakan framework Laravel dan sistem Peminjaman Ruangan menggunakan Next.js. Pengalaman ini memperkenalkan saya pada proses pengembangan aplikasi secara nyata, mulai dari memahami kebutuhan pengguna, merancang alur sistem, mengimplementasikan fitur, melakukan debugging, hingga memastikan aplikasi dapat digunakan secara efektif.",
    skills: ["Laravel", "Next.js", "Web Development"],
    isActive: true,
  },
  {
    id: "02",
    year: "EDUCATION",
    category: "COLLEGE DEGREE",
    title: "Mahasiswa Teknologi Informasi",
    organization: "Universitas Bina Sarana Informatika",
    badge: "IPK 3.94",
    description:
      "Selama menempuh pendidikan di Universitas Bina Sarana Informatika, saya membangun fondasi yang kuat dalam bidang Teknologi Informasi dan pengembangan perangkat lunak. Saya mempelajari dasar-dasar pemrograman seperti variabel, conditional statement, loop, function, struktur data, serta konsep algoritma dan pemecahan masalah. Selain kemampuan teknis, saya juga mempelajari analisis sistem, basis data, rekayasa perangkat lunak, pengembangan aplikasi web, serta prinsip dasar pengujian perangkat lunak. Pendidikan ini menjadi fondasi bagi saya untuk berkembang sebagai web developer.",
    skills: [
      "Programming Fundamentals",
      "Web Development",
      "Database",
      "System Analysis",
    ],
    isActive: false,
  },
  {
    id: "03",
    year: "EDUCATION",
    category: "HIGH SCHOOL",
    title: "Accounting & Business Fundamentals",
    organization: "SMK Kharismawita",
    badge: null,
    description:
      "Pada masa pendidikan di SMK Kharismawita, saya memperoleh pemahaman dasar mengenai administrasi dan pembukuan, khususnya dalam pencatatan transaksi dan pengelolaan keuangan. Saya mempelajari konsep jurnal, buku besar, neraca, pencatatan aset, serta proses dasar penyusunan laporan keuangan. Pengalaman tersebut membentuk kemampuan saya dalam bekerja secara teliti, terstruktur, dan sistematis dalam mengelola informasi.",
    skills: ["Accounting Fundamentals", "Bookkeeping", "Financial Records"],
    isActive: false,
  },
  {
    id: "04",
    year: "PRESENT",
    category: "CURRENT FOCUS",
    title: "Web Development & Continuous Learning",
    organization: "Self-Driven & Open to Opportunities",
    badge: "Current Focus",
    description:
      "Saat ini saya berfokus pada pengembangan kemampuan sebagai Web Developer dengan memperdalam modern web development, clean code, responsive interface, component-based architecture, dan pengembangan aplikasi yang scalable. Saya terus membangun project nyata untuk meningkatkan kemampuan problem solving sekaligus memperluas pemahaman terhadap ekosistem teknologi web modern.",
    skills: ["React", "Next.js", "Laravel", "UI/UX", "Clean Code"],
    isActive: true,
  },
];

// ==========================================
// OPTIMIZED REUSABLE TIMELINE ITEM
// ==========================================
function TimelineItem({ item, isLast }) {
  return (
    <div className="relative flex gap-4 sm:gap-8 group">
      {/* LEFT COLUMN: NODE & VERTICAL LINE */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Node Circle */}
        <div
          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-200 ${
            item.isActive
              ? "bg-[#0B0F17] border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              : "bg-[#0B0F17] border-slate-800 group-hover:border-purple-400/60"
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              item.isActive
                ? "bg-cyan-400"
                : "bg-slate-600 group-hover:bg-purple-400 transition-colors duration-200"
            }`}
          />
        </div>

        {/* Connecting Line */}
        {!isLast && (
          <div className="w-[2px] grow bg-gradient-to-b from-slate-800 via-slate-800/60 to-transparent my-1" />
        )}
      </div>

      {/* RIGHT COLUMN: CONTENT CARD (Removed backdrop-blur-sm) */}
      <div className="pb-10 w-full min-w-0">
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111622] border border-slate-800/80 hover:border-slate-700/80 transition-colors duration-200 hover:shadow-lg hover:shadow-cyan-950/20">
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-slate-400">
              <span className="text-cyan-400 font-bold">{item.id}</span>
              <span>///</span>
              <span>{item.category}</span>
            </div>

            {item.badge && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
                  item.isActive
                    ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                    : "bg-purple-500/10 text-purple-300 border-purple-500/30"
                }`}
              >
                {item.badge}
              </span>
            )}
          </div>

          {/* Title & Organization */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-cyan-400/90 mt-1 mb-3">
            {item.organization}
          </p>

          {/* Description */}
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Skill / Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/50">
            {item.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-md bg-slate-800/60 text-slate-300 text-[11px] font-mono border border-slate-700/50 hover:border-slate-600 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN ABOUT SECTION COMPONENT
// ==========================================
export default function About() {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  // Check fine pointer capabilities on client mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mediaQuery.matches);

    const handler = (e) => setCanHover(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth GPU spring config
  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  // Restrained rotation angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const charY = useTransform(mouseY, [-0.5, 0.5], [-10, 8]);

  const handleMouseMove = (e) => {
    if (!canHover || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    rawX.set(xPct);
    rawY.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!canHover || shouldReduceMotion) return;
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      id="about"
      className="relative py-28 bg-[#0B0F17] text-slate-100 overflow-hidden flex items-center justify-center min-h-screen selection:bg-cyan-500/20 selection:text-cyan-300"
    >
      {/* ================= BACKGROUND EDITORIAL GRID SYSTEM ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Technical Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0H0v24' fill='none' stroke='%23ffffff' stroke-width='0.75'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Soft Edge Masking for Grid (Vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0F17_80%)]" />

        {/* RADIAL GRADIENTS WITHOUT EXPENSIVE BLUR FILTERS */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(11,15,23,0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(11,15,23,0) 70%)",
          }}
        />

        {/* Structural Vertical Architectural Grid Lines */}
        <div className="max-w-6xl mx-auto h-full w-full relative px-6 border-x border-slate-800/30">
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
          <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent" />
        </div>
      </div>
      {/* =================================================================== */}

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* AREA KARTU 3D TRUNKS STYLE (STICKY ON DESKTOP) */}
          <div className="md:col-span-5 flex justify-center md:sticky md:top-28">
            <div
              className="relative w-64 h-[380px] sm:w-72 sm:h-[420px] flex justify-center items-end"
              style={{ perspective: "1000px" }}
            >
              {/* Interaksi Mouse + Animasi 3D disatukan pada ukuran presisi kartu (h-[75%]) */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX: shouldReduceMotion ? 0 : rotateX,
                  rotateY: shouldReduceMotion ? 0 : rotateY,
                  transformStyle: "preserve-3d",
                  willChange: canHover ? "transform" : "auto",
                }}
                className="relative w-full h-[75%] flex justify-center items-end cursor-pointer group"
              >
                {/* 1. WRAPPER BINGKAI HITAM */}
                <div
                  className="
                  absolute inset-0 w-full h-full rounded-[30px] 
                  bg-gradient-to-b from-slate-900 via-slate-950 to-black 
                  border border-cyan-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.8)]
                  transition-colors duration-300 z-10 overflow-hidden
                  group-hover:border-cyan-400/80
              "
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 via-transparent to-purple-950/30 pointer-events-none" />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

                  {/* Gambar Background Dalam Kartu */}
                  <img
                    src="/image/foto.png"
                    alt="Background Pattern"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-25"
                  />

                  <div className="absolute top-4 left-0 right-0 text-center z-20">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/30 text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase shadow-md">
                      DEVELOPER PROFILE
                    </span>
                  </div>
                </div>

                {/* 2. FOTO PNG TRANSPARAN (PARALLAX OUT-OF-BOUNDS) */}
                <motion.div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(40px)",
                    y: shouldReduceMotion ? 0 : charY,
                    willChange: canHover ? "transform" : "auto",
                  }}
                  className="
                  absolute bottom-0 z-30 w-[90%] h-[140%] flex items-end justify-center 
                  pointer-events-none
                "
                >
                  <img
                    src="/image/foto.png"
                    alt="Reza Aditya Triyono"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="
                    w-full h-full object-cover object-top
                    transition-transform duration-300 ease-out group-hover:scale-105
                "
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* AREA VERTICAL TIMELINE ABOUT */}
          <div className="md:col-span-7 space-y-8">
            {/* Header Identity */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>/// DEVELOPER PROFILE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                My <span className="text-cyan-400">Journey</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Mahasiswa{" "}
                <strong className="text-cyan-300 font-semibold">
                  Teknologi Informasi
                </strong>{" "}
                berfokus pada pengembangan web modern, arsitektur berbasis
                komponen, dan pembuatan antarmuka yang responsif.
              </p>
            </div>

            {/* Vertical Timeline Container */}
            <div className="pt-4">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isLast={index === timelineItems.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
