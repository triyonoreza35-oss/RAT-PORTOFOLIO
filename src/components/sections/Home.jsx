"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const firstParagraph =
    "Saya adalah pengembang web yang berdedikasi untuk menciptakan antarmuka yang bersih, berperforma tinggi, dan inklusif. Fokus saya adalah mengubah baris kode menjadi solusi digital yang bermakna.";

  const secondParagraph =
    "Spesialisasi dalam membangun aplikasi web yang scalable, responsif, dan siap untuk kebutuhan dunia nyata.";

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // LOGIKA UTAMA: Typewriter + Hash Listener
  useEffect(() => {
    // 1. Fungsi untuk Reset State
    const resetAnimation = () => {
      setText("");
      setIndex(0);
      setDone(false);
    };

    // 2. Listener untuk deteksi klik Navigasi (href="#home")
    const handleHashChange = () => {
      if (window.location.hash === "#home" || window.location.hash === "") {
        resetAnimation();
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // 3. Interval Pengetikan
    if (index < firstParagraph.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + firstParagraph[index]);
        setIndex((prev) => prev + 1);
      }, 22);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener("hashchange", handleHashChange);
      };
    } else {
      setDone(true);
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [index, firstParagraph]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="relative max-w-2xl pl-8">
          
          {/* Vertical Accent Line dengan Animasi Fade In */}
          <span
            aria-hidden
            className="absolute left-0 top-3 h-48 w-px bg-gradient-to-b from-[#A78BFA] via-[#A78BFA]/60 to-transparent shadow-[0_0_12px_rgba(167,139,250,0.35)] animate-[lineGrow_1.5s_ease-out_forwards]"
          />

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-100 mb-6 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]">
            Reza Aditya Triyono <br />
            <span className="text-[#A78BFA] text-2xl sm:text-3xl md:text-4xl">
              Web Developer & UI Enthusiast
            </span>
          </h1>

          {/* Typewriter Paragraph */}
          <p
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-4 font-serif tracking-wide min-h-[80px]"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {text}
            {!done && <span className="typing-cursor">|</span>}
          </p>

          {/* Second Paragraph - Muncul setelah typing selesai */}
          <div className="min-h-[60px]">
            {done && (
              <p className="text-slate-500 text-sm sm:text-base max-w-xl mb-10 opacity-0 animate-[fadeUp_0.5s_ease-out_forwards]">
                {secondParagraph}
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:row gap-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.8s_forwards]">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-[#A78BFA] text-slate-950 font-medium transition hover:bg-[#9173f6] hover:-translate-y-0.5 active:scale-95"
              >
                Contact me
              </a>

              <a
                href="/cv/CV.pdf"
                download
                className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-slate-700 text-slate-200 transition hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95"
              >
                Unduh CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineGrow {
          from { height: 0; opacity: 0; }
          to { height: 192px; opacity: 1; }
        }

        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          color: #a78bfa;
          animation: blink 1s steps(2, start) infinite;
        }

        @keyframes blink {
          to { visibility: hidden; }
        }
      `}</style>
    </section>
  );
}