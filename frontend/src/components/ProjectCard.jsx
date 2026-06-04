import React from 'react';
import { Code, Rocket } from 'lucide-react';

export default function ProjectCard({ title, description }) {
  return (
    <div className="bg-primary text-white border border-blue-600 rounded-lg p-6 md:p-8 mt-8 shadow-md relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
        <Code className="w-48 h-48" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5" />
            Phase Portfolio Project
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-blue-100 font-sans leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
