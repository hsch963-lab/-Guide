
import React, { useEffect, useState } from 'react';
import { getGrowthAnalysis } from '../services/gemini';

const GrowthTracker: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>("AI가 발달 상태를 분석 중입니다...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const result = await getGrowthAnalysis({
          age: "6개월",
          weight: "7.8kg",
          milestones: ["뒤집기", "물건 잡기"]
        });
        setAnalysis(result || "분석 결과를 가져올 수 없습니다.");
      } catch (error) {
        setAnalysis("분석 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  const domains = [
    { label: '대근육 발달 (신체)', icon: 'fitness_center', progress: 88 },
    { label: '인지 발달', icon: 'psychology', progress: 72 },
    { label: '언어 발달', icon: 'record_voice_over', progress: 65 },
    { label: '사회성 및 정서', icon: 'groups', progress: 94 },
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Left Timeline */}
      <aside className="col-span-12 lg:col-span-3">
        <div className="bg-card-bg rounded-2xl border border-white/5 p-6 space-y-8">
          <div>
            <h2 className="font-bold text-lg mb-1">성장 발달 타임라인</h2>
            <p className="text-xs text-slate-500">연령별 주요 발달 단계</p>
          </div>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
            {[
              { age: '0-2개월', title: '첫 미소와 눈맞춤', done: true, current: false },
              { age: '4-6개월', title: '뒤집기 및 물건 잡기', done: false, current: true },
              { age: '6-9개월', title: '도움 없이 앉기', done: false, current: false },
              { age: '12-18개월', title: '첫 단어와 걸음마', done: false, current: false },
            ].map((item, idx) => (
              <div key={idx} className={`relative pl-8 ${!item.done && !item.current ? 'opacity-40' : ''}`}>
                <div className={`absolute left-0 top-1 w-3 h-3 rounded-full z-10 ${
                  item.done ? 'bg-primary' : item.current ? 'bg-primary animate-pulse shadow-[0_0_10px_cyan]' : 'bg-slate-700'
                }`}></div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.age}</span>
                <h3 className="text-sm font-semibold mt-0.5">{item.title}</h3>
                {item.current && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded">
                      <span className="material-icons-round text-[10px]">check</span> 앞에서 뒤로 뒤집기
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20 p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="relative z-10 flex-1">
              <span className="inline-block bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded mb-4">현재 집중 발달</span>
              <h2 className="text-3xl font-extrabold mb-2">뒤집기 (4-6개월)</h2>
              <p className="text-slate-400 text-sm mb-6 max-w-sm">레오의 코어 근육이 강화되기 시작했습니다. 오늘 놀이 시간에는 뒤집기 보조 운동에 집중해보세요.</p>
              <button className="bg-primary text-background-dark font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:scale-105 transition-all">
                <span className="material-icons-round">play_circle</span> 운동 가이드
              </button>
            </div>
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-slate-800">
              <img src="https://picsum.photos/400/400?baby" className="w-full h-full object-cover" alt="Baby" />
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="md:col-span-4 bg-card-bg rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold mb-4">K-DST 발달 검사</h3>
              <div className="w-full h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-2">
                <span className="text-emerald-500 font-black text-xl">양호</span>
              </div>
              <p className="text-[10px] text-slate-500">최근 검사일: 2024.12.20</p>
            </div>
            <button className="w-full border border-primary/40 text-primary py-2.5 rounded-xl text-sm font-bold hover:bg-primary/5 transition-all mt-4">
              전문가 상담하기
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Domains Progress */}
          <section className="md:col-span-7 bg-card-bg rounded-2xl border border-white/5 p-8">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="material-icons-round text-primary text-sm">bar_chart</span>
              성장 발달 영역 분석
            </h3>
            <div className="space-y-6">
              {domains.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="material-icons-round text-primary text-[14px]">{d.icon}</span>
                      {d.label}
                    </span>
                    <span className="text-primary">{d.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${d.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Analysis */}
          <section className="md:col-span-5 flex">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 relative flex flex-col w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
                  <span className="material-icons-round text-background-dark">auto_awesome</span>
                </div>
                <h3 className="font-extrabold text-sm text-primary tracking-tight">Gemini AI 전문가 분석</h3>
              </div>
              <div className="flex-1">
                {loading ? (
                   <div className="space-y-3 animate-pulse">
                     <div className="h-3 bg-white/10 rounded w-full"></div>
                     <div className="h-3 bg-white/10 rounded w-5/6"></div>
                     <div className="h-3 bg-white/10 rounded w-4/6"></div>
                   </div>
                ) : (
                  <p className="text-sm leading-relaxed text-slate-300 italic">"{analysis}"</p>
                )}
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                   <p className="text-[10px] text-primary font-bold uppercase mb-2 tracking-widest flex items-center gap-1">
                     <span className="material-icons-round text-[12px]">tips_and_updates</span> 맞춤 제안
                   </p>
                   <p className="text-xs text-slate-500 italic">"터미타임 시간을 하루 5분씩 더 늘려 상체 근력을 강화해주세요."</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>HIPAA 의료 보안 준수</span>
                <span className="text-primary/60">신뢰도 98.4%</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;
