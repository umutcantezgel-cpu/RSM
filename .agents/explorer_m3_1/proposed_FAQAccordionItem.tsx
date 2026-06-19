"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionItemProps {
  faq: FAQItem;
}

export default function FAQAccordionItem({ faq }: FAQAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`border rounded-3xl overflow-hidden bg-white/60 backdrop-blur-2xl transition-all duration-300 ${
        isOpen
          ? 'border-blue-200 shadow-xl shadow-blue-900/5'
          : 'border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 p-6 md:p-8 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
      >
        <span className="font-outfit font-bold text-base md:text-lg text-slate-900 leading-snug">
          {faq.q}
        </span>
        <Plus
          className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          strokeWidth={2.4}
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
            <div className="px-6 pb-6 md:px-8 md:pb-8 text-sm md:text-base leading-relaxed text-slate-600 pl-6 md:pl-8">
              <p>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
