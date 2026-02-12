
import React, { useState } from 'react';
import { UserProfile } from '../types.ts';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [form, setForm] = useState({
    parentName: '',
    babyName: '',
    babyBirthday: ''
  });

  const calculateMonths = (birthday: string) => {
    const birth = new Date(birthday);
    const now = new Date();
    const diff = now.getTime() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.parentName || !form.babyName || !form.babyBirthday) return;
    
    const months = calculateMonths(form.babyBirthday);
    onComplete({
      ...form,
      months
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark p-6">
      <div className="max-w-md w-full space-y-8 animate-in zoom-in-95 duration-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/20">
            <span className="material-icons-round text-background-dark text-3xl">analytics</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2">RE-ME 입장을 환영합니다</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            30년 경력의 전문가 식견으로 구성된 정밀 육아 엔진이<br/>부모님과 아이의 고유한 서사를 분석하겠습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">부모님 성함</label>
              <input
                required
                type="text"
                placeholder="성함을 입력하세요"
                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                value={form.parentName}
                onChange={e => setForm({...form, parentName: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">아이 이름 (태명)</label>
              <input
                required
                type="text"
                placeholder="아이의 이름을 입력하세요"
                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                value={form.babyName}
                onChange={e => setForm({...form, babyName: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">아이 생년월일</label>
              <input
                required
                type="date"
                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                value={form.babyBirthday}
                onChange={e => setForm({...form, babyBirthday: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/10"
          >
            정밀 분석 엔진 시작하기
          </button>
        </form>
        
        <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Medical Grade Security • Professional Guidance
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
