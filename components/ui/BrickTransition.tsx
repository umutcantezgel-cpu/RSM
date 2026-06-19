'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const BRICK_ROWS = 8;
const COVER_DURATION = 0.38;
const REVEAL_DURATION = 0.42;
const HOLD_DURATION = 250;

/**
 * BrickTransition — "Brick by Brick" page transition overlay.
 * 
 * Intercepts link clicks, covers the page with matte brick stripes,
 * navigates while fully covered, then reveals the new page.
 * 
 * Uses z-[9990] to sit above ALL page content (header, modals, etc.)
 * and renders a solid backdrop behind bricks to prevent any bleed-through.
 */
export function BrickTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<'idle' | 'cover' | 'hold' | 'reveal'>('idle');
  const prevPathRef = useRef(pathname);
  const pendingHrefRef = useRef<string | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Helper to toggle page visibility
  const setPageVisible = (visible: boolean) => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Use opacity 0 and pointer-events-none to completely hide and disable the page
      mainContent.style.opacity = visible ? '1' : '0';
      mainContent.style.pointerEvents = visible ? 'auto' : 'none';
    }
  };

  // Watch for pathname change while in cover/hold phase
  useEffect(() => {
    if ((phase === 'cover' || phase === 'hold') && pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      // New page loaded while covered — make it visible behind the bricks, then reveal
      setPageVisible(true);
      
      addTimeout(() => {
        setPhase('reveal');
        addTimeout(() => {
          setPhase('idle');
          pendingHrefRef.current = null;
        }, REVEAL_DURATION * 1000 + 150);
      }, HOLD_DURATION);
    } else if (phase === 'idle') {
      prevPathRef.current = pathname;
      setPageVisible(true); // Safety fallback
    }
  }, [pathname, phase, addTimeout]);

  // Start cover → navigate → reveal
  const startCoverThenNavigate = useCallback((href: string) => {
    if (phase !== 'idle') return;
    pendingHrefRef.current = href;
    setPhase('cover');
    setPageVisible(false); // Hide the old page IMMEDIATELY

    // After all bricks have slid in, switch to hold and navigate
    const totalCoverTime = (COVER_DURATION + BRICK_ROWS * 0.035) * 1000;
    addTimeout(() => {
      setPhase('hold');
      // Small delay then navigate
      addTimeout(() => {
        router.push(href);
      }, 60);
    }, totalCoverTime);
  }, [phase, router, addTimeout]);

  // Intercept internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only intercept internal links
      if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
      if (href === '#' || href.startsWith('#')) return;
      if (anchor.getAttribute('target') === '_blank') return;
      if (anchor.getAttribute('download') != null) return;

      // Don't intercept same-page clicks
      if (href === pathname) return;
      // Also compare without trailing slash
      const norm = (s: string) => s.replace(/\/$/, '') || '/';
      if (norm(href) === norm(pathname)) return;

      if (phase !== 'idle') return;

      e.preventDefault();
      e.stopPropagation();
      startCoverThenNavigate(href);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, phase, startCoverThenNavigate]);

  // Cleanup
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  if (phase === 'idle') return null;

  return (
    <div 
      className="fixed inset-0 z-[9990] pointer-events-none"
      aria-hidden="true"
      style={{ isolation: 'isolate', perspective: '1000px' }}
    >
      {/* 
        Solid backdrop: prevents ANY content from bleeding through.
        We make this completely opaque IMMEDIATELY upon 'cover' to hide the old page 
        instantly, fulfilling the requirement "hintere Seite einfach ausblenden".
      */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#0b1120' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
        transition={{
          // Fade in instantly (0s) to hide old page, fade out smoothly on reveal
          duration: phase === 'cover' ? 0 : REVEAL_DURATION * 0.9,
          delay: phase === 'reveal' ? REVEAL_DURATION * 0.4 : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Brick stripes */}
      <div className="absolute inset-0 z-10 flex flex-col">
        {Array.from({ length: BRICK_ROWS }).map((_, i) => {
          const fromLeft = i % 2 === 0;
          const stagger = i * 0.04;
          const rowHeight = 100 / BRICK_ROWS;
          const colors = ['#131b2e', '#111827', '#0f1623', '#121a2a'];
          const bgColor = colors[i % colors.length];

          return (
            <motion.div
              // FIX: Static key to prevent unmount/remount flickering
              key={`brick-${i}`}
              className="absolute left-0 right-0 shadow-2xl"
              style={{
                top: `${i * rowHeight - 0.5}%`,
                height: `${rowHeight + 1.0}%`, // Generous overlap
                transformOrigin: fromLeft ? 'left center' : 'right center',
              }}
              initial={false}
              animate={
                (phase === 'cover' || phase === 'hold')
                  ? { x: '0%', scaleX: 1, opacity: 1 }
                  : { x: fromLeft ? '105%' : '-105%', scaleX: 1.05, opacity: 1 }
              }
              transition={{
                duration: phase === 'reveal' ? REVEAL_DURATION : COVER_DURATION,
                delay: phase === 'reveal' 
                  ? (BRICK_ROWS - 1 - i) * 0.035  // Reverse stagger on reveal
                  : stagger,
                ease: phase === 'cover' 
                  ? [0.22, 1, 0.36, 1]   // Heavy 'snap into place' ease
                  : [0.6, 0.04, 0.98, 0.34], // Accelerating ease out
              }}
            >
              <div 
                className="w-full h-full relative overflow-hidden"
                style={{ backgroundColor: bgColor }}
              >
                {/* Rough concrete texture */}
                <div 
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px',
                  }}
                />
                
                {/* 3D Bevel Effects */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/40" />
                
                {/* Inner shadow for weight */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* RSM branded center element — STRICT z-50 to ALWAYS be on top of bricks */}
      <AnimatePresence>
        {(phase === 'hold' || phase === 'cover') && (
          <motion.div
            key="rsm-brand"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
            transition={{ 
              duration: 0.3, 
              delay: phase === 'cover' ? COVER_DURATION * 0.4 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Elegant glassmorphism backing to ensure text NEVER blends into the bricks */}
            <motion.div 
              className="absolute w-64 h-32 bg-blue-500/10 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Decorative Top Line */}
            <motion.div 
              className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: COVER_DURATION * 0.6 }}
            />
            
            {/* The RSM Typography - highly visible, glowing, sharp */}
            <span 
              className="relative font-outfit font-black text-4xl md:text-5xl tracking-[0.4em] text-white uppercase select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] pl-[0.4em]"
            >
              RSM
            </span>
            
            {/* Subtitle */}
            <span className="font-outfit text-xs tracking-[0.4em] text-blue-300 uppercase select-none font-bold drop-shadow-md">
              SYSTEMBAU
            </span>
            
            {/* Decorative Bottom Line */}
            <motion.div 
              className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: COVER_DURATION * 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
