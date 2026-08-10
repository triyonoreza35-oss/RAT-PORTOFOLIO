"use client";

import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const FIRST_PARAGRAPH =
  "Saya adalah pengembang web yang berdedikasi untuk menciptakan antarmuka yang bersih, berperforma tinggi, dan inklusif. Fokus saya adalah mengubah baris kode menjadi solusi digital yang bermakna.";
const SECOND_PARAGRAPH =
  "Spesialisasi dalam membangun aplikasi web yang scalable, responsif, dan siap untuk kebutuhan dunia nyata.";

export default function Home({ isIntroActive = false }) {
  // Tetap panggil hook, namun karena ingin selalu animated, kita paksa nilai reduced motion ke false
  // (Atau jika ingin tetap menghormati setting OS, biarkan systemPrefersReducedMotion mengatur, tapi animasi scroll-reveal tetap aktif).
  const systemPrefersReducedMotion = usePrefersReducedMotion();

  // Jika ingin benar-benar selalu animated tanpa peduli setting OS:
  const prefersReducedMotion = false;

  const canvasRef = useRef(null);

  // Deep-Space Particle Field Animation Loop & Cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- Tunables -----------------------------------------------------
    const PARTICLE_COUNT = 70;
    const MIN_SPEED = 0.15;
    const MAX_SPEED = 0.45;
    const SMOOTHING = 0.02;
    const RETARGET_MIN_S = 2.5;
    const RETARGET_MAX_S = 5.5;
    const CONNECTION_DIST = 120;
    const MOUSE_RADIUS = 140;
    const MOUSE_FORCE = 0.9;
    const EDGE_MARGIN = 30;
    // --------------------------------------------------------------------

    const randRange = (min, max) => min + Math.random() * (max - min);

    const makeRandomVelocity = (speedMultiplier) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = randRange(MIN_SPEED, MAX_SPEED) * speedMultiplier;
      return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
    };

    const createParticle = () => {
      const depth = Math.random();
      const speedMultiplier = 0.5 + depth * 0.9;
      const { vx, vy } = makeRandomVelocity(speedMultiplier);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        targetVx: vx,
        targetVy: vy,
        depth,
        radius: 0.6 + depth * 1.8,
        baseOpacity: 0.15 + depth * 0.55,
        speedMultiplier,
        retargetIn: randRange(RETARGET_MIN_S, RETARGET_MAX_S),
      };
    };

    const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

    let mouseX = -9999;
    let mouseY = -9999;

    const handleCanvasMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleCanvasMouseMove, {
      passive: true,
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // --- Full animated render loop ---
    let lastTime = performance.now();

    const render = (now) => {
      const rawDt = (now - lastTime) / (1000 / 60);
      const dt = Math.min(rawDt, 3);
      const dtSeconds = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.retargetIn -= dtSeconds;

        if (p.retargetIn <= 0) {
          const { vx, vy } = makeRandomVelocity(p.speedMultiplier);
          p.targetVx = vx;
          p.targetVy = vy;
          p.retargetIn = randRange(RETARGET_MIN_S, RETARGET_MAX_S);
        }

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const mouseDist = Math.hypot(dx, dy);

        if (mouseDist < MOUSE_RADIUS && mouseDist > 0.001) {
          const strength =
            (1 - mouseDist / MOUSE_RADIUS) *
            MOUSE_FORCE *
            (0.4 + p.depth * 0.6);

          p.vx += (dx / mouseDist) * strength * dt;
          p.vy += (dy / mouseDist) * strength * dt;
        }

        p.vx += (p.targetVx - p.vx) * SMOOTHING * dt;
        p.vy += (p.targetVy - p.vy) * SMOOTHING * dt;

        const maxSpeed = MAX_SPEED * p.speedMultiplier * 3;
        const speed = Math.hypot(p.vx, p.vy);

        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          p.vx *= scale;
          p.vy *= scale;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < -EDGE_MARGIN) p.x = width + EDGE_MARGIN;
        if (p.x > width + EDGE_MARGIN) p.x = -EDGE_MARGIN;
        if (p.y < -EDGE_MARGIN) p.y = height + EDGE_MARGIN;
        if (p.y > height + EDGE_MARGIN) p.y = -EDGE_MARGIN;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.baseOpacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < CONNECTION_DIST) {
            const depthFactor = (p1.depth + p2.depth) / 2;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${
              (1 - dist / CONNECTION_DIST) * (0.25 + depthFactor * 0.3)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const p = particles[i];
        const mDist = Math.hypot(p.x - mouseX, p.y - mouseY);

        if (mDist < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(34, 211, 238, ${1 - mDist / MOUSE_RADIUS})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleCanvasMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#07080C] overflow-hidden pt-24 pb-28 sm:py-0"
    >
      {/* Interactive Particle Network & Cyberpunk Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden cyber-grid layer-bg"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />

        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[150px]" />
      </div>

      {/* Main Content */}
      <div
        key={isIntroActive ? "intro-active" : "intro-done"}
        className={`relative max-w-6xl mx-auto px-4 sm:px-6 w-full z-10 transition-opacity duration-700 ${
          isIntroActive ? "opacity-0" : "opacity-100 start-reveal"
        }`}
      >
        <div className="relative max-w-2xl pl-4 sm:pl-10 border-l border-slate-800/80 layer-front transition-transform duration-200 ease-out">
          <span
            aria-hidden="true"
            className="absolute left-[-1px] top-4 h-32 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent shadow-[0_0_25px_rgba(167,139,250,0.9)] origin-top transition-transform duration-1000 ease-out"
            style={{
              transform: isIntroActive ? "scaleY(0)" : "scaleY(1)",
            }}
          />

          <h1
            className="text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 mb-2 scroll-reveal break-words"
            style={{
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            Reza Aditya Triyono
          </h1>

          <h2
            className="text-base sm:text-2xl md:text-3xl font-medium text-slate-400 mb-6 sm:mb-8 flex flex-wrap items-center gap-1.5 sm:gap-3 scroll-reveal"
            style={{
              animationDelay: "0.2s",
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
              Web Developer
            </span>

            <span className="text-slate-600">&amp;</span>

            <span className="text-slate-300">UI Enthusiast</span>
          </h2>

          <div
            className="space-y-4 font-serif tracking-wide text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-12 scroll-reveal"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              animationDelay: "0.4s",
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            <p>{FIRST_PARAGRAPH}</p>

            <p className="text-slate-500 text-sm sm:text-base">
              {SECOND_PARAGRAPH}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-5 scroll-reveal"
            style={{
              animationDelay: "0.6s",
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            <a
              href="#contact"
              className="group relative inline-flex justify-center items-center px-8 py-3.5 rounded-lg bg-slate-100 text-slate-900 font-semibold tracking-wide overflow-hidden transition-transform duration-150 ease-out shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Contact me
              </span>
            </a>

            <a
              href="/cv/CV.pdf"
              download
              className="group inline-flex justify-center items-center px-8 py-3.5 rounded-lg border border-slate-700/80 bg-slate-900/50 text-slate-300 font-medium tracking-wide transition-all hover:bg-slate-800 hover:border-purple-500/50 hover:text-white"
            >
              Unduh CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
