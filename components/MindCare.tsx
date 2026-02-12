
import React from 'react';
import { UserProfile } from '../types.ts';

interface MindCareProps {
  profile: UserProfile;
}

const MindCare: React.FC<MindCareProps> = ({ profile }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="mb-10">
         <h1 className="text-4xl font-black tracking-tighter text-white mb-3">부모 심리 보호막</h1>
         <p className="text-slate-400 max-w-xl leading-relaxed font-medium">
           “{profile.parentName}님, 부모님의 행복이 곧 {profile.babyName}(이)의 세상을 비추는 빛입니다.<br/>당신은 이미 충분히 훌륭한 부모입니다.”
         </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Main Assessment */}
          <section className="bg-gradient-to-br from-card-bg to-[#0d1818] rounded-3xl p-10 border border-lavender/20 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <span className="material-icons-round text-[200px] text-lavender">favorite</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-black mb-4 text-lavender tracking-tighter">정기 심리 자가진단</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm font-medium">
                  에든버러 산후우울증 척도(K-EPDS)는 정서적 건강을 정기적으로 확인하기 위한 학술적 도구입니다. 부모님의 정서적 안정은 {profile.babyName}의 애착 형성에 결정적인 역할을 합니다.
                </p>
                <div className="flex items-center gap-6">
                   <button className="bg-primary hover:scale-105 active:scale-95 text-background-dark font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 text-sm">
                     2분 정밀 진단 시작
                   </button>
                   <span className="text-xs text-slate-500 font-bold italic">정기 검사 권장일: 매월 1회</span>
                </div>
              </div>
              <div className="bg-background-dark/80 p-8 rounded-3xl border border-white/5 backdrop-blur-md text-center shadow-inner min-w-[160px]">
                 <div className="text-5xl font-black text-white/20 mb-1">--</div>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Score History</p>
                 <div className="mt-6 w-32 bg-white/5 h-2 rounded-full overflow-hidden mx-auto">
                   <div className="bg-slate-700 h-full w-[0%] transition-all duration-1000"></div>
                 </div>
              </div>
            </div>
          </section>

          {/* Trend Chart Mockup */}
          <section className="bg-card-bg rounded-3xl p-8 border border-white/5 shadow-lg">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-black text-white">감정 건강 트렌드</h3>
                <p className="text-xs text-slate-500 font-medium">RE-ME 엔진이 분석한 최근 심리 변화</p>
              </div>
              <div className="flex bg-background-dark/50 rounded-2xl p-1.5 border border-white/5">
                <button className="px-5 py-1.5 text-[10px] font-black rounded-xl bg-primary/20 text-primary shadow-sm uppercase tracking-widest">14 Days</button>
                <button className="px-5 py-1.5 text-[10px] font-black rounded-xl text-slate-600 uppercase tracking-widest">30 Days</button>
              </div>
            </div>
            <div className="h-56 w-full relative group">
              <svg className="w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <path d="M0,150 Q100,140 200,160 T400,120 T600,80 T800,100 T1000,90" fill="none" stroke="#19e5e6" strokeWidth="3" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/5 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
                   <p className="text-xs font-bold text-slate-500 italic">진단 데이터가 축적되면 그래프가 활성화됩니다.</p>
                 </div>
              </div>
              <div className="flex justify-between mt-6 text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Present</span>
              </div>
            </div>
          </section>
        </div>

        {/* Support Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
           <section className="bg-gradient-to-br from-indigo-950/30 to-card-bg rounded-3xl border border-lavender/10 p-8 shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-lavender/5 blur-3xl rounded-full"></div>
             <h3 className="text-lg font-black mb-4 flex items-center gap-3 text-white">
               <span className="material-icons-round text-lavender">emergency_share</span>
               전문가 핫라인
             </h3>
             <p className="text-xs text-slate-400 mb-8 leading-relaxed font-medium">
               마음의 무게가 느껴질 때, 주저하지 말고 전문가의 도움을 받으세요. 익명성이 보장되는 24시간 상담 채널입니다.
             </p>
             <a href="tel:1577-0199" className="block w-full bg-lavender/5 hover:bg-lavender/10 border border-lavender/20 text-white rounded-2xl p-6 transition-all group mb-6 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-lavender font-black uppercase tracking-widest mb-1">임신·출산 전문 상담</p>
                    <p className="text-3xl font-black tracking-tighter">1577-0199</p>
                  </div>
                  <div className="w-14 h-14 bg-lavender rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-lavender/10">
                    <span className="material-icons-round text-background-dark text-2xl">call</span>
                  </div>
                </div>
             </a>
             <button className="w-full py-4 text-xs font-black border border-white/5 rounded-2xl hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-all uppercase tracking-widest">
               가까운 지역 센터 찾기
             </button>
           </section>

           <section className="bg-card-bg rounded-3xl p-8 border border-white/5 shadow-lg">
             <div className="flex items-center gap-5 mb-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/id/${i+10}/50/50`} className="w-9 h-9 rounded-full border-2 border-background-dark shadow-sm" alt="User" />
                  ))}
                  <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background-dark flex items-center justify-center text-[10px] font-black text-primary backdrop-blur-sm">+1.2k</div>
                </div>
                <div>
                  <p className="text-sm font-black text-white tracking-tight">커뮤니티 연결</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Peer Support Active</p>
                </div>
             </div>
             <div className="space-y-4">
               {[
                 { title: '부모의 죄책감 다스리기', type: 'AUDIO', time: '12m' },
                 { title: '수면 부족 시 감정 컨트롤', type: 'READ', time: '4m' }
               ].map((c, i) => (
                 <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 cursor-pointer transition-all group shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <span className="material-icons-round text-slate-500 group-hover:text-primary transition-colors text-xl">{c.type === 'AUDIO' ? 'podcasts' : 'menu_book'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-200 group-hover:text-white transition-colors">{c.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-black">{c.type} • {c.time}</p>
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
