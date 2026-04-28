import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { id: "home", label: "Home" },
    { id: "creators", label: "Creators" },
    { id: "contact", label: "Contact" }
  ];

  const handleMobileClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-[110] mix-blend-difference text-white"
      >
        <button 
          onClick={() => onNavigate("home")}
          className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
        >
          NASAN
        </button>
        
        <div className="hidden md:flex gap-10 text-[10px] font-medium tracking-[0.2em] uppercase">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`hover:text-white transition-all cursor-pointer relative py-2 ${
                currentSection === section.id ? "text-white" : "text-white/50"
              }`}
            >
              {section.label}
              {currentSection === section.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-px bg-white"
                />
              )}
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-white relative z-[120]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-dark z-[105] md:hidden flex flex-col items-center justify-center gap-8"
          >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={() => handleMobileClick(section.id)}
                className={`text-4xl font-display font-medium tracking-tighter ${
                  currentSection === section.id ? "text-white" : "text-white/40"
                }`}
              >
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


