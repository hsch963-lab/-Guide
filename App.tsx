
import React, { useState, useEffect } from 'react';
import { ViewType, UserProfile } from './types.ts';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import GrowthTracker from './components/GrowthTracker.tsx';
import MindCare from './components/MindCare.tsx';
import Nutrition from './components/Nutrition.tsx';
import Onboarding from './components/Onboarding.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 로컬 스토리지에서 프로필 로드
  useEffect(() => {
    const saved = localStorage.getItem('re-me-profile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Profile load failed", e);
      }
    }
  }, []);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('re-me-profile', JSON.stringify(profile));
  };

  if (!userProfile) {
    return <Onboarding onComplete={handleProfileSubmit} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard profile={userProfile} />;
      case 'growth':
        return <GrowthTracker profile={userProfile} />;
      case 'mind-care':
        return <MindCare profile={userProfile} />;
      case 'nutrition':
        return <Nutrition profile={userProfile} />;
      case 'vaccines':
        return <div className="p-8"><h2 className="text-2xl font-bold">백신 및 정책 페이지 준비 중</h2></div>;
      default:
        return <Dashboard profile={userProfile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} profile={userProfile} />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 overflow-y-auto min-h-screen custom-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
