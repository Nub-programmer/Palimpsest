import React from 'react';

interface PixelSignalMatrixProps {
  className?: string;
}

export const PixelSignalMatrix: React.FC<PixelSignalMatrixProps> = ({ className = '' }) => {
  // Minecraft / Cryptix Block-Art Signal Matrix
  // Symmetrical 24x12 pixel grid representing a forensic block scanner with diamond and obsidian cells
  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-3.5 bg-white border-2 border-[#171717] shadow-pixel select-none pixel-corners-sm ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Top Header Label in 8-bit Pixel Font */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b-2 border-[#171717] font-pixel text-[9px] text-[#85877F] uppercase tracking-wider">
        <span className="text-[#141414] font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
          <span>SIGNAL MATRIX // REC-09</span>
        </span>
        <span className="text-[#087F82] font-bold">42.7Hz STABLE</span>
      </div>

      {/* Actual Square Pixel Grid SVG */}
      <svg
        width="300"
        height="144"
        viewBox="0 0 300 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[300px] h-auto"
        aria-hidden="true"
      >
        {/* Subtle background block tiles (4x4 stone dots) */}
        {Array.from({ length: 25 }).map((_, col) =>
          Array.from({ length: 12 }).map((_, row) => (
            <rect
              key={`tile-${col}-${row}`}
              x={col * 12 + 4}
              y={row * 12 + 4}
              width="4"
              height="4"
              fill="#EAEAE4"
            />
          ))
        )}

        {/* Outer Corner Block Anchors (Stepped L-Brackets) */}
        {/* Top-Left */}
        <rect x="0" y="0" width="12" height="4" fill="#171717" />
        <rect x="0" y="4" width="4" height="8" fill="#171717" />
        <rect x="4" y="4" width="4" height="4" fill="#087F82" />

        {/* Top-Right */}
        <rect x="288" y="0" width="12" height="4" fill="#171717" />
        <rect x="296" y="4" width="4" height="8" fill="#171717" />
        <rect x="292" y="4" width="4" height="4" fill="#087F82" />

        {/* Bottom-Left */}
        <rect x="0" y="140" width="12" height="4" fill="#171717" />
        <rect x="0" y="132" width="4" height="8" fill="#171717" />
        <rect x="4" y="136" width="4" height="4" fill="#087F82" />

        {/* Bottom-Right */}
        <rect x="288" y="140" width="12" height="4" fill="#171717" />
        <rect x="296" y="132" width="4" height="8" fill="#171717" />
        <rect x="292" y="136" width="4" height="4" fill="#087F82" />

        {/* Symmetrical Central Minecraft Horizon & Beacon Core */}
        {/* Horizontal Voxel Beam */}
        <rect x="40" y="68" width="220" height="8" fill="#171717" />
        <rect x="52" y="64" width="196" height="4" fill="#85877F" />
        <rect x="52" y="76" width="196" height="4" fill="#85877F" />
        <rect x="64" y="70" width="172" height="4" fill="#0AB5B8" />

        {/* Center Minecraft Beacon Core */}
        <rect x="132" y="52" width="36" height="40" fill="#171717" />
        <rect x="136" y="56" width="28" height="32" fill="#FFFFFF" />
        <rect x="140" y="60" width="20" height="24" fill="#087F82" />
        {/* Beacon Inner Diamond Block */}
        <rect x="144" y="64" width="12" height="16" fill="#0AB5B8" />
        <rect x="146" y="66" width="4" height="4" fill="#FFFFFF" />
        <rect x="148" y="72" width="4" height="4" fill="#D9F0ED" className="animate-pixel-pulse" />

        {/* Symmetrical Stepped Pedestals Above & Below */}
        {/* Top Stepped Pedestal */}
        <rect x="116" y="28" width="68" height="8" fill="#171717" />
        <rect x="124" y="20" width="52" height="8" fill="#171717" />
        <rect x="136" y="12" width="28" height="8" fill="#171717" />
        <rect x="144" y="4" width="12" height="8" fill="#087F82" />
        <rect x="146" y="6" width="4" height="4" fill="#0AB5B8" />

        {/* Bottom Stepped Pedestal */}
        <rect x="116" y="108" width="68" height="8" fill="#171717" />
        <rect x="124" y="116" width="52" height="8" fill="#171717" />
        <rect x="136" y="124" width="28" height="8" fill="#171717" />
        <rect x="144" y="132" width="12" height="8" fill="#087F82" />
        <rect x="146" y="134" width="4" height="4" fill="#0AB5B8" />

        {/* Left & Right Satellite Redstone / Diamond Relays */}
        {/* Left Relay Block */}
        <rect x="20" y="60" width="20" height="24" fill="#171717" />
        <rect x="24" y="64" width="12" height="16" fill="#087F82" />
        <rect x="26" y="66" width="4" height="4" fill="#0AB5B8" />
        <rect x="28" y="72" width="4" height="4" fill="#FFFFFF" className="animate-pixel-pulse" />

        <rect x="16" y="44" width="8" height="8" fill="#42443F" />
        <rect x="16" y="92" width="8" height="8" fill="#42443F" />

        {/* Right Relay Block */}
        <rect x="260" y="60" width="20" height="24" fill="#171717" />
        <rect x="264" y="64" width="12" height="16" fill="#087F82" />
        <rect x="266" y="66" width="4" height="4" fill="#0AB5B8" />
        <rect x="268" y="72" width="4" height="4" fill="#FFFFFF" className="animate-pixel-pulse-delayed" />

        <rect x="276" y="44" width="8" height="8" fill="#42443F" />
        <rect x="276" y="92" width="8" height="8" fill="#42443F" />

        {/* Quadrant Voxel Ticks */}
        <rect x="80" y="24" width="8" height="8" fill="#087F82" />
        <rect x="212" y="24" width="8" height="8" fill="#087F82" />
        <rect x="80" y="112" width="8" height="8" fill="#087F82" />
        <rect x="212" y="112" width="8" height="8" fill="#087F82" />
      </svg>

      {/* Bottom Technical Status Readout */}
      <div className="w-full flex items-center justify-between pt-2 mt-2 border-t-2 border-[#171717] font-mono text-[9px] text-[#85877F]">
        <span>RES-ARRAY: 25x12 VOXELS</span>
        <span className="text-[#141414] font-bold">58°12'N 04°22'W</span>
      </div>
    </div>
  );
};

export default PixelSignalMatrix;
