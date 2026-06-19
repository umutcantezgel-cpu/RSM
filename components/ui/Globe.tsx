'use client';

import React, { useEffect, useRef } from 'react';

export interface GlobeProps {
  className?: string;
  size?: number;
  color?: string;
  interactive?: boolean;
  whirl?: boolean;
  markers?: Array<{ lat: number; lon: number; title: string; label?: string }>;
  onMarker?: (mk: any) => void;
  onHover?: (mk: any) => void;
  onDrag?: () => void;
}

export function Globe({
  className = '',
  size = 540,
  color = '#3b82f6', // Tailwind blue-500
  interactive = true,
  whirl = true,
  markers = [],
  onMarker,
  onHover,
  onDrag,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const DATA_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
    let worldLines: any = null;
    let redrawHooks: any[] = [];

    function decodeTopo(topo: any) {
      const tr = topo.transform;
      const sx = tr.scale[0], sy = tr.scale[1], tx = tr.translate[0], ty = tr.translate[1];
      const lines = [];
      for (let i = 0; i < topo.arcs.length; i++) {
        const arc = topo.arcs[i];
        let x = 0, y = 0;
        const line = [];
        for (let j = 0; j < arc.length; j++) {
          x += arc[j][0]; y += arc[j][1];
          line.push([x * sx + tx, y * sy + ty]);
        }
        if (line.length > 1) lines.push(line);
      }
      return lines;
    }

    fetch(DATA_URL).then(r => r.json()).then(topo => {
      worldLines = decodeTopo(topo);
      redrawHooks.forEach(fn => fn());
    }).catch(() => { /* fallback */ });

    function graticuleLines() {
      const lines = [];
      let lon, lat, line;
      for (lon = -180; lon < 180; lon += 30) {
        line = [];
        for (lat = -80; lat <= 80; lat += 5) line.push([lon, lat]);
        lines.push(line);
      }
      for (lat = -60; lat <= 60; lat += 30) {
        line = [];
        for (lon = -180; lon <= 180; lon += 5) line.push([lon, lat]);
        lines.push(line);
      }
      return lines;
    }
    const fallbackLines = graticuleLines();

    const TILT = -0.32;
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    function project(lon: number, lat: number, rotDeg: number, cT = cosT, sT = sinT) {
      const lam = (lon + rotDeg) * Math.PI / 180;
      const phi = lat * Math.PI / 180;
      const cp = Math.cos(phi);
      const x = cp * Math.sin(lam);
      const y = Math.sin(phi);
      const z = cp * Math.cos(lam);
      return { x, y: y * cT - z * sT, z: y * sT + z * cT };
    }

    const R = Math.round(size * 0.35);
    const speed = 0.028;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2;
    let dragOffset = 0, dragging = false, dragStartX = 0, dragStartY = 0, dragStartOffset = 0, dragStartTilt = 0;
    let tilt = TILT;
    let lastT = 0;
    let activeMarker: any = null, targetLon: number | null = null, targetLat: number | null = null;
    let velX = 0, velY = 0, prevX = 0, prevY = 0;
    const TILT_MAX = 1.45;

    function drawWhirl(t: number) {
      const trails = [
        { r: R + R * 0.21, speed: 0.0016, span: 1.9, width: 2.0, phase: 0 },
        { r: R + R * 0.34, speed: -0.0011, span: 1.4, width: 1.5, phase: 2.4 },
        { r: R + R * 0.47, speed: 0.0007, span: 2.3, width: 1.0, phase: 4.2 },
      ];
      trails.forEach(tr => {
        const head = tr.phase + t * tr.speed;
        const steps = 26;
        for (let i = 0; i < steps; i++) {
          const a0 = head - (i / steps) * tr.span;
          const a1 = head - ((i + 1) / steps) * tr.span;
          ctx!.beginPath();
          ctx!.arc(cx, cy, tr.r, a1, a0);
          ctx!.strokeStyle = color;
          ctx!.globalAlpha = 0.55 * (1 - i / steps);
          ctx!.lineWidth = tr.width * (1 - 0.6 * i / steps);
          ctx!.lineCap = 'round';
          ctx!.stroke();
        }
      });
      ctx!.globalAlpha = 1;
    }

    function drawGlobe(t: number) {
      const rot = t * speed + dragOffset;
      const cT = Math.cos(tilt), sT = Math.sin(tilt);
      
      ctx!.clearRect(0, 0, size, size);
      
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.4)'; 
      ctx!.fill();
      ctx!.strokeStyle = color;
      ctx!.globalAlpha = 0.4; // make border softer
      ctx!.lineWidth = 1;
      ctx!.stroke();
      ctx!.globalAlpha = 1;

      const lines = worldLines || fallbackLines;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = Math.max(0.65, R / 95 * 0.65);
      ctx!.globalAlpha = 0.85;
      ctx!.lineJoin = 'round';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let started = false;
        ctx!.beginPath();
        for (let j = 0; j < line.length; j++) {
          const p = project(line[j][0], line[j][1], rot, cT, sT);
          if (p.z > 0.02) {
            const px = cx + p.x * R, py = cy - p.y * R;
            if (started) ctx!.lineTo(px, py); else { ctx!.moveTo(px, py); started = true; }
          } else {
            started = false;
          }
        }
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      for (let m = 0; m < markers.length; m++) {
        const mk = markers[m];
        const mp = project(mk.lon, mk.lat, rot, cT, sT);
        if (mp.z <= 0.05) { (mk as any)._sx = null; continue; }
        const mx = cx + mp.x * R, my = cy - mp.y * R;
        (mk as any)._sx = mx; (mk as any)._sy = my;
        
        ctx!.beginPath();
        ctx!.arc(mx, my, mk === activeMarker ? 6 : 3.5, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.fill();
        
        ctx!.beginPath();
        ctx!.arc(mx, my, mk === activeMarker ? 10 : 7, 0, Math.PI * 2);
        ctx!.strokeStyle = color;
        ctx!.globalAlpha = 0.3;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
        ctx!.globalAlpha = 1;

        if (mk === activeMarker && mk.label) {
          ctx!.font = '600 12px var(--font-outfit), sans-serif';
          const tw = ctx!.measureText(mk.label).width;
          const lx = Math.min(Math.max(mx + 16, 8), size - tw - 16);
          const ly = my - 14;
          ctx!.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx!.beginPath();
          ctx!.roundRect(lx - 6, ly - 14, tw + 12, 22, 6);
          ctx!.fill();
          ctx!.strokeStyle = color;
          ctx!.lineWidth = 1;
          ctx!.stroke();
          ctx!.fillStyle = color;
          ctx!.fillText(mk.label, lx, ly + 2);
        }
      }
    }

    let animationFrameId: number;
    let running = true;

    function normDeg(a: number) { return ((a + 180) % 360 + 360) % 360 - 180; }
    function clampTilt(v: number) { return Math.max(-TILT_MAX, Math.min(TILT_MAX, v)); }
    
    function loop(t: number) {
      if (!running) return;
      lastT = t;
      if (!dragging) {
        if (targetLon !== null) {
          const desired = -targetLon - t * speed;
          const diff = normDeg(desired - dragOffset);
          if (Math.abs(diff) < 0.15) { dragOffset = desired; } else { dragOffset += diff * 0.07; }
        }
        if (targetLat !== null) {
          const dLat = targetLat - tilt;
          if (Math.abs(dLat) < 0.003) { tilt = targetLat; } else { tilt += dLat * 0.07; }
        }
        if (targetLon === null && Math.abs(velX) > 0.01) { dragOffset += velX; velX *= 0.94; }
        if (targetLat === null && Math.abs(velY) > 0.0004) { tilt = clampTilt(tilt + velY); velY *= 0.94; }
      }
      
      if (whirl) drawWhirl(t);
      drawGlobe(t);
      
      animationFrameId = requestAnimationFrame(loop);
    }

    animationFrameId = requestAnimationFrame(loop);
    redrawHooks.push(() => { if (running) { drawWhirl(lastT); drawGlobe(lastT); } });

    if (interactive) {
      canvas.style.touchAction = 'none';
      canvas.style.cursor = 'grab';
      
      const handleDown = (e: PointerEvent) => {
        dragging = true;
        dragStartX = e.clientX; dragStartY = e.clientY;
        dragStartOffset = dragOffset; dragStartTilt = tilt;
        prevX = e.clientX; prevY = e.clientY;
        velX = 0; velY = 0;
        targetLon = null; targetLat = null;
        canvas.style.cursor = 'grabbing';
        try { canvas.setPointerCapture(e.pointerId); } catch {}
      };

      const handleMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (dragging) {
          dragOffset = dragStartOffset + (e.clientX - dragStartX) * 0.45;
          tilt = clampTilt(dragStartTilt + (e.clientY - dragStartY) * 0.008);
          velX = (e.clientX - prevX) * 0.45 * 0.55;
          velY = (e.clientY - prevY) * 0.008 * 0.55;
          prevX = e.clientX; prevY = e.clientY;
          if (onDrag) onDrag();
          return;
        }
        const px = e.clientX - rect.left, py = e.clientY - rect.top;
        let hit = null;
        for (let i = 0; i < markers.length; i++) {
          const mk = markers[i];
          if ((mk as any)._sx != null && Math.hypot(px - (mk as any)._sx, py - (mk as any)._sy) < 14) { hit = mk; break; }
        }
        if (hit !== activeMarker) { 
          activeMarker = hit; 
        }
        canvas.style.cursor = hit ? 'pointer' : 'grab';
        if (onHover) onHover(hit);
      };

      const handleUp = (e: PointerEvent) => {
        const moved = Math.abs(e.clientX - dragStartX) > 6 || Math.abs(e.clientY - dragStartY) > 6;
        dragging = false;
        canvas.style.cursor = 'grab';
        if (moved) return;
        velX = 0; velY = 0;
        const rect = canvas.getBoundingClientRect();
        const px = e.clientX - rect.left, py = e.clientY - rect.top;
        for (let i = 0; i < markers.length; i++) {
          const mk = markers[i];
          if ((mk as any)._sx != null && Math.hypot(px - (mk as any)._sx, py - (mk as any)._sy) < 14) {
            if (onMarker) onMarker(mk);
            break;
          }
        }
      };

      canvas.addEventListener('pointerdown', handleDown);
      canvas.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp); 

      return () => {
        running = false;
        cancelAnimationFrame(animationFrameId);
        redrawHooks = [];
        canvas.removeEventListener('pointerdown', handleDown);
        canvas.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
      };
    }

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
      redrawHooks = [];
    };
  }, [size, color, interactive, whirl, markers, onMarker, onHover, onDrag]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block ${className}`}
      aria-label="Interactive 3D Globe"
    />
  );
}
