"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="relative grid md:grid-cols-2 gap-14 items-center pl-8">

          {/* Vertical Accent Line - Re-animates every time view enters */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "16rem" }} // 16rem = h-64
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="
              absolute left-0 top-4 w-px
              bg-gradient-to-b
              from-[#A78BFA]
              via-[#A78BFA]/60
              to-transparent
              shadow-[0_0_18px_rgba(167,139,250,0.45)]
            "
          />

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative group">
              {/* ROTATING COLOR BORDER */}
              <div
                aria-hidden
                className="
                  absolute -inset-[3px] rounded-2xl
                  animate-spin-slow
                  bg-[conic-gradient(from_0deg,#a78bfa,#22d3ee,#34d399,#f472b6,#a78bfa)]
                  blur-[2px]
                "
              />

              {/* BORDER MASK */}
              <div className="absolute inset-0 rounded-2xl bg-slate-950" />

              {/* IMAGE */}
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
                <img
                  src="/image/foto.jpeg"
                  alt="Reza Aditya Triyono"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6"
            >
              About Me
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed mb-5 tracking-wide text-justify font-serif"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Saya adalah Lulusan Teknologi Informasi dari <strong>Universitas Bina Sarana Informatika</strong> 
              yang memiliki dedikasi tinggi dalam pengembangan web modern. Fokus utama saya adalah menjembatani 
              fungsionalitas backend dengan antarmuka frontend yang estetik.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 text-justify font-serif"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Saya terbiasa bekerja dengan ketelitian tinggi untuk memastikan setiap 
              baris kode yang saya tulis menghasilkan performa optimal dan pengalaman 
              pengguna yang inklusif di berbagai perangkat. Saya percaya bahwa setiap 
              detail dalam kode berkontribusi pada kesuksesan produk digital.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
              className="text-slate-500 text-sm italic border-l-2 border-[#A78BFA]/30 pl-4"
            >
              Terbuka untuk peluang kerja dan kolaborasi profesional.
            </motion.p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
} 