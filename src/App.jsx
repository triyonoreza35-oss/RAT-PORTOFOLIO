"use client";

import { useState } from "react";

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
  hidden: {
    opacity: 0,
    y: 40,
  },

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
  hidden: {
    opacity: 0,
    y: 0,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

function App() {
  const shouldReduceMotion = useReducedMotion();

  const activeVariant = shouldReduceMotion
    ? sectionVariantReduced
    : sectionVariant;

  /*
   * Intro tetap aktif saat pertama kali halaman dibuka.
   * Setelah Intro selesai, website bisa digunakan.
   */
  const [isIntroActive, setIsIntroActive] = useState(true);

  const handleIntroComplete = () => {
    setIsIntroActive(false);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "portfolio_intro_seen",
        "true"
      );
    }
  };

  return (
    <>
      {/* =========================================
          INTRO
      ========================================== */}
      {isIntroActive && (
        <Intro onComplete={handleIntroComplete} />
      )}

      {/* =========================================
          MAIN WEBSITE
      ========================================== */}
      <div
        className={
          isIntroActive
            ? "overflow-hidden h-screen pointer-events-none"
            : "w-full min-w-0"
        }
      >
        <Navbar />

        <main className="min-h-screen w-full min-w-0">
          
          {/* =====================================
              HOME

              IMPORTANT:
              Jangan tambahkan id="home" di sini.
              Home.jsx sudah memiliki id="home".
          ====================================== */}
          <Home isIntroActive={isIntroActive} />

          {/* =====================================
              ABOUT
          ====================================== */}
          <motion.section
            id="about"
            className="w-full min-w-0"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            <About />
          </motion.section>

          {/* =====================================
              SKILLS
          ====================================== */}
          <motion.section
            id="skills"
            className="w-full min-w-0"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            <Skills />
          </motion.section>

          {/* =====================================
              PROJECTS
          ====================================== */}
          <motion.section
            id="projects"
            className="w-full min-w-0"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            <Projects />
          </motion.section>

          {/* =====================================
              CERTIFICATES
          ====================================== */}
          <motion.section
            id="certificates"
            className="w-full min-w-0"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            <Certificates />
          </motion.section>

          {/* =====================================
              CONTACT
          ====================================== */}
          <motion.section
            id="contact"
            className="w-full min-w-0"
            variants={activeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
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