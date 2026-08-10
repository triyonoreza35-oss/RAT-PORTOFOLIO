"use client";

import { useState } from "react";
import { Database, ShieldCheck, Code2, Award, X } from "lucide-react";

const certificates = [
  {
    title: "Database Fundamentals",
    issuer: "Academic & Professional Training",
    year: "2024",
    skills: "SQL • Database Design • Relational Data",
    image: "/image/3.webP",
    icon: Database,
  },
  {
    title: "BNSP – Analis Program",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2025",
    skills: "System Analysis • UML • Documentation",
    image: "/image/2.webP",
    icon: Award,
  },
  {
    title: "Python Programming",
    issuer: "Online Learning Platform",
    year: "2023",
    skills: "Logic • Data Processing • Automation",
    image: "/image/python.webP",
    icon: Code2,
  },
  {
    title: "Cisco Cyber Security",
    issuer: "Cisco Networking Academy",
    year: "2024",
    skills: "Network Security • Threat Awareness",
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
        className="py-28 bg-gradient-to-b from-slate-900 to-slate-950"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-12">
            Certificate
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.title}
                cert={cert}
                onClick={() => setActiveCert(cert)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-lg
              sm:max-w-xl
              md:max-w-2xl
              bg-slate-900
              rounded-2xl
              p-4
              sm:p-6
              max-h-[90vh]
              overflow-y-auto
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
            >
              <X size={22} />
            </button>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full max-h-[65vh] object-contain rounded-xl"
              />
            </div>

            {/* Info */}
            <div className="mt-4 text-center sm:text-left">
              <h3 className="text-slate-100 font-semibold text-lg">
                {activeCert.title}
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                {activeCert.issuer} • {activeCert.year}
              </p>
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
    <button
      onClick={onClick}
      className="
        group
        relative
        w-full
        text-left
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition
        hover:border-[#A78BFA]
        hover:shadow-[0_0_28px_rgba(167,139,250,0.35)]
      "
    >
      {/* Glow */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute -inset-[2px]
          rounded-2xl
          bg-gradient-to-r
          from-purple-500
          via-pink-500
          to-cyan-500
          opacity-0
          blur-lg
          transition
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative flex gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-[#A78BFA]">
          <Icon size={22} />
        </div>

        <div>
          <h3 className="text-slate-100 font-semibold mb-1">{cert.title}</h3>
          <p className="text-slate-400 text-sm">{cert.issuer}</p>
          <p className="text-slate-500 text-xs mb-2">{cert.year}</p>
          <p className="text-xs font-medium text-[#A78BFA]">{cert.skills}</p>

          <span className="mt-3 inline-block text-xs text-slate-400 group-hover:text-[#A78BFA] transition">
            Klik untuk lihat sertifikat →
          </span>
        </div>
      </div>
    </button>
  );
}
