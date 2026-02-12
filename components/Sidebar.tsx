
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard' as ViewType, label: '대시보드', icon: 'dashboard' },
    { id: 'growth' as ViewType, label: '발달 추적', icon: 'insights' },
    { id: 'nutrition' as ViewType, label: '이유식/영양', icon: 'restaurant' },
    { id: 'mind-care' as ViewType, label: '마음 케어', icon: 'favorite' },
    { id: 'vaccines' as ViewType, label: '정책/백신', icon: 'gavel' },
  ];

  return (
    <aside className="hidden lg:flex w-64 border-r border-primary/10 flex-col fixed h-full bg-background-dark z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-icons-round text-background-dark">child_care</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-primary">P101 AI</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-slate-400 hover:bg-primary/5 hover:text-primary'
            }`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-primary/10">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
          <img
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
            src="https://picsum.photos/id/64/100/100"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">김서진 님</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">프리미엄 멤버</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
