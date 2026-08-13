import { useState, useEffect } from "react";
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

function App() {
  const shouldReduceMotion = useReducedMotion();
  const activeVariant = shouldReduceMotion
    ? sectionVariantReduced
    : sectionVariant;

  // Set ke useState(true) untuk testing tampilan,
  // atau pakai logika sessionStorage untuk mode produksi
  const [isIntroActive, setIsIntroActive] = useState(true);

  const handleIntroComplete = () => {
    setIsIntroActive(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    }
  };

  return (
    <>
      {/* Intro Modal (Hanya muncul jika belum pernah dilihat dalam 1 sesi) */}
      {isIntroActive && <Intro onComplete={handleIntroComplete} />}

      {/* Main Website Interface - Tetap di-render di background (Preloaded) */}
      <div
        className={
          isIntroActive ? "overflow-hidden h-screen pointer-events-none" : ""
        }
      >
        <Navbar />

        <main className="min-h-screen">
          <div className="w-full min-w-0">
            <Home isIntroActive={isIntroActive} />
          </div>

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
        <BottomNav />
      </div>
    </>
  );
}

export default App;
