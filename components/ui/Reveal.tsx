"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  const shouldReduceMotion = isMounted ? !!prefersReducedMotion : false;

  // Convert delay to seconds if in milliseconds (> 10)
  const delayInSeconds = delay > 10 ? delay / 1000 : delay;

  const offset = 22;

  const variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion || direction === 'none' ? 0 : (direction === 'left' ? offset : direction === 'right' ? -offset : 0),
      y: shouldReduceMotion || direction === 'none' ? 0 : (direction === 'up' ? offset : direction === 'down' ? -offset : 0),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: shouldReduceMotion ? ('tween' as const) : ('spring' as const),
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: delayInSeconds,
        ease: (shouldReduceMotion ? 'easeOut' : [0.16, 1, 0.3, 1]) as 'easeOut' | [number, number, number, number],
        stiffness: shouldReduceMotion ? undefined : 100,
        damping: shouldReduceMotion ? undefined : 20,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
