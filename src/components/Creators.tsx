import { motion } from "motion/react";
import { Youtube, Instagram, ArrowUpRight } from "lucide-react";

// Import images to ensure Vite handles them correctly in production
import boriImg from "../assets/images/bori.png";
import supercollaImg from "../assets/images/supercolla.png";
import janggunImg from "../assets/images/janggun.png";
import kimsomImg from "../assets/images/kimsom.png";

const CREATORS = [
  {
    id: 1,
    name: "보리 빛나는 밤",
    platform: "Youtube",
    youtube: "https://www.youtube.com/@kiyomibori",
    instagram: "https://www.instagram.com/kiyomi_bori/",
    followers: "420K",
    traits: "일상 속 자연스러운 반려견 콘텐츠",
    image: boriImg,
    style: "감성 브이로그, 힐링 콘텐츠"
  },
  {
    id: 2,
    name: "슈퍼콜라",
    platform: "Youtube",
    youtube: "https://www.youtube.com/@supercolaa",
    instagram: "https://www.instagram.com/supercolaa/",
    followers: "230K",
    traits: "대형견 전문 야외 활동 및 리뷰",
    image: supercollaImg,
    style: "정보 공유형 리뷰, 활기찬 일상"
  },
  {
    id: 3,
    name: "말티즈 장군이",
    platform: "Youtube",
    youtube: "https://www.youtube.com/@maltese_janggun",
    instagram: "https://www.instagram.com/maltese_janggun/",
    followers: "120K",
    traits: "다묘 가정의 집사 공감 영상",
    image: janggunImg,
    style: "재미 요소 가미, 집사 공감"
  },
  {
    id: 4,
    name: "김솜",
    platform: "Youtube",
    youtube: "https://www.youtube.com/@%EA%B9%80%EC%86%9CKimSom",
    instagram: "https://www.instagram.com/kim_som222/",
    followers: "150K",
    traits: "반려견 패션 및 리빙 아이템 리더",
    image: kimsomImg,
    style: "비주얼 중심, 트렌디 디자인"
  }
];

export default function CreatorList({ onContact }: { onContact: () => void }) {
  return (
    <section className="min-h-screen pt-48 pb-32 px-6 md:px-20 bg-white">
      <div className="mb-24">
        <h2 className="font-display text-6xl md:text-[8vw] font-bold tracking-tightest leading-none">
          Our<br />Creators
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {CREATORS.map((creator, i) => (
          <motion.div 
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative mb-6">
               <img src={creator.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={creator.name} />
               <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors" />
               
               <div className="absolute top-4 right-4 flex gap-2">
                  <a 
                    href={creator.youtube} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-red-600 transition-colors"
                    title="YouTube 바로가기"
                  >
                    <Youtube size={16} />
                  </a>
                  <a 
                    href={creator.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-pink-600 transition-colors"
                    title="Instagram 바로가기"
                  >
                    <Instagram size={16} />
                  </a>
               </div>
            </div>

            <div className="px-2">
               <div className="mb-8">
                  <h3 className="font-display text-2xl font-bold">{creator.name}</h3>
               </div>
               
               <a 
                 href={creator.youtube}
                 target="_blank"
                 rel="noreferrer"
                 className="w-full py-4 border border-border rounded-full flex items-center justify-center gap-2 hover:bg-dark hover:text-white transition-all duration-500 text-xs font-bold uppercase tracking-widest"
               >
                 Visit Channel <ArrowUpRight size={14} />
               </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 p-8 md:p-20 bg-dark rounded-[3rem] text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale">
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop" className="w-full h-full object-cover" alt="Join us" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-display text-lg md:text-2xl font-bold tracking-tight mb-6">나산과 함께 성장할<br className="md:hidden" /> 크리에이터를 찾습니다.</h2>
          <button 
            onClick={onContact}
            className="px-8 py-5 bg-white text-dark rounded-[2rem] font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform leading-tight text-center"
          >
            크리에이터<br className="md:hidden" /> 지원하기
          </button>
        </div>
      </div>
    </section>
  );
}
