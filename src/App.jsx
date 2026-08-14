import { useState, useMemo } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";

import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";

import Intro from "./components/intro/Intro";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollSpy } from "./hooks/useScrollSpy";

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

export default function App() {
  // Framer Motion Reduced Motion configuration
  const shouldReduceMotion = useReducedMotion();
  const activeVariant = shouldReduceMotion
    ? sectionVariantReduced
    : sectionVariant;

  // Intro state configuration
  const [isIntroActive, setIsIntroActive] = useState(true);

  const handleIntroComplete = () => {
    setIsIntroActive(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    }
  };

  // 1 Instance useScrollSpy pusat di parent
  const menuIds = useMemo(() => MENUS.map((m) => m.toLowerCase()), []);
  const { active, scrolled } = useScrollSpy(menuIds, 120, 20);

  return (
    <div className="relative bg-[#07080C] min-h-screen text-slate-100 overflow-x-hidden">
      
      {/* Intro Modal */}
      {isIntroActive && <Intro onComplete={handleIntroComplete} />}

      {/* Main Website Interface */}
      <div
        className={
          isIntroActive ? "overflow-hidden h-screen pointer-events-none" : ""
        }
      >
        {/* Navbar menerima state dari parent (active & scrolled) */}
        <Navbar active={active} scrolled={scrolled} />

        <main className="min-h-screen">
          <section id="home">
            <Home isIntroActive={isIntroActive} />
          </section>

          <motion.section
            id="about"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <About />
          </motion.section>

          <motion.section
            id="skills"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Skills />
          </motion.section>

          <motion.section
            id="projects"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Projects />
          </motion.section>

          <motion.section
            id="certificates"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Certificates />
          </motion.section>

          <motion.section
            id="contact"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Contact />
          </motion.section>
        </main>

        <Footer />

        {/* BottomNav menerima state active yang sama persis */}
        <BottomNav active={active} />
      </div>
    </div>
  );
}