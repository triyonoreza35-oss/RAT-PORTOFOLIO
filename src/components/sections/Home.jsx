"use client";

import { useEffect, useRef, useState } from "react";

const FIRST_PARAGRAPH =
  "Saya adalah pengembang web yang berdedikasi untuk menciptakan antarmuka yang bersih, berperforma tinggi, dan inklusif. Fokus saya adalah mengubah baris kode menjadi solusi digital yang bermakna.";
const SECOND_PARAGRAPH =
  "Spesialisasi dalam membangun aplikasi web yang scalable, responsif, dan siap untuk kebutuhan dunia nyata.";

const ROLES = [
  "Membangun Pengalaman Digital",
  "Merancang Antarmuka Web Modern",
  "Mengubah Ide Menjadi Website",
  "Menciptakan Web yang Cepat & Menarik",
];

export default function Home({ isIntroActive = false }) {
  // State Typing Effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [canStartTyping, setCanStartTyping] = useState(false);

  const canvasRef = useRef(null);

  // 1. Pemicu start typing setelah intro selesai (jeda 300ms agar pas dengan CSS scroll-reveal)
  useEffect(() => {
    if (isIntroActive) {
      setCanStartTyping(false);
      return;
    }

    const startTimeout = setTimeout(() => {
      setCanStartTyping(true);
    }, 300);

    return () => clearTimeout(startTimeout);
  }, [isIntroActive]);

  // 2. Typing Effect Logic Utama
  useEffect(() => {
    if (!canStartTyping) return;

    const currentFullText = ROLES[roleIndex];
    let timer;

    if (!isDeleting) {
      // Mode Mengetik
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 70); // Typing speed: 70ms
      } else {
        // Selesai Mengetik: Jeda 1800ms
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Mode Menghapus
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 40); // Delete speed: 40ms
      } else {
        // Selesai Menghapus: Jeda 400ms lalu ganti kalimat berikutnya
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, canStartTyping]);

  // Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let isRunning = false; // Flag status loop animation
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 70;
    const MIN_SPEED = 0.15;
    const MAX_SPEED = 0.45;
    const SMOOTHING = 0.02;
    const RETARGET_MIN_S = 2.5;
    const RETARGET_MAX_S = 5.5;
    const CONNECTION_DIST = 120;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST; // Pre-calculated square
    const MOUSE_RADIUS = 140;
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS; // Pre-calculated square
    const MOUSE_FORCE = 0.9;
    const EDGE_MARGIN = 30;

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

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let lastTime = performance.now();

    const render = (now) => {
      const rawDt = (now - lastTime) / (1000 / 60);
      const dt = Math.min(rawDt, 3);
      const dtSeconds = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // --- SPATIAL GRID INITIALIZATION ---
      const cellSize = CONNECTION_DIST;
      const cols = Math.max(1, Math.ceil(width / cellSize));
      const rows = Math.max(1, Math.ceil(height / cellSize));
      const grid = new Array(cols * rows);

      for (let i = 0; i < grid.length; i++) {
        grid[i] = [];
      }

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
        const mouseDistSq = dx * dx + dy * dy;

        if (mouseDistSq < MOUSE_RADIUS_SQ && mouseDistSq > 0.000001) {
          const mouseDist = Math.sqrt(mouseDistSq);
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
        const speedSq = p.vx * p.vx + p.vy * p.vy;

        if (speedSq > maxSpeed * maxSpeed) {
          const speed = Math.sqrt(speedSq);
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

        // Masukkan partikel ke dalam Spatial Grid
        const col = Math.floor(
          Math.max(0, Math.min(p.x, width - 1)) / cellSize,
        );
        const row = Math.floor(
          Math.max(0, Math.min(p.y, height - 1)) / cellSize,
        );
        const cellIndex = col + row * cols;
        grid[cellIndex].push(p);
      });

      // --- OPTIMIZED CONNECTION CHECK VIA SPATIAL GRID ---
      const neighborOffsets = [
        [0, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const currentCellIndex = c + r * cols;
          const cellParticles = grid[currentCellIndex];
          if (cellParticles.length === 0) continue;

          for (let o = 0; o < neighborOffsets.length; o++) {
            const nc = c + neighborOffsets[o][0];
            const nr = r + neighborOffsets[o][1];

            if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
              const neighborCellIndex = nc + nr * cols;
              const neighborParticles = grid[neighborCellIndex];
              if (neighborParticles.length === 0) continue;

              const isSameCell = currentCellIndex === neighborCellIndex;

              for (let i = 0; i < cellParticles.length; i++) {
                const p1 = cellParticles[i];
                const startJ = isSameCell ? i + 1 : 0;

                for (let j = startJ; j < neighborParticles.length; j++) {
                  const p2 = neighborParticles[j];
                  const pdx = p1.x - p2.x;
                  const pdy = p1.y - p2.y;
                  const distSq = pdx * pdx + pdy * pdy;

                  if (distSq < CONNECTION_DIST_SQ) {
                    const dist = Math.sqrt(distSq);
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
              }
            }
          }
        }
      }

      // --- MOUSE CONNECTION LINE CHECK ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDistSq = mdx * mdx + mdy * mdy;

        if (mDistSq < MOUSE_RADIUS_SQ) {
          const mDist = Math.sqrt(mDistSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(34, 211, 238, ${1 - mDist / MOUSE_RADIUS})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Panggil frame berikutnya hanya jika isRunning true
      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // --- CONTROLLER ANIMATION LOOP ---
    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    // Pause/Resume saat canvas masuk/keluar dari viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 },
    );

    observer.observe(canvas);

    // Pause/Resume saat tab di-background
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (canvas.getBoundingClientRect().bottom > 0) {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", handleCanvasMouseMove, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleCanvasMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#07080C] overflow-hidden py-12 xs:py-16 md:py-20"
    >
      {/* Interactive Particle Network */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden cyber-grid layer-bg"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

        <div className="absolute -top-40 -left-40 w-[300px] xs:w-[400px] md:w-[600px] h-[300px] xs:h-[400px] md:h-[600px] bg-purple-900/20 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 w-[300px] xs:w-[400px] md:w-[600px] h-[300px] xs:h-[400px] md:h-[600px] bg-cyan-900/20 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      {/* Main Content */}
      <div
        key={isIntroActive ? "intro-active" : "intro-done"}
        className={`relative max-w-6xl mx-auto px-4 xs:px-6 md:px-10 w-full z-10 transition-opacity duration-700 ${
          isIntroActive ? "opacity-0" : "opacity-100 start-reveal"
        }`}
      >
        <div className="relative max-w-2xl pl-4 xs:pl-6 md:pl-10 border-l border-slate-800/80 layer-front transition-transform duration-200 ease-out">
          {/* Neon Accent Bar */}
          <span
            aria-hidden="true"
            className="absolute left-[-1px] top-2 xs:top-4 h-24 xs:h-32 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent shadow-[0_0_25px_rgba(167,139,250,0.9)] origin-top transition-transform duration-1000 ease-out"
            style={{
              transform: isIntroActive ? "scaleY(0)" : "scaleY(1)",
            }}
          />

          {/* Title / Name */}
          <h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 mb-2 scroll-reveal leading-tight"
            style={{
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            Reza Aditya Triyono
          </h1>

          {/* Subtitle / Role (Typing Effect) */}
          <h2
            className="text-sm xs:text-base sm:text-lg md:text-2xl lg:text-3xl font-medium text-slate-400 mb-6 xs:mb-8 flex items-center min-h-[2em] scroll-reveal"
            style={{
              animationDelay: "0.2s",
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            <span className="inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono tracking-tight">
              {displayText}

              {/* Cursor Cyan-400 */}
              <span className="inline-block w-[2px] sm:w-[3px] h-[0.85em] bg-cyan-400 ml-1 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </span>
          </h2>

          {/* Description Paragraphs */}
          <div
            className="space-y-3 xs:space-y-4 tracking-wide text-slate-300 text-xs xs:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-8 xs:mb-10 md:mb-12 scroll-reveal"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              animationDelay: "0.4s",
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            <p>{FIRST_PARAGRAPH}</p>
            <p className="text-slate-500 text-[11px] xs:text-xs md:text-sm lg:text-base">
              {SECOND_PARAGRAPH}
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div
            className="flex flex-col xs:flex-row gap-3 xs:gap-4 md:gap-5 scroll-reveal"
            style={{
              animationDelay: "0.6s",
              animationPlayState: isIntroActive ? "paused" : "running",
            }}
          >
            <a
              href="#contact"
              className="group relative inline-flex justify-center items-center px-6 xs:px-7 md:px-8 py-3 xs:py-3.5 rounded-lg bg-slate-100 text-slate-900 font-semibold text-xs xs:text-sm md:text-base tracking-wide overflow-hidden transition-transform duration-150 ease-out shadow-lg touch-manipulation"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Contact me
              </span>
            </a>

            <a
              href="/cv/CV.pdf"
              download
              className="group inline-flex justify-center items-center px-6 xs:px-7 md:px-8 py-3 xs:py-3.5 rounded-lg border border-slate-700/80 bg-slate-900/50 text-slate-300 font-medium text-xs xs:text-sm md:text-base tracking-wide transition-all hover:bg-slate-800 hover:border-purple-500/50 hover:text-white touch-manipulation"
            >
              Unduh CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
