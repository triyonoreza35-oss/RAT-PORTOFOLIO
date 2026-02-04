  import Navbar from "./components/layout/Navbar";
  import Footer from "./components/layout/Footer";
  import BottomNav from "./components/layout/BottomNav";
  import Home from "./components/sections/Home";
  import About from "./components/sections/About";
  import Skills from "./components/sections/Skills";
  import Projects from "./components/sections/Projects";
  import Certificates from "./components/sections/Certificates";
  import Contact from "./components/sections/Contact";

  function App() {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
        <BottomNav />
      </div>
    );
  }  

  export default App;
