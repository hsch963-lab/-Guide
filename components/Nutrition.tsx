
import React, { useState } from 'react';
import { getNutritionAdvice } from '../services/gemini.ts';
import { ChatMessage, UserProfile } from '../types.ts';

interface NutritionProps {
  profile: UserProfile;
}

const Nutrition: React.FC<NutritionProps> = ({ profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `안녕하세요, ${profile.parentName}님. ${profile.babyName}의 현재 월령(${profile.months}개월)에 맞춘 전문적인 영양 조언을 제공해 드립니다. 무엇이 궁금하신가요?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Fix: Pass age and question as separate arguments to match the service definition
      const response = await getNutritionAdvice(profile.months, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || '답변을 생성할 수 없습니다.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
           <nav className="flex text-[10px] text-slate-500 mb-2 gap-2 uppercase tracking-widest font-black">
             <span>RE-ME Precision Curation</span>
             <span className="material-icons-round text-[12px]">chevron_right</span>
             <span className="text-primary">{profile.babyName}'s Care</span>
           </nav>
           <h1 className="text-4xl font-black tracking-tighter text-white">영양 & 이유식 엔진</h1>
        </div>
        <button className="bg-primary text-background-dark px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-primary/10">
          <span className="material-icons-round">add_circle</span> 식단 기록
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Weekly Schedule */}
          <section className="bg-card-bg rounded-3xl border border-white/5 p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black text-lg text-white flex items-center gap-2">
                <span className="material-icons-round text-primary">calendar_month</span> 주간 정밀 식단
              </h2>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">October 2024</span>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {['월', '화', '수', '목', '금', '토', '일'].map((day, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                   <span className="text-center text-[10px] font-black text-slate-500 uppercase">{day}</span>
                   <div className={`h-28 rounded-2xl border p-3 flex flex-col justify-between transition-all ${
                     idx === 2 ? 'bg-primary/10 border-primary/40 shadow-xl' : 'bg-white/5 border-white/5'
                   }`}>
                      <span className={`text-[10px] font-black ${idx === 2 ? 'text-primary' : 'text-slate-500'}`}>{16 + idx}</span>
                      <div className={`text-[9px] py-1 rounded-lg text-center font-black ${
                        idx === 2 ? 'bg-primary text-background-dark' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {idx === 2 ? '정밀 철분식' : '식단 대기'}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-card-bg rounded-3xl border border-white/5 overflow-hidden flex flex-col shadow-lg">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="font-black text-xs text-slate-300 uppercase tracking-widest">추천 솔루션</h3>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">Current Stage</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-slate-900 overflow-hidden border-2 border-white/5 shadow-xl">
                    <img src="https://picsum.photos/200/200?babyfood" alt="Food" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-white">맞춤형 영양 미음</h4>
                    <p className="text-[11px] text-slate-500 italic mt-2 leading-relaxed">{profile.months}개월 발달 지표를 고려한<br/>최적의 성분 조합</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[9px] text-slate-500 font-black uppercase mb-1 tracking-widest">농도 가이드</p>
                     <p className="text-lg font-black text-white">미음 단계</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[9px] text-slate-500 font-black uppercase mb-1 tracking-widest">일일 권장량</p>
                     <p className="text-lg font-black text-white">450 - 600ml</p>
                   </div>
                </div>
              </div>
            </section>

            <section className="bg-card-bg rounded-3xl border border-white/5 p-8 shadow-lg">
              <h3 className="font-black text-xs text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="material-icons-round text-primary text-sm">psychology</span> 전문가 조리 팁
              </h3>
              <ul className="space-y-6">
                 {[
                   '식재료 본연의 맛을 살린 무염 조리',
                   '알레르기 반응 관찰을 위한 3일 주기 급여',
                   '급여 전 최적 온도(36-38도) 유지'
                 ].map((step, idx) => (
                   <li key={idx} className="flex gap-4">
                     <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center flex-shrink-0 border border-primary/20">{idx+1}</span>
                     <p className="text-xs text-slate-300 font-medium leading-relaxed">{step}</p>
                   </li>
                 ))}
              </ul>
              <div className="mt-8 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
                <span className="material-icons-round text-amber-500 text-lg">verified</span>
                <p className="text-[10px] text-amber-200/70 leading-relaxed font-bold italic">
                  "아이의 입맛이 형성되는 중요한 시기입니다. 억지로 권하기보다 즐거운 식사 분위기를 만들어주세요."
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* AI Chat Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
           <section className="bg-card-bg rounded-3xl border border-white/5 flex flex-col h-[550px] shadow-2xl overflow-hidden relative">
             <div className="p-5 border-b border-white/5 flex items-center gap-4 bg-white/5 backdrop-blur-sm">
               <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                 <span className="material-icons-round text-background-dark text-lg">analytics</span>
               </div>
               <div>
                 <h3 className="text-sm font-black text-white tracking-tight">RE-ME Nutrition AI</h3>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Expert Support Engine</p>
               </div>
             </div>
             
             <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-primary text-background-dark rounded-tr-none' 
                        : 'bg-white/5 border border-white/10 rounded-tl-none text-slate-200'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none animate-pulse text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      Analyzing context...
                    </div>
                  </div>
                )}
             </div>

             <div className="p-6 border-t border-white/5 bg-background-dark/30">
               <div className="relative">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="전문가에게 질문하기..."
                   className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-xs focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                 />
                 <button 
                   onClick={handleSend}
                   disabled={isTyping}
                   className="absolute right-3 top-3 w-10 h-10 bg-primary rounded-xl text-background-dark flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/10"
                 >
                   <span className="material-icons-round text-xl">keyboard_arrow_up</span>
                 </button>
               </div>
             </div>
           </section>
        </aside>
      </div>
    </div>
  );
};

export default Nutrition;
