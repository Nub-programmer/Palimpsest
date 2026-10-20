import React from 'react';
import PixelInsignia from './PixelInsignia';
import PixelSignalMatrix from './PixelSignalMatrix';
import AnimatedPixelBackground from './AnimatedPixelBackground';

interface LandingHeroProps {
  onEnterArchive: () => void;
  onExploreEngine: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterArchive,
  onExploreEngine,
}) => {
  return (
    <section 
      className="relative w-full min-h-[calc(100svh-76px)] flex flex-col justify-between items-center px-4 sm:px-6 md:px-12 py-8 select-none overflow-hidden"
    >
      {/* Living Pixel Background & Ambient Parallax Layer */}
      <AnimatedPixelBackground variant="hero" />

      {/* Symmetrical Corner Registration Markings (With subtle breathing motion) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 font-mono text-[10px] text-[#85877F] pointer-events-none animate-pixel-float">
        <span className="w-2 h-2 bg-[#171717] inline-block"></span>
        <span className="hidden sm:inline font-bold text-[#141414]">SEC-09</span>
        <span>LAT 58°12'N</span>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 font-mono text-[10px] text-[#85877F] pointer-events-none animate-pixel-float-side" style={{ animationDelay: '1s' }}>
        <span>LON 04°22'W</span>
        <span className="hidden sm:inline font-bold text-[#087F82]">STATION ECHO</span>
        <span className="w-2 h-2 bg-[#087F82] inline-block"></span>
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 font-mono text-[10px] text-[#85877F] pointer-events-none animate-pixel-float" style={{ animationDelay: '2s' }}>
        <span className="w-2 h-2 bg-[#171717] inline-block"></span>
        <span>ARCHIVE-FORM: 06</span>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 font-mono text-[10px] text-[#85877F] pointer-events-none animate-pixel-float-side" style={{ animationDelay: '3s' }}>
        <span>RESONANCE: 42.7Hz</span>
        <span className="w-2 h-2 bg-[#087F82] inline-block animate-pixel-pulse"></span>
      </div>

      {/* Symmetrical Decorative Edge Pixel Brackets */}
      <div className="hidden lg:flex flex-col gap-1.5 absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 animate-pixel-float">
        <div className="w-2 h-2 bg-[#171717]"></div>
        <div className="w-2 h-2 bg-[#171717]"></div>
        <div className="w-2 h-2 bg-[#087F82]"></div>
        <div className="w-2 h-2 bg-[#171717]"></div>
        <div className="w-2 h-2 bg-[#171717]"></div>
      </div>

      <div className="hidden lg:flex flex-col gap-1.5 absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 animate-pixel-float-side" style={{ animationDelay: '1.5s' }}>
        <div className="w-2 h-2 bg-[#171717]"></div>
        <div className="w-2 h-2 bg-[#171717]"></div>
        <div className="w-2 h-2 bg-[#087F82]"></div>
        <div className="w-2 h-2 bg-[#171717]"></div>
        <div className="w-2 h-2 bg-[#171717]"></div>
      </div>

      {/* Top Small Technical Status Rail */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-[#85877F] tracking-widest uppercase mb-4">
        <span className="w-2 h-2 bg-[#087F82] inline-block"></span>
        <span>RECOVERED TELEMETRY STREAM</span>
        <span>·</span>
        <span className="text-[#141414] font-bold">GRID ACTIVE</span>
      </div>

      {/* Central Vertically Balanced Hero Stack (Single Perfect Centreline) */}
      <div className="my-auto flex flex-col items-center text-center max-w-4xl w-full">
        
        {/* 1. Symmetrical Pixel Insignia Centred Above Title */}
        <div className="mb-4">
          <PixelInsignia size={56} showWordmark={false} centreAligned={true} />
        </div>

        {/* 2. Large Pixelated Title in Press Start 2P Arcade Typography */}
        <h1 className="font-pixel-arcade text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#141414] tracking-tight mb-2 leading-none">
          PALIMPSEST
        </h1>

        {/* 3. Letter-Spaced Technical Subtitle */}
        <div className="font-mono text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#85877F] uppercase mb-5">
          THE LIVING ARCHIVE
        </div>

        {/* 4. Small Outlined Case Label */}
        <div className="inline-flex items-center gap-2 bg-white border-2 border-[#171717] shadow-pixel-sm px-4 py-1.5 mb-6 pixel-corners-sm">
          <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
          <span className="font-pixel text-[10px] sm:text-[11px] font-bold tracking-wider text-[#141414] uppercase">
            CASE FILE 09 / INVESTIGATION ACTIVE
          </span>
        </div>

        {/* 5. Primary Display Heading in Chunky Minecraft-era Block Pixel Typography */}
        <h2 className="font-pixel-arcade text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#141414] leading-[1.3] tracking-tight mb-5 animate-pixel-headline">
          <span className="block">THE MISSING</span>
          <span className="block text-[#087F82] mt-1">NINE MINUTES.</span>
        </h2>

        {/* 6. Centred Supporting Description with Controlled Width */}
        <p className="text-sm sm:text-base md:text-lg text-[#42443F] font-normal leading-relaxed max-w-xl mx-auto mb-8">
          At 02:17, Station ECHO vanished from the record. Nine minutes are missing. Twelve recovered fragments remain.
        </p>

        {/* 7. Centred CTA Row (Tactile Offset Shadows & Pixel Font) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full sm:w-auto">
          {/* Primary Action */}
          <button
            onClick={onEnterArchive}
            className="btn-tactile btn-minecraft bg-[#087F82] hover:bg-[#06676A] text-white border-2 border-[#171717] shadow-pixel px-7 py-4 font-pixel-arcade text-[10px] sm:text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto pixel-corners-sm"
          >
            <span>ENTER THE ARCHIVE</span>
            <span className="font-pixel-arcade text-xs">▶</span>
          </button>

          {/* Secondary Action */}
          <button
            onClick={onExploreEngine}
            className="btn-tactile btn-minecraft bg-white hover:bg-[#F0F0E9] text-[#141414] border-2 border-[#171717] shadow-pixel px-6 py-4 font-pixel-arcade text-[10px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer w-full sm:w-auto pixel-corners-sm"
          >
            EXPLORE THE ENGINE
          </button>
        </div>

        {/* 8. Lightweight Pixel Signal Matrix */}
        <div className="mt-2 mb-4">
          <PixelSignalMatrix />
        </div>

      </div>

      {/* Near the Bottom: Fine Status Rail with Metadata & Segmented Meter */}
      <div className="w-full max-w-4xl pt-4 border-t border-[#E6E6DF] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#85877F] select-none">
        
        {/* Left: Recovered Fragments */}
        <div className="flex items-center gap-2">
          <span className="text-[#141414] font-bold">12 FRAGMENTS RECOVERED</span>
          <span>·</span>
          <span>06 INTERFACE FORMS</span>
        </div>

        {/* Center: Segmented Pixel Signal Meter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase text-[#85877F]">CARRIER:</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2.5 bg-[#087F82] border border-[#171717]"></span>
            <span className="w-2 h-2.5 bg-[#087F82] border border-[#171717]"></span>
            <span className="w-2 h-2.5 bg-[#087F82] border border-[#171717]"></span>
            <span className="w-2 h-2.5 bg-[#087F82] border border-[#171717]"></span>
            <span className="w-2 h-2.5 bg-[#087F82] border border-[#171717]"></span>
            <span className="w-2 h-2.5 bg-[#E6E6DF] border border-[#171717]"></span>
          </div>
          <span className="text-[10px] font-bold text-[#141414]">84%</span>
        </div>

        {/* Right: Archive Status */}
        <div className="flex items-center gap-2">
          <span className="text-[#087F82] font-semibold">STATION ECHO // OFFLINE</span>
        </div>

      </div>
    </section>
  );
};

export default LandingHero;
