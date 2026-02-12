
import React from 'react';

const MindCare: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="mb-8">
         <h1 className="text-3xl font-extrabold mb-2">부모 마음 보호막 (심리 케어)</h1>
         <p className="text-slate-400 max-w-lg leading-relaxed">
           “부모님의 행복이 곧 아이의 세상을 비추는 빛입니다. 당신은 이미 충분히 잘하고 있습니다.”
         </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Main Assessment */}
          <section className="bg-card-bg/60 rounded-2xl p-8 border border-lavender/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <span className="material-icons-round text-[160px] text-lavender">psychology</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 text-lavender">산후 우울증 정기 검사</h2>
                <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                  에든버러 산후우울증 척도(K-EPDS)는 정서적 건강을 정기적으로 확인하기 위한 도구입니다. 2분의 투자가 가족 모두에게 행복을 가져다줍니다.
                </p>
                <div className="flex items-center gap-4">
                   <button className="bg-primary hover:bg-primary/90 text-background-dark font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/10">
                     2분 검사 시작
                   </button>
                   <span className="text-xs text-slate-500 italic">마지막 검사: 12일 전</span>
                </div>
              </div>
              <div className="bg-background-dark/80 p-6 rounded-2xl border border-primary/10 backdrop-blur-sm text-center">
                 <div className="text-4xl font-black text-primary mb-1">08/30</div>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">PREVIOUS SCORE</p>
                 <div className="mt-4 w-32 bg-white/5 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-[26%]"></div>
                 </div>
              </div>
            </div>
          </section>

          {/* Trend Chart Mockup */}
          <section className="bg-card-bg rounded-2xl p-8 border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold">감정 건강 트렌드</h3>
                <p className="text-xs text-slate-500">지난 14일간의 마음 날씨</p>
              </div>
              <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
                <button className="px-4 py-1 text-[10px] font-bold rounded-full bg-primary/20 text-primary">14일</button>
                <button className="px-4 py-1 text-[10px] font-bold rounded-full text-slate-500">30일</button>
              </div>
            </div>
            <div className="h-48 w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <path d="M0,150 Q100,140 200,160 T400,120 T600,80 T800,100 T1000,90" fill="none" stroke="#19e5e6" strokeWidth="3" />
                {[200, 400, 600, 800].map((x, i) => (
                  <circle key={i} cx={x} cy={160 - (i*20)} r="4" fill="#19e5e6" />
                ))}
              </svg>
              <div className="flex justify-between mt-4 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                <span>2주 전</span>
                <span>지난 주</span>
                <span>어제</span>
                <span>오늘</span>
              </div>
            </div>
          </section>

          {/* Small Achievements */}
          <section>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                 <span className="material-icons-round text-orange-400">auto_awesome</span>
               </div>
               <div>
                 <h3 className="text-lg font-bold">오늘의 작은 성취</h3>
                 <p className="text-xs text-slate-500">나를 돌보는 행동들이 큰 변화를 만듭니다</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: '물 1L 마시기', done: true },
                { title: '10분간 명상', done: true },
                { title: '스트레칭 완료', done: false }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  item.done ? 'bg-primary/10 border-primary/30' : 'bg-card-bg border-white/5 opacity-60'
                }`}>
                   <div className={`w-6 h-6 rounded flex items-center justify-center ${item.done ? 'bg-primary' : 'border-2 border-slate-600'}`}>
                     {item.done && <span className="material-icons-round text-background-dark text-sm">done</span>}
                   </div>
                   <span className={`text-sm font-bold ${item.done ? 'text-white' : 'text-slate-500'}`}>{item.title}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Support Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
           <section className="bg-gradient-to-br from-indigo-900/40 to-card-bg rounded-2xl border border-lavender/20 p-6 shadow-xl">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="material-icons-round text-lavender">emergency_share</span>
               전문가 상담 핫라인
             </h3>
             <p className="text-xs text-slate-400 mb-6 leading-relaxed">
               마음이 버거울 때, 24시간 언제든 도움의 손길이 기다립니다. 혼자서 이 무게를 다 짊어지지 마세요.
             </p>
             <a href="tel:1577-0199" className="block w-full bg-lavender/10 hover:bg-lavender/20 border border-lavender/30 text-white rounded-2xl p-4 transition-all group mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-lavender font-bold uppercase tracking-widest">임신·출산 상담 핫라인</p>
                    <p className="text-2xl font-black">1577-0199</p>
                  </div>
                  <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                    <span className="material-icons-round text-background-dark">call</span>
                  </div>
                </div>
             </a>
             <button className="w-full py-3 text-sm font-bold border border-slate-700 rounded-xl hover:bg-white/5 transition-all">
               가까운 상담소 찾기
             </button>
           </section>

           <section className="bg-card-bg rounded-2xl p-6 border border-white/5">
             <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/id/${i+10}/50/50`} className="w-8 h-8 rounded-full border-2 border-background-dark" alt="User" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background-dark flex items-center justify-center text-[10px] font-bold text-primary">+1.2k</div>
                </div>
                <div>
                  <p className="text-sm font-bold">혼자가 아니에요</p>
                  <p className="text-[10px] text-slate-500">오늘 1,248명의 부모님이 접속했습니다</p>
                </div>
             </div>
             <div className="space-y-4">
               {[
                 { title: '충분히 좋은 부모가 된다는 것', type: 'AUDIO', time: '12분' },
                 { title: '수면 부족과 감정 조절', type: 'READ', time: '4분' }
               ].map((c, i) => (
                 <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 cursor-pointer transition-all">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                      <span className="material-icons-round text-slate-500 text-sm">{c.type === 'AUDIO' ? 'podcasts' : 'menu_book'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold">{c.title}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-widest">{c.type} • {c.time}</p>
                    </div>
                 </div>
               ))}
             </div>
           </section>
        </aside>
      </div>
    </div>
  );
};

export default MindCare;
