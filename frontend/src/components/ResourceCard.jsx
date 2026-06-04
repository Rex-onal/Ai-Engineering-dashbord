import React from 'react';
import { Play, BookOpen, FileText, ExternalLink, Clock, Monitor } from 'lucide-react';

export default function ResourceCard({ resource, status, onStatusChange }) {
  const { id, topic, resource_name, platform, type, url, cost, duration_estimate } = resource;

  // Icon selector based on resource type
  const getResourceIcon = () => {
    switch (type.toLowerCase()) {
      case 'youtube':
        return <Play className="w-5 h-5 text-red-500" />;
      case 'course':
        return <BookOpen className="w-5 h-5 text-primary" />;
      case 'text/web':
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  // Status color styles for select/borders
  const getStatusStyles = () => {
    switch (status) {
      case 'Done':
        return {
          cardBorder: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/20',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'In Progress':
        return {
          cardBorder: 'border-amber-200 hover:border-amber-400 bg-amber-50/10',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'Not Started':
      default:
        return {
          cardBorder: 'border-[#E2E8F0] hover:border-primary/30 bg-white',
          badge: 'bg-slate-100 text-slate-600 border-slate-200',
        };
    }
  };

  const statusStyles = getStatusStyles();
  const isFree = cost.toLowerCase() === 'free';

  return (
    <div
      className={`border rounded-lg p-5 flex flex-col justify-between transition-all duration-300 ${statusStyles.cardBorder} hover:shadow-[0_4px_12px_rgba(37,99,235,0.06)]`}
    >
      <div>
        {/* Card Header Info */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider truncate max-w-[70%]">
            {topic}
          </span>
          <div className="flex gap-1.5 shrink-0">
            {/* Cost Badge */}
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${
                isFree
                  ? 'bg-accent text-primary border-blue-200'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {cost}
            </span>
          </div>
        </div>

        {/* Title and Icon */}
        <h4 className="text-base font-bold font-sans text-navy mb-3 line-clamp-2 leading-snug flex gap-2 items-start">
          <span className="mt-1 shrink-0">{getResourceIcon()}</span>
          <span>{resource_name}</span>
        </h4>

        {/* Platform, Duration & Type details */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-xs font-medium font-sans text-slate-500">
          <div className="flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{platform}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{duration_estimate}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-4 border-t border-slate-100">
        {/* Status segmented control and launch CTA */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
              Study Status
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200">
              {['Not Started', 'In Progress', 'Done'].map((s) => {
                const isSelected = status === s;
                let activeColor = 'bg-white text-slate-700 shadow-sm border-slate-300';
                if (isSelected) {
                  if (s === 'Done') activeColor = 'bg-emerald-500 text-white shadow-sm border-emerald-600';
                  if (s === 'In Progress') activeColor = 'bg-amber-500 text-white shadow-sm border-amber-600';
                  if (s === 'Not Started') activeColor = 'bg-slate-500 text-white shadow-sm border-slate-600';
                }

                return (
                  <button
                    key={s}
                    onClick={() => onStatusChange(id, s)}
                    className={`text-[10px] md:text-xs font-sans font-bold py-1.5 px-1 rounded transition-all duration-150 border border-transparent ${
                      isSelected
                        ? activeColor
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded font-sans font-bold text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span>Watch / Start</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
