import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { EvidenceItem } from '../../types';

interface CompareViewProps {
  initialPair?: [string, string];
  onOpenDocument: (id: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ 
  initialPair, 
  onOpenDocument 
}) => {
  const { 
    evidence, 
    comparisonPair, 
    setComparisonPair, 
    trackComparisonSession,
    trackContradictionPin,
    pinnedItems,
    togglePinArtifact 
  } = useInvestigation();

  const [leftId, setLeftId] = useState<string>(initialPair?.[0] || comparisonPair[0] || 'EV-01');
  const [rightId, setRightId] = useState<string>(initialPair?.[1] || comparisonPair[1] || 'EV-05');

  const docLeft = evidence.find((e) => e.id === leftId) || evidence[0];
  const docRight = evidence.find((e) => e.id === rightId) || evidence[4];

  // Track comparison session when pair changes
  const handleSelectLeft = (id: string) => {
    setLeftId(id);
    setComparisonPair([id, rightId]);
    trackComparisonSession(id, rightId);
  };

  const handleSelectRight = (id: string) => {
    setRightId(id);
    setComparisonPair([leftId, id]);
    trackComparisonSession(leftId, id);
  };

  const isContradiction = docLeft.contradictsId === docRight.id || docRight.contradictsId === docLeft.id;
  const contradictionNote = docLeft.contradictionNote || docRight.contradictionNote;

  const handlePinContradiction = () => {
    if (isContradiction) {
      trackContradictionPin(docLeft.id);
      trackContradictionPin(docRight.id);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Banner & Quick Presets */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span>CROSS-EXAMINATION WORKSPACE</span>
            <span>·</span>
            <span>DUAL-SOURCE SYNCHRONIZED AUDIT</span>
          </div>
          <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
            COMPARATIVE DISCREPANCY MATRIX
          </h1>
        </div>

        {/* Quick Recommended Pairs */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-[#85877F] text-[10px] font-pixel">KEY AUDIT PAIRS:</span>
          <button
            onClick={() => {
              handleSelectLeft('EV-01');
              handleSelectRight('EV-05');
            }}
            className="btn-tactile btn-minecraft px-3 py-1.5 bg-[#F0F0E9] hover:bg-[#D9F0ED] border-2 border-[#171717] text-[10px] font-pixel font-bold cursor-pointer pixel-corners-sm"
          >
            EV-01 vs EV-05 (Lin / Vance)
          </button>
          <button
            onClick={() => {
              handleSelectLeft('EV-01');
              handleSelectRight('EV-04');
            }}
            className="btn-tactile btn-minecraft px-3 py-1.5 bg-[#F0F0E9] hover:bg-[#D9F0ED] border-2 border-[#171717] text-[10px] font-pixel font-bold cursor-pointer pixel-corners-sm"
          >
            EV-01 vs EV-04 (Safe vs Airlock)
          </button>
        </div>
      </div>

      {/* Contradiction Detection Banner */}
      {isContradiction && (
        <div className="bg-[#D9F0ED] border-2 border-[#087F82] p-4 font-mono text-xs shadow-pixel-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-150 pixel-corners-sm">
          <div>
            <div className="flex items-center gap-2 text-[#087F82] font-bold text-sm uppercase font-pixel text-[11px]">
              <span>⚠ DIRECT FORENSIC DISCREPANCY VERIFIED</span>
            </div>
            <p className="text-[#141414] text-xs mt-1 leading-relaxed max-w-3xl">
              {contradictionNote}
            </p>
          </div>

          <button
            onClick={handlePinContradiction}
            className="btn-tactile btn-minecraft bg-[#087F82] hover:bg-[#06676A] text-white px-4 py-2 border-2 border-[#171717] font-pixel text-[10px] font-bold uppercase whitespace-nowrap cursor-pointer shrink-0 pixel-corners-sm"
          >
            PIN CONTRADICTION FINDING ★
          </button>
        </div>
      )}

      {/* Dual Document Viewport Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Document A (Left) */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between pixel-corners-sm">
          <div className="flex flex-col gap-4">
            
            {/* Header & Selector */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717]">
              <span className="font-pixel text-[10px] font-bold text-[#85877F] uppercase">
                SOURCE DOCUMENT A
              </span>
              <select
                value={leftId}
                onChange={(e) => handleSelectLeft(e.target.value)}
                className="bg-[#F0F0E9] border-2 border-[#171717] px-2.5 py-1 font-mono text-xs text-[#141414] focus:outline-none cursor-pointer pixel-corners-sm"
              >
                {evidence.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.code} — {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Metadata Card */}
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#85877F] mb-1">
                <span className="font-bold text-[#141414]">{docLeft.code}</span>
                <span>/</span>
                <span className="text-[#087F82] font-bold">{docLeft.classification}</span>
              </div>
              <h2 className="font-display font-bold text-xl text-[#141414] mb-2 leading-snug">
                {docLeft.title}
              </h2>
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#F0F0E9] border-2 border-[#171717] font-mono text-[11px] text-[#42443F] pixel-corners-sm shadow-pixel-sm">
                <div>TIME: <strong className="text-[#141414]">{docLeft.displayTime}</strong></div>
                <div>CRED: <strong className="text-[#087F82]">{docLeft.credibility}%</strong></div>
                <div className="col-span-2 truncate">SOURCE: <strong className="text-[#141414]">{docLeft.source}</strong></div>
              </div>
            </div>

            {/* Document Text */}
            <div className="prose max-w-none">
              <span className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider block mb-1">
                TRANSCRIPT TEXT:
              </span>
              <div className="p-4 bg-[#FAF9F5] border-2 border-[#171717] font-mono text-xs text-[#141414] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto pixel-corners-sm">
                {docLeft.fullText}
              </div>
            </div>

            {/* Key Facts */}
            <div className="space-y-1">
              <span className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider block">
                ASSERTED FACTS:
              </span>
              {docLeft.keyFacts.map((fact, idx) => (
                <div key={idx} className="font-mono text-[11px] text-[#42443F] flex items-start gap-1.5">
                  <span className="text-[#087F82] font-bold">▪</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between">
            <button
              onClick={() => togglePinArtifact(docLeft.id)}
              className="btn-tactile btn-minecraft px-3 py-1.5 text-[10px] font-pixel font-bold bg-[#F0F0E9] border-2 border-[#171717] text-[#141414] cursor-pointer pixel-corners-sm"
            >
              {pinnedItems.some(p => p.id === docLeft.id) ? '★ PINNED' : '☆ PIN DOC A'}
            </button>
            <button
              onClick={() => onOpenDocument(docLeft.id)}
              className="font-pixel text-[10px] font-bold text-[#087F82] hover:underline cursor-pointer"
            >
              OPEN IN DOSSIER ▶
            </button>
          </div>
        </div>

        {/* Document B (Right) */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between pixel-corners-sm">
          <div className="flex flex-col gap-4">
            
            {/* Header & Selector */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717]">
              <span className="font-pixel text-[10px] font-bold text-[#85877F] uppercase">
                SOURCE DOCUMENT B
              </span>
              <select
                value={rightId}
                onChange={(e) => handleSelectRight(e.target.value)}
                className="bg-[#F0F0E9] border-2 border-[#171717] px-2.5 py-1 font-mono text-xs text-[#141414] focus:outline-none cursor-pointer pixel-corners-sm"
              >
                {evidence.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.code} — {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Metadata Card */}
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#85877F] mb-1">
                <span className="font-bold text-[#141414]">{docRight.code}</span>
                <span>/</span>
                <span className="text-[#087F82] font-bold">{docRight.classification}</span>
              </div>
              <h2 className="font-display font-bold text-xl text-[#141414] mb-2 leading-snug">
                {docRight.title}
              </h2>
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#F0F0E9] border-2 border-[#171717] font-mono text-[11px] text-[#42443F] pixel-corners-sm shadow-pixel-sm">
                <div>TIME: <strong className="text-[#141414]">{docRight.displayTime}</strong></div>
                <div>CRED: <strong className="text-[#087F82]">{docRight.credibility}%</strong></div>
                <div className="col-span-2 truncate">SOURCE: <strong className="text-[#141414]">{docRight.source}</strong></div>
              </div>
            </div>

            {/* Document Text */}
            <div className="prose max-w-none">
              <span className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider block mb-1">
                TRANSCRIPT TEXT:
              </span>
              <div className="p-4 bg-[#FAF9F5] border-2 border-[#171717] font-mono text-xs text-[#141414] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto pixel-corners-sm">
                {docRight.fullText}
              </div>
            </div>

            {/* Key Facts */}
            <div className="space-y-1">
              <span className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider block">
                ASSERTED FACTS:
              </span>
              {docRight.keyFacts.map((fact, idx) => (
                <div key={idx} className="font-mono text-[11px] text-[#42443F] flex items-start gap-1.5">
                  <span className="text-[#087F82] font-bold">▪</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="mt-6 pt-3 border-t-2 border-[#171717] flex items-center justify-between">
            <button
              onClick={() => togglePinArtifact(docRight.id)}
              className="btn-tactile btn-minecraft px-3 py-1.5 text-[10px] font-pixel font-bold bg-[#F0F0E9] border-2 border-[#171717] text-[#141414] cursor-pointer pixel-corners-sm"
            >
              {pinnedItems.some(p => p.id === docRight.id) ? '★ PINNED' : '☆ PIN DOC B'}
            </button>
            <button
              onClick={() => onOpenDocument(docRight.id)}
              className="font-pixel text-[10px] font-bold text-[#087F82] hover:underline cursor-pointer"
            >
              OPEN IN DOSSIER ▶
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CompareView;
