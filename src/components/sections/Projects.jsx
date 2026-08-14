"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    title: "Website Buku Tamu Digital",
    situation:
      "Pencatatan tamu masih manual menggunakan buku fisik sehingga data sering hilang dan sulit direkap.",
    task: "Membangun sistem pencatatan tamu berbasis web yang mudah digunakan dan tersimpan aman.",
    action:
      "Mengembangkan aplikasi menggunakan Laravel dan MySQL dengan form input, autentikasi admin, serta dashboard data pengunjung.",
    result:
      "Mempermudah proses pencatatan dan rekap data tamu, serta mengurangi risiko kehilangan data secara signifikan.",
    tech: "Laravel • Bootstrap • MySQL",
    images: ["/image/login1.webp", "/image/admin1.webp", "/image/user2.webp"],
  },
  {
    title: "Website Peminjaman Ruangan",
    situation:
      "Proses peminjaman ruangan dilakukan manual sehingga sering terjadi bentrok jadwal.",
    task: "Menyediakan sistem peminjaman ruangan online dengan informasi ketersediaan yang jelas.",
    action:
      "Membangun aplikasi berbasis Next.js dan React dengan manajemen jadwal, autentikasi user, dan tampilan responsif.",
    result:
      "Mengurangi konflik jadwal dan meningkatkan efisiensi peminjaman ruangan secara online.",
    tech: "Next.js • React • Tailwind CSS",
    images: ["/image/login2.jpeg", "/image/admin2.webp", "/image/user3.jpeg"],
  },
  {
    title: "Website Bengkel Digital",
    situation:
      "Pelanggan kesulitan mendapatkan informasi layanan bengkel secara jelas dan harus datang langsung untuk mengetahui detail servis.",
    task: "Menyediakan media informasi digital agar pelanggan dapat mengetahui layanan bengkel tanpa harus datang ke lokasi.",
    action:
      "Membangun website informasi bengkel menggunakan PHP Native dengan tampilan antarmuka berbasis Bootstrap.",
    result:
      "Membantu pelanggan mengakses informasi bengkel secara cepat dan meningkatkan profesionalitas bisnis bengkel secara online.",
    tech: "PHP Native • Bootstrap  • CSS",
    images: [
      "/image/bengkel1.webp",
      "/image/bengkel2.webp",
      "/image/bengkel3.webp",
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-12">
          Projects
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % project.images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <div
      className="
        relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30
      "
    >
      {/* Image Slider */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {project.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={project.title}
              className="w-full h-full flex-shrink-0 object-cover object-top"
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-slate-100 font-semibold tracking-tight">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-slate-400 text-sm line-clamp-2">
          {project.situation}
        </p>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="text-sm text-violet-400 hover:text-violet-300 transition inline-flex items-center gap-1"
        >
          {expanded ? "Hide case study" : "View case study →"}
        </button>

        {/* STAR Content — Smooth Expand / Collapse */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${
              expanded
                ? "max-h-[500px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-1"
            }
          `}
        >
          <ul className="text-slate-400 text-sm space-y-2 pt-2">
            <li>
              <span className="font-medium text-slate-300">Situation:</span>{" "}
              {project.situation}
            </li>
            <li>
              <span className="font-medium text-slate-300">Task:</span>{" "}
              {project.task}
            </li>
            <li>
              <span className="font-medium text-violet-400">Action:</span>{" "}
              {project.action}
            </li>
            <li>
              <span className="font-medium text-emerald-400">Result:</span>{" "}
              {project.result}
            </li>
          </ul>
        </div>

        <p className="text-xs text-[#A78BFA] font-medium pt-2">
          {project.tech}
        </p>
      </div>
    </div>
  );
}
