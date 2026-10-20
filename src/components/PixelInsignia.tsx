import React from 'react';

interface PixelInsigniaProps {
  size?: number; // size in px
  className?: string;
  showWordmark?: boolean;
  centreAligned?: boolean;
}

export const PixelInsignia: React.FC<PixelInsigniaProps> = ({
  size = 48,
  className = '',
  showWordmark = false,
  centreAligned = false,
}) => {
  // Minecraft / Cryptix Block-Art Insignia
  // Symmetrical 16x16 pixel matrix built with explicit square voxels,
  // obsidian black (#171717), stone gray (#85877F), and diamond cyan (#087F82 / #0AB5B8).
  return (
    <div
      className={`inline-flex ${
        centreAligned ? 'flex-col items-center' : 'items-center'
      } gap-3 select-none ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 animate-insignia-assemble"
        style={{ imageRendering: 'pixelated' }}
        aria-hidden="true"
      >
        {/* Layer 1: Outer Obsidian Stepped Silhouette */}
        <rect x="24" y="0" width="16" height="4" fill="#171717" />
        <rect x="20" y="4" width="24" height="4" fill="#171717" />
        <rect x="16" y="8" width="32" height="4" fill="#171717" />
        
        {/* Stepped Shoulder Blocks */}
        <rect x="8" y="12" width="48" height="4" fill="#171717" />
        <rect x="4" y="16" width="56" height="8" fill="#171717" />
        <rect x="0" y="24" width="64" height="16" fill="#171717" />
        <rect x="4" y="40" width="56" height="8" fill="#171717" />
        <rect x="8" y="48" width="48" height="4" fill="#171717" />
        <rect x="16" y="52" width="32" height="4" fill="#171717" />
        <rect x="20" y="56" width="24" height="4" fill="#171717" />
        <rect x="24" y="60" width="16" height="4" fill="#171717" />

        {/* Layer 2: White & Stone Inner Bevel Frame */}
        <rect x="8" y="16" width="48" height="32" fill="#FFFFFF" />
        <rect x="12" y="12" width="40" height="4" fill="#FFFFFF" />
        <rect x="12" y="48" width="40" height="4" fill="#F0F0E9" />

        {/* Stone Bricks Pattern */}
        <rect x="8" y="24" width="8" height="8" fill="#E6E6DF" />
        <rect x="48" y="24" width="8" height="8" fill="#E6E6DF" />
        <rect x="16" y="16" width="8" height="8" fill="#E6E6DF" />
        <rect x="40" y="16" width="8" height="8" fill="#E6E6DF" />
        <rect x="16" y="40" width="8" height="8" fill="#E6E6DF" />
        <rect x="40" y="40" width="8" height="8" fill="#E6E6DF" />

        {/* Layer 3: Symmetrical Obsidian Inner Pillar Arch */}
        <rect x="16" y="24" width="8" height="16" fill="#171717" />
        <rect x="40" y="24" width="8" height="16" fill="#171717" />
        <rect x="24" y="16" width="16" height="8" fill="#171717" />
        <rect x="24" y="40" width="16" height="8" fill="#171717" />

        {/* Layer 4: Minecraft Diamond Core (Eye of Palimpsest) */}
        {/* Diamond Outer Shadow */}
        <rect x="24" y="24" width="16" height="16" fill="#06676A" />
        {/* Diamond Main Body */}
        <rect x="26" y="26" width="12" height="12" fill="#087F82" />
        {/* Diamond Voxel Highlight */}
        <rect x="26" y="26" width="6" height="6" fill="#0AB5B8" />
        <rect x="28" y="28" width="3" height="3" fill="#FFFFFF" />
        {/* Central Pulse Bit */}
        <rect x="32" y="32" width="4" height="4" fill="#D9F0ED" className="animate-pixel-pulse" />

        {/* Satellite Pixel Sparks (Corner Notch Highlights) */}
        <rect x="4" y="20" width="4" height="4" fill="#0AB5B8" />
        <rect x="56" y="20" width="4" height="4" fill="#0AB5B8" />
        <rect x="4" y="40" width="4" height="4" fill="#0AB5B8" />
        <rect x="56" y="40" width="4" height="4" fill="#0AB5B8" />

        {/* Top/Bottom Signal Dots */}
        <rect x="30" y="4" width="4" height="4" fill="#0AB5B8" />
        <rect x="30" y="56" width="4" height="4" fill="#0AB5B8" />
      </svg>

      {showWordmark && (
        <div className={`flex flex-col ${centreAligned ? 'items-center text-center' : ''}`}>
          <span className="font-pixel-arcade text-[11px] sm:text-xs md:text-sm tracking-tight text-[#141414]">
            PALIMPSEST
          </span>
          <span className="font-pixel text-[8px] sm:text-[9px] tracking-[0.2em] text-[#087F82] uppercase mt-1">
            THE LIVING ARCHIVE
          </span>
        </div>
      )}
    </div>
  );
};

export default PixelInsignia;
