import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { 
    evidence, 
    activeArtifact, 
    setActiveArtifactId, 
    pinnedItems, 
    scores, 
    effectiveForm, 
    transformations,
    caseTheory 
  } = useInvestigation();

  const recentRecords = evidence.slice(0, 4);

  return (
    <div className="flex flex-col gap-8 w-full select-none">
      
      {/* Top Banner: Case Identity & Continue Action */}
      <div className="bg-white border-2 border-[#171717] p-6 md:p-8 shadow-pixel flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-2.5">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span className="font-bold text-[#141414]">CASE 09: THE MISSING NINE MINUTES</span>
            <span>·</span>
            <span>BLACKWOOD DEEP-CORE OBSERVATORY</span>
          </div>

          <h1 className="font-pixel-arcade text-lg sm:text-2xl md:text-3xl text-[#141414] tracking-tight leading-snug">
            INVESTIGATION COMMAND DESK
          </h1>

          <p className="text-sm text-[#42443F] max-w-2xl mt-3 leading-relaxed font-mono">
            Incident window: October 14, 2026, 23:41:00 to 23:50:00 UTC. Unregistered biological/crystalline extraction verified. System telemetry overwritten with 0x00 pattern.
          </p>
        </div>

        {/* Primary Continue Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => {
              setActiveArtifactId(activeArtifact.id);
              onNavigate('archive');
            }}
            className="btn-tactile btn-minecraft bg-[#087F82] hover:bg-[#06676A] text-white border-2 border-[#171717] shadow-pixel px-6 py-3.5 font-pixel text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer pixel-corners-sm"
          >
            <span>CONTINUE INVESTIGATION</span>
            <span className="font-pixel-arcade text-xs">▶</span>
          </button>

          <button
            onClick={() => onNavigate('atlas')}
            className="btn-tactile btn-minecraft bg-[#F0F0E9] hover:bg-white text-[#141414] border-2 border-[#171717] shadow-pixel-sm px-4 py-3.5 font-pixel text-[11px] font-bold tracking-wider uppercase cursor-pointer text-center pixel-corners-sm"
          >
            OPEN ATLAS
          </button>
        </div>
      </div>

      {/* Asymmetric Middle Grid: Evidence Stack & Relation Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Evidence Records (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
              <h2 className="font-display font-bold text-lg text-[#141414] flex items-center gap-2">
                <span>RECOVERED EVIDENCE DOSSIERS</span>
                <span className="font-pixel text-[10px] text-[#85877F]">({evidence.length} TOTAL)</span>
              </h2>
              <button
                onClick={() => onNavigate('archive')}
                className="font-pixel text-[10px] text-[#087F82] font-bold hover:underline cursor-pointer"
              >
                VIEW ARCHIVE ▶
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {recentRecords.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveArtifactId(item.id);
                    onNavigate('archive');
                  }}
                  className="p-3.5 bg-[#F7F7F2] border-2 border-[#171717] hover:border-[#087F82] hover:bg-white transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 group pixel-corners-sm"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#85877F] mb-1">
                      <span className="font-bold text-[#141414]">{item.code}</span>
                      <span>·</span>
                      <span className="text-[#087F82] font-semibold uppercase">{item.category}</span>
                      <span>·</span>
                      <span>{item.displayTime}</span>
                    </div>
                    <div className="font-display font-semibold text-sm text-[#141414] group-hover:text-[#087F82] transition-colors">
                      {item.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="text-[11px] text-[#85877F]">CRED: {item.credibility}%</span>
                    <span className="text-[#087F82] font-bold group-hover:translate-x-0.5 transition-transform">▶</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-xs text-[#85877F]">
            <span>LAST INSPECTED: <strong className="text-[#141414]">{activeArtifact.code}</strong></span>
            <span className="text-[#087F82] font-pixel text-[10px]">CLICK ANY ITEM TO READ</span>
          </div>
        </div>

        {/* Right Column: Mini Interactive Relation Graph Preview (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-3">
              <h2 className="font-display font-bold text-lg text-[#141414]">
                RELATION NETWORK
              </h2>
              <button
                onClick={() => onNavigate('atlas')}
                className="font-pixel text-[10px] text-[#087F82] font-bold hover:underline cursor-pointer"
              >
                EXPAND ATLAS ▶
              </button>
            </div>

            {/* Miniature Interactive Graph Preview */}
            <div 
              onClick={() => onNavigate('atlas')}
              className="w-full bg-[#F7F7F2] border-2 border-[#171717] p-2 cursor-pointer relative group overflow-hidden pixel-corners-sm"
              style={{ minHeight: '210px' }}
            >
              <svg viewBox="0 0 380 200" className="w-full h-48">
                {/* Lines */}
                <line x1="80" y1="60" x2="190" y2="40" stroke="#191919" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="190" y1="40" x2="300" y2="70" stroke="#078286" strokeWidth="2" />
                <line x1="190" y1="40" x2="190" y2="150" stroke="#191919" strokeWidth="2" />
                <line x1="80" y1="60" x2="190" y2="150" stroke="#078286" strokeWidth="1.5" />
                <line x1="190" y1="150" x2="300" y2="140" stroke="#191919" strokeWidth="1.5" />

                {/* Nodes */}
                <circle cx="80" cy="60" r="14" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                <text x="80" y="64" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold">01</text>
                <text x="80" y="86" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#42443F">Vance</text>

                <circle cx="190" cy="40" r="16" fill="#D9F0ED" stroke="#078286" strokeWidth="2.5" />
                <text x="190" y="44" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#078286">04</text>
                <text x="190" y="20" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#078286">Gamma-7</text>

                <circle cx="300" cy="70" r="14" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                <text x="300" y="74" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold">03</text>
                <text x="300" y="96" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#42443F">Uplink</text>

                <circle cx="190" cy="150" r="15" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                <text x="190" y="154" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold">05</text>
                <text x="190" y="178" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#42443F">Mara Lin</text>

                <circle cx="300" cy="140" r="14" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                <text x="300" y="144" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold">08</text>
                <text x="300" y="166" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#42443F">Wipe</text>
              </svg>

              <div className="absolute inset-0 bg-[#078286]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-mono text-xs font-bold text-[#078286] bg-white/70">
                CLICK TO LAUNCH FULL GRAPH EXPLORER ↗
              </div>
            </div>
          </div>

          <div className="mt-3 font-mono text-[11px] text-[#85877F] flex items-center justify-between">
            <span>CONTRADICTIONS FLAGGED: <strong className="text-red-700">2</strong></span>
            <span>NODES LINKED: <strong>12</strong></span>
          </div>
        </div>

      </div>

      {/* Bottom Row: Pinned Findings + Case Theory + Behaviour Diagnostic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Panel 1: Pinned Findings */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#171717] mb-3">
              <span className="font-display font-bold text-base text-[#141414]">PINNED FINDINGS</span>
              <button
                onClick={() => onNavigate('caseboard')}
                className="font-pixel text-[10px] text-[#087F82] font-bold hover:underline cursor-pointer"
              >
                BOARD ({pinnedItems.length}) ▶
              </button>
            </div>

            <div className="space-y-2">
              {pinnedItems.length === 0 ? (
                <div className="p-4 bg-[#F0F0E9] border-2 border-dashed border-[#171717] text-center font-mono text-xs text-[#85877F] pixel-corners-sm">
                  NO PINS YET. PIN FROM ARCHIVE OR CROSS-EXAM.
                </div>
              ) : (
                pinnedItems.slice(0, 3).map((pin) => (
                  <div key={pin.id} className="p-2.5 bg-[#F0F0E9] border-2 border-[#171717] font-mono text-xs pixel-corners-sm">
                    <div className="flex justify-between font-bold text-[#141414] mb-1 text-[11px]">
                      <span>{pin.code}</span>
                      <span className="text-[#087F82] font-pixel text-[9px]">{pin.category.toUpperCase()}</span>
                    </div>
                    <div className="text-[#42443F] text-[11px] truncate">
                      {pin.title}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-2 border-t-2 border-[#171717] font-pixel text-[10px] text-[#85877F]">
            EVIDENCE SECURED ON CASEBOARD
          </div>
        </div>

        {/* Panel 2: Case Theory Notebook Preview */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#171717] mb-3">
              <span className="font-display font-bold text-base text-[#141414]">WORKING THEORY</span>
              <button
                onClick={() => onNavigate('caseboard')}
                className="font-pixel text-[10px] text-[#087F82] font-bold hover:underline cursor-pointer"
              >
                EDIT ▶
              </button>
            </div>

            <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] font-mono text-xs text-[#42443F] leading-relaxed line-clamp-5 pixel-corners-sm">
              "{caseTheory}"
            </div>
          </div>

          <div className="mt-4 pt-2 border-t-2 border-[#171717] font-mono text-[11px] text-[#85877F] flex justify-between">
            <span>SAVED LOCALLY</span>
            <span className="text-[#087F82] font-bold">ACTIVE DRAFT</span>
          </div>
        </div>

        {/* Panel 3: Evolution Engine Mini Telemetry */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#171717] mb-3">
              <span className="font-display font-bold text-base text-[#141414]">ENGINE STATUS</span>
              <button
                onClick={() => onNavigate('evolution')}
                className="font-pixel text-[10px] text-[#087F82] font-bold hover:underline cursor-pointer"
              >
                DETAILS ▶
              </button>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center pb-1 border-b border-[#E6E6DF]">
                <span className="font-pixel text-[10px]">ACTIVE FORM:</span>
                <span className="font-pixel text-[10px] text-[#087F82] font-bold uppercase">{effectiveForm}</span>
              </div>
              {[
                { label: 'DEEP READING', val: scores.dossier },
                { label: 'RELATION TRAVERSAL', val: scores.atlas },
                { label: 'SEARCH VELOCITY', val: scores.console },
                { label: 'CHRONOLOGY', val: scores.chronicle },
                { label: 'CROSS-EXAM', val: scores.compare },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#85877F]">{m.label}</span>
                    <span className="font-bold text-[#141414]">{m.val}%</span>
                  </div>
                  {/* Minecraft XP Segmented Bar */}
                  <div className="w-full h-1.5 bg-[#E6E6DF] border border-[#171717] overflow-hidden">
                    <div
                      className="h-full bg-[#087F82]"
                      style={{
                        width: `${Math.max(5, m.val)}%`,
                        backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 4px, #0AB5B8 4px, #0AB5B8 6px)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t-2 border-[#171717] font-mono text-[10px] text-[#85877F]">
            MUTATIONS RECORDED: <strong className="text-[#141414]">{transformations.length}</strong>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardView;
