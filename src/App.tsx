import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Creators from "./components/Creators";
import Contact from "./components/Contact";
import HomeContent from "./components/HomeContent";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigate = (id: string) => {
    setCurrentSection(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative font-sans bg-bg min-h-screen">
      <div className="noise" />
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />

      <main className="relative z-10 min-h-screen pb-12">
        <AnimatePresence>
          {currentSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Hero onStart={() => handleNavigate("contact")} />
              <HomeContent onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentSection === "creators" && (
            <motion.div
              key="creators"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Creators onContact={() => handleNavigate("contact")} />
            </motion.div>
          )}

          {currentSection === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}



