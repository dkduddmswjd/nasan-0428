import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const text = "Architecture is not about filling space. It is about creating the void that remains. We excavate the atmosphere to reveal the essential silence of a place.";
  const words = text.split(" ");

  return (
    <section ref={ref} className="pt-48 pb-32 px-6 md:px-20 max-w-[1600px] mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col justify-between border-t border-dark/10 pt-4">
          <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">01 — Philosophy</span>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
            {words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string, progress: any, range: [number, number], key?: number }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span 
      style={{ opacity, y }}
      className="inline-block mr-3 md:mr-4"
    >
      {children}
    </motion.span>
  );
}
