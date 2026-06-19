'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from './Globe';

/**
 * IntroAnimation – fullscreen splash with a spinning globe.
 * 
 * Timeline:
 *   Phase 1 (0–1200ms):  Globe spins centered, brand text fades in
 *   Phase 2 (1200–2200ms): Globe accelerates spin, curves in a loop,
 *                           then rushes TOWARD the viewer (scale up huge)
 *   Phase 3 (2200–2800ms): Globe "passes through" the screen, overlay fades
 */
export function IntroAnimation() {
  const [show, setShow] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<'spin' | 'curve' | 'rush' | 'fadeout' | 'done'>('spin');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('rsm-intro-seen');
    if (seen) {
      setShow(false);
    } else {
      setShow(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const t1 = setTimeout(() => setPhase('curve'), 1200);
    const t2 = setTimeout(() => setPhase('rush'), 2000);
    const t3 = setTimeout(() => setPhase('fadeout'), 2600);
    const t4 = setTimeout(() => {
      setPhase('done');
      setShow(false);
      sessionStorage.setItem('rsm-intro-seen', '1');
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleSkip = useCallback(() => {
    setPhase('done');
    setShow(false);
    sessionStorage.setItem('rsm-intro-seen', '1');
    document.body.style.overflow = '';
  }, []);

  if (show === null || show === false) return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)',
            perspective: '1200px',
          }}
        >
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} 
          />

          {/* Radial glow */}
          <motion.div
            className="absolute pointer-events-none"
            animate={{
              opacity: phase === 'spin' ? 0.3 : phase === 'curve' ? 0.5 : 0,
              scale: phase === 'rush' ? 3 : phase === 'curve' ? 1.3 : 1,
            }}
            transition={{ duration: 0.8 }}
            style={{
              width: 700,
              height: 700,
              background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
            }}
          />

          {/* Globe with physics-based flyaway:
              spin → curve outward → rush toward viewer → past screen */}
          <motion.div
            className="relative"
            style={{ 
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
            }}
            animate={
              phase === 'spin'
                ? { 
                    scale: 1, 
                    x: 0, 
                    y: 0, 
                    rotateZ: 0,
                    z: 0,
                    opacity: 1,
                  }
                : phase === 'curve'
                ? { 
                    // Globe moves in a small arc upward-right while spinning
                    scale: 0.7, 
                    x: '15vw', 
                    y: '-12vh', 
                    rotateZ: 45,
                    z: -200,
                    opacity: 1,
                  }
                : phase === 'rush'
                ? { 
                    // Globe RUSHES toward the viewer — scale up dramatically
                    scale: 8, 
                    x: '-5vw', 
                    y: '5vh', 
                    rotateZ: -15,
                    z: 800,
                    opacity: 0,
                  }
                : { 
                    scale: 12, 
                    x: 0, 
                    y: 0, 
                    rotateZ: 0,
                    z: 1200,
                    opacity: 0,
                  }
            }
            transition={
              phase === 'curve'
                ? {
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1], // overshoot easing for arc feel
                    opacity: { duration: 0.3 },
                  }
                : phase === 'rush'
                ? {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // aggressive ease-out
                    opacity: { duration: 0.5, ease: 'easeIn' },
                  }
                : { duration: 0.3 }
            }
          >
            <Globe
              size={380}
              color="#3b82f6"
              interactive={false}
              whirl={true}
              markers={[
                { lat: 50.11, lon: 8.68, title: 'frankfurt', label: 'Frankfurt a.M.' },
                { lat: 48.14, lon: 11.58, title: 'muenchen', label: 'München' },
                { lat: 52.52, lon: 13.41, title: 'berlin', label: 'Berlin' },
                { lat: 25.2, lon: 55.27, title: 'dubai', label: 'Dubai' },
              ]}
            />
          </motion.div>

          {/* Brand text */}
          <motion.div
            className="absolute bottom-[15%] flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: phase === 'spin' ? 1 : 0,
              y: phase === 'spin' ? 0 : -20,
              scale: phase === 'rush' ? 1.1 : 1,
            }}
            transition={{ duration: 0.5, delay: phase === 'spin' ? 0.3 : 0 }}
          >
            <span className="font-outfit font-extrabold text-xl md:text-2xl tracking-[0.3em] text-white/90 uppercase">
              RSM SYSTEMBAU
            </span>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-blue-400/70 uppercase">
              Brick by Brick — Weltweit
            </span>
          </motion.div>

          {/* Skip hint */}
          <motion.span
            className="absolute bottom-6 text-[10px] tracking-widest text-white/30 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'spin' ? 0.6 : 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            Klicken zum Überspringen
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
