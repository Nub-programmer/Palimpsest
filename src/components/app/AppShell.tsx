import React, { useState } from 'react';
import PixelInsignia from '../PixelInsignia';
import AnimatedPixelBackground from '../AnimatedPixelBackground';
import {
  PixelIconCube,
  PixelIconBook,
  PixelIconAtlas,
  PixelIconClock,
  PixelIconSwords,
  PixelIconCaseboard,
  PixelIconNotes,
  PixelIconRedstone,
  PixelIconSettings
} from '../PixelIcons';
import { useInvestigation } from '../../context/InvestigationContext';
import { StructuralForm } from '../../types';

interface AppShellProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onExitToLanding: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onNavigate,
  onExitToLanding,
  children,
}) => {
  const { 
    effectiveForm, 
    previewForm, 
    setPreviewForm, 
    latestNotification, 
    clearNotification,
    pinnedItems
  } = useInvestigation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', Icon: PixelIconCube },
    { id: 'archive', label: 'EVIDENCE ARCHIVE', Icon: PixelIconBook },
    { id: 'atlas', label: 'RELATION ATLAS', Icon: PixelIconAtlas },
    { id: 'chronicle', label: 'CHRONICLE', Icon: PixelIconClock },
    { id: 'compare', label: 'CROSS-EXAM', Icon: PixelIconSwords },
    { id: 'caseboard', label: `CASEBOARD (${pinnedItems.length})`, Icon: PixelIconCaseboard },
    { id: 'notes', label: 'FIELD NOTES', Icon: PixelIconNotes },
    { id: 'evolution', label: 'EVOLUTION LAB', Icon: PixelIconRedstone },
    { id: 'settings', label: 'SETTINGS', Icon: PixelIconSettings },
  ];

  const formLabels: Record<StructuralForm, string> = {
    ledger: 'LEDGER',
    dossier: 'DOSSIER',
    atlas: 'RELATION ATLAS',
    console: 'SIGNAL CONSOLE',
    chronicle: 'CHRONICLE',
    compare: 'CROSS-EXAMINATION',
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] bg-graph-paper text-[#141414] flex flex-col select-none relative overflow-x-hidden">
      {/* Ambient Pixel World Background in App */}
      <AnimatedPixelBackground variant="app" className="opacity-50" />
      
      {/* Top Application Header Bar */}
      <header className="h-16 md:h-18 bg-white/95 border-b-2 border-[#171717] px-4 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm backdrop-blur-xs">
        
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-[#171717] bg-[#F0F0E9] text-xs font-mono font-bold"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <button 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <PixelInsignia size={26} showWordmark={false} />
            <div className="flex flex-col ml-1 border-l border-[#E6E6DF] pl-3">
              <span className="font-pixel-arcade text-[10px] text-[#141414] tracking-tight">
                PALIMPSEST
              </span>
              <span className="font-mono text-[9px] text-[#85877F] tracking-widest uppercase">
                CASE 09 // ACTIVE
              </span>
            </div>
          </button>
        </div>

        {/* Center: Live Behavioural Adaptation Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('evolution')}
            className="btn-tactile flex items-center gap-2 px-3 py-1.5 bg-[#F0F0E9] border-2 border-[#171717] shadow-pixel-sm text-xs font-mono cursor-pointer pixel-corners-sm"
            title="Click to view behavioural telemetry"
          >
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] animate-pixel-pulse"></span>
            <span className="text-[#85877F] hidden md:inline font-pixel text-[10px]">FORM:</span>
            <span className="font-pixel-arcade text-[10px] text-[#087F82] font-bold">
              {formLabels[effectiveForm]}
            </span>
            {previewForm && (
              <span className="text-[9px] bg-[#087F82] text-white px-1.5 py-0.2 font-pixel-arcade font-bold uppercase">
                PREVIEW
              </span>
            )}
          </button>

          {previewForm && (
            <button
              onClick={() => setPreviewForm(null)}
              className="text-[10px] font-pixel text-[#85877F] hover:text-[#141414] underline"
            >
              Exit Preview
            </button>
          )}
        </div>

        {/* Right: Return to Public Landing Page */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToLanding}
            className="btn-tactile bg-white hover:bg-[#F0F0E9] text-[#141414] border-2 border-[#171717] shadow-pixel-sm px-3 sm:px-4 py-2 font-pixel text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer pixel-corners-sm"
          >
            <span className="hidden sm:inline">PUBLIC</span> SITE ↗
          </button>
        </div>
      </header>

      {/* Evolution Mutation Notification Toast */}
      {latestNotification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-md bg-white border-2 border-[#087F82] shadow-pixel p-4 font-mono text-xs flex items-start justify-between gap-3 animate-in slide-in-from-top-4 duration-200 pixel-corners-sm">
          <div className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] mt-1 shrink-0"></span>
            <div>
              <div className="font-pixel text-[#087F82] text-[10px] uppercase tracking-wider mb-0.5">
                TOPOLOGY RECONFIGURED
              </div>
              <div className="text-[#141414] leading-relaxed">
                {latestNotification}
              </div>
            </div>
          </div>
          <button
            onClick={clearNotification}
            className="text-[#85877F] hover:text-[#141414] font-bold text-sm leading-none p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex w-full">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r-2 border-[#171717] p-4 shrink-0">
          <div className="text-[10px] font-pixel text-[#85877F] tracking-widest uppercase mb-3 px-2">
            WORKSPACE WORKFLOW
          </div>

          <nav className="flex flex-col gap-2 font-pixel text-[11px]">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const IconComp = item.Icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`btn-tactile btn-minecraft group w-full px-3 py-2.5 text-left font-bold flex items-center gap-3 border-2 transition-colors cursor-pointer pixel-corners-sm ${
                    isActive
                      ? 'bg-[#087F82] text-white border-[#171717] shadow-pixel-sm'
                      : 'bg-white text-[#141414] border-[#171717] hover:bg-[#F0F0E9]'
                  }`}
                >
                  <IconComp size={16} color={isActive ? '#FFFFFF' : '#171717'} />
                  <span className="truncate">{item.label}</span>
                  {isActive ? (
                    <span className="w-2 h-2 bg-white border border-[#171717] animate-nav-beacon ml-auto shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 bg-[#087F82] opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Case Status Box in Sidebar (Minecraft Inventory Slot Motif) */}
          <div className="mt-auto pt-4 border-t-2 border-[#171717] font-mono text-[11px] text-[#85877F] flex flex-col gap-2">
            <div className="bg-[#F0F0E9] border-2 border-[#171717] p-2.5 pixel-corners-sm space-y-1.5 shadow-pixel-sm">
              <div className="flex justify-between items-center text-[10px] font-pixel">
                <span>RECORDS:</span>
                <span className="text-[#141414] font-bold">12 / 12</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-pixel">
                <span>PINNED:</span>
                <span className="text-[#087F82] font-bold">{pinnedItems.length}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-pixel">
                <span>BLACKOUT:</span>
                <span className="text-red-700 font-bold">00:09:00</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-[#141414]/40 z-40" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-white border-b-2 border-[#171717] p-4 max-w-sm w-full flex flex-col gap-2 font-pixel text-[10px] shadow-pixel-lg" onClick={(e) => e.stopPropagation()}>
              <div className="text-[9px] text-[#85877F] uppercase tracking-wider mb-1">
                NAVIGATE WORKSPACE
              </div>
              {navItems.map((item) => {
                const IconComp = item.Icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`btn-tactile px-3 py-2 text-left font-bold border-2 flex items-center justify-between gap-2 pixel-corners-sm ${
                      isActive
                        ? 'bg-[#087F82] text-white border-[#171717]'
                        : 'bg-[#F0F0E9] text-[#141414] border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComp size={14} color={isActive ? '#FFFFFF' : '#171717'} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-white border border-[#171717] animate-nav-beacon" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Workspace Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto relative z-10">
          <div key={`${currentView}-${effectiveForm}`} className="animate-form-settle">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AppShell;
