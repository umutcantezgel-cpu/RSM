'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe } from './Globe';

export function HeroGlobe() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  // Calculate viewport-relative movements
  // When scroll is at 0, it's on the far right. When scroll goes down, it moves slightly inwards and scales up.
  const x = useTransform(scrollYProgress, [0, 1], ['25vw', '5vw']);
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '15vh']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  // No need for opacity fade since it will naturally scroll away with the section
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.5]);

  const markers = [
    { lat: 50.11, lon: 8.68, title: 'frankfurt', label: 'Frankfurt a.M.' },
    { lat: 48.14, lon: 11.58, title: 'muenchen', label: 'München' },
    { lat: 52.52, lon: 13.41, title: 'berlin', label: 'Berlin' },
    { lat: 25.2, lon: 55.27, title: 'dubai', label: 'Dubai' },
  ];

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ x, y, scale, opacity }}
          className="pointer-events-auto origin-center"
        >
          <Globe 
            size={550} 
            color="#2563eb" // blue-600
            interactive={true} 
            whirl={true} 
            markers={markers}
          />
        </motion.div>
      </div>
    </div>
  );
}
