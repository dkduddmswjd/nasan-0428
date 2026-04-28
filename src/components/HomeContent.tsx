import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Users, PenTool, MessageSquare, Upload, ChevronLeft, ChevronRight, Youtube } from "lucide-react";

export default function HomeContent({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const steps = [
    { title: "광고 문의", icon: <Search className="w-5 h-5" /> },
    { title: "제안 및 섭외", icon: <Users className="w-5 h-5" /> },
    { title: "기획 및 제작", icon: <PenTool className="w-5 h-5" /> },
    { title: "시사 및 피드백", icon: <MessageSquare className="w-5 h-5" /> },
    { title: "업로드", icon: <Upload className="w-5 h-5" /> }
  ];

  const videos = [
    { 
      title: "보리 빛나는 밤", 
      url: "https://www.youtube.com/watch?v=GBfnpCFJzB4",
      thumb: "https://img.youtube.com/vi/GBfnpCFJzB4/hqdefault.jpg"
    },
    { 
      title: "슈퍼콜라", 
      url: "https://www.youtube.com/watch?v=siljYxlXNYE",
      thumb: "https://img.youtube.com/vi/siljYxlXNYE/maxresdefault.jpg"
    },
    { 
      title: "말티즈 장군이", 
      url: "https://www.youtube.com/watch?v=WO1M61PR-RM",
      thumb: "https://img.youtube.com/vi/WO1M61PR-RM/hqdefault.jpg"
    },
    { 
      title: "김솜", 
      url: "https://www.youtube.com/watch?v=hnFOvQDEDv0",
      thumb: "https://img.youtube.com/vi/hnFOvQDEDv0/maxresdefault.jpg"
    }
  ];

  // We use triple items for a perfectly smooth infinite scroll
  const displayVideos = [...videos, ...videos, ...videos];
  const middleSetStart = videos.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Initialize to the middle set
  useEffect(() => {
    setCurrentIndex(middleSetStart);
  }, [middleSetStart]);

  // Handle infinite loop jumps silently
  useEffect(() => {
    if (currentIndex >= middleSetStart + videos.length) {
      // Jump back to the same position in the middle set
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(middleSetStart);
      }, 600); // Adjust to match transition duration
      return () => clearTimeout(timer);
    }
    if (currentIndex < middleSetStart) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(middleSetStart + videos.length - 1);
      }, 600);
      return () => clearTimeout(timer);
    }
    setIsTransitioning(true);
  }, [currentIndex, videos.length, middleSetStart]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 800); 
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="bg-white">
      {/* Values Section -> Horizontal Slider Section */}
      <section className="py-24 md:py-48 bg-white relative overflow-hidden group">
        <div className="max-w-7xl mx-auto px-6 md:px-20 overflow-visible">
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
              <motion.div 
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ 
                  duration: isTransitioning ? 0.6 : 0,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {displayVideos.map((v, i) => (
                  <a 
                    key={i}
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-full block relative aspect-video bg-bg overflow-hidden group/item"
                  >
                    <img 
                      src={v.thumb} 
                      className="w-full h-full object-cover scale-110 group-hover/item:scale-125 transition-transform duration-700" 
                      alt={v.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover/item:opacity-90 transition-opacity duration-500" />
                    
                    {/* Centered Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-2xl">
                        <Youtube size={48} fill="currentColor" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 translate-y-4 group-hover/item:translate-y-0 opacity-0 group-hover/item:opacity-100 transition-all duration-500">
                      <h3 className="font-display text-white text-2xl md:text-5xl font-bold mb-2 md:mb-4">{v.title}</h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <span className="w-fit px-4 py-1.5 md:py-2 bg-white text-dark text-[8px] md:text-[10px] font-bold uppercase tracking-widest rounded-full">Explore Creator</span>
                        <p className="text-white/60 text-xs md:text-sm font-light">Watch campaign content on YouTube</p>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-dark z-20"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-dark z-20"
            >
              <ChevronRight size={32} />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(middleSetStart + i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${(currentIndex % videos.length) === i ? 'w-12 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-48 px-6 md:px-20 bg-dark text-white overflow-hidden rounded-[3rem] mx-6">
          <div className="mb-32 text-center md:text-left">
            <h2 className="font-display text-4xl md:text-8xl font-bold tracking-tightest leading-none">광고 진행 절차</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
            {steps.map((step, i) => (
              <div key={i} className="relative p-12 border-l border-white/5 group hover:bg-white/5 transition-colors">
                <div className="absolute top-10 right-10 text-2xl font-mono text-gray-400 font-bold opacity-60">0{i+1}</div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-10 text-white group-hover:bg-white group-hover:text-dark transition-all">
                  {step.icon}
                </div>
                <h4 className="font-display text-2xl font-bold">{step.title}</h4>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 text-lg text-gray-300 font-normal leading-relaxed">
            <p className="mb-2">* 상기 안내된 절차는 광고, 기획 등 상황에 따라 변동될 수 있습니다.</p>
            <p>* 크리에이터 별 단가 및 2차 라이선스 등에 대해서는 별도 문의 부탁드립니다.</p>
          </div>
      </section>

      {/* CTA Final */}
      <section className="py-60 flex flex-col items-center justify-center text-center px-6">
        <motion.h2 
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          className="font-display text-5xl md:text-8xl font-bold tracking-tightest leading-none mb-16"
        >
          LET'S WORK<br />TOGETHER.
        </motion.h2>
        <button 
           onClick={() => onNavigate("contact")}
           className="px-16 py-6 bg-dark text-white rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors shadow-2xl"
        >
          문의하기
        </button>
      </section>
    </div>
  );
}
