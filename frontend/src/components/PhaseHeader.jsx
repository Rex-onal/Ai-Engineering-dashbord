import React from 'react';
import { Calendar, Target, Award } from 'lucide-react';

export default function PhaseHeader({ title, duration, goal, progress, completedCount, totalCount }) {
  return (
    <div className="bg-white border border-neutralBorder rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-sans text-navy">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500 font-medium font-sans">
            <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded text-slate-700">
              <Calendar className="w-4 h-4 text-slate-500" />
              {duration}
            </span>
            <span className="flex items-center gap-1.5 text-primary">
              <Target className="w-4 h-4" />
              Goal Oriented
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase block tracking-wider mb-1">
            Completion Progress
          </span>
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="text-2xl font-extrabold text-primary leading-none">
              {Math.round(progress)}%
            </span>
            <span className="text-xs font-semibold text-slate-500 font-sans">
              ({completedCount} of {totalCount} Completed)
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          Primary Objective
        </h3>
        <p className="text-sm md:text-base font-sans text-navy font-semibold bg-accent/30 border border-accent/40 rounded px-4 py-2.5">
          {goal}
        </p>
      </div>

      {/* Progress Bar container */}
      <div className="w-full">
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
