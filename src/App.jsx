import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";

import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";

import { motion } from "framer-motion";

/**
 * Reusable animation for sections
 * - Fade in
 * - Slide up slightly
 * - Trigger once when in view
 */
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

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <motion.section
          id="home"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Home />
        </motion.section>

        <motion.section
          id="about"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <About />
        </motion.section>

        <motion.section
          id="skills"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Skills />
        </motion.section>

        <motion.section
          id="projects"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Projects />
        </motion.section>

        <motion.section
          id="certificates"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Certificates />
        </motion.section>

        <motion.section
          id="contact"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Contact />
        </motion.section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

export default App;
