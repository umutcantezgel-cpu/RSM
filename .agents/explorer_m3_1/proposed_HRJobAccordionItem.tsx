"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

interface JobItem {
  role: string;
  area: string;
  loc: string;
  body: string;
  tags: string[];
}

interface HRJobAccordionItemProps {
  job: JobItem;
  num: string;
}

export default function HRJobAccordionItem({ job, num }: HRJobAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-blue-200 bg-white shadow-xl shadow-blue-900/5'
          : 'border-slate-200/60 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-blue-900/5'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 p-6 md:p-8 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
      >
        <span className="font-outfit font-extrabold text-sm text-blue-600/80 w-8 shrink-0">
          {num}
        </span>
        <span className="flex-1 min-w-0">
          <span className="font-outfit font-bold text-lg md:text-xl text-slate-900 leading-snug block truncate">
            {job.role}
          </span>
          <span className="text-xs md:text-sm text-slate-500 mt-1 block">
            {job.area} · {job.loc}
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8 pl-14 md:pl-22">
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                {job.body}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {job.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 font-outfit font-semibold text-[10px] md:text-xs tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
