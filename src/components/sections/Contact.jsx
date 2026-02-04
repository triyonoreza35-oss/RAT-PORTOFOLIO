"use client";

import { Mail, Phone, Linkedin, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 pb-32 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
          Contact Me
        </h2>

        <p className="text-slate-400 mb-12 max-w-xl mx-auto">
          Silakan hubungi saya melalui salah satu kontak berikut.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <ContactItem
            icon={Mail}
            label="Email"
            value="triyonoreza35@gmail.com"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=triyonoreza35@gmail.com"
          />

          <ContactItem
            icon={Phone}
            label="WhatsApp"
            value="087820198593"
            href="https://wa.me/6287820198593"
          />

          <ContactItem
            icon={Linkedin}
            label="LinkedIn"
            value="linkedin.com/in/Reza-Aditya"
            href="https://linkedin.com/in/Reza Aditya"
          />
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label}`}
      title={label}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-6
        opacity-0 translate-y-4
        animate-[fadeUp_0.6s_ease-out_forwards]
        transition hover:border-[#A78BFA]
        hover:shadow-[0_0_24px_rgba(167,139,250,0.35)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition group-hover:border-[#A78BFA] group-hover:text-[#A78BFA]">
        <Icon size={26} />
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-200 break-all">
          {value}
        </p>
      </div>

      <ExternalLink
        size={14}
        className="absolute top-4 right-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </a>
  );
}
