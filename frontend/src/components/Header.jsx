import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutralBorder z-50 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent rounded-md text-primary">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold font-sans text-navy tracking-tight leading-tight">
            AI Engineer Roadmap
          </h1>
          <p className="text-xs md:text-sm font-sans text-slate-500 font-medium">
            Personal Learning Dashboard — June 2026 to Late 2027
          </p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
          Active Roadmap
        </span>
      </div>
    </header>
  );
}
