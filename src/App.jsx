import { useState, useMemo, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";
import Footer from "./components/layout/Footer";
import Intro from "./components/intro/Intro";

import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";

import { useScrollSpy } from "./hooks/useScrollSpy";

// 1. Konstan Variants di luar komponen agar tidak memicu re-render
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const sectionVariantReduced = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1 },
  },
};

const MENUS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Certificates",
  "Contact",
];

// 2. MotionSection Wrapper ter-memoisasi
const MotionSection = memo(({ id, children, variants }) => (
  <motion.section
    id={id}
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {children}
  </motion.section>
));

MotionSection.displayName = "MotionSection";

export default function App() {
  // Framer Motion Reduced Motion configuration
  const shouldReduceMotion = useReducedMotion();
  const activeVariant = shouldReduceMotion
    ? sectionVariantReduced
    : sectionVariant;

  // Intro State Configuration (kembali ke bawaan awal = true)
  const [isIntroActive, setIsIntroActive] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setIsIntroActive(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    }
  }, []);

  // 1 Instance useScrollSpy di parent
  const menuIds = useMemo(() => MENUS.map((m) => m.toLowerCase()), []);
  const { active, scrolled } = useScrollSpy(menuIds, 120, 20);

  return (
    <div className="relative bg-[#07080C] min-h-screen text-slate-100 overflow-x-hidden">
      {/* Intro Modal Komponen */}
      {isIntroActive && <Intro onComplete={handleIntroComplete} />}

      {/* Main Website Interface */}
      <div
        className={
          isIntroActive ? "overflow-hidden h-screen pointer-events-none" : ""
        }
      >
        <Navbar active={active} scrolled={scrolled} />

        <main className="min-h-screen">
          <section id="home">
            <Home isIntroActive={isIntroActive} />
          </section>

          <MotionSection id="about" variants={activeVariant}>
            <About />
          </MotionSection>

          <MotionSection id="skills" variants={activeVariant}>
            <Skills />
          </MotionSection>

          <MotionSection id="projects" variants={activeVariant}>
            <Projects />
          </MotionSection>

          <MotionSection id="certificates" variants={activeVariant}>
            <Certificates />
          </MotionSection>

          <MotionSection id="contact" variants={activeVariant}>
            <Contact />
          </MotionSection>
        </main>

        <Footer />

        <BottomNav active={active} />
      </div>
    </div>
  );
}