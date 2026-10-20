import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

export const SettingsView: React.FC = () => {
  const {
    reducedMotion,
    setReducedMotion,
    resetLayout,
    resetProfile,
    resetAll,
  } = useInvestigation();

  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const triggerReset = (type: 'layout' | 'profile' | 'all') => {
    if (type === 'layout') {
      resetLayout();
      setFeedbackMsg('Layout reset to default LEDGER mode.');
    } else if (type === 'profile') {
      resetProfile();
      setFeedbackMsg('Behavioural telemetry profile reset.');
    } else if (type === 'all') {
      resetAll();
      setFeedbackMsg('All local investigation data, notes, and profile erased.');
    }
    setConfirmDialog(null);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl select-none">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel pixel-corners-sm">
        <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1">
          <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
          <span>SYSTEM PREFERENCES & LOCAL DATA CONTROLS</span>
        </div>
        <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
          PALIMPSEST CONFIGURATION
        </h1>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-[#D9F0ED] border-2 border-[#087F82] font-pixel text-[10px] text-[#087F82] font-bold pixel-corners-sm shadow-pixel-sm">
          ✓ {feedbackMsg}
        </div>
      )}

      {/* Preferences Section */}
      <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 space-y-6 pixel-corners-sm">
        <h2 className="font-display font-bold text-lg text-[#141414] pb-2 border-b-2 border-[#171717]">
          ACCESSIBILITY & MOTION
        </h2>

        {/* Reduced Motion Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-pixel text-[11px] font-bold text-[#141414]">
              REDUCED MOTION OVERRIDE
            </div>
            <div className="text-xs text-[#42443F] mt-0.5 font-mono">
              Disables WebGL canvas motion, glitch bursts, and ambient animations.
            </div>
          </div>

          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`btn-tactile btn-minecraft px-4 py-2 font-pixel text-[10px] font-bold uppercase border-2 border-[#171717] cursor-pointer pixel-corners-sm ${
              reducedMotion
                ? 'bg-[#087F82] text-white shadow-pixel-sm'
                : 'bg-[#F0F0E9] text-[#141414]'
            }`}
          >
            {reducedMotion ? 'ON (REDUCED)' : 'OFF (STANDARD)'}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 space-y-4 pixel-corners-sm">
        <h2 className="font-display font-bold text-lg text-[#141414] pb-2 border-b-2 border-[#171717]">
          INVESTIGATIVE KEYBOARD COMMANDS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] flex justify-between items-center pixel-corners-sm">
            <span className="text-[#42443F] font-pixel text-[10px]">GLOBAL SEARCH:</span>
            <kbd className="px-2.5 py-1 bg-[#F0F0E9] border-2 border-[#171717] font-pixel text-[9px] shadow-pixel-sm pixel-corners-sm">ESC / /</kbd>
          </div>
          <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] flex justify-between items-center pixel-corners-sm">
            <span className="text-[#42443F] font-pixel text-[10px]">SWITCH WORKSPACE:</span>
            <kbd className="px-2.5 py-1 bg-[#F0F0E9] border-2 border-[#171717] font-pixel text-[9px] shadow-pixel-sm pixel-corners-sm">TAB</kbd>
          </div>
          <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] flex justify-between items-center pixel-corners-sm">
            <span className="text-[#42443F] font-pixel text-[10px]">ACTION INSPECTION:</span>
            <kbd className="px-2.5 py-1 bg-[#F0F0E9] border-2 border-[#171717] font-pixel text-[9px] shadow-pixel-sm pixel-corners-sm">CLICK ITEM</kbd>
          </div>
          <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] flex justify-between items-center pixel-corners-sm">
            <span className="text-[#42443F] font-pixel text-[10px]">PIN ARTIFACT:</span>
            <kbd className="px-2.5 py-1 bg-[#F0F0E9] border-2 border-[#171717] font-pixel text-[9px] shadow-pixel-sm pixel-corners-sm">P</kbd>
          </div>
        </div>
      </div>

      {/* Local Storage & Data Resets */}
      <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 space-y-6 pixel-corners-sm">
        <h2 className="font-display font-bold text-lg text-[#141414] pb-2 border-b-2 border-[#171717]">
          DATA PERSISTENCE & LOCAL ENGINE CONTROLS
        </h2>

        {/* Reset Layout Only */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <div className="font-pixel text-[10px] font-bold text-[#141414]">
              RESET STRUCTURAL FORM ONLY
            </div>
            <div className="text-xs text-[#42443F] font-mono mt-0.5">
              Returns the interface to the neutral LEDGER matrix without clearing notes, pins, or case theory.
            </div>
          </div>

          <button
            onClick={() => triggerReset('layout')}
            className="btn-tactile btn-minecraft px-3.5 py-2 bg-[#F0F0E9] hover:bg-white text-[10px] font-pixel font-bold text-[#141414] border-2 border-[#171717] cursor-pointer pixel-corners-sm"
          >
            RESET LAYOUT
          </button>
        </div>

        {/* Reset Profile Only */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-[#171717]">
          <div>
            <div className="font-pixel text-[10px] font-bold text-[#141414]">
              CLEAR BEHAVIOURAL TELEMETRY PROFILE
            </div>
            <div className="text-xs text-[#42443F] font-mono mt-0.5">
              Wipes observed dwell times, query scores, and transformation history to re-calibrate adaptation.
            </div>
          </div>

          <button
            onClick={() => triggerReset('profile')}
            className="btn-tactile btn-minecraft px-3.5 py-2 bg-[#F0F0E9] hover:bg-white text-[10px] font-pixel font-bold text-amber-800 border-2 border-[#171717] cursor-pointer pixel-corners-sm"
          >
            CLEAR PROFILE
          </button>
        </div>

        {/* Master Reset All Data */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-[#171717]">
          <div>
            <div className="font-pixel text-[10px] font-bold text-red-700">
              MASTER FACTORY RESET
            </div>
            <div className="text-xs text-[#42443F] font-mono mt-0.5">
              Erase all local storage data, custom notes, pinned findings, case theory drafts, and scores.
            </div>
          </div>

          <button
            onClick={() => setConfirmDialog('all')}
            className="btn-tactile btn-minecraft px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white text-[10px] font-pixel font-bold border-2 border-[#171717] cursor-pointer pixel-corners-sm"
          >
            FACTORY RESET ⚠
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDialog === 'all' && (
        <div className="fixed inset-0 bg-[#141414]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-red-700 p-6 max-w-md w-full shadow-pixel-lg pixel-corners-sm">
            <h3 className="font-pixel-arcade text-sm text-red-700 mb-3">
              CONFIRM MASTER FACTORY RESET
            </h3>
            <p className="text-xs text-[#42443F] mb-6 leading-relaxed font-mono">
              Are you sure you want to erase all case findings, pinned artifacts, research memos, and behavioural telemetry from your browser's local storage? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setConfirmDialog(null)}
                className="btn-tactile btn-minecraft px-3.5 py-2 bg-[#F0F0E9] border-2 border-[#171717] font-pixel text-[10px] font-bold cursor-pointer pixel-corners-sm"
              >
                CANCEL
              </button>
              <button
                onClick={() => triggerReset('all')}
                className="btn-tactile btn-minecraft px-4 py-2 bg-red-700 text-white border-2 border-[#171717] font-pixel text-[10px] font-bold cursor-pointer pixel-corners-sm"
              >
                CONFIRM WIPE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsView;
