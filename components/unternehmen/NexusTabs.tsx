"use client";

import React, { useState } from 'react';

interface Stat {
  v: string;
  l: string;
}

interface NexusItem {
  tag: string;
  num: string;
  name: string;
  role: string;
  body: string;
  stats: Stat[];
}

interface NexusTabsProps {
  items: NexusItem[];
}

export default function NexusTabs({ items }: NexusTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!items || items.length === 0) return null;
  const activeNexus = items[activeIndex] || items[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.44fr] gap-8 items-start">
      {/* Tab Selectors */}
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-full p-6 text-left transition-all duration-200 min-h-[44px] cursor-pointer rounded-3xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                isActive
                  ? "bg-white border-blue-600 shadow-xl shadow-blue-900/5"
                  : "bg-transparent border-gray-200 hover:border-blue-200 hover:bg-white/40"
              }`}
              aria-selected={isActive}
              role="tab"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-outfit text-xs font-bold tracking-wider uppercase ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {item.tag}
                </span>
                <span
                  className={`font-outfit text-xs font-bold ${
                    isActive ? "text-blue-600" : "text-slate-300"
                  }`}
                >
                  {item.num}
                </span>
              </div>
              <div
                className={`font-outfit font-bold text-lg mt-1.5 ${
                  isActive ? "text-slate-900" : "text-slate-600"
                }`}
              >
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Details Panel */}
      <div className="border border-white/60 rounded-[2rem] p-8 md:p-11 bg-white/60 backdrop-blur-2xl shadow-xl shadow-blue-900/5 relative overflow-hidden">
        {/* Mesh decorative overlay */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[linear-gradient(rgba(228,228,231,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(228,228,231,0.6)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 [mask-image:radial-gradient(100%_100%_at_100%_0%,black,transparent)] pointer-events-none" />

        <div className="relative">
          <div className="font-outfit text-xs font-bold tracking-widest text-blue-600 uppercase">
            {activeNexus.role}
          </div>
          <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-slate-900 mt-2 tracking-tight">
            {activeNexus.name}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 mt-5 max-w-xl">
            {activeNexus.body}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
            {activeNexus.stats.map((st, sidx) => (
              <div key={sidx} className="pr-4 border-r border-slate-100 last:border-r-0">
                <div className="font-outfit font-extrabold text-lg md:text-xl text-blue-600 tracking-tight">
                  {st.v}
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-normal font-medium">
                  {st.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
