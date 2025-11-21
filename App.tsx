import React, { useState } from 'react';
import Header from './components/Header';
import CupDisplay from './components/CupDisplay';
import { COFFEE_MENU, APP_TITLE } from './constants';
import { MoodType, BrewResult } from './types';
import { brewWarmth } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentBrew, setCurrentBrew] = useState<BrewResult | null>(null);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleOrder = async (mood: MoodType) => {
    if (loading) return;
    
    setSelectedMood(mood);
    setLoading(true);
    setCurrentBrew(null); // Clear previous while brewing

    // Simulate a bit of "brewing" time if API is too fast, for effect
    const minWait = new Promise(resolve => setTimeout(resolve, 1500));
    const brewPromise = brewWarmth(mood);

    const [_, result] = await Promise.all([minWait, brewPromise]);
    
    setCurrentBrew(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f2f0eb] flex flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 lg:p-8 gap-8">
        
        {/* Left Column: Menu / Ordering */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-sb-dark font-serif-sc tracking-tight">
              不仅是一杯咖啡 <br/>
              <span className="text-sb-green">更是一份温暖心意</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              在这个快节奏的世界里，我们想为<span className="font-bold text-sb-dark">谦老师</span>萃取一份专属的鼓励。请选择今日的特调心情，让我们开始制作。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COFFEE_MENU.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOrder(option.id)}
                disabled={loading}
                className={`
                  relative p-4 rounded-xl text-left border-2 transition-all duration-300 group overflow-hidden
                  ${selectedMood === option.id && loading 
                    ? 'border-sb-green bg-sb-light shadow-inner ring-2 ring-sb-green ring-opacity-50' 
                    : 'border-white bg-white hover:border-sb-light hover:shadow-lg hover:-translate-y-1'
                  }
                `}
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <span className="text-2xl mb-2 block">{option.icon}</span>
                    <h3 className="font-bold text-sb-dark text-lg group-hover:text-sb-green transition-colors">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {option.description}
                    </p>
                  </div>
                  {selectedMood === option.id && loading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sb-green"></div>
                  )}
                </div>
                {/* Decorative background circle */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-sb-light rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </button>
            ))}
          </div>

          <div className="hidden lg:block pt-8 border-t border-gray-300">
             <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
               由不知名先生驱动的ai心情咖啡师
             </p>
          </div>
        </div>

        {/* Right Column: Display Area */}
        <div className="w-full lg:w-1/2 bg-sb-green bg-opacity-5 rounded-[2rem] p-6 md:p-12 flex items-center justify-center relative overflow-hidden min-h-[500px]">
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sb-green opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#cba258] opacity-5 rounded-full blur-2xl -ml-12 -mb-12"></div>

          {!currentBrew && !loading && (
             <div className="text-center opacity-40">
                <div className="w-24 h-24 mx-auto border-4 border-sb-dark rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">☕️</span>
                </div>
                <p className="text-sb-dark font-serif-sc text-lg">请在左侧点单...</p>
             </div>
          )}

          {(currentBrew || loading) && (
            <CupDisplay data={currentBrew} loading={loading} />
          )}

        </div>
      </main>
      
      {/* Mobile Footer */}
      <footer className="lg:hidden p-6 text-center text-xs text-gray-400">
         Made specifically for Qian Laoshi
      </footer>
    </div>
  );
};

export default App;