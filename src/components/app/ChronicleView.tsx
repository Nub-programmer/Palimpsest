import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { EvidenceItem } from '../../types';

interface ChronicleViewProps {
  onOpenDocument: (id: string) => void;
}

export const ChronicleView: React.FC<ChronicleViewProps> = ({ onOpenDocument }) => {
  const { evidence, trackTimelineInteraction, pinnedItems, togglePinArtifact } = useInvestigation();
  const [selectedEventId, setSelectedEventId] = useState<string>('EV-08');

  // Sort events chronologically
  const sortedEvents = React.useMemo(() => {
    return [...evidence].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [evidence]);

  const selectedEvent = evidence.find((e) => e.id === selectedEventId) || sortedEvents[0];
  const isPinned = pinnedItems.some((p) => p.id === selectedEvent.id);

  const handleSelectEvent = (item: EvidenceItem) => {
    setSelectedEventId(item.id);
    trackTimelineInteraction(item.id);
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1.5">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span>CHRONOLOGICAL CAUSALITY RECONSTRUCTION</span>
            <span>·</span>
            <span>BLACKWOOD TIMELINE</span>
          </div>
          <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
            CASE 09 TEMPORAL SEQUENCE
          </h1>
        </div>

        {/* Blackout Marker Highlight */}
        <div className="bg-[#D9F0ED] border-2 border-[#171717] px-4 py-2.5 font-mono text-xs text-[#087F82] flex items-center gap-3 shadow-pixel-sm pixel-corners-sm">
          <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] animate-pixel-pulse"></span>
          <div>
            <div className="font-pixel text-[10px] font-bold">CRITICAL BLACKOUT WINDOW</div>
            <div className="text-[11px] text-[#141414]">OCT 14, 23:41:00 — 23:50:00 (540s)</div>
          </div>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Chronological Event Stream (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border-2 border-[#171717] shadow-pixel p-6 relative pixel-corners-sm">
          
          <div className="text-[11px] font-mono text-[#85877F] uppercase tracking-wider mb-6 pb-2 border-b border-[#E6E6DF] flex justify-between">
            <span>SEQUENCE AXIS (EARLIEST TO LATEST)</span>
            <span>CLICK TO SCRUB EVENT</span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#171717] flex flex-col gap-6">
            {sortedEvents.map((event) => {
              const isSelected = event.id === selectedEventId;
              const isBlackout =
                event.id === 'EV-02' ||
                event.id === 'EV-03' ||
                event.id === 'EV-04' ||
                event.id === 'EV-06' ||
                event.id === 'EV-08';
              const isContradiction = Boolean(event.contradictsId);

              return (
                <div
                  key={event.id}
                  onClick={() => handleSelectEvent(event)}
                  className={`relative p-4 border-2 transition-all cursor-pointer group pixel-corners-sm ${
                    isSelected
                      ? 'bg-[#D9F0ED] border-[#087F82] shadow-pixel'
                      : isBlackout
                      ? 'bg-[#FAF9F5] border-[#171717] hover:bg-white shadow-pixel-sm'
                      : 'bg-white border-[#171717] hover:shadow-pixel-sm'
                  }`}
                >
                  {/* Timeline Square Block Marker on the Axis */}
                  <span
                    className={`absolute -left-[31px] sm:-left-[39px] top-5 w-3.5 h-3.5 border-2 border-[#171717] transition-all ${
                      isSelected
                        ? 'bg-[#087F82] scale-125 animate-pixel-pulse shadow-pixel-sm z-10'
                        : isBlackout
                        ? 'bg-red-600'
                        : 'bg-white group-hover:bg-[#141414]'
                    }`}
                  />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-[#85877F] mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#141414]">{event.displayTime}</span>
                      <span>·</span>
                      <span className="font-semibold">{event.code}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isBlackout && (
                        <span className="text-[9px] font-pixel bg-red-100 text-red-800 font-bold px-1.5 py-0.5 border border-red-300">
                          BLACKOUT PHASE
                        </span>
                      )}
                      {isContradiction && (
                        <span className="text-[9px] font-pixel bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 border border-amber-300">
                          CONTRADICTORY
                        </span>
                      )}
                      <span className="text-[#087F82] font-semibold uppercase font-pixel text-[9px]">{event.category}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-base text-[#141414] group-hover:text-[#087F82] transition-colors mb-1">
                    {event.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#42443F] leading-relaxed line-clamp-2">
                    {event.excerpt}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-[#E6E6DF] flex items-center justify-between font-mono text-xs text-[#85877F]">
            <span>CHRONOLOGICAL NAVIGATION MONITORED</span>
            <span className="text-[#078286] font-semibold">12 TIMESTAMPED DATA POINTS</span>
          </div>
        </div>

        {/* Right Column: Selected Event Inspection Drawer (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between sticky top-24 pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
              <div>
                <span className="font-pixel text-[10px] text-[#85877F] uppercase tracking-wider block">
                  SELECTED TIMEPOINT
                </span>
                <span className="font-mono text-sm font-bold text-[#141414]">
                  {selectedEvent.displayTime}
                </span>
              </div>

              <button
                onClick={() => togglePinArtifact(selectedEvent.id)}
                className={`btn-tactile btn-minecraft px-3 py-1.5 text-[10px] font-pixel font-bold border-2 border-[#171717] cursor-pointer pixel-corners-sm ${
                  isPinned ? 'bg-[#087F82] text-white shadow-pixel-sm' : 'bg-[#F0F0E9] text-[#141414]'
                }`}
              >
                {isPinned ? '★ PINNED' : '☆ PIN'}
              </button>
            </div>

            <h2 className="font-display font-bold text-lg text-[#141414] mb-2 leading-snug">
              {selectedEvent.title}
            </h2>

            <div className="font-mono text-[11px] text-[#85877F] mb-4 space-y-1">
              <div>CODE: <strong className="text-[#141414]">{selectedEvent.code}</strong></div>
              <div>LOCATION: <strong className="text-[#141414]">{selectedEvent.location}</strong></div>
              <div>CREDIBILITY: <strong className="text-[#087F82]">{selectedEvent.credibility}%</strong></div>
            </div>

            <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] font-mono text-xs text-[#141414] leading-relaxed mb-4 whitespace-pre-wrap pixel-corners-sm">
              {selectedEvent.excerpt}
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider block">
                PRIMARY EVIDENCE EXTRACTS:
              </span>
              {selectedEvent.keyFacts.map((fact, i) => (
                <div key={i} className="text-xs font-mono text-[#42443F] flex items-start gap-1.5">
                  <span className="text-[#087F82] font-bold">▪</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#171717]">
            <button
              onClick={() => onOpenDocument(selectedEvent.id)}
              className="btn-tactile btn-minecraft w-full py-3 bg-[#087F82] hover:bg-[#06676A] text-white border-2 border-[#171717] shadow-pixel font-pixel text-[10px] font-bold uppercase tracking-wider cursor-pointer text-center pixel-corners-sm"
            >
              READ COMPLETE RECORD ▶
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ChronicleView;
