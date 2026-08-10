"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export default function Intro({ onComplete }) {
  // STATES: IDLE -> AWAKE -> WALKING -> SEARCHING -> FOUND -> PORTAL
  const [phase, setPhase] = useState("IDLE");
  const isCompletedRef = useRef(false);
  const timeoutsRef = useRef([]);
  const speechRef = useRef(null);

  // PARALLAX REFS (No React re-renders for mouse movement)
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Safe timer helper
  const addTimeout = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const cancelSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const triggerComplete = useCallback(() => {
    if (isCompletedRef.current) return;

    isCompletedRef.current = true;
    clearAllTimeouts();
    cancelSpeech();

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    if (typeof onComplete === "function") {
      onComplete();
    }
  }, [onComplete, clearAllTimeouts, cancelSpeech]);

  // ==========================================
  // PARALLAX ENGINE (requestAnimationFrame)
  // ==========================================
  const updateParallax = useCallback(() => {
    currentMouse.current.x +=
      (targetMouse.current.x - currentMouse.current.x) * 0.1;

    currentMouse.current.y +=
      (targetMouse.current.y - currentMouse.current.y) * 0.1;

    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--mx",
        currentMouse.current.x.toFixed(3),
      );

      containerRef.current.style.setProperty(
        "--my",
        currentMouse.current.y.toFixed(3),
      );
    }

    requestRef.current = requestAnimationFrame(updateParallax);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      targetMouse.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    requestRef.current = requestAnimationFrame(updateParallax);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      document.body.style.overflow = "";
      clearAllTimeouts();
      cancelSpeech();
    };
  }, [updateParallax, clearAllTimeouts, cancelSpeech]);

  // ==========================================
  // TIMELINE SEQUENCE (Triggered by User)
  // ==========================================
  const startExperience = () => {
    if (phase !== "IDLE") return;

    // 1. Robot Wakes Up & Starts Greeting
    setPhase("AWAKE");

    // Trigger Speech safely once
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      !speechRef.current
    ) {
      try {
        const utterance = new SpeechSynthesisUtterance("Selamat datang!");

        utterance.lang = "id-ID";
        utterance.rate = 0.9;
        utterance.pitch = 1.15;
        utterance.volume = 1;

        speechRef.current = utterance;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis error:", e);
      }
    }

    // 2. Robot finishes greeting, lowers arm, starts walking
    addTimeout(() => setPhase("WALKING"), 3600);

    // 3. Arrive & Boot Terminal
    addTimeout(() => setPhase("SEARCHING"), 4400);

    // 4. Target Found
    addTimeout(() => setPhase("FOUND"), 5200);

    // 5. Camera Push-In (Portal)
    addTimeout(() => setPhase("PORTAL"), 5700);

    // 6. Complete & Reveal Home
    addTimeout(() => {
      document.body.style.overflow = "";
      triggerComplete();
    }, 6400);
  };

  const isGreeting = phase === "AWAKE";

  const glowColorClass =
    phase === "FOUND" || phase === "PORTAL"
      ? "text-purple-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.8)]"
      : isGreeting
        ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,1)]"
        : "text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]";

  const isWalking = phase === "WALKING";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#090A0F] select-none overflow-hidden overflow-x-hidden transition-opacity duration-700 font-mono opacity-100"
      style={{
        "--mx": 0,
        "--my": 0,
        perspective: "1000px",
      }}
    >
      <style>{`
        .camera-rig {
          transform-style: preserve-3d;
          transform:
            rotateX(calc(var(--my) * -2deg))
            rotateY(calc(var(--mx) * 3deg))
            translateZ(0px);
          transition: transform 0.2s ease-out;
        }

        .camera-push {
          transform:
            translate3d(200px, -50px, 800px)
            rotateX(0deg)
            rotateY(0deg) !important;
          transition:
            transform 1.2s cubic-bezier(0.7, 0, 0.3, 1) !important;
        }

        .breathe {
          animation: breathe 4s ease-in-out infinite alternate;
        }

        .walk-cycle {
          animation: walk 0.35s ease-in-out infinite alternate;
        }

        .bounce-cheer {
          animation: bounce-cheer 0.6s ease-in-out 2;
        }

        @keyframes breathe {
          0% {
            transform: translateY(0px);
          }

          100% {
            transform: translateY(-4px);
          }
        }

        @keyframes walk {
          0% {
            transform: translateY(0px) rotate(1deg);
          }

          100% {
            transform: translateY(-6px) rotate(-1deg);
          }
        }

        @keyframes bounce-cheer {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        .look-at-mouse {
          transform:
            translate(
              calc(var(--mx) * 4px),
              calc(var(--my) * 3px)
            );
          transition: transform 0.1s ease-out;
        }

        /* ==========================================
           ARM & HAND WAVE
           ========================================== */

        @keyframes raise-shoulder {
          0% {
            transform: rotate(0deg);
          }

          15% {
            transform: rotate(-30deg);
          }

          85% {
            transform: rotate(-30deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes wave-hand {
          0% {
            transform: rotate(0deg);
          }

          15% {
            transform: rotate(0deg);
          }

          25% {
            transform: rotate(-55deg);
          }

          40% {
            transform: rotate(-70deg);
          }

          55% {
            transform: rotate(-45deg);
          }

          70% {
            transform: rotate(-70deg);
          }

          85% {
            transform: rotate(-45deg);
          }

          95% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        .welcome-shoulder {
          transform-origin: 108px 90px;
        }

        .welcome-arm-anim {
          animation:
            raise-shoulder
            3.3s
            ease-in-out
            forwards;
        }

        .welcome-hand-anim {
          transform-origin: 118px 95px;
          animation:
            wave-hand
            3.3s
            ease-in-out
            forwards;
        }

        @keyframes walk-arm-left {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(25deg);
          }
        }

        @keyframes walk-arm-right {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(-25deg);
          }
        }

        @keyframes bubble-float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        .speech-bubble {
          animation:
            bubble-float
            2s
            ease-in-out
            infinite;
        }

    /* =========================================================
   MOBILE RESPONSIVE FIX (EXACT SCREENSHOT MATCH)
   Desktop rules (>= 1024px) remain untouched.
   ========================================================= */

@media (max-width: 639px) {

  /* 1. FLOOR GRID (Bagian Bawah Layar) */
  .floor-grid,
  .floor-grid-wrapper,
  .intro-grid {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 28dvh !important;
    z-index: 1 !important;
  }

  /* 2. COMPUTER TERMINAL (Kanan Middle-Lower) */
  .computer-terminal,
  .terminal-wrapper {
    position: absolute !important;
    right: clamp(12px, 4vw, 24px) !important;
    bottom: clamp(30dvh, 34dvh, 38dvh) !important;
    left: auto !important;
    top: auto !important;
    width: clamp(170px, 48vw, 210px) !important;
    z-index: 10 !important;
    transform: none !important;
  }

  .computer-screen {
    width: 100% !important;
    height: auto !important;
    min-height: 105px !important;
    padding: 10px 12px !important;
    border-radius: 12px !important;
  }

  .computer-base {
    width: 75px !important;
    height: 20px !important;
    margin: 0 auto !important;
  }

  /* 3. ROBOT (Di Kiri Bawah, Berdiri di Atas Grid) */
  .robot-character {
    position: absolute !important;
    left: clamp(12px, 3vw, 20px) !important;
    bottom: clamp(30px, 5dvh, 55px) !important;
    top: auto !important;
    right: auto !important;
    z-index: 20 !important;
    transform: none !important;
  }

  /* Pergerakan Robot saat Jalan/Target di Mobile (Tetap di Area Kiri) */
  .robot-character.is-mobile-walking,
  .robot-character.is-walking,
  .robot-character.is-mobile-target {
    transform: translateX(clamp(15px, 4vw, 30px)) !important;
  }

  .robot-character svg,
  .robot-svg {
    width: clamp(85px, 24vw, 105px) !important;
    height: auto !important;
  }

  /* Speech Bubble Mobile */
  .robot-character .speech-bubble,
  .robot-speech {
    position: absolute !important;
    top: -46px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    white-space: nowrap !important;
  }

  /* 4. SYSTEM READY & BUTTON (Persis di Sebelah Kanan Robot) */
  .intro-foreground,
  .ui-wrapper,
  .ui-container {
    position: absolute !important;
    left: clamp(112px, 31vw, 142px) !important; /* Sejajar di kanan robot */
    bottom: clamp(30px, 5dvh, 55px) !important;
    right: auto !important;
    top: auto !important;
    width: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 8px !important;
    z-index: 30 !important;
  }

  /* Text "SYSTEM READY" */
  .system-ready-text,
  .intro-foreground h2,
  .intro-foreground p {
    font-size: 11px !important;
    letter-spacing: 0.18em !important;
    color: #52525b !important; /* Muted zinc */
    margin: 0 !important;
    padding: 0 !important;
    white-space: nowrap !important;
    font-family: monospace !important;
  }

  /* Button [ ENTER EXPERIENCE ] */
  .enter-experience,
  .btn-enter-experience,
  .intro-foreground button {
    padding: 8px 14px !important;
    font-size: 10.5px !important;
    letter-spacing: 0.08em !important;
    border-radius: 6px !important;
    background-color: rgba(9, 9, 11, 0.85) !important;
    border: 1px solid rgba(39, 39, 42, 0.8) !important;
    color: #22d3ee !important; /* Cyan glow text */
    white-space: nowrap !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
    font-family: monospace !important;
  }

  /* 5. SKIP SEQUENCE (Kanan Atas) */
  .skip-sequence,
  .btn-skip-sequence {
    position: absolute !important;
    top: max(16px, env(safe-area-inset-top)) !important;
    right: max(16px, env(safe-area-inset-right)) !important;
    font-size: 10px !important;
    letter-spacing: 0.15em !important;
    color: #52525b !important;
    z-index: 50 !important;
  }
}

/* ------------------------------------------
   LAYAR HP KECIL (< 360px)
   ------------------------------------------ */
@media (max-width: 360px) {
  .robot-character {
    left: 8px !important;
    bottom: 20px !important;
  }

  .robot-character svg,
  .robot-svg {
    width: 75px !important;
  }

  .intro-foreground,
  .ui-wrapper {
    left: 92px !important;
    bottom: 20px !important;
    gap: 6px !important;
  }

  .computer-terminal,
  .terminal-wrapper {
    right: 8px !important;
    bottom: 28dvh !important;
    width: 150px !important;
  }

  .enter-experience,
  .btn-enter-experience {
    padding: 6px 10px !important;
    font-size: 9.5px !important;
  }
}

/* ------------------------------------------
   TABLET PORTRAIT (640px - 1023px)
   ------------------------------------------ */
@media (min-width: 640px) and (max-width: 1023px) {
  .robot-character {
    left: 6% !important;
    bottom: 70px !important;
  }

  .computer-terminal {
    right: 6% !important;
    bottom: 30dvh !important;
    width: 220px !important;
  }

  .intro-foreground {
    left: 24% !important;
    bottom: 70px !important;
  }
}

/* ------------------------------------------
   SAFE AREA SUPPORT (iOS Notch & Home Indicator)
   ------------------------------------------ */
@supports (padding: env(safe-area-inset-bottom)) {
  @media (max-width: 639px) {
    .robot-character,
    .intro-foreground,
    .ui-wrapper {
      bottom: calc(clamp(30px, 5dvh, 55px) + env(safe-area-inset-bottom)) !important;
    }

    .computer-terminal {
      bottom: calc(clamp(30dvh, 34dvh, 38dvh) + env(safe-area-inset-bottom)) !important;
    }
  }
}
      `}</style>

      {/* CAMERA RIG */}
      <div
        className={`relative w-full h-full flex items-center justify-center camera-rig ${
          phase === "PORTAL" ? "camera-push" : ""
        }`}
      >
        {/* Deep Background */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)]"
          style={{
            transform: "translateZ(-500px) scale(2)",
          }}
        />

        {/* Floor Grid */}
        <div
          className="absolute bottom-0 w-[200%] left-[-50%] h-1/2 opacity-20 bg-[linear-gradient(to_right,#a78bfa_1px,transparent_1px),linear-gradient(to_bottom,#a78bfa_1px,transparent_1px)] bg-[size:40px_40px] [transform-origin:bottom_center]"
          style={{
            transform: "translateZ(-200px) rotateX(60deg) translateY(200px)",
          }}
        />

        {/* Main Environment & Computer */}
        <div
          className="relative w-full max-w-3xl h-[400px] flex items-center justify-center"
          style={{
            transform: "translateZ(0px)",
          }}
        >
          <div className="computer-terminal absolute right-8 sm:right-24 bottom-12 flex flex-col items-center z-10 shadow-2xl">
            <div
              className={`computer-screen relative w-48 sm:w-56 h-32 sm:h-36 bg-[#12131C] border-2 border-slate-700/80 rounded-lg p-3 flex flex-col justify-between overflow-hidden transition-all duration-700 ${
                phase === "PORTAL"
                  ? "border-purple-400 shadow-[0_0_100px_rgba(167,139,250,1)]"
                  : "shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              }`}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-700 bg-cyan-500/10 ${
                  phase === "SEARCHING" ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                className={`robot-character absolute left-12 sm:left-32 bottom-20 transition-all duration-1000 ease-in-out flex flex-col items-center ${
                  phase === "WALKING"
                    ? "is-mobile-walking translate-x-[180px] sm:translate-x-[240px]"
                    : phase === "SEARCHING" ||
                        phase === "FOUND" ||
                        phase === "PORTAL"
                      ? "is-mobile-target translate-x-[180px] sm:translate-x-[240px]"
                      : "translate-x-0"
                }`}
              />

              <div
                className={`relative z-10 text-[10px] sm:text-xs space-y-1 transition-opacity ${
                  phase === "PORTAL" ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-1 text-[9px] text-slate-400">
                  <span>PORTFOLIO_Reza Aditya</span>

                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      phase === "IDLE" ||
                      phase === "AWAKE" ||
                      phase === "WALKING"
                        ? "bg-slate-600"
                        : phase === "FOUND"
                          ? "bg-purple-400"
                          : "bg-cyan-400 animate-pulse"
                    }`}
                  />
                </div>

                {phase === "IDLE" ||
                phase === "AWAKE" ||
                phase === "WALKING" ? (
                  <p className="text-slate-600 animate-pulse mt-2">
                    &gt; AWAITING INPUT...
                  </p>
                ) : phase === "SEARCHING" ? (
                  <div className="space-y-1 mt-1 text-cyan-300">
                    <p>&gt; SYS_WAKE: OK</p>

                    <p className="animate-pulse">&gt; SCANNING NETWORK...</p>

                    <div className="w-full h-1 bg-slate-800 mt-2 rounded overflow-hidden">
                      <div className="h-full bg-cyan-400 animate-[pulse_1s_ease-in-out_infinite] w-3/4" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 mt-1 font-bold">
                    <p className="text-cyan-400">&gt; DATA COMPILED</p>

                    <p className="text-purple-300 animate-bounce">
                      &gt; TARGET FOUND ✓
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-12 h-6 bg-slate-800 border-x border-slate-700" />

            <div className="computer-base w-32 h-2 bg-slate-700 rounded-full shadow-lg" />
          </div>
        </div>

        {/* Robot Character Layer */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: "translateZ(100px)",
          }}
        >
          <div
            className={`absolute left-12 sm:left-32 bottom-20 transition-all duration-1000 ease-in-out flex flex-col items-center ${
              phase === "IDLE" || isGreeting
                ? "translate-x-0"
                : "translate-x-[180px] sm:translate-x-[240px]"
            }`}
          >
            {/* Speech Bubble during Greeting */}
            {isGreeting && (
              <div className="robot-speech absolute -top-20 z-30 speech-bubble">
                <div className="robot-speech-content px-3 py-1.5 bg-[#12131C]/90 border border-cyan-500/60 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] text-cyan-300 text-xs tracking-wider flex items-center space-x-1.5 backdrop-blur-sm whitespace-nowrap">
                  <span>💬 Selamat datang! ✨</span>
                </div>

                <div className="w-2 h-2 bg-[#12131C] border-r border-b border-cyan-500/60 rotate-45 mx-auto -mt-1" />
              </div>
            )}

            <div
              className={`relative origin-bottom ${
                phase === "IDLE" || phase === "SEARCHING"
                  ? "breathe"
                  : isGreeting
                    ? "bounce-cheer"
                    : phase === "WALKING"
                      ? "walk-cycle"
                      : ""
              }`}
            >
              <svg
                className="robot-svg w-28 h-32 sm:w-32 sm:h-40 drop-shadow-xl"
                // Ubah dari "0 0 140 160" menjadi "0 0 170 160"
                viewBox="0 0 170 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="whitePlastic"
                    x1="0%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ffffff" />

                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>

                  <linearGradient
                    id="faceGrad"
                    x1="0%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1e293b" />

                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  <linearGradient
                    id="torsoGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f8fafc" />

                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                </defs>

                {/* Ears */}
                <rect
                  x="20"
                  y="45"
                  width="100"
                  height="20"
                  rx="10"
                  fill="#94a3b8"
                />

                {/* Neck */}
                <rect
                  x="62"
                  y="70"
                  width="16"
                  height="20"
                  rx="4"
                  fill="#94a3b8"
                />

                {/* Body / Torso */}
                <rect
                  x="40"
                  y="80"
                  width="60"
                  height="70"
                  rx="30"
                  fill="url(#torsoGrad)"
                />

                <path
                  d="M 40 125 Q 70 135 100 125"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />

                {/* Left Arm */}
                <g
                  style={{
                    transformOrigin: "32px 90px",
                    transform: "rotate(20deg)",
                  }}
                >
                  <g
                    className={
                      phase === "WALKING"
                        ? "animate-[walk-arm-left_0.35s_ease-in-out_infinite_alternate]"
                        : ""
                    }
                  >
                    <rect
                      x="22"
                      y="85"
                      width="20"
                      height="50"
                      rx="10"
                      fill="url(#whitePlastic)"
                      filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"
                    />
                  </g>
                </g>

                {/* Right Arm */}
                <g
                  className={`welcome-shoulder ${
                    isGreeting ? "welcome-arm-anim" : ""
                  }`}
                >
                  <g
                    style={{
                      transformOrigin: "108px 90px",
                      transform:
                        phase === "WALKING"
                          ? "rotate(-20deg)"
                          : phase === "SEARCHING"
                            ? "rotate(-12deg) translateY(-2px)"
                            : "rotate(-20deg)",
                    }}
                  >
                    <g
                      className={
                        phase === "WALKING"
                          ? "animate-[walk-arm-right_0.35s_ease-in-out_infinite_alternate]"
                          : ""
                      }
                    >
                      <rect
                        x="98"
                        y="85"
                        width="20"
                        height="35"
                        rx="10"
                        fill="url(#whitePlastic)"
                        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"
                      />

                      {/* Waving Hand / Forearm */}
                      <g className={isGreeting ? "welcome-hand-anim" : ""}>
                        <rect
                          x="98"
                          y="112"
                          width="20"
                          height="25"
                          rx="8"
                          fill="url(#whitePlastic)"
                        />
                      </g>
                    </g>
                  </g>
                </g>

                {/* Head Group */}
                <g
                  className={
                    phase === "IDLE"
                      ? "look-at-mouse"
                      : isGreeting
                        ? "transition-transform duration-500 transform translate-x-1 rotate-3"
                        : "transition-transform duration-500 transform translate-x-1"
                  }
                >
                  <rect
                    x="25"
                    y="20"
                    width="90"
                    height="65"
                    rx="25"
                    fill="url(#whitePlastic)"
                    filter="drop-shadow(0px 6px 6px rgba(0,0,0,0.15))"
                  />

                  <path
                    d="M 35 25 Q 70 20 105 25"
                    stroke="#ffffff"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  <rect
                    x="33"
                    y="32"
                    width="74"
                    height="44"
                    rx="18"
                    fill="url(#faceGrad)"
                  />

                  {/* Eyes & Mouth */}
                  <g
                    className={`transition-colors duration-500 ${glowColorClass}`}
                  >
                    {isGreeting ? (
                      <>
                        <path
                          d="M 43 49 Q 51 42 59 49"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                        />

                        <path
                          d="M 81 49 Q 89 42 97 49"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                        />

                        <path
                          d="M 60 56 Q 70 66 80 56"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M 45 48 A 7 7 0 0 0 59 48 Z"
                          fill="currentColor"
                        />

                        <path
                          d="M 81 48 A 7 7 0 0 0 95 48 Z"
                          fill="currentColor"
                        />

                        <path
                          d="M 66 57 A 4 4 0 0 1 74 57 Z"
                          fill="currentColor"
                        />
                      </>
                    )}
                  </g>
                </g>
              </svg>
            </div>

            {/* Dynamic Shadow */}
            <div
              className={`w-16 h-2 bg-black/60 rounded-full blur-[3px] mt-2 transition-transform duration-300 ${
                phase === "WALKING" || isGreeting
                  ? "scale-90 opacity-50"
                  : "scale-100 opacity-80"
              }`}
            />
          </div>
        </div>
      </div>

      {/* UI FOREGROUND LAYER */}
      <div
        className={`intro-foreground absolute inset-0 flex flex-col items-center justify-end pb-24 sm:pb-32 z-50 pointer-events-auto transition-opacity duration-500 ${
          phase !== "IDLE" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <p className="intro-system-ready text-slate-500 text-xs mb-4 tracking-[0.2em] animate-pulse">
          SYSTEM READY
        </p>

        <button
          onClick={startExperience}
          className="enter-experience group relative min-h-[44px] px-8 py-3 bg-[#12131C] border border-slate-700/50 hover:border-cyan-500/50 rounded text-cyan-500 text-sm tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 touch-manipulation"
        >
          <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

          <span className="relative z-10">[ ENTER EXPERIENCE ]</span>
        </button>
      </div>

      {/* Minimal Skip Button */}
      <button
        onClick={triggerComplete}
        className="skip-sequence absolute top-6 right-8 text-[10px] text-slate-600 hover:text-slate-400 tracking-widest uppercase transition-colors z-[100] focus:outline-none focus:ring-1 focus:ring-slate-500 rounded px-2 py-1 touch-manipulation"
        aria-label="Skip Introduction"
      >
        Skip sequence
      </button>

      {/* Flash Overlay */}
      <div
        className={`fixed inset-0 bg-white pointer-events-none z-[200] transition-opacity duration-[800ms] ${
          phase === "PORTAL" ? "opacity-100 delay-[600ms]" : "opacity-0"
        }`}
      />
    </div>
  );
}
