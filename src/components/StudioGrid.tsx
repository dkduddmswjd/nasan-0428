import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const STUDIO_IMAGES = [
  "https://images.unsplash.com/photo-1545464333-9cbd1f263aa0?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449156001437-37c64b6df501?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518005020251-5fb5c5a93942?q=80&w=1964&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
];

export default function StudioGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} id="studio" className="py-48 px-6 md:px-20 max-w-[1600px] mx-auto bg-bg overflow-hidden">
      <div className="mb-32 flex justify-between items-end">
        <h2 className="font-display text-5xl md:text-8xl font-medium tracking-tightest leading-none">
          STUDIO<br />ATMOSPHERE
        </h2>
        <p className="text-[10px] font-mono text-gray-400 hidden md:block tracking-[0.2em] uppercase">Process / Materials / Raw</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 min-h-[140vh]">
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="space-y-6 lg:space-y-10 pt-40">
          <img src={STUDIO_IMAGES[0]} className="w-full aspect-[3/4] object-cover grayscale opacity-90 rounded-2xl" alt="Studio" />
          <img src={STUDIO_IMAGES[1]} className="w-full aspect-[4/5] object-cover grayscale opacity-90 rounded-2xl" alt="Studio" />
          <div className="p-12 aspect-[4/5] bg-white rounded-2xl border border-border flex flex-col justify-center">
            <span className="font-display text-6xl text-dark font-medium">Aa</span>
            <span className="text-[10px] text-gray-400 mt-4 tracking-widest uppercase">Space Grotesk — Technical</span>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="space-y-6 lg:space-y-10">
          <img src={STUDIO_IMAGES[2]} className="w-full aspect-[3/4] object-cover grayscale opacity-100 rounded-2xl" alt="Studio" />
          <div className="p-12 border border-border bg-white flex items-center justify-center text-center aspect-square rounded-2xl">
            <p className="font-display text-lg md:text-2xl leading-tight tracking-tight italic font-light text-gray-400">
               "Silence is the most functional material."
            </p>
          </div>
          <img src={STUDIO_IMAGES[3]} className="w-full aspect-[4/3] object-cover grayscale opacity-90 rounded-2xl" alt="Studio" />
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: y3 }} className="hidden lg:block space-y-10 pt-60">
          <div className="w-full aspect-[3/4] bg-dark text-white p-12 rounded-2xl flex flex-col justify-between">
             <div className="w-12 h-12 border border-white/20 rounded-full" />
             <p className="text-3xl font-display tracking-tight leading-none">Sculpting<br/>Modernity</p>
          </div>
          <img src={STUDIO_IMAGES[1]} className="w-full aspect-[4/5] object-cover grayscale opacity-90 rounded-2xl" alt="Studio" />
          <img src={STUDIO_IMAGES[0]} className="w-full aspect-[3/4] object-cover grayscale opacity-90 rounded-2xl" alt="Studio" />
        </motion.div>
      </div>
    </section>
  );
}
