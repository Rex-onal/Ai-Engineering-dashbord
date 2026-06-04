import React from 'react';

export default function NavigationTabs({ tabs, activeTab, onTabChange, phaseProgress }) {
  return (
    <div className="w-full border-b border-neutralBorder bg-white py-2 mb-6">
      <div className="flex overflow-x-auto gap-2 md:gap-4 no-scrollbar px-1 py-1">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeTab;
          const progress = phaseProgress[idx] || 0;
          return (
            <button
              key={idx}
              onClick={() => onTabChange(idx)}
              className={`flex-none md:flex-1 flex items-center justify-between gap-3 px-4 py-3 rounded-md border text-sm font-sans font-semibold tracking-wide transition-all duration-200 shadow-sm focus:outline-none ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-primary/10'
                  : 'bg-white text-primary border-neutralBorder hover:bg-slate-50 hover:border-primary/30'
              }`}
            >
              <span className="truncate">{tab}</span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-accent text-primary'
                }`}
              >
                {Math.round(progress)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
