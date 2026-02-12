
import React, { useEffect, useState } from 'react';
import { getGrowthAnalysis } from '../services/gemini.ts';
import { UserProfile } from '../types.ts';

interface GrowthTrackerProps {
  profile: UserProfile;
}

const GrowthTracker: React.FC<GrowthTrackerProps> = ({ profile }) => {
  const [analysis, setAnalysis] = useState<string>("기록된 데이터가 부족하여 분석을 시작할 수 없습니다.");
  const [loading, setLoading] = useState(false); // 초기에는 로딩하지 않음 (데이터가 없으므로)

  useEffect(() => {
    // 실제 데이터가 있을 때만 분석 실행 (현재는 데이터 수집 전이므로 안내 메시지 유지)
    // fetchAnalysis 로직은 나중에 실제 DB 연동 시 활성화
  }, [profile]);

  const domains = [
    { label: '대근육 발달 (신체)', icon: 'fitness_center', progress: 0 },
    { label: '인지 발달', icon: 'psychology', progress: 0 },
    { label: '언어 발달', icon: 'record_voice_over', progress: 0 },
    { label: '사회성 및 정서', icon: 'groups', progress: 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      <aside className="col-span-12 lg:col-span-3">
        <div className="bg-card-bg rounded-2xl border border-white/5 p-6 space-y-8">
          <div>
            <h2 className="font-bold text-lg mb-1">정밀 발달 타임라인</h2>
            <p className="text-xs text-slate-500">{profile.babyName}의 성장 시점 분석</p>
          </div>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
            {[
              { age: '0-2개월', title: '사회적 미소', done: profile.months > 2 },
              { age: '4-6개월', title: '목 가누기 및 뒤집기', done: profile.months > 6, current: profile.months >= 4 && profile.months <= 6 },
              { age: '7-9개월', title: '혼자 앉기', done: profile.months > 9, current: profile.months >= 7 && profile.months <= 9 },
              { age: '12개월+', title: '첫 걸음마', done: profile.months > 12, current: profile.months >= 12 },
            ].map((item, idx) => (
              <div key={idx} className={`relative pl-8 ${!item.done && !item.current ? 'opacity-20' : ''}`}>
                <div className={`absolute left-0 top-1 w-3 h-3 rounded-full z-10 ${
                  item.done ? 'bg-primary' : item.current ? 'bg-primary animate-pulse shadow-[0_0_10px_cyan]' : 'bg-slate-700'
                }`}></div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.age}</span>
                <h3 className="text-sm font-semibold mt-0.5">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/10 p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="relative z-10 flex-1">
              <span className="inline-block bg-white/10 text-slate-400 text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest">분석 대기 중</span>
              <h2 className="text-3xl font-black mb-2 text-white">성장 기록을 시작하세요</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-sm font-medium">{profile.babyName}의 첫 몸무게와 키를 입력하시면 RE-ME 엔진이 정밀 발달 분석을 시작합니다.</p>
              <button className="bg-white/10 text-slate-300 font-black px-8 py-3 rounded-2xl text-sm flex items-center gap-2 cursor-not-allowed">
                기록 데이터 부족
              </button>
            </div>
            <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-slate-900 flex items-center justify-center border border-white/5">
              <span className="material-icons-round text-slate-700 text-6xl">query_stats</span>
            </div>
          </div>

          <div className="md:col-span-4 bg-card-bg rounded-3xl border border-white/5 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">종합 발달 지수</h3>
              <div className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-2">
                <span className="text-slate-700 font-black text-xl">--</span>
              </div>
              <p className="text-[10px] text-slate-600 text-center font-bold">기록 데이터가 없습니다</p>
            </div>
            <button className="w-full border border-white/5 text-slate-600 py-3 rounded-xl text-xs font-bold transition-all mt-4 cursor-default">
              기능 업데이트 예정
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <section className="md:col-span-7 bg-card-bg rounded-3xl border border-white/5 p-8 shadow-lg">
            <h3 className="font-black text-sm mb-6 flex items-center gap-2 text-white">
              <span className="material-icons-round text-primary">analytics</span>
              영역별 세부 분석
            </h3>
            <div className="space-y-6">
              {domains.map((d, i) => (
                <div key={i} className="opacity-30">
                  <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest">
                    <span className="flex items-center gap-2 text-slate-500">
                      <span className="material-icons-round text-slate-500 text-[14px]">{d.icon}</span>
                      {d.label}
                    </span>
                    <span className="text-slate-600">--%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-700 rounded-full" style={{ width: `0%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="md:col-span-5 flex">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 relative flex flex-col w-full shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                  <span className="material-icons-round text-slate-600">auto_awesome</span>
                </div>
                <h3 className="font-black text-xs text-slate-500 tracking-widest uppercase">Expert Insight</h3>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-slate-500 font-medium italic">"{analysis}"</p>
                <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
                   <p className="text-[10px] text-slate-600 font-black uppercase mb-2 tracking-widest flex items-center gap-1">
                     <span className="material-icons-round text-[12px]">tips_and_updates</span> Recommendation
                   </p>
                   <p className="text-[11px] text-slate-700 font-medium leading-relaxed italic">
                     데이터 분석을 위해 일일 성장을 기록해 주십시오.
                   </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;
