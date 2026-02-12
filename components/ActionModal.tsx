
import React, { useState } from 'react';
import { ActionType, UserProfile, DashboardData } from '../types.ts';
import { getRecordAnalysis } from '../services/gemini.ts';

interface ActionModalProps {
  type: ActionType;
  onClose: () => void;
  profile: UserProfile;
  onDataUpdate?: (data: DashboardData) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ type, onClose, profile, onDataUpdate }) => {
  const [diagnosisStep, setDiagnosisStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordForm, setRecordForm] = useState({
    feedingType: '분유',
    feedingAmount: '',
    sleepTime: '',
    weight: '',
    notes: ''
  });

  if (!type) return null;

  const kepdsQuestions = [
    "최근 즐거운 일을 기대하셨나요?",
    "불필요하게 자신을 비난하셨나요?",
    "이유 없이 불안하거나 걱정되었나요?",
    "당황하거나 겁을 먹은 적이 있나요?",
    "너무 슬퍼서 울고 싶을 때가 있었나요?",
    "일이 잘못될 때 자신을 탓하셨나요?",
    "기분이 너무 안 좋아서 잠들기 힘들었나요?",
    "슬프거나 비참한 기분이 드셨나요?",
    "너무 불행해서 울었나요?",
    "자신을 해치고 싶다는 생각이 들었나요?"
  ];

  const handleRecordSubmit = async () => {
    setIsSubmitting(true);
    try {
      const resultText = await getRecordAnalysis(profile.months, recordForm);
      
      // JSON 추출 시도
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0]);
        if (jsonData.update_dashboard && onDataUpdate) {
          onDataUpdate(jsonData.data);
        }
      }
      onClose();
    } catch (error) {
      console.error("Analysis failed", error);
      alert("데이터 분석 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    if (diagnosisStep < kepdsQuestions.length - 1) {
      setDiagnosisStep(diagnosisStep + 1);
    } else {
      alert("진단이 완료되었습니다. NURSLY.AI 엔진이 분석을 시작합니다.");
      onClose();
      setDiagnosisStep(0);
      setAnswers([]);
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'RECORD':
        return (
          <div className="space-y-6">
            <header>
              <h3 className="text-xl font-black text-white">{profile.babyName} 정밀 기록</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">NURSLY.AI Precision Input Schema</p>
            </header>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">수유 종류 및 양 (ml)</label>
                <div className="flex gap-2">
                  <select 
                    value={recordForm.feedingType}
                    onChange={(e) => setRecordForm({...recordForm, feedingType: e.target.value})}
                    className="bg-background-dark border border-white/10 p-3 rounded-xl text-xs outline-none"
                  >
                    <option>분유</option>
                    <option>모유</option>
                    <option>이유식</option>
                  </select>
                  <input 
                    type="number" 
                    value={recordForm.feedingAmount}
                    onChange={(e) => setRecordForm({...recordForm, feedingAmount: e.target.value})}
                    className="flex-1 bg-background-dark border border-white/10 p-3 rounded-xl outline-none text-sm" 
                    placeholder="양을 입력하세요" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">수면 시간 (Hour)</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    value={recordForm.sleepTime}
                    onChange={(e) => setRecordForm({...recordForm, sleepTime: e.target.value})}
                    className="w-full bg-background-dark border border-white/10 p-3 rounded-xl outline-none text-sm" 
                    placeholder="0.0" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">몸무게 (kg)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={recordForm.weight}
                    onChange={(e) => setRecordForm({...recordForm, weight: e.target.value})}
                    className="w-full bg-background-dark border border-white/10 p-3 rounded-xl outline-none text-sm" 
                    placeholder="0.0" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">관찰 특이사항</label>
                <textarea 
                  value={recordForm.notes}
                  onChange={(e) => setRecordForm({...recordForm, notes: e.target.value})}
                  className="w-full bg-background-dark border border-white/10 p-3 rounded-xl outline-none text-xs h-20 resize-none" 
                  placeholder="대변 상태, 컨디션 등을 입력하십시오."
                ></textarea>
              </div>
            </div>
            <button 
              onClick={handleRecordSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl shadow-xl shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-icons-round animate-spin text-sm">refresh</span>
                  분석 및 정규화 중...
                </>
              ) : '데이터 동기화 및 저장'}
            </button>
          </div>
        );
      case 'DIAGNOSIS':
        return (
          <div className="space-y-8 py-4">
            <header className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-black text-white">마음 자가진단 (K-EPDS)</h3>
                <p className="text-[10px] text-lavender font-bold uppercase tracking-widest mt-1">Sequential Assessment</p>
              </div>
              <span className="text-[10px] font-black text-slate-500">{diagnosisStep + 1} / {kepdsQuestions.length}</span>
            </header>
            
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-lavender transition-all duration-500" 
                style={{ width: `${((diagnosisStep + 1) / kepdsQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <p className="text-lg font-bold text-slate-200 leading-tight">
                {kepdsQuestions[diagnosisStep]}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: "전혀 그렇지 않다", val: 0 },
                  { label: "가끔 그렇다", val: 1 },
                  { label: "자주 그렇다", val: 2 },
                  { label: "매우 자주 그렇다", val: 3 }
                ].map((opt) => (
                  <button 
                    key={opt.val} 
                    onClick={() => handleAnswer(opt.val)}
                    className="w-full p-4 text-left text-xs border border-white/5 rounded-2xl bg-white/5 hover:bg-lavender/20 hover:border-lavender/40 transition-all font-medium text-slate-400 hover:text-white"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'GUIDE_COMPLETE':
        return (
          <div className="text-center space-y-4 py-6">
             <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <span className="material-icons-round text-3xl">check_circle</span>
             </div>
             <h3 className="text-xl font-black text-white">과업 완료 기록 성공</h3>
             <p className="text-sm text-slate-400">"{profile.babyName}의 {profile.months}개월 가이드" 수행이 데이터베이스에 반영되었습니다.</p>
             <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 text-left">
               <p className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">Next Recommendation</p>
               <p className="text-xs text-slate-300">월령 기반 다음 발달 지표 분석 대기 중</p>
             </div>
             <button onClick={onClose} className="w-full bg-white text-background-dark font-black py-4 rounded-2xl mt-4">대시보드로 복귀</button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-background-dark/80">
      <div className="max-w-md w-full bg-card-bg border border-white/10 rounded-3xl p-8 shadow-2xl relative animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <span className="material-icons-round">close</span>
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default ActionModal;
