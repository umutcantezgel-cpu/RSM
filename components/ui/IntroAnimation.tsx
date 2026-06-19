'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from './Globe';

/**
 * IntroAnimation – fullscreen splash with an elegant, static spinning globe.
 * 
 * Timeline:
 *   Phase 1 (0–1800ms): Globe spins centered, looks beautiful.
 *   Phase 2 (1800ms+): Entire overlay smoothly fades out.
 */
export function IntroAnimation() {
  const [show, setShow] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<'spin' | 'fadeout' | 'done'>('spin');

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

    // Wait 1.8 seconds, then start fading out
    const t1 = setTimeout(() => setPhase('fadeout'), 1800);
    
    // Complete the animation cycle
    const t2 = setTimeout(() => {
      setPhase('done');
      setShow(false);
      sessionStorage.setItem('rsm-intro-seen', '1');
      document.body.style.overflow = '';
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleSkip = useCallback(() => {
    setPhase('fadeout');
    setTimeout(() => {
      setPhase('done');
      setShow(false);
      sessionStorage.setItem('rsm-intro-seen', '1');
      document.body.style.overflow = '';
    }, 500);
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
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #090e17 0%, #111827 50%, #090e17 100%)',
          }}
        >
          {/* Subtle Grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} 
          />

          {/* Elegant Radial glow behind globe */}
          <motion.div
            className="absolute pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase === 'fadeout' ? 0 : 0.4, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              width: 800,
              height: 800,
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%)',
            }}
          />

          {/* Static Beautiful Globe */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ 
              opacity: phase === 'fadeout' ? 0 : 1, 
              scale: phase === 'fadeout' ? 0.95 : 1,
              y: phase === 'fadeout' ? -10 : 0 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Globe
              size={420}
              color="#3b82f6"
              interactive={false}
              whirl={true} // Enables the fast spin effect if Globe component supports it
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
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: phase === 'fadeout' ? 0 : 1,
              y: phase === 'fadeout' ? -10 : 0,
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="font-outfit font-black text-2xl md:text-3xl tracking-[0.4em] text-white uppercase drop-shadow-lg">
              RSM SYSTEMBAU
            </span>
            <span className="text-xs font-semibold tracking-[0.5em] text-blue-400/80 uppercase">
              Brick by Brick — Weltweit
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
