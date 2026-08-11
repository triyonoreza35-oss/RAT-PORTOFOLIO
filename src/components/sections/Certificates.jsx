"use client";

import { useState } from "react";
import { Database, ShieldCheck, Code2, Award, X, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Database Fundamentals",
    issuer: "Academic & Professional Training",
    year: "2024",
    skills: ["SQL", "Database Design", "Relational Data"],
    image: "/image/3.webP",
    icon: Database,
  },
  {
    title: "BNSP – Analis Program",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2025",
    skills: ["System Analysis", "UML", "Documentation"],
    image: "/image/2.webP",
    icon: Award,
  },
  {
    title: "Python Programming",
    issuer: "Online Learning Platform",
    year: "2023",
    skills: ["Logic", "Data Processing", "Automation"],
    image: "/image/python.webP",
    icon: Code2,
  },
  {
    title: "Cisco Cyber Security",
    issuer: "Cisco Networking Academy",
    year: "2024",
    skills: ["Network Security", "Threat Awareness"],
    image: "/image/1.webP",
    icon: ShieldCheck,
  },
];

export default function Certificates() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <>
      <section
        id="certificates"
        className="py-16 sm:py-24 md:py-28 pb-32 sm:pb-36 bg-[#0B0F17] text-slate-100 relative isolate overflow-hidden selection:bg-cyan-500/20 selection:text-cyan-300"
      >
        {/* ========================================================= */}
        {/* BACKGROUND DECORATIONS (UNCHANGED)                        */}
        {/* ========================================================= */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden">
          {/* 1. Technical Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0H0v24' fill='none' stroke='%23ffffff' stroke-width='0.75'/%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* 2. Soft Edge Masking (Vignette) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0F17_80%)]" />

          {/* 3. Restrained Ambient Glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

          {/* 4. Structural Vertical Architectural Grid Lines */}
          <div className="max-w-6xl mx-auto h-full w-full relative px-4 sm:px-6 border-x border-slate-800/30">
            <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
            <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent" />
          </div>

          {/* 5. Subtle Horizontal Blueprint Division Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />
        </div>
        {/* ========================================================= */}

        {/* MAIN CONTENT AREA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
          {/* Header Identity Section */}
          <div className="relative pl-5 sm:pl-8 mb-10 sm:mb-16">
            <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 to-purple-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]" />

            {/* Technical Editorial Label */}
            <div className="font-mono text-[11px] font-semibold text-cyan-400 tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
              <span>///</span>
              <span>VERIFIED CREDENTIALS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Certificates
            </h2>
            <p className="text-slate-400 mt-1 sm:mt-2 italic text-sm sm:text-base">
              Sertifikasi dan pelatihan profesional yang telah diselesaikan.
            </p>
          </div>

          {/* Certificate Cards Grid - SINGLE COLUMN ON MOBILE */}
          <div className="relative">
            {/* Corner Alignment Crosshairs */}
            <div className="hidden md:block absolute -top-4 -left-2 font-mono text-[10px] text-slate-800 select-none">
              +
            </div>
            <div className="hidden md:block absolute -top-4 -right-2 font-mono text-[10px] text-slate-800 select-none">
              +
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {certificates.map((cert) => (
                <CertificateCard
                  key={cert.title}
                  cert={cert}
                  onClick={() => setActiveCert(cert)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL LIGHTBOX */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-3xl
              bg-[#0B0F17]
              border border-slate-800
              rounded-2xl
              p-4 sm:p-6
              max-h-[90vh]
              overflow-y-auto
              shadow-2xl
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:bg-slate-800"
            >
              <X size={20} />
            </button>

            {/* Image Preview */}
            <div className="flex justify-center mt-2 overflow-hidden rounded-xl bg-slate-950 border border-slate-800/80">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full max-h-[65vh] object-contain"
              />
            </div>

            {/* Modal Info */}
            <div className="mt-4 text-left">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                <span>{activeCert.year}</span>
                <span>•</span>
                <span>{activeCert.issuer}</span>
              </div>
              <h3 className="text-slate-100 font-bold text-lg sm:text-xl">
                {activeCert.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {activeCert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CertificateCard({ cert, onClick }) {
  const Icon = cert.icon;

  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        w-full
        cursor-pointer
        rounded-2xl
        border border-slate-800/80
        bg-slate-900/40
        backdrop-blur-sm
        p-4 sm:p-5
        transition-all
        duration-300
        hover:border-cyan-500/50
        hover:bg-slate-900/60
        hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]
        flex flex-col
        justify-between
        overflow-hidden
      "
    >
      {/* Subtle Card Hover Glow */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute -inset-[1px]
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500/15
          to-purple-500/15
          opacity-0
          blur-md
          transition
          duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative z-10 w-full">
        {/* 1. THUMBNAIL PREVIEW (TOP) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800/80 mb-4">
          <img
            src={activeCertImage(cert.image)}
            alt={cert.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            onError={(e) => {
              // Fallback placeholder jika gambar gagal dimuat
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Badge Icon (Floating Top Right) */}
          <div className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 text-cyan-400 shadow-md">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* 2. CARD CONTENT (MIDDLE) */}
        <div className="space-y-2">
          {/* Year & Publisher */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-slate-300">{cert.issuer}</span>
            <span className="text-cyan-400/90 font-semibold">{cert.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-slate-100 font-bold text-base sm:text-lg leading-snug group-hover:text-cyan-300 transition-colors">
            {cert.title}
          </h3>

          {/* Skills / Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {Array.isArray(cert.skills) ? (
              cert.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/60 text-slate-300 border border-slate-700/50">
                {cert.skills}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. CARD FOOTER (BOTTOM) */}
      <div className="relative z-10 mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
          Lihat Sertifikat <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
        </span>
      </div>
    </div>
  );
}

// Helper kecil untuk antisipasi path image
function activeCertImage(path) {
  return path;
}