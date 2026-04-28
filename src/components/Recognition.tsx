import { motion } from "motion/react";

export default function Recognition() {
  const awards = [
    { title: "Pritzker Emerging", year: "2025" },
    { title: "Dezeen Architecture / Gold", year: "2024" },
    { title: "Mies van der Rohe Nominee", year: "2024" },
    { title: "AIA Honor Award", year: "2023" }
  ];

  return (
    <section className="py-48 bg-dark text-white">
      <div className="px-6 md:px-20 max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] font-mono text-gray-500 block mb-10 tracking-[0.3em]">RECOGNITION</span>
          <h2 className="font-display text-6xl md:text-8xl font-semibold tracking-tightest leading-[0.9]">
            SELECTED<br />HONORS
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {awards.map((award, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-between items-baseline border-b border-white/10 py-10 group hover:pl-6 transition-all duration-500 cursor-default"
            >
              <span className="text-xl md:text-3xl font-light text-gray-400 group-hover:text-white transition-colors">{award.title}</span>
              <span className="text-[10px] font-mono text-gray-600 font-medium">{award.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
