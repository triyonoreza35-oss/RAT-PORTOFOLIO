"use client";

import { Mail, Phone, Linkedin, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 pb-32 bg-[#0B0F17] text-slate-100 relative isolate overflow-hidden selection:bg-cyan-500/20 selection:text-cyan-300"
      aria-labelledby="contact-title"
    >
      {/* ========================================================= */}
      {/* TECHNICAL FUTURISTIC BACKGROUND DECORATION               */}
      {/* ========================================================= */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden">
        {/* 1. Fine Technical Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0H0v24' fill='none' stroke='%23ffffff' stroke-width='0.75'/%3E%3C/svg%3E")`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* 2. Soft Edge Masking (Vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0F17_85%)]" />

        {/* 3. Restrained Ambient Glows Behind Central Area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-[140px]" />

        {/* 4. Asymmetrical Vertical Architectural Grid Lines */}
        <div className="max-w-5xl mx-auto h-full w-full relative px-4 sm:px-6 border-x border-slate-800/30">
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
          <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent" />
        </div>

        {/* 5. Subtle Horizontal Blueprint Division Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />
      </div>
      {/* ========================================================= */}

      {/* MAIN CONTENT AREA */}
      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
        {/* Technical Editorial Label */}
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-cyan-400 tracking-[0.2em] uppercase mb-2 flex items-center justify-center gap-2">
          <span>///</span>
          <span>GET IN TOUCH</span>
        </div>

        <h2
          id="contact-title"
          className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 tracking-tight"
        >
          Contact Me
        </h2>

        <p className="text-slate-400 mb-16 max-w-md mx-auto leading-relaxed text-sm sm:text-base italic">
          Silakan hubungi saya melalui salah satu kontak di bawah ini.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <ContactItem
            icon={Mail}
            label="Email"
            lines={["triyonoreza35@gmail.com"]}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=triyonoreza35@gmail.com"
          />

          <ContactItem
            icon={Phone}
            label="WhatsApp"
            lines={["0878-2019-8593"]}
            href="https://wa.me/6287820198593"
          />

          <ContactItem
            icon={Linkedin}
            label="LinkedIn"
            lines={["linkedin.com/in", "/reza-aditya-triyono-b21263262"]}
            href="https://www.linkedin.com/in/reza-aditya-triyono-b21263262"
          />
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, lines, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label}`}
      className="
        group relative flex flex-col items-center justify-center
        min-h-[170px]
        gap-4 rounded-2xl
        border border-slate-800 bg-slate-900/60 backdrop-blur-sm
        px-6 py-7
        transition-all duration-300
        hover:border-[#A78BFA]
        hover:shadow-[0_0_26px_rgba(167,139,250,0.25)]
      "
    >
      <div
        className="
          flex h-13 w-13 items-center justify-center rounded-xl
          border border-slate-700 bg-slate-900 text-slate-400
          transition-colors
          group-hover:border-[#A78BFA]
          group-hover:text-[#A78BFA]
        "
      >
        <Icon size={24} />
      </div>

      <div className="text-center space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-slate-500 font-mono">
          {label}
        </p>

        <div className="text-sm font-medium text-slate-200 leading-snug">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      <ExternalLink
        size={14}
        className="
          absolute top-4 right-4
          text-slate-600
          opacity-0
          transition-opacity
          group-hover:opacity-100
        "
      />
    </a>
  );
}