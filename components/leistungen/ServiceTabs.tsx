"use client";

import React, { useState } from 'react';
import { Building2, LayoutGrid, Flame, Hammer, Check } from 'lucide-react';
import { MediaSlot } from '@/components/ui/MediaSlot';

interface ServiceItem {
  name: string;
  short: string;
  lead: string;
  body: string;
  points: string[];
}

interface ServiceTabsProps {
  services: ServiceItem[];
}

const icons = [Building2, LayoutGrid, Flame, Hammer];

export default function ServiceTabs({ services }: ServiceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!services || services.length === 0) return null;
  const activeService = services[activeIndex] || services[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.56fr] gap-8 items-start">
      {/* Service Selector Buttons */}
      <div className="flex flex-col gap-3">
        {services.map((service, idx) => {
          const isActive = idx === activeIndex;
          const IconComponent = icons[idx % icons.length];

          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-200 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                isActive
                  ? "bg-white border-blue-600 shadow-xl shadow-blue-900/5"
                  : "bg-transparent border-gray-200 hover:border-blue-200 hover:bg-white/40"
              }`}
              aria-selected={isActive}
              role="tab"
            >
              <span
                className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200 ${
                  isActive ? "bg-slate-900 text-white" : "bg-gray-100 text-slate-600"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </span>
              <span className="flex-1">
                <span
                  className={`block font-outfit font-bold text-base ${
                    isActive ? "text-slate-900" : "text-slate-600"
                  }`}
                >
                  {service.name}
                </span>
                <span
                  className={`block text-xs font-semibold tracking-wider mt-0.5 ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {service.short}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Details Container */}
      <div className="border border-white/60 rounded-[2rem] p-8 md:p-11 bg-white/60 backdrop-blur-2xl shadow-xl shadow-blue-900/5 grid grid-cols-1 md:grid-cols-[1.35fr_0.65fr] gap-8 items-start min-h-[430px]">
        <div>
          <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
            {activeService.name}
          </h2>
          <p className="text-base md:text-lg font-medium text-blue-600 mt-3.5 leading-relaxed">
            {activeService.lead}
          </p>
          <p className="text-sm md:text-base leading-relaxed text-slate-600 mt-5">
            {activeService.body}
          </p>

          <div className="flex flex-col gap-3 mt-6">
            {activeService.points.map((p, pidx) => (
              <div key={pidx} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-[22px] h-[22px] rounded-md bg-slate-900 text-white mt-0.5 flex-shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-slate-700 leading-normal">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MediaSlot box */}
        <div className="w-full h-full min-h-[200px] md:min-h-0 aspect-[3/4]">
          <MediaSlot
            label={activeService.name}
            className="w-full h-full min-h-[220px]"
          />
        </div>
      </div>
    </div>
  );
}
