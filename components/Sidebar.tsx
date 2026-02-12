
import React from 'react';
import { ViewType, UserProfile } from '../types.ts';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  profile: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, profile }) => {
  const navItems = [
    { id: 'dashboard' as ViewType, label: '대시보드', icon: 'dashboard' },
    { id: 'growth' as ViewType, label: '정밀 발달 분석', icon: 'insights' },
    { id: 'nutrition' as ViewType, label: '영양/이유식 가이드', icon: 'restaurant' },
    { id: 'mind-care' as ViewType, label: '부모 심리 보호막', icon: 'favorite' },
    { id: 'vaccines' as ViewType, label: '정부 정책/백신', icon: 'gavel' },
  ];

  return (
    <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col fixed h-full bg-background-dark z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-icons-round text-background-dark">analytics</span>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tighter text-white uppercase">NURSLY.AI</span>
          <span className="text-[8px] font-bold text-primary uppercase tracking-widest leading-none">Precision Parenting</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
              currentView === item.id
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner'
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <span className="material-icons-round text-[20px]">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs border border-primary/30">
            {profile.parentName[0]}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-slate-200">{profile.parentName} 님</p>
            <p className="text-[9px] text-primary font-black uppercase tracking-tighter">{profile.babyName}'s Caretaker</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
