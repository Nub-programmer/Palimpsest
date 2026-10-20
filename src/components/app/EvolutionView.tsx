import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { StructuralForm } from '../../types';

export const EvolutionView: React.FC = () => {
  const {
    currentForm,
    previewForm,
    effectiveForm,
    setPreviewForm,
    scores,
    rawMetrics,
    transformations,
    resetProfile,
  } = useInvestigation();

  const formList: { id: StructuralForm; label: string; tag: string; description: string }[] = [
    {
      id: 'ledger',
      label: 'LEDGER',
      tag: 'DEFAULT // NEUTRAL STATE',
      description: 'Matrix tabular overview with comprehensive index and metadata sorting.',
    },
    {
      id: 'dossier',
      label: 'DOSSIER',
      tag: 'DEEP READER PROFILE',
      description: 'Generous typography and wide reading column for uninterrupted long-form reading.',
    },
    {
      id: 'atlas',
      label: 'RELATION ATLAS',
      tag: 'ASSOCIATIVE EXPLORER',
      description: 'Topological node-link graph foregrounding connected nodes and citation paths.',
    },
    {
      id: 'console',
      label: 'SIGNAL CONSOLE',
      tag: 'HIGH-VELOCITY TRIAGE',
      description: 'Telemetry dashboard designed for rapid queries, quick scanning, and index filtering.',
    },
    {
      id: 'chronicle',
      label: 'CHRONICLE',
      tag: 'TEMPORAL THINKER',
      description: 'Strict timestamped causal sequence with blackout window focus.',
    },
    {
      id: 'compare',
      label: 'CROSS-EXAMINATION',
      tag: 'DISCREPANCY AUDITOR',
      description: 'Dual-pane comparison environment highlighting conflicting source assertions.',
    },
  ];

  // Determine top score & pattern
  const scoreEntries = Object.entries(scores) as [keyof typeof scores, number][];
  scoreEntries.sort((a, b) => b[1] - a[1]);
  const [topDimension, topVal] = scoreEntries[0];

  const dimensionLabels = {
    dossier: 'Deep Reader (Dossier)',
    atlas: 'Associative Explorer (Atlas)',
    console: 'High-Velocity Triage (Console)',
    chronicle: 'Temporal Thinker (Chronicle)',
    compare: 'Discrepancy Auditor (Cross-Exam)',
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span>BEHAVIOURAL EVOLUTION LAB</span>
            <span>·</span>
            <span>DETERMINISTIC ENGINE DIAGNOSTICS</span>
          </div>
          <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
            ARCHITECTURAL ADAPTATION MATRIX
          </h1>
        </div>

        <button
          onClick={resetProfile}
          className="btn-tactile btn-minecraft px-3.5 py-2 bg-[#F0F0E9] hover:bg-white text-[10px] font-pixel font-bold text-red-700 border-2 border-[#171717] cursor-pointer pixel-corners-sm"
        >
          RECALIBRATE PROFILE ↺
        </button>
      </div>

      {/* Top Diagnostic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Active Form Identity */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider mb-2">
              CURRENT ARCHITECTURAL FORM
            </div>
            <div className="font-pixel-arcade text-xl sm:text-2xl text-[#087F82] uppercase mb-1">
              {effectiveForm}
            </div>
            {previewForm ? (
              <div className="inline-block bg-[#087F82] text-white px-2 py-0.5 font-pixel text-[9px] font-bold uppercase mb-2">
                JUDGE PREVIEW LOCK ACTIVE
              </div>
            ) : (
              <div className="text-[10px] font-pixel text-[#42443F] mb-2">
                DETERMINISTICALLY ADAPTED
              </div>
            )}
            <p className="text-xs text-[#42443F] leading-relaxed font-mono">
              {formList.find((f) => f.id === effectiveForm)?.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#171717] font-mono text-[11px] text-[#85877F] flex justify-between">
            <span>REAL STATE: {currentForm.toUpperCase()}</span>
            <span>HYSTERESIS: 14%</span>
          </div>
        </div>

        {/* Card 2: Dominant Cognitive Pattern */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider mb-2">
              STRONGEST FORENSIC PATTERN
            </div>
            <div className="font-display font-bold text-xl text-[#141414] mb-1">
              {dimensionLabels[topDimension]}
            </div>
            <div className="font-mono text-sm font-bold text-[#087F82] mb-2">
              CONFIDENCE SCORE: {topVal}%
            </div>
            <p className="text-xs text-[#42443F] leading-relaxed font-mono">
              Based on {rawMetrics.totalInteractions} tracked interactions, your inquiry behavior leads primarily in this mode.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#171717] font-mono text-[11px] text-[#85877F] flex justify-between">
            <span>TOTAL DWELL: {Math.round(rawMetrics.totalDwellMs / 1000)}s</span>
            <span>READS: {rawMetrics.readingEventsCount}</span>
          </div>
        </div>

        {/* Card 3: Interaction Telemetry Stats */}
        <div className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between pixel-corners-sm">
          <div>
            <div className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider mb-2">
              OBSERVABLE FORENSIC ACTIONS
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span>RELATION HOPS:</span>
                <strong className="text-[#141414]">{rawMetrics.relationTraversalsCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>GRAPH NODE CLICKS:</span>
                <strong className="text-[#141414]">{rawMetrics.graphNodeClicks}</strong>
              </div>
              <div className="flex justify-between">
                <span>SEARCH QUERIES:</span>
                <strong className="text-[#141414]">{rawMetrics.searchQueriesCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>TIMELINE SCRUBS:</span>
                <strong className="text-[#141414]">{rawMetrics.timelineScrubCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>COMPARE SESSIONS:</span>
                <strong className="text-[#141414]">{rawMetrics.comparisonSessionsCount}</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-[#171717] font-mono text-[11px] text-[#85877F] flex justify-between">
            <span>RAW EVENTS: {rawMetrics.totalInteractions}</span>
            <span className="text-[#087F82] font-pixel text-[9px]">LOCAL ENGINE OK</span>
          </div>
        </div>

      </div>

      {/* 5 Behavioural Dimension Scores (Minecraft Segmented XP Bars) */}
      <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 pixel-corners-sm">
        <h2 className="font-display font-bold text-lg text-[#141414] mb-4 pb-2 border-b-2 border-[#171717]">
          NORMALIZED COGNITIVE PROFILE SPECTRUM
        </h2>

        <div className="space-y-4 font-mono text-xs">
          
          {/* Dossier */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-pixel text-[10px] text-[#141414]">01. DEEP READING (DOSSIER)</span>
              <span className="text-[#087F82] font-bold">{scores.dossier}%</span>
            </div>
            <div className="w-full h-3 bg-[#E6E6DF] border-2 border-[#171717] overflow-hidden">
              <div 
                className="h-full bg-[#087F82] transition-all duration-300"
                style={{
                  width: `${scores.dossier}%`,
                  backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 6px, #0AB5B8 6px, #0AB5B8 8px)'
                }}
              />
            </div>
          </div>

          {/* Atlas */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-pixel text-[10px] text-[#141414]">02. ASSOCIATIVE EXPLORATION (RELATION ATLAS)</span>
              <span className="text-[#087F82] font-bold">{scores.atlas}%</span>
            </div>
            <div className="w-full h-3 bg-[#E6E6DF] border-2 border-[#171717] overflow-hidden">
              <div 
                className="h-full bg-[#087F82] transition-all duration-300"
                style={{
                  width: `${scores.atlas}%`,
                  backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 6px, #0AB5B8 6px, #0AB5B8 8px)'
                }}
              />
            </div>
          </div>

          {/* Console */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-pixel text-[10px] text-[#141414]">03. HIGH-VELOCITY SEARCH & TRIAGE (SIGNAL CONSOLE)</span>
              <span className="text-[#087F82] font-bold">{scores.console}%</span>
            </div>
            <div className="w-full h-3 bg-[#E6E6DF] border-2 border-[#171717] overflow-hidden">
              <div 
                className="h-full bg-[#087F82] transition-all duration-300"
                style={{
                  width: `${scores.console}%`,
                  backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 6px, #0AB5B8 6px, #0AB5B8 8px)'
                }}
              />
            </div>
          </div>

          {/* Chronicle */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-pixel text-[10px] text-[#141414]">04. SEQUENTIAL CAUSALITY (CHRONICLE)</span>
              <span className="text-[#087F82] font-bold">{scores.chronicle}%</span>
            </div>
            <div className="w-full h-3 bg-[#E6E6DF] border-2 border-[#171717] overflow-hidden">
              <div 
                className="h-full bg-[#087F82] transition-all duration-300"
                style={{
                  width: `${scores.chronicle}%`,
                  backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 6px, #0AB5B8 6px, #0AB5B8 8px)'
                }}
              />
            </div>
          </div>

          {/* Compare */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-pixel text-[10px] text-[#141414]">05. DISCREPANCY AUDITING (CROSS-EXAMINATION)</span>
              <span className="text-[#087F82] font-bold">{scores.compare}%</span>
            </div>
            <div className="w-full h-3 bg-[#E6E6DF] border-2 border-[#171717] overflow-hidden">
              <div 
                className="h-full bg-[#087F82] transition-all duration-300"
                style={{
                  width: `${scores.compare}%`,
                  backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 6px, #0AB5B8 6px, #0AB5B8 8px)'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Judge Preview Mode & Form Overrides */}
      <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 pixel-corners-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#171717] mb-4">
          <div>
            <span className="font-pixel text-[10px] text-[#087F82] font-bold uppercase tracking-wider block">
              EVALUATOR INTERFACE CONTROLS
            </span>
            <h2 className="font-pixel-arcade text-lg sm:text-xl text-[#141414]">
              JUDGE PREVIEW MODE
            </h2>
          </div>

          {previewForm && (
            <button
              onClick={() => setPreviewForm(null)}
              className="btn-tactile btn-minecraft px-3 py-1.5 bg-[#141414] text-white font-pixel text-[10px] font-bold uppercase cursor-pointer pixel-corners-sm"
            >
              RESTORE ADAPTIVE FORM
            </button>
          )}
        </div>

        <p className="text-xs text-[#42443F] mb-6 leading-relaxed max-w-3xl font-mono">
          Competition judges may instantly preview any of the six structural forms below. Previewing locks the layout to test UI compositions without distorting your actual tracked metrics or erasing your investigation history.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formList.map((form) => {
            const isActive = effectiveForm === form.id;
            return (
              <div
                key={form.id}
                onClick={() => setPreviewForm(form.id)}
                className={`p-4 border-2 transition-all cursor-pointer flex flex-col justify-between pixel-corners-sm ${
                  isActive
                    ? 'bg-[#D9F0ED] border-[#087F82] shadow-pixel-sm'
                    : 'bg-[#F0F0E9] border-[#171717] hover:bg-white hover:shadow-pixel-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#85877F] mb-1">
                    <span className="font-pixel text-[9px]">{form.tag}</span>
                    {isActive && <span className="text-[#087F82] font-pixel text-[9px] font-bold">ACTIVE</span>}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#141414] mb-1">
                    {form.label}
                  </h3>
                  <p className="text-xs text-[#42443F] leading-relaxed font-mono">
                    {form.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t-2 border-[#171717] font-pixel text-[10px] text-[#087F82] font-bold">
                  {isActive ? 'CURRENTLY DISPLAYING' : 'CLICK TO PREVIEW ▶'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transformation Audit History Log */}
      <div className="bg-white border-2 border-[#171717] shadow-pixel p-6 pixel-corners-sm">
        <h2 className="font-display font-bold text-lg text-[#141414] mb-4 pb-2 border-b-2 border-[#171717] flex justify-between items-center">
          <span>INTERFACE TRANSFORMATION LOG</span>
          <span className="font-pixel text-[10px] text-[#85877F]">
            {transformations.length} RECORDED SHIFTS
          </span>
        </h2>

        {transformations.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-[#85877F] border-2 border-dashed border-[#171717] pixel-corners-sm">
            NO AUTOMATED TRANSFORMATIONS RECORDED YET. CONTINUE EXPLORING THE ARCHIVE, ATLAS, CHRONICLE, OR CROSS-EXAMINATION TO TRIGGER A SYSTEM ADAPTATION.
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {transformations.map((rec) => (
              <div key={rec.id} className="p-3 bg-[#F0F0E9] border-2 border-[#171717] pixel-corners-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#087F82] font-pixel text-[10px] font-bold">
                      {rec.fromForm.toUpperCase()} → {rec.toForm.toUpperCase()}
                    </span>
                    <span className="text-[#85877F]">·</span>
                    <span className="text-[11px] text-[#141414]">{rec.timestamp}</span>
                  </div>
                  <span className="text-[11px] text-[#85877F]">
                    TRIGGER: {rec.triggerScore.toUpperCase()} ({rec.triggerValue}%)
                  </span>
                </div>
                <p className="text-xs text-[#42443F] leading-relaxed">
                  {rec.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default EvolutionView;
