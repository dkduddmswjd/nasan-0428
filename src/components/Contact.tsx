import React from "react";
import { motion } from "motion/react";
import { Send, Mail, ChevronDown } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen pt-48 pb-32 px-6 md:px-20 bg-white">
      <div className="grid lg:grid-cols-12 gap-16 mb-24">
        <div className="lg:col-span-12">
          <h2 className="font-display text-5xl md:text-[10vw] font-bold tracking-tightest leading-[0.9]">
            Create Influence<br />with <span className="italic">NASAN</span>
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-20">
        {/* Form Side */}
        <div className="lg:col-span-3">
          <form action="https://formspree.io/f/xwvadryg" method="POST" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <FormField name="name" label="회사명 / 성명" placeholder="회사명 또는 성함을 입력해주세요" required />
              <FormField name="email" label="이메일" type="email" placeholder="hello@yourbrand.com" required />
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">구분</label>
                <div className="relative">
                  <select name="category" className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-dark appearance-none text-lg pr-10">
                    <option>광고 협업</option>
                    <option>크리에이터 지원</option>
                    <option>기타 문의</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <FormField name="phone" label="연락처" type="tel" placeholder="010-0000-0000" required />
            </div>
            <FormField name="message" label="문의 내용" placeholder="문의하실 내용을 상세히 적어주세요" isTextArea required />
            
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-dark text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl"
            >
              문의하기 <Send size={16} />
            </motion.button>
          </form>
        </div>

        {/* Support Info Side */}
        <div className="lg:col-span-2 lg:pl-10">
          <div className="p-8 md:p-12 bg-bg rounded-[3rem] sticky top-32 min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-8 md:mb-12">Working with NASAN</h3>
            
            <div className="space-y-12 w-full flex flex-col items-center">
              <InfoItem 
                icon={<Mail size={20} />}
                title="이메일 주소"
                desc="영업일 기준 1-2일 내 회신드립니다."
                value="pigcatwow@gmail.com"
              />
            </div>

            <div className="mt-16 pt-10 border-t border-dark/5 w-full">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed px-4">
                Nasan is the premier bridge between visionary brands and high-quality pet creators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ name, label, placeholder, isTextArea = false, type = "text", required = false }: { name: string, label: string, placeholder: string, isTextArea?: boolean, type?: string, required?: boolean }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</label>
      {isTextArea ? (
        <textarea name={name} required={required} className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-dark h-32 resize-none text-lg" placeholder={placeholder} />
      ) : (
        <input name={name} type={type} required={required} className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-dark text-lg" placeholder={placeholder} />
      )}
    </div>
  );
}

function InfoItem({ icon, title, desc, value }: { icon: React.ReactNode, title: string, desc: string, value: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl shrink-0 mb-6 transition-transform hover:scale-110">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold mb-2 tracking-tight">{title}</h4>
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">{desc}</p>
        <span className="text-lg sm:text-2xl font-display font-medium tracking-tight text-dark block break-all">{value}</span>
      </div>
    </div>
  );
}
