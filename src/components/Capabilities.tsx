import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ITEMS = [
  {
    num: "01",
    cat: "CAPABILITY",
    title: "STRATEGY",
    desc: "Defining the problem before shaping the solution. We analyze cultural currents to position projects where they belong."
  },
  {
    num: "02",
    cat: "CAPABILITY",
    title: "PLANNING",
    desc: "Physical environments that breathe. Architecture as a frame for life, stripping away the inessential to focus on being."
  },
  {
    num: "03",
    cat: "CAPABILITY",
    title: "SPATIAL",
    desc: "Translating architectural sensibilities into living spaces. Tactile experiences that respect the inhabitant's silence."
  }
];

export default function Capabilities() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-bg border-t border-border">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {ITEMS.map((item, i) => (
            <div 
              key={i} 
              className={`w-screen h-screen flex flex-col justify-center px-10 md:px-32 border-r border-border shrink-0 
                ${i === 1 ? "bg-white/40" : i === 2 ? "bg-white" : ""}`
              }
            >
              <div className="max-w-2xl">
                <span className="text-[10px] font-mono text-gray-400 mb-8 block tracking-widest">{item.num} — {item.cat}</span>
                <h2 className="font-display text-[12vw] md:text-[8vw] font-semibold tracking-tightest leading-none">
                  {item.title}
                </h2>
                <p className="mt-12 text-sm md:text-xl text-gray-500 max-w-xl font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
