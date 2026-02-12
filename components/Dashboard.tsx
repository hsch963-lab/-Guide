
import React, { useState } from 'react';
import { UserProfile, ActionType, DashboardData } from '../types.ts';
import ActionModal from './ActionModal.tsx';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [realtimeData, setRealtimeData] = useState<DashboardData | null>(null);

  const getDevelopmentStage = (months: number) => {
    if (months <= 2) return "감각 탐색기: 사회적 미소";
    if (months <= 6) return "도약기 5: 관계와 원인";
    if (months <= 12) return "탐구기: 대상 영속성 형성";
    return "안정기: 자아 형성";
  };

  const handleUpdateData = (data: DashboardData) => {
    setRealtimeData(data);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <ActionModal 
        type={activeAction} 
        onClose={() => setActiveAction(null)} 
        profile={profile} 
        onDataUpdate={handleUpdateData}
      />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">{profile.parentName}님, 반갑습니다.</h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full border border-primary/20">NURSLY.AI 엔진 연결됨</span>
            <p className="text-slate-400 text-sm font-medium">
              <span className="text-slate-100">{profile.babyName}:</span> 생후 {profile.months}개월차
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setActiveAction('RECORD')}
            className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-primary text-background-dark font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            <span className="material-icons-round text-lg">edit_note</span>
            간편 기록
          </button>
          <button className="w-14 h-14 rounded-2xl bg-card-bg border border-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-lg">
            <span className="material-icons-round">notifications_none</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card-bg to-[#0d1f1f] border border-white/5 hero-glow p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-30"></div>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative w-40 h-40 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
                  <img
                    alt="Nutrition Focus"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    src="https://picsum.photos/400/400?food"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">NURSLY.AI 전문가 가이드</h2>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 leading-tight">{profile.months}개월 발달적 의의와 <br/>맞춤형 영양 솔루션</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {profile.babyName}(은)는 현재 <strong>{getDevelopmentStage(profile.months)}</strong> 단계입니다. NURSLY.AI 엔진이 제시하는 {profile.months}개월 필수 영양 가이드를 확인하고 기록을 시작해 보십시오.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveAction('GUIDE_COMPLETE')}
                    className="bg-primary/10 border border-primary/30 text-primary px-6 py-2.5 rounded-xl text-xs font-black hover:bg-primary hover:text-background-dark transition-all"
                  >
                    가이드 완료 표시
                  </button>
                  <button className="text-slate-500 hover:text-white px-4 py-2.5 text-xs font-bold transition-all">
                    전문 보기
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-card-bg border border-white/5 hover:border-primary/20 transition-all shadow-lg group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-2xl">bedtime</span>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${realtimeData ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-slate-600'}`}>
                  {realtimeData ? 'Synced' : 'No Data'}
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-widest">수면 정밀 분석</p>
              <h4 className={`text-xl font-black ${realtimeData ? 'text-white' : 'text-slate-600'}`}>
                {realtimeData ? realtimeData.sleep_time : '데이터 대기 중'}
              </h4>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">
                {realtimeData ? '최근 입력 기준' : '기록이 추가되면 분석됩니다'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card-bg border border-white/5 hover:border-primary/20 transition-all shadow-lg group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-2xl">waves</span>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${realtimeData ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-slate-600'}`}>
                   {realtimeData ? 'Active' : 'Pending'}
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-widest">수유 시뮬레이션</p>
              <h4 className={`text-xl font-black ${realtimeData ? 'text-white' : 'text-slate-600'}`}>
                {realtimeData ? realtimeData.feeding_amount : '데이터 대기 중'}
              </h4>
              <p className="text-[11px] text-primary mt-2 font-bold italic">
                {realtimeData ? '예상 소화 시간 분석 중' : '첫 수유를 기록해 주세요'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card-bg border border-white/5 hover:border-primary/20 transition-all shadow-lg group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-2xl">scale</span>
                </div>
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Medical</span>
              </div>
              <p className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-widest">성장 지표 분석</p>
              <h4 className="text-xl font-black text-white">
                {realtimeData ? realtimeData.weight : '대기 중'}
              </h4>
              <p className="text-[11px] text-emerald-400 mt-2 font-bold">
                {realtimeData ? '표준 성장 곡선 내 위치' : `${profile.months}개월 표준 성장 곡선`}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="p-8 rounded-3xl bg-gradient-to-br from-card-bg to-[#1a2e2e] border border-primary/10 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-black text-white">부모 심리 보호막</h2>
              <span className="material-icons-round text-primary text-xl">verified_user</span>
            </div>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-white/5" cx="72" cy="72" fill="transparent" r="66" stroke="currentColor" strokeWidth="10"></circle>
                  <circle className="text-primary/20" cx="72" cy="72" fill="transparent" r="66" stroke="currentColor" strokeDasharray="414.6" strokeDashoffset="414.6" strokeLinecap="round" strokeWidth="10"></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-700 tracking-tighter">--</span>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">K-EPDS Score</span>
                </div>
              </div>
              <h4 className="font-black text-slate-500 text-sm tracking-tight">진단 데이터 없음</h4>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-medium">"{profile.parentName}님, 육아 중 느끼시는 정서적 변화를 정기적으로 체크해보세요."</p>
            </div>
            <button 
              onClick={() => setActiveAction('DIAGNOSIS')}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-black text-xs hover:bg-primary hover:text-background-dark hover:border-primary transition-all flex items-center justify-center gap-2"
            >
              심리 자가진단 실행
            </button>
          </section>

          <section className="p-8 rounded-3xl bg-primary/5 border border-primary/20 border-dashed">
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 shadow-inner">
                <span className="material-icons-round">psychology_alt</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">NURSLY.AI Insight</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {realtimeData ? realtimeData.status_message : `데이터 기록이 시작되면 ${profile.babyName}의 월령에 맞춘 정밀 분석 리포트가 이곳에 실시간으로 생성됩니다.`}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
