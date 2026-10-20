import React, { useEffect, useState, useRef } from 'react';
import { useInvestigation } from '../context/InvestigationContext';

interface AnimatedPixelBackgroundProps {
  variant?: 'hero' | 'app' | 'full';
  className?: string;
}

export const AnimatedPixelBackground: React.FC<AnimatedPixelBackgroundProps> = ({
  variant = 'full',
  className = '',
}) => {
  const { reducedMotion } = useInvestigation();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Parallax handling for desktop pointer movement
  useEffect(() => {
    if (reducedMotion) return;
    
    // Check if device has fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const ny = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        // Clamp to max 8px shift
        setParallax({
          x: Math.max(-8, Math.min(8, nx * 8)),
          y: Math.max(-8, Math.min(8, ny * 8)),
        });
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  // Curated floating pixel particles (restrained count ~18 elements)
  const particles = [
    { top: '12%', left: '8%', size: 6, color: '#85877F', opacity: 0.22, anim: 'animate-pixel-drift-up', delay: '0s', dur: '22s' },
    { top: '24%', left: '88%', size: 8, color: '#087F82', opacity: 0.28, anim: 'animate-pixel-drift-down', delay: '2s', dur: '26s' },
    { top: '42%', left: '5%', size: 4, color: '#141414', opacity: 0.18, anim: 'animate-pixel-drift-up', delay: '4s', dur: '28s' },
    { top: '68%', left: '92%', size: 6, color: '#85877F', opacity: 0.25, anim: 'animate-pixel-drift-up', delay: '1s', dur: '24s' },
    { top: '78%', left: '15%', size: 10, color: '#087F82', opacity: 0.2, anim: 'animate-pixel-drift-down', delay: '5s', dur: '30s' },
    { top: '18%', left: '72%', size: 4, color: '#141414', opacity: 0.15, anim: 'animate-pixel-drift-up', delay: '7s', dur: '20s' },
    { top: '55%', left: '80%', size: 6, color: '#0AB5B8', opacity: 0.25, anim: 'animate-pixel-drift-down', delay: '3s', dur: '25s' },
    { top: '35%', left: '22%', size: 4, color: '#85877F', opacity: 0.2, anim: 'animate-pixel-drift-up', delay: '6s', dur: '27s' },
    { top: '85%', left: '60%', size: 8, color: '#141414', opacity: 0.16, anim: 'animate-pixel-drift-up', delay: '8s', dur: '23s' },
    { top: '8%', left: '48%', size: 6, color: '#087F82', opacity: 0.22, anim: 'animate-pixel-drift-down', delay: '9s', dur: '29s' },
    { top: '90%', left: '30%', size: 6, color: '#85877F', opacity: 0.18, anim: 'animate-pixel-drift-up', delay: '11s', dur: '21s' },
    { top: '62%', left: '38%', size: 4, color: '#141414', opacity: 0.14, anim: 'animate-pixel-drift-down', delay: '10s', dur: '32s' },
  ];

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Subtle Teal Grid Sweep Highlight */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[340px] pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(8,127,130,0.18) 0%, rgba(247,247,242,0) 70%)',
        }}
      >
        <div className="w-full h-full animate-grid-sweep" />
      </div>

      {/* 2. Distant & Midground Floating Pixels Layer (Parallax Layer A: scale 0.5) */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion ? 'none' : `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0)`,
        }}
      >
        {particles.map((p, idx) => (
          <div
            key={idx}
            className={`absolute ${p.anim}`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.dur,
              boxShadow: '1px 1px 0 rgba(23, 23, 23, 0.4)',
            }}
          />
        ))}
      </div>

      {/* 3. Floating Minecraft Block Formations (Stepped Geometric Silhouettes in corners/edges) */}
      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform: reducedMotion ? 'none' : `translate3d(${parallax.x * 0.8}px, ${parallax.y * 0.8}px, 0)`,
        }}
      >
        {/* Top-Left Stepped Corner Cluster */}
        <div 
          className="absolute top-12 left-8 hidden sm:flex flex-col gap-0 animate-pixel-float opacity-35"
          style={{ animationDuration: '9s' }}
        >
          <div className="flex">
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#171717]" />
          </div>
          <div className="flex">
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#087F82]" />
            <div className="w-3 h-3 bg-[#171717]" />
          </div>
          <div className="w-3 h-3 bg-[#85877F]" />
        </div>

        {/* Top-Right Stepped Tetromino Cluster */}
        <div 
          className="absolute top-16 right-10 hidden sm:flex flex-col gap-0 animate-pixel-float-side opacity-35"
          style={{ animationDuration: '11s', animationDelay: '1.5s' }}
        >
          <div className="flex justify-end">
            <div className="w-3 h-3 bg-[#087F82]" />
            <div className="w-3 h-3 bg-[#171717]" />
          </div>
          <div className="flex">
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#85877F]" />
          </div>
        </div>

        {/* Mid-Left Stepped Voxel Anchor */}
        <div 
          className="absolute top-[48%] left-4 hidden md:flex flex-col gap-0 animate-pixel-float opacity-30"
          style={{ animationDuration: '8s', animationDelay: '3s' }}
        >
          <div className="w-2.5 h-2.5 bg-[#171717]" />
          <div className="flex">
            <div className="w-2.5 h-2.5 bg-[#171717]" />
            <div className="w-2.5 h-2.5 bg-[#087F82]" />
          </div>
          <div className="w-2.5 h-2.5 bg-[#85877F]" />
        </div>

        {/* Mid-Right Stepped Voxel Anchor */}
        <div 
          className="absolute top-[52%] right-6 hidden md:flex flex-col gap-0 animate-pixel-float-side opacity-30"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        >
          <div className="flex justify-end">
            <div className="w-2.5 h-2.5 bg-[#0AB5B8]" />
            <div className="w-2.5 h-2.5 bg-[#171717]" />
          </div>
          <div className="w-2.5 h-2.5 bg-[#171717]" />
          <div className="w-2.5 h-2.5 bg-[#85877F]" />
        </div>

        {/* Bottom-Right Stepped Voxel Base */}
        <div 
          className="absolute bottom-14 right-12 hidden lg:flex flex-col gap-0 animate-pixel-float opacity-35"
          style={{ animationDuration: '12s', animationDelay: '4s' }}
        >
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-[#087F82]" />
          </div>
          <div className="flex">
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#171717]" />
          </div>
          <div className="flex">
            <div className="w-3 h-3 bg-[#85877F]" />
            <div className="w-3 h-3 bg-[#171717]" />
            <div className="w-3 h-3 bg-[#85877F]" />
          </div>
        </div>
      </div>

      {/* 4. Periodic Pixel Materialization (Stepped fade-in, hold, and dissolve) */}
      <div 
        className="absolute top-[28%] left-[18%] hidden sm:block animate-pixel-materialize"
        style={{ animationDuration: '14s' }}
      >
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-3.5 h-3.5 bg-[#171717] border border-[#F7F7F2]" />
            <div className="w-3.5 h-3.5 bg-[#087F82] border border-[#F7F7F2]" />
          </div>
          <div className="w-3.5 h-3.5 bg-[#85877F] border border-[#F7F7F2]" />
        </div>
      </div>

      <div 
        className="absolute top-[72%] right-[22%] hidden sm:block animate-pixel-materialize-delayed"
        style={{ animationDuration: '15s' }}
      >
        <div className="flex flex-col">
          <div className="flex justify-end">
            <div className="w-3.5 h-3.5 bg-[#0AB5B8] border border-[#F7F7F2]" />
          </div>
          <div className="flex">
            <div className="w-3.5 h-3.5 bg-[#171717] border border-[#F7F7F2]" />
            <div className="w-3.5 h-3.5 bg-[#171717] border border-[#F7F7F2]" />
          </div>
        </div>
      </div>

      {/* 5. Signal Accent Groups (Restrained breathing teal indicators) */}
      <div className="absolute top-[20%] left-[82%] flex items-center gap-1 opacity-60">
        <span className="w-1.5 h-1.5 bg-[#087F82] animate-pixel-pulse" />
        <span className="w-1.5 h-1.5 bg-[#171717]" />
      </div>

      <div className="absolute bottom-[22%] left-[12%] flex items-center gap-1 opacity-60">
        <span className="w-1.5 h-1.5 bg-[#171717]" />
        <span className="w-1.5 h-1.5 bg-[#087F82] animate-pixel-pulse-delayed" />
      </div>
    </div>
  );
};

export default AnimatedPixelBackground;
