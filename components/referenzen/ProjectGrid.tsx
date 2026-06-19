"use client";

import React, { useState } from 'react';
import { MediaSlot } from '@/components/ui/MediaSlot';

interface ProjectItem {
  name: string;
  cat: string;
  meta: string;
  kpi: string;
  body: string;
}

interface ProjectGridProps {
  filters: string[];
  projects: ProjectItem[];
}

export default function ProjectGrid({ filters, projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0] || "Alle");

  // Filter project items
  const visibleProjects = projects.filter(
    (project) => activeFilter === (filters[0] || "Alle") || project.cat === activeFilter
  );

  return (
    <div>
      {/* Category Filters Chips */}
      <div className="flex flex-wrap gap-2.5 pb-8 border-b border-slate-200 mb-8">
        {filters.map((filter, idx) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full font-outfit text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10"
          >
            {/* Image Placeholder with Category Badge */}
            <div className="relative aspect-[4/2.7] w-full overflow-hidden">
              <MediaSlot
                label={project.name}
                className="w-full h-full rounded-none"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-[10px] font-bold tracking-wider text-blue-600 uppercase shadow-sm">
                {project.cat}
              </span>
            </div>

            {/* Content Details */}
            <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                  {project.kpi}
                </div>
                <h3 className="font-outfit font-bold text-xl text-slate-900 mt-1.5 tracking-tight">
                  {project.name}
                </h3>
                <div className="text-xs font-medium text-slate-400 mt-1">
                  {project.meta}
                </div>
                <p className="text-sm leading-relaxed text-slate-600 mt-4">
                  {project.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
