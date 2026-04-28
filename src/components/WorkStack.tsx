import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "VOID RESIDENCE",
    location: "KYOTO, JAPAN",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    desc: "A study in absolute privacy using light as a raw material. Concrete volumes intersection to form sculpted voids."
  },
  {
    id: "02",
    title: "AETHER GALLERY",
    location: "BERLIN, GERMANY",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop",
    desc: "White on white materials create an infinite horizon for art to exist within. The building disappears into the fog."
  },
  {
    id: "03",
    title: "MONOLITH TOWER",
    location: "SEATTLE, USA",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    desc: "Glass and steel merge to form a vertical river. A monolithic structure reflecting the constant movement of the city."
  }
];

export default function WorkStack() {
  return (
    <section id="work" className="pb-32 px-6 md:px-20">
      <div className="max-w-[1600px] mx-auto mb-20 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-dark" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500">Case Studies</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tighter uppercase leading-none">
            Selected<br />Artifacts
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-[30vh]">
        {PROJECTS.map((project, i) => (
          <Card key={project.id} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}

function Card({ project, index, total }: { project: typeof PROJECTS[0], index: number, total: number, key?: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9 + (index * 0.02)]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div ref={container} className="sticky top-[10vh] h-[80vh] flex items-center justify-center">
      <motion.div 
        style={{ scale, opacity }}
        className="w-full h-full bg-card border border-border rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] shadow-xl"
      >
        {/* Info Side */}
        <div className="p-8 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border h-[40%] lg:h-full order-2 lg:order-1">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-gray-400">{project.id} / 0{total}</span>
              <button className="p-3 border border-border rounded-full hover:bg-dark hover:text-white transition-all duration-500">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
            <motion.h3 
              className="font-display text-3xl md:text-5xl font-medium tracking-tight mt-10"
            >
              {project.title}
            </motion.h3>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mt-4">{project.location}</p>
          </div>

          <div className="space-y-8 hidden lg:block">
            <p className="text-sm text-gray-500 leading-relaxed font-light max-w-sm">
              {project.desc}
            </p>
            <div className="flex gap-2">
              <span className="px-5 py-2.5 bg-bg border border-border rounded-full text-[9px] uppercase tracking-widest font-semibold text-gray-500 hover:border-dark transition-colors">Residential</span>
              <span className="px-5 py-2.5 bg-bg border border-border rounded-full text-[9px] uppercase tracking-widest font-semibold text-gray-500">2024</span>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative h-[60%] lg:h-full order-1 lg:order-2 overflow-hidden bg-bg/50">
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
