import React from 'react';

interface PixelIconProps {
  size?: number;
  className?: string;
  color?: string;
}

// 1. Minecraft Cube / Block Icon (for Dashboard)
export const PixelIconCube: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Top Face */}
    <rect x="5" y="1" width="6" height="2" fill={color} />
    <rect x="3" y="3" width="10" height="2" fill={color} />
    <rect x="5" y="3" width="6" height="2" fill="#0AB5B8" />
    {/* Body */}
    <rect x="1" y="5" width="14" height="2" fill={color} />
    <rect x="1" y="7" width="14" height="6" fill={color} />
    {/* Inner facets */}
    <rect x="3" y="6" width="4" height="5" fill="#087F82" />
    <rect x="9" y="6" width="4" height="5" fill="#06676A" />
    <rect x="7" y="5" width="2" height="7" fill="#171717" />
    {/* Bottom Base */}
    <rect x="3" y="13" width="10" height="2" fill={color} />
  </svg>
);

// 2. Minecraft Book / Dossier Icon (for Archive)
export const PixelIconBook: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Leather Book Cover */}
    <rect x="2" y="1" width="12" height="14" fill={color} />
    {/* Book Pages */}
    <rect x="4" y="3" width="8" height="10" fill="#FFFFFF" />
    <rect x="7" y="3" width="2" height="10" fill="#E6E6DF" />
    {/* Teal Bookmark Ribbon */}
    <rect x="7" y="1" width="2" height="6" fill="#087F82" />
    {/* Text Lines */}
    <rect x="5" y="5" width="2" height="1" fill="#42443F" />
    <rect x="5" y="7" width="2" height="1" fill="#42443F" />
    <rect x="9" y="5" width="2" height="1" fill="#42443F" />
    <rect x="9" y="7" width="2" height="1" fill="#42443F" />
    <rect x="9" y="9" width="2" height="1" fill="#42443F" />
    {/* Corner clasp */}
    <rect x="12" y="7" width="2" height="2" fill="#0AB5B8" />
  </svg>
);

// 3. Minecraft Compass / Atlas Nodes Icon (for Atlas)
export const PixelIconAtlas: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Outer Frame */}
    <rect x="4" y="1" width="8" height="2" fill={color} />
    <rect x="2" y="3" width="12" height="2" fill={color} />
    <rect x="1" y="5" width="14" height="6" fill={color} />
    <rect x="2" y="11" width="12" height="2" fill={color} />
    <rect x="4" y="13" width="8" height="2" fill={color} />
    {/* Dial Interior */}
    <rect x="3" y="3" width="10" height="10" fill="#F0F0E9" />
    {/* Compass Needle (Redstone / Diamond) */}
    <rect x="7" y="3" width="2" height="5" fill="#087F82" />
    <rect x="7" y="4" width="2" height="2" fill="#0AB5B8" />
    <rect x="7" y="8" width="2" height="5" fill="#85877F" />
    <rect x="6" y="7" width="4" height="2" fill="#171717" />
    {/* Cardinal Pips */}
    <rect x="7" y="2" width="2" height="1" fill="#087F82" />
    <rect x="13" y="7" width="1" height="2" fill="#171717" />
    <rect x="7" y="13" width="2" height="1" fill="#171717" />
    <rect x="2" y="7" width="1" height="2" fill="#171717" />
  </svg>
);

// 4. Minecraft Pocket Watch / Clock (for Chronicle)
export const PixelIconClock: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Crown */}
    <rect x="7" y="0" width="2" height="2" fill={color} />
    {/* Watch Casing */}
    <rect x="4" y="2" width="8" height="2" fill={color} />
    <rect x="2" y="4" width="12" height="8" fill={color} />
    <rect x="4" y="12" width="8" height="2" fill={color} />
    {/* Golden/White Clock Dial */}
    <rect x="4" y="4" width="8" height="8" fill="#FFFFFF" />
    {/* Clock Hands */}
    <rect x="7" y="5" width="2" height="4" fill="#087F82" />
    <rect x="7" y="7" width="4" height="2" fill="#171717" />
    <rect x="7" y="7" width="2" height="2" fill="#0AB5B8" />
  </svg>
);

// 5. Minecraft Crossed Swords / Dual Balances (for Compare / Cross-Exam)
export const PixelIconSwords: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Blade 1 (Diagonal Left to Right) */}
    <rect x="12" y="1" width="3" height="3" fill="#0AB5B8" />
    <rect x="10" y="3" width="3" height="3" fill="#087F82" />
    <rect x="8" y="5" width="3" height="3" fill="#087F82" />
    <rect x="6" y="7" width="3" height="3" fill="#171717" />
    {/* Hilt & Pommel 1 */}
    <rect x="3" y="10" width="4" height="2" fill="#85877F" />
    <rect x="4" y="9" width="2" height="4" fill="#85877F" />
    <rect x="2" y="12" width="3" height="3" fill={color} />

    {/* Blade 2 (Diagonal Right to Left) */}
    <rect x="1" y="1" width="3" height="3" fill="#0AB5B8" />
    <rect x="3" y="3" width="3" height="3" fill="#087F82" />
    <rect x="5" y="5" width="3" height="3" fill="#087F82" />
    {/* Hilt & Pommel 2 */}
    <rect x="9" y="10" width="4" height="2" fill="#85877F" />
    <rect x="10" y="9" width="2" height="4" fill="#85877F" />
    <rect x="11" y="12" width="3" height="3" fill={color} />
  </svg>
);

// 6. Minecraft Pinboard / Item Frame (for Caseboard)
export const PixelIconCaseboard: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Wooden Frame */}
    <rect x="1" y="1" width="14" height="14" fill={color} />
    {/* Leather Canvas */}
    <rect x="3" y="3" width="10" height="10" fill="#F0F0E9" />
    {/* Pinned Note */}
    <rect x="5" y="5" width="6" height="6" fill="#FFFFFF" />
    {/* Red/Teal Pushpin */}
    <rect x="7" y="4" width="2" height="2" fill="#087F82" />
    <rect x="6" y="7" width="4" height="1" fill="#42443F" />
    <rect x="6" y="9" width="3" height="1" fill="#42443F" />
  </svg>
);

// 7. Minecraft Quill & Parchment (for Notes)
export const PixelIconNotes: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Parchment Sheet */}
    <rect x="1" y="3" width="10" height="12" fill={color} />
    <rect x="2" y="4" width="8" height="10" fill="#FFFFFF" />
    {/* Notes Text */}
    <rect x="3" y="6" width="5" height="1" fill="#85877F" />
    <rect x="3" y="8" width="6" height="1" fill="#85877F" />
    <rect x="3" y="10" width="4" height="1" fill="#85877F" />
    {/* Feather Quill */}
    <rect x="12" y="1" width="3" height="4" fill="#087F82" />
    <rect x="10" y="4" width="3" height="3" fill="#0AB5B8" />
    <rect x="8" y="7" width="3" height="3" fill="#171717" />
    <rect x="7" y="10" width="2" height="2" fill="#087F82" />
  </svg>
);

// 8. Minecraft Redstone Repeater / Potion / Spark (for Evolution Lab)
export const PixelIconRedstone: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Stone Base */}
    <rect x="1" y="10" width="14" height="4" fill="#85877F" />
    <rect x="1" y="13" width="14" height="2" fill={color} />
    {/* Redstone Dust Line */}
    <rect x="3" y="10" width="10" height="1" fill="#087F82" />
    {/* Left Torch */}
    <rect x="4" y="6" width="2" height="4" fill="#42443F" />
    <rect x="3" y="4" width="4" height="2" fill="#087F82" />
    <rect x="4" y="3" width="2" height="1" fill="#0AB5B8" />
    {/* Right Adjustable Torch */}
    <rect x="10" y="6" width="2" height="4" fill="#42443F" />
    <rect x="9" y="4" width="4" height="2" fill="#087F82" />
    <rect x="10" y="3" width="2" height="1" fill="#0AB5B8" />
    {/* Center Signal Spark */}
    <rect x="7" y="1" width="2" height="2" fill="#0AB5B8" />
  </svg>
);

// 9. Minecraft Blocky Cog / Gear (for Settings)
export const PixelIconSettings: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    {/* Outer Gear Teeth */}
    <rect x="6" y="0" width="4" height="2" fill={color} />
    <rect x="6" y="14" width="4" height="2" fill={color} />
    <rect x="0" y="6" width="2" height="4" fill={color} />
    <rect x="14" y="6" width="2" height="4" fill={color} />
    {/* Diagonal Teeth */}
    <rect x="2" y="2" width="2" height="2" fill={color} />
    <rect x="12" y="2" width="2" height="2" fill={color} />
    <rect x="2" y="12" width="2" height="2" fill={color} />
    <rect x="12" y="12" width="2" height="2" fill={color} />
    {/* Main Gear Ring */}
    <rect x="3" y="3" width="10" height="10" fill={color} />
    <rect x="5" y="5" width="6" height="6" fill="#F0F0E9" />
    {/* Axle Center */}
    <rect x="7" y="7" width="2" height="2" fill="#087F82" />
  </svg>
);

// 10. Minecraft Diamond Gem
export const PixelIconDiamond: React.FC<PixelIconProps> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    <rect x="5" y="2" width="6" height="2" fill="#06676A" />
    <rect x="3" y="4" width="10" height="3" fill="#087F82" />
    <rect x="2" y="7" width="12" height="3" fill="#087F82" />
    <rect x="4" y="10" width="8" height="2" fill="#087F82" />
    <rect x="6" y="12" width="4" height="2" fill="#06676A" />
    <rect x="7" y="14" width="2" height="1" fill="#171717" />
    {/* Highlights */}
    <rect x="5" y="4" width="4" height="2" fill="#0AB5B8" />
    <rect x="6" y="5" width="2" height="2" fill="#FFFFFF" />
    <rect x="3" y="7" width="2" height="2" fill="#0AB5B8" />
  </svg>
);

// 11. Pixel Magnifier / Search
export const PixelIconSearch: React.FC<PixelIconProps> = ({ size = 16, className = '', color = '#171717' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated' }}
    aria-hidden="true"
  >
    <rect x="3" y="1" width="6" height="2" fill={color} />
    <rect x="1" y="3" width="2" height="6" fill={color} />
    <rect x="9" y="3" width="2" height="6" fill={color} />
    <rect x="3" y="9" width="6" height="2" fill={color} />
    <rect x="3" y="3" width="6" height="6" fill="#D9F0ED" />
    <rect x="4" y="4" width="2" height="2" fill="#FFFFFF" />
    {/* Handle */}
    <rect x="8" y="8" width="3" height="3" fill={color} />
    <rect x="10" y="10" width="3" height="3" fill="#087F82" />
    <rect x="12" y="12" width="3" height="3" fill={color} />
  </svg>
);
