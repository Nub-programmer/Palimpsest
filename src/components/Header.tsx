import React from 'react';
import PixelInsignia from './PixelInsignia';

interface HeaderProps {
  onEnterArchive: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onEnterArchive, onNavigateSection }) => {
  const scrollTo = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full h-18 md:h-20 bg-[#F7F7F2]/95 border-b-2 border-[#171717] px-6 md:px-12 flex items-center justify-between gap-8 sticky top-0 z-40 select-none">
      {/* Zone 1: Small Original Pixel Insignia + Wordmark */}
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="shrink-0 flex items-center hover:opacity-90 transition-opacity"
      >
        <PixelInsignia size={32} showWordmark={true} centreAligned={false} />
      </a>

      {/* Zone 2: Navigation Links in Pixel Font */}
      <nav className="hidden lg:flex items-center gap-7 text-[10px] font-pixel tracking-wider font-bold text-[#42443F]">
        <button
          onClick={() => scrollTo('section-concept')}
          className="group flex items-center gap-1.5 hover:text-[#087F82] transition-colors whitespace-nowrap shrink-0 cursor-pointer uppercase py-1"
        >
          <span className="w-1.5 h-1.5 bg-[#087F82] opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
          <span>THE CONCEPT</span>
        </button>
        <button
          onClick={() => scrollTo('section-engine')}
          className="group flex items-center gap-1.5 hover:text-[#087F82] transition-colors whitespace-nowrap shrink-0 cursor-pointer uppercase py-1"
        >
          <span className="w-1.5 h-1.5 bg-[#087F82] opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
          <span>THE ENGINE</span>
        </button>
        <button
          onClick={() => scrollTo('section-forms')}
          className="group flex items-center gap-1.5 hover:text-[#087F82] transition-colors whitespace-nowrap shrink-0 cursor-pointer uppercase py-1"
        >
          <span className="w-1.5 h-1.5 bg-[#087F82] opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
          <span>THE EXPERIENCE</span>
        </button>
        <button
          onClick={() => scrollTo('section-casefile')}
          className="group flex items-center gap-1.5 hover:text-[#087F82] transition-colors whitespace-nowrap shrink-0 cursor-pointer uppercase py-1"
        >
          <span className="w-1.5 h-1.5 bg-[#087F82] opacity-0 group-hover:opacity-100 transition-opacity inline-block" />
          <span>CASE FILE 09</span>
        </button>
      </nav>

      {/* Zone 3: Primary Action CTA */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={onEnterArchive}
          className="btn-tactile btn-minecraft bg-white hover:bg-[#F0F0E9] text-[#141414] border-2 border-[#171717] shadow-pixel-sm px-4 md:px-5 py-2.5 text-[9px] md:text-[10px] font-pixel-arcade font-bold tracking-wider uppercase whitespace-nowrap flex items-center gap-2 cursor-pointer pixel-corners-sm"
        >
          <span className="w-2 h-2 bg-[#087F82] border border-[#171717] inline-block"></span>
          <span>ENTER ARCHIVE</span>
          <span className="text-[#087F82] font-bold">↗</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
