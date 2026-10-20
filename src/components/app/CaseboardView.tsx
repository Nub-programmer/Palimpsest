import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

interface CaseboardViewProps {
  onOpenDocument: (id: string) => void;
  onNavigateToNotes: () => void;
}

export const CaseboardView: React.FC<CaseboardViewProps> = ({ 
  onOpenDocument,
  onNavigateToNotes 
}) => {
  const { 
    pinnedItems, 
    togglePinArtifact, 
    caseTheory, 
    setCaseTheory, 
    notes,
    evidence 
  } = useInvestigation();

  const [localTheory, setLocalTheory] = useState<string>(caseTheory);
  const [saveStatus, setSaveStatus] = useState<string>('Saved to local archive');

  const handleTheoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalTheory(val);
    setSaveStatus('Saving changes...');
    setCaseTheory(val);
    setTimeout(() => {
      setSaveStatus('Saved to local archive');
    }, 600);
  };

  const hypothesisChecklist = [
    {
      id: 'h1',
      title: 'Hypothesis A: Corporate Extraction for Obsidian Synthetics',
      description: 'Vance acted under contract with Dr. Henrik Vandermeer to extract Sample 882-B inside Container X-99 during the scheduled blackout.',
      status: 'HIGHLY PLAUSIBLE',
      corroboratingCodes: ['EV-03', 'EV-04', 'EV-09', 'EV-12'],
    },
    {
      id: 'h2',
      title: 'Hypothesis B: Panic Quarantine of Adaptive Subterranean Matrix',
      description: 'The entity at 1,420m was actively rewriting station firmware and echoing hydrophone pings; Vance severed lines to isolate the network.',
      status: 'CORROBORATED',
      corroboratingCodes: ['EV-02', 'EV-07', 'EV-10', 'EV-11'],
    },
    {
      id: 'h3',
      title: 'Hypothesis C: Internal Technical Malfunction',
      description: 'Station backup power failed due to electrical surge and diesel generator overheating.',
      status: 'DISPROVEN (Sabotage verified in EV-05)',
      corroboratingCodes: ['EV-01', 'EV-05'],
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span>INVESTIGATOR EVIDENCE PINBOARD</span>
            <span>·</span>
            <span>{pinnedItems.length} ARTIFACTS PINNED</span>
          </div>
          <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
            CASE 09 SYNTHESIS BOARD
          </h1>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={onNavigateToNotes}
            className="btn-tactile btn-minecraft px-3.5 py-2 bg-[#F0F0E9] hover:bg-white text-[#141414] border-2 border-[#171717] font-pixel text-[10px] font-bold uppercase cursor-pointer pixel-corners-sm"
          >
            FIELD NOTES ({notes.length}) ✎
          </button>
        </div>
      </div>

      {/* Main Split: Pinned Artifact Cards / Working Case Theory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Pinned Artifacts Grid (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white border-2 border-[#171717] shadow-pixel p-4 flex items-center justify-between font-pixel text-[10px] pixel-corners-sm">
            <span className="font-bold text-[#141414]">PINNED EVIDENCE SPECIMENS</span>
            <span className="text-[#85877F]">CLICK TO INSPECT DOSSIER</span>
          </div>

          {pinnedItems.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#171717] p-12 text-center font-mono text-xs text-[#85877F] pixel-corners-sm">
              NO FINDINGS PINNED YET. BROWSE ARCHIVE OR CROSS-EXAMINE TO PIN EVIDENCE TO THIS BOARD.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pinnedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#171717] shadow-pixel p-4 flex flex-col justify-between group hover:border-[#087F82] transition-colors pixel-corners-sm"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#85877F] mb-1.5">
                      <span className="font-bold text-[#141414]">{item.code}</span>
                      <button
                        onClick={() => togglePinArtifact(item.id)}
                        className="text-red-600 hover:text-red-800 font-pixel text-[9px] font-bold cursor-pointer"
                        title="Unpin finding"
                      >
                        ✕ UNPIN
                      </button>
                    </div>

                    <h3 className="font-display font-semibold text-sm text-[#141414] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <div className="font-mono text-[10px] text-[#85877F] mb-2">
                      {item.displayTime} · {item.source}
                    </div>

                    <p className="text-xs text-[#42443F] font-mono leading-relaxed line-clamp-3">
                      "{item.excerpt}"
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#087F82] font-pixel text-[9px] font-semibold">{item.category.toUpperCase()}</span>
                    <button
                      onClick={() => onOpenDocument(item.id)}
                      className="font-pixel text-[10px] text-[#087F82] font-bold hover:underline cursor-pointer"
                    >
                      READ DOSSIER ▶
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Forensic Hypotheses Matrix */}
          <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 mt-2 pixel-corners-sm">
            <h2 className="font-display font-bold text-lg text-[#141414] mb-4 pb-2 border-b-2 border-[#171717]">
              WORKING HYPOTHESES TRIANGULATION
            </h2>

            <div className="space-y-4">
              {hypothesisChecklist.map((hyp) => (
                <div key={hyp.id} className="p-3.5 bg-[#F7F7F2] border-2 border-[#171717] pixel-corners-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 font-mono text-xs">
                    <span className="font-bold text-[#141414]">{hyp.title}</span>
                    <span className={`text-[9px] font-pixel font-bold px-2 py-0.5 border ${
                      hyp.status.includes('DISPROVEN') 
                        ? 'bg-red-100 text-red-800 border-red-300' 
                        : 'bg-[#D9F0ED] text-[#087F82] border-[#087F82]'
                    }`}>
                      {hyp.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#42443F] mb-2 leading-relaxed font-mono">
                    {hyp.description}
                  </p>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#85877F]">
                    <span className="font-pixel text-[9px]">CORROBORATED BY:</span>
                    {hyp.corroboratingCodes.map((code) => {
                      const found = evidence.find((e) => e.id === code);
                      return (
                        <button
                          key={code}
                          onClick={() => found && onOpenDocument(found.id)}
                          className="btn-tactile px-2 py-0.5 bg-white border border-[#171717] text-[#141414] font-bold hover:bg-[#D9F0ED] cursor-pointer pixel-corners-sm"
                        >
                          {code}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editable Case Theory Notebook (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between sticky top-24 pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
              <span className="font-pixel text-[10px] font-bold text-[#141414] uppercase">
                INVESTIGATOR'S CASE THEORY
              </span>
              <span className="font-mono text-[10px] text-[#087F82] font-bold">
                {saveStatus}
              </span>
            </div>

            <p className="text-xs text-[#42443F] mb-3 leading-relaxed font-mono">
              Synthesize your deductions based on the recovered telemetry, testimonies, and microwave intercept. This theory is automatically preserved across all sessions.
            </p>

            <textarea
              value={localTheory}
              onChange={handleTheoryChange}
              rows={16}
              className="w-full bg-[#FAF9F5] border-2 border-[#171717] p-4 font-mono text-xs text-[#141414] leading-relaxed focus:outline-none focus:border-[#087F82] shadow-inner resize-y pixel-corners-sm"
              placeholder="Record your unified theory of the Blackwood Incident..."
            />
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px] text-[#85877F]">
            <span>CHARACTERS: {localTheory.length}</span>
            <span className="text-[#087F82] font-pixel text-[9px]">LOCAL PERSISTENCE VERIFIED</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CaseboardView;
