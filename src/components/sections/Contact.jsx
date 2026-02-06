"use client";

import { Mail, Phone, Linkedin, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 pb-32 bg-gradient-to-b from-slate-950 to-slate-900"
      aria-labelledby="contact-title"
    >
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2
          id="contact-title"
          className="text-2xl sm:text-3xl font-bold text-slate-100 mb-5"
        >
          Contact Me
        </h2>

        <p className="text-slate-400 mb-16 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
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
            lines={["linkedin.com/in", "/reza-aditya"]}
            href="https://linkedin.com/in/reza-aditya"
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
        border border-slate-800 bg-slate-900
        px-6 py-7
        transition
        hover:border-[#A78BFA]
        hover:shadow-[0_0_26px_rgba(167,139,250,0.35)]
      "
    >
      <div
        className="
          flex h-13 w-13 items-center justify-center rounded-xl
          border border-slate-700 text-slate-400
          transition
          group-hover:border-[#A78BFA]
          group-hover:text-[#A78BFA]
        "
      >
        <Icon size={24} />
      </div>

      <div className="text-center space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-slate-500">
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
