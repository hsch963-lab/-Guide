
import React, { useState } from 'react';
import { getNutritionAdvice } from '../services/gemini';
import { ChatMessage } from '../types';

const Nutrition: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '안녕하세요! 이유식 및 영양 도우미입니다. 식재료 정보나 알레르기 증상에 대해 무엇이든 물어보세요.' }
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
      const response = await getNutritionAdvice(userMsg);
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
           <nav className="flex text-[10px] text-slate-500 mb-2 gap-2 uppercase tracking-widest font-bold">
             <span>정밀 육아 큐레이션</span>
             <span className="material-icons-round text-[12px]">chevron_right</span>
             <span className="text-primary">맞춤 영양 및 이유식</span>
           </nav>
           <h1 className="text-3xl font-extrabold tracking-tight">영양 식단 & 가이드</h1>
        </div>
        <button className="bg-primary text-background-dark px-6 py-2.5 rounded-xl font-bold flex items-center gap-2">
          <span className="material-icons-round">add_circle</span> 식단 기록
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Weekly Schedule */}
          <section className="bg-card-bg rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold flex items-center gap-2">
                <span className="material-icons-round text-primary">calendar_month</span> 주간 일정
              </h2>
              <span className="text-xs text-slate-500">10월 16일 - 10월 22일</span>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {['월', '화', '수', '목', '금', '토', '일'].map((day, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                   <span className="text-center text-[10px] font-bold text-slate-500">{day}</span>
                   <div className={`h-24 rounded-xl border p-2 flex flex-col justify-between transition-all ${
                     idx === 2 ? 'bg-primary/10 border-primary shadow-[0_0_15px_cyan/10]' : 'bg-white/5 border-white/5 opacity-60'
                   }`}>
                      <span className={`text-[10px] font-bold ${idx === 2 ? 'text-primary' : 'text-slate-500'}`}>{16 + idx}</span>
                      <div className={`text-[9px] py-0.5 rounded text-center font-bold ${
                        idx === 2 ? 'bg-primary text-background-dark' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {idx === 2 ? '철분 오트밀' : '사과 미음'}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Today Recommendation */}
            <section className="bg-card-bg rounded-2xl border border-white/5 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-white/5 flex justify-between items-center bg-primary/5">
                <h3 className="font-bold text-sm">오늘의 추천 식단</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">MORNING</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-slate-800 overflow-hidden">
                    <img src="https://picsum.photos/200/200?oatmeal" alt="Food" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">철분 강화 오트밀 죽</h4>
                    <p className="text-xs text-slate-500 italic mt-1">인지 발달을 위한 필수 영양</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">입자 크기</p>
                     <p className="text-lg font-bold">0.3cm <span className="text-[10px] text-slate-500 font-normal">으깬 형태</span></p>
                   </div>
                   <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">농도</p>
                     <p className="text-lg font-bold">걸쭉한 죽</p>
                   </div>
                </div>
              </div>
            </section>

            {/* Cooking Guide */}
            <section className="bg-card-bg rounded-2xl border border-white/5 p-6">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className="material-icons-round text-primary text-sm">microwave</span> 조리 가이드
              </h3>
              <ul className="space-y-4">
                 {[
                   '물 1/2컵에 오트밀 2큰술을 넣고 끓이기',
                   '모유/분유 30ml를 섞어 농도 조절',
                   '적절한 온도로 식혀서 급여'
                 ].map((step, idx) => (
                   <li key={idx} className="flex gap-3">
                     <span className="w-5 h-5 rounded bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">{idx+1}</span>
                     <p className="text-xs text-slate-300">{step}</p>
                   </li>
                 ))}
              </ul>
              <div className="mt-6 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-3">
                <span className="material-icons-round text-amber-500 text-sm">warning</span>
                <p className="text-[10px] text-amber-500 leading-relaxed">배식 전 손목 안쪽으로 온도를 반드시 확인하세요.</p>
              </div>
            </section>
          </div>
        </div>

        {/* AI Chat Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
           <section className="bg-card-bg rounded-2xl border border-white/5 flex flex-col h-[500px] shadow-2xl overflow-hidden">
             <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/5">
               <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                 <span className="material-icons-round text-background-dark text-sm">smart_toy</span>
               </div>
               <h3 className="text-sm font-bold">AI 영양 도우미</h3>
             </div>
             
             <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-primary text-background-dark font-semibold rounded-tr-none' 
                        : 'bg-white/5 border border-white/10 rounded-tl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none animate-pulse text-[10px] text-slate-500">
                      생각 중...
                    </div>
                  </div>
                )}
             </div>

             <div className="p-4 border-t border-white/5 bg-background-dark/50">
               <div className="relative">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="질문을 입력하세요..."
                   className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                 />
                 <button 
                   onClick={handleSend}
                   disabled={isTyping}
                   className="absolute right-2 top-2 w-8 h-8 bg-primary rounded-lg text-background-dark flex items-center justify-center hover:opacity-80 transition-all disabled:opacity-50"
                 >
                   <span className="material-icons-round text-lg">send</span>
                 </button>
               </div>
             </div>
           </section>

           <div className="grid grid-cols-2 gap-4">
             <button className="flex flex-col items-center justify-center gap-2 p-6 bg-card-bg rounded-2xl border border-white/5 hover:border-primary/40 transition-all group">
               <span className="material-icons-round text-slate-500 group-hover:text-primary">print</span>
               <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300">리스트 인쇄</span>
             </button>
             <button className="flex flex-col items-center justify-center gap-2 p-6 bg-card-bg rounded-2xl border border-white/5 hover:border-primary/40 transition-all group">
               <span className="material-icons-round text-slate-500 group-hover:text-primary">ios_share</span>
               <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300">공유하기</span>
             </button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Nutrition;
