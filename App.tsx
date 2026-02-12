
import React, { useState } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GrowthTracker from './components/GrowthTracker';
import MindCare from './components/MindCare';
import Nutrition from './components/Nutrition';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'growth':
        return <GrowthTracker />;
      case 'mind-care':
        return <MindCare />;
      case 'nutrition':
        return <Nutrition />;
      case 'vaccines':
        return <div className="p-8"><h2 className="text-2xl font-bold">백신 및 정책 페이지 준비 중</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 overflow-y-auto min-h-screen custom-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
