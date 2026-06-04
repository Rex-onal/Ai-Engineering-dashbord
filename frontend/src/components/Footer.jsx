import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-neutralBorder py-8 mt-16 px-6 text-center z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm font-sans font-medium text-slate-500">
        <p>
          Personal AI Engineering Roadmap — June 2026 to Late 2027
        </p>
        <p className="font-mono text-[10px] text-slate-400">
          Designed for High-Performance Dev Environments
        </p>
      </div>
    </footer>
  );
}
