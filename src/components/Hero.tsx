import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PawPrint, Bone, Heart, Dog, Cat } from "lucide-react";

// List of pet-related icons to rotate through
const TRAIL_ICONS = [
  PawPrint,
  Bone,
  Heart,
  Dog,
  Cat,
  PawPrint,
  Bone
];

interface ActiveIcon {
  id: number;
  Component: any;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
}

export default function Hero({ onStart }: { onStart: () => void }) {
  const [activeIcons, setActiveIcons] = useState<ActiveIcon[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const iconCounter = useRef(0);
  const threshold = 80; 

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const spawnIcon = useCallback((x: number, y: number, customScale?: number) => {
    const id = Date.now() + Math.random();
    const IconComponent = TRAIL_ICONS[iconCounter.current % TRAIL_ICONS.length];
    
    const rotation = Math.random() * 360;
    const scale = customScale || (0.8 + Math.random() * 0.4);
    const colors = ["#0A0A0A", "#4B5563", "#9CA3AF"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setActiveIcons((prev) => [
      ...prev.slice(-15), 
      { id, Component: IconComponent, x, y, rotation, scale, color }
    ]);

    iconCounter.current++;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dist = Math.hypot(
      clientX - lastMousePos.current.x,
      clientY - lastMousePos.current.y
    );

    if (dist > threshold) {
      spawnIcon(clientX, clientY);
      lastMousePos.current = { x: clientX, y: clientY };
    }
  }, [isMobile, spawnIcon]);

  useEffect(() => {
    lastMousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }, []);

  return (
    <section 
      className={`relative h-screen w-full bg-bg overflow-hidden ${isMobile ? 'cursor-auto' : 'cursor-none'}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          {activeIcons.map((icon) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, scale: 0, rotate: icon.rotation - 45 }}
              animate={{ opacity: 0.6, scale: icon.scale, rotate: icon.rotation }}
              exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.5 } }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setActiveIcons(prev => prev.filter(a => a.id !== icon.id));
                }, 400);
              }}
              className="absolute pointer-events-none z-10 flex items-center justify-center p-4"
              style={{ 
                left: icon.x - 40, 
                top: icon.y - 40,
              }}
            >
              <icon.Component 
                size={64} 
                strokeWidth={1.5}
                style={{ color: icon.color }}
                className="drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 pointer-events-none z-30 mix-blend-exclusion text-white">
        <div className="w-full flex flex-col items-center text-center">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[15vw] md:text-[12vw] leading-[1.1] tracking-tight font-bold block"
            >
              <div className="opacity-50">Next Strategy,</div>
              <div className="relative inline-block">
                <span className="dalmatian-text">NASAN</span>
              </div>
            </motion.h1>
          </div>
          
          <div className="mt-16">
            <motion.button 
              onClick={onStart}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="px-12 py-6 bg-white text-dark rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl pointer-events-auto hover:bg-gray-100 transition-colors"
            >
              LET'S WORK TOGETHER
            </motion.button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dalmatian-text {
          background-image: 
          radial-gradient(circle at 10% 20%, #000 8%, transparent 8%),
          radial-gradient(circle at 30% 50%, #000 6%, transparent 6%),
          radial-gradient(circle at 50% 10%, #000 7%, transparent 7%),
          radial-gradient(circle at 70% 40%, #000 9%, transparent 9%),
          radial-gradient(circle at 90% 80%, #000 5%, transparent 5%),
          radial-gradient(circle at 20% 90%, #000 6%, transparent 6%),
          radial-gradient(circle at 80% 10%, #000 8%, transparent 8%),
          radial-gradient(circle at 40% 70%, #000 10%, transparent 10%);
          background-size: 100% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: white; /* Base color */
          text-shadow: 0 0 1px rgba(0,0,0,0.1);
        }
      `}} />
      {!isMobile && <CursorDot />}
    </section>
  );
}

function CursorDot() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
      animate={{ x: pos.x - 8, y: pos.y - 8 }}
      transition={{ type: "spring", damping: 35, stiffness: 400, mass: 0.5 }}
    />
  );
}




