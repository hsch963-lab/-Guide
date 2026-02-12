
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">좋은 아침입니다, 서진님</h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <span className="text-primary font-semibold">리암:</span> 생후 6개월 12일
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">도약기 5: 관계의 세계</span>
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="w-12 h-12 rounded-xl bg-card-bg border border-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
            <span className="material-icons-round">notifications</span>
          </button>
          <button className="flex-1 md:flex-none px-6 h-12 rounded-xl bg-primary text-background-dark font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <span className="material-icons-round">add</span>
            간편 기록
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hero Section */}
        <div className="lg:col-span-8 space-y-8">
          <section className="relative overflow-hidden rounded-2xl bg-card-bg border border-primary/20 hero-glow">
            <div className="absolute top-0 right-0 p-4 z-10">
              <span className="bg-primary/20 text-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-primary/30 flex items-center gap-1">
                <span className="material-icons-round text-xs">auto_awesome</span> AI 맞춤 추천
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-800">
                <img
                  alt="Nutrition"
                  className="w-full h-full object-cover"
                  src="https://picsum.photos/400/400?random=1"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">오늘의 핵심 과업</h2>
                <h3 className="text-2xl font-bold mb-3">6개월 철분 섭취: 소고기 미음 시작하기</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  리암의 체내 철분 저장량이 소진되는 시기입니다. AI 분석 결과, 인지 발달을 위해 오늘부터 소고기 1티스푼을 섞어 급여하는 것을 권장합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <button className="bg-primary/10 border border-primary/40 text-primary px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-background-dark transition-all">
                    완료로 표시
                  </button>
                  <button className="px-6 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-all">
                    가이드 보기
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Records Summary */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">육아 기록 요약</h2>
              <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded animate-pulse-slow">실시간 동기화 중</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-card-bg border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500/30">
                    <span className="material-icons-round">bedtime</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="material-icons-round text-xs">verified_user</span> 안심 모드
                  </span>
                </div>
                <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-wider">마지막 수면</p>
                <h4 className="text-2xl font-bold mb-1">2시간 14분</h4>
                <p className="text-xs text-slate-400 italic">자세: 똑바로 누움 (배위)</p>
              </div>

              <div className="p-5 rounded-xl bg-card-bg border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:bg-orange-500/30">
                    <span className="material-icons-round">opacity</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">2시간 전</span>
                </div>
                <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-wider">수유량</p>
                <h4 className="text-2xl font-bold mb-1">150ml</h4>
                <p className="text-xs text-slate-400 italic">다음 예상: 12:45 (AI)</p>
              </div>

              <div className="p-5 rounded-xl bg-card-bg border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary/30">
                    <span className="material-icons-round">straighten</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary">75th</span>
                </div>
                <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-wider">현재 체중</p>
                <h4 className="text-2xl font-bold mb-1">7.8 kg</h4>
                <p className="text-xs text-slate-400 italic">+0.4kg 증량</p>
              </div>
            </div>
          </section>

          {/* Vaccine/Policy */}
          <section className="p-6 rounded-2xl bg-card-bg border border-white/5">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-icons-round text-primary">event_note</span>
              예방접종 및 정책 일정
            </h2>
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background-dark border-4 border-primary/40 flex items-center justify-center z-10">
                  <span className="material-icons-round text-primary text-sm">vaccines</span>
                </div>
                <div className="flex justify-between items-start bg-white/5 p-4 rounded-xl border border-white/5">
                  <div>
                    <h4 className="font-bold text-sm">6가 혼합백신 2차 추가 접종</h4>
                    <p className="text-xs text-slate-500 mt-1">예정일: 2025년 2월 12일</p>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-1 rounded">D-14</span>
                </div>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background-dark border-4 border-slate-700 flex items-center justify-center z-10">
                  <span className="material-icons-round text-slate-500 text-sm">payments</span>
                </div>
                <div className="flex justify-between items-start bg-white/5 p-4 rounded-xl border border-white/5 opacity-80">
                  <div>
                    <h4 className="font-bold text-sm">부모급여 인상 알림</h4>
                    <p className="text-xs text-slate-500 mt-1">1분기 지급액 조정 확인 필요</p>
                  </div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded">NEW</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
          {/* Mind Care Widget */}
          <section className="p-6 rounded-2xl bg-gradient-to-br from-card-bg to-[#162a2a] border border-primary/20 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">부모 마음 케어</h2>
              <span className="material-icons-round text-primary">shield</span>
            </div>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-800" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="315" strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center pt-2">
                  <span className="text-3xl font-bold">4/30</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">K-EPDS</span>
                </div>
              </div>
              <h4 className="font-bold text-emerald-400">저위험군 상태</h4>
              <p className="text-xs text-slate-400 px-4 mt-2 leading-relaxed">정말 잘하고 계시네요, 서진님. 현재의 밸런스를 잘 유지하고 있습니다.</p>
            </div>
            <button className="w-full py-3 rounded-xl bg-primary text-background-dark font-bold hover:shadow-[0_0_15px_rgba(25,229,230,0.3)] transition-all flex items-center justify-center gap-2">
              <span className="material-icons-round text-sm">psychology</span>
              마음 자가진단
            </button>
          </section>

          {/* Community Snippet */}
          <section className="p-6 rounded-2xl bg-card-bg border border-white/5">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">이웃 커뮤니티</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="https://picsum.photos/id/65/50/50" className="w-8 h-8 rounded-full bg-slate-700" alt="Avatar" />
                <div className="flex-1">
                  <p className="text-xs font-semibold">마야 (에이든 엄마)</p>
                  <p className="text-[10px] text-primary">약 800m 거리</p>
                </div>
                <span className="material-icons-round text-slate-500 text-sm">chat_bubble_outline</span>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-[10px] text-slate-300 italic">"혹시 도약기 5 수면 퇴행 겪고 계신 분 있나요?"</p>
              </div>
            </div>
          </section>

          {/* Tip Box */}
          <section className="p-6 rounded-2xl bg-primary/10 border border-primary/20 border-dashed">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-icons-round">lightbulb</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary">알고 계셨나요?</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  리암의 최근 데이터를 보면 옆으로 구르기를 시도하고 있습니다. 오늘은 바닥 놀이 공간을 15분 정도 더 확보해주세요.
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
