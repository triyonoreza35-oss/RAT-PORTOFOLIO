"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

const projects = [
  {
    title: "Website Buku Tamu Digital",
    description:
      "Layanan buku tamu digital untuk mendukung pencatatan, pengelolaan, dan rekapitulasi data kunjungan di lingkungan Kementerian BKKBN secara lebih terstruktur dan efisien.",
    tech: ["Laravel", "Bootstrap", "MySQL"],
    images: ["/image/login1.webp", "/image/admin1.webp", "/image/user2.webp"],
  },
  {
    title: "Website Peminjaman Ruangan",
    description:
      "Sistem layanan peminjaman ruangan di Kementerian BKKBN yang memudahkan pengguna memantau ketersediaan, mengatur jadwal, dan mengurangi potensi benturan penggunaan fasilitas.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    images: ["/image/login2.webp", "/image/admin2.webp", "/image/user3.webp"],
  },
  {
    title: "Website Bengkel Digital",
    description:
      "Platform layanan bengkel yang memudahkan pelanggan memperoleh informasi servis, pilihan layanan, dan estimasi perawatan secara cepat, praktis, dan terstruktur.",
    tech: ["PHP Native", "Bootstrap", "CSS"],
    images: [
      "/image/bengkel1.webp",
      "/image/bengkel2.webp",
      "/image/bengkel3.webp",
    ],
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalProjects = projects.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  }, [totalProjects]);

  // Pure mathematical style calculation
  const getCardPositionStyle = (index) => {
    let diff = index - activeIndex;

    if (diff < -1) diff += totalProjects;
    if (diff > 1) diff -= totalProjects;

    // Active Card
    if (diff === 0) {
      return {
        transform: "translateX(0%) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto",
      };
    }

    // Previous Card (Left)
    if (diff === -1) {
      return {
        transform: "translateX(-28%) scale(0.74) rotateY(7deg)",
        opacity: 0.4,
        zIndex: 10,
        pointerEvents: "auto",
      };
    }

    // Next Card (Right)
    if (diff === 1) {
      return {
        transform: "translateX(28%) scale(0.74) rotateY(-7deg)",
        opacity: 0.4,
        zIndex: 10,
        pointerEvents: "auto",
      };
    }

    return {
      transform: "translateX(0%) scale(0.6) rotateY(0deg)",
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    };
  };

  return (
    <section
      id="projects"
      className="py-10 xs:py-12 sm:py-16 md:py-20 xl:py-24 pb-20 xs:pb-24 sm:pb-28 md:pb-32 bg-[#0B0F17] text-slate-100 relative isolate overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300"
      aria-label="Projects Section"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0H0v24' fill='none' stroke='%23ffffff' stroke-width='0.75'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,#0B0F17_85%)]" />
        <div
          className="absolute -top-40 -left-40 w-[280px] xs:w-[340px] sm:w-[400px] md:w-[450px] h-[280px] xs:h-[340px] sm:h-[400px] md:h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[280px] xs:w-[340px] sm:w-[400px] md:w-[450px] h-[280px] xs:h-[340px] sm:h-[400px] md:h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, rgba(167, 139, 250, 0) 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto h-full w-full relative px-2 xs:px-3 sm:px-4 md:px-6 border-x border-slate-800/30">
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
          <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        </div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800/30 to-transparent" />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 w-full relative z-10">
        <div className="relative pl-4 xs:pl-5 sm:pl-8 mb-5 xs:mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2.5 sm:gap-4">
          <div>
            <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 to-primary shadow-[0_0_12px_rgba(34,211,238,0.3)]" />
            <div className="font-mono text-[10px] xs:text-[11px] font-semibold text-cyan-400 tracking-[0.2em] uppercase mb-1 flex items-center gap-1.5 xs:gap-2">
              <span>///</span>
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-slate-400 mt-1 italic text-xs xs:text-sm sm:text-base">
              Solusi teknis, arsitektur aplikasi, dan eksplorasi pengembangan
              web.
            </p>
          </div>

          <div className="font-mono text-[10px] xs:text-xs text-cyan-400/90 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800/80 w-fit self-start md:self-auto">
            <span>PROJECT </span>
            <span className="font-bold text-slate-100">0{activeIndex + 1}</span>
            <span className="text-slate-500"> / 0{totalProjects}</span>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative my-2 xs:my-3 sm:my-4 px-0 xs:px-1 sm:px-4 md:px-8">
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="
              absolute left-0 xs:left-0.5 sm:left-1 md:left-2 top-1/2 -translate-y-1/2 z-40
              p-1.5 md:p-2 rounded-full
              bg-slate-900/95 border border-slate-800
              text-cyan-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-950/40
              transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50
            "
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="
              absolute right-0 xs:right-0.5 sm:right-1 md:right-2 top-1/2 -translate-y-1/2 z-40
              p-1.5 md:p-2 rounded-full
              bg-slate-900/95 border border-slate-800
              text-cyan-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-950/40
              transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50
            "
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* 3D Stage */}
          <div
            className="relative w-full min-h-[390px] xs:min-h-[400px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[470px] flex items-center justify-center py-2 overflow-x-hidden [transform-style:preserve-3d]"
            aria-live="polite"
          >
            {projects.map((project, idx) => {
              const isActive = idx === activeIndex;
              const posStyle = getCardPositionStyle(idx);

              return (
                <div
                  key={project.title}
                  className="
                    absolute w-[72vw] xs:w-[250px] sm:w-[270px] md:w-[350px] lg:w-[390px] xl:w-[430px] max-w-full
                    transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  "
                  style={{
                    transform: posStyle.transform,
                    opacity: posStyle.opacity,
                    zIndex: posStyle.zIndex,
                    pointerEvents: posStyle.pointerEvents,
                  }}
                >
                  <ProjectCard project={project} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Pure Visual Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 z-40 relative">
            {projects.map((_, idx) => (
              <div
                key={idx}
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    : "w-1.5 bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard = React.memo(function ProjectCard({ project, isActive }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Duplikasi gambar pertama ke posisi paling akhir sebagai Clone
  const slides = [...project.images, project.images[0]];
  const totalOriginalImages = project.images.length;

  // Auto-play Image Slider HANYA saat project aktif
  useEffect(() => {
    if (!isActive) {
      setImgIndex(0);
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);

    const timer = setInterval(() => {
      if (!project.images || project.images.length === 0) return;

      setImgIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isActive, project.images]);

  // Handle pergantian instant dari Clone Index ke Index 0
  useEffect(() => {
    if (!isActive) return;

    if (imgIndex === totalOriginalImages) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setImgIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [imgIndex, totalOriginalImages, isActive]);

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setIsTransitioning(true);
    setImgIndex(index);
  };

  const activeDotIndex = imgIndex % totalOriginalImages;

  return (
    <div
      className={`
        group
        relative
        w-full
        rounded-2xl
        border
        bg-[#0D131F]
        p-2.5 xs:p-3 sm:p-3 md:p-3
        flex flex-col
        justify-between
        overflow-hidden
        transition-colors
        duration-300
        ${
          isActive
            ? "border-cyan-500/50 shadow-[0_0_25px_rgba(34,211,238,0.12)] bg-[#111827]"
            : "border-slate-800/80 hover:border-slate-700"
        }
      `}
    >
      {isActive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-400/20 z-30"
        />
      )}

      <div className="relative z-10 w-full space-y-3">
        {/* VIEWPORT SLIDER */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800/80 select-none">
          {/* TRACK SLIDER (Horizontal Flex Track) */}
          <div
            className="flex h-full w-full"
            style={{
              transform: `translate3d(-${imgIndex * 100}%, 0, 0)`,
              transition: isTransitioning
                ? "transform 700ms ease-in-out"
                : "none",
            }}
          >
            {slides.map((src, i) => (
              <div
                key={`${src}-${i}`}
                style={{
                  flex: "0 0 100%",
                  width: "100%",
                  minWidth: "100%",
                  height: "100%",
                }}
                className="relative h-full w-full bg-slate-950 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${(i % totalOriginalImages) + 1}`}
                  loading={isActive && i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="block h-full w-full object-contain object-center"
                />
              </div>
            ))}
          </div>

          {/* Dots Indicator Internal Project Card */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-800/80 z-20">
            {project.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => handleDotClick(e, i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeDotIndex === i ? "w-3 bg-cyan-400" : "w-1 bg-slate-600"
                }`}
              />
            ))}
          </div>

          <div className="absolute top-1.5 right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-md bg-slate-900/90 border border-slate-800 text-cyan-400 shadow-sm pointer-events-none z-20">
            <Layers className="w-3 h-3" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-slate-100 font-bold text-xs xs:text-sm sm:text-base leading-snug group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-400 text-[10px] xs:text-xs leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap gap-1">
        {project.tech.map((techItem, idx) => (
          <span
            key={idx}
            className="px-1.5 py-0.5 text-[9px] xs:text-[10px] font-mono rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
          >
            {techItem}
          </span>
        ))}
      </div>
    </div>
  );
});