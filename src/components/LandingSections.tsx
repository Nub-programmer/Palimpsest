import React, { useState } from 'react';
import { StructuralForm } from '../types';
import { EVIDENCE_RECORDS } from '../data/evidence';
import { useInvestigation } from '../context/InvestigationContext';

interface LandingSectionsProps {
  onEnterArchive: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({ onEnterArchive }) => {
  const { scores } = useInvestigation();
  const [selectedPreviewForm, setSelectedPreviewForm] = useState<StructuralForm>('dossier');

  const previewFormsList: { id: StructuralForm; label: string; tag: string; description: string }[] = [
    {
      id: 'ledger',
      label: 'LEDGER',
      tag: 'DEFAULT // NEUTRAL STATE',
      description: 'Tabular dense data indexing with metadata-priority layout. Default starting point while the system gathers behavioral signal.',
    },
    {
      id: 'dossier',
      label: 'DOSSIER',
      tag: 'DEEP READER PROFILE',
      description: 'Generous editorial typography, distraction-free reading margins, and sequential annotations optimized for focused long-form analysis.',
    },
    {
      id: 'atlas',
      label: 'RELATION ATLAS',
      tag: 'ASSOCIATIVE EXPLORER',
      description: 'Spatial node-link network with interactive topology. Surfaces unexpected connections, citation paths, and hidden conspirators.',
    },
    {
      id: 'console',
      label: 'SIGNAL CONSOLE',
      tag: 'RAPID TRIAGE PROFILE',
      description: 'High-density telemetry dashboard with rapid-fire keyboard filtering, query logs, and instant signal classification.',
    },
    {
      id: 'chronicle',
      label: 'CHRONICLE',
      tag: 'TEMPORAL THINKER',
      description: 'Strict timestamped chronological sequence. Highlights synchronized anomalies, blackout windows, and causality chains.',
    },
    {
      id: 'compare',
      label: 'CROSS-EXAMINATION',
      tag: 'DISCREPANCY AUDITOR',
      description: 'Dual-pane synchronized comparison workspace designed to pinpoint conflicting testimonies, timestamp gaps, and contradictory claims.',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-24 md:gap-32 py-12 md:py-20 select-none">
      
      {/* SECTION 1: ONE ARCHIVE. SIX STRUCTURAL FORMS. */}
      <section id="section-forms" className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-block border-2 border-[#171717] bg-white px-3 py-1 font-pixel text-[10px] font-bold text-[#087F82] uppercase mb-3 shadow-pixel-sm pixel-corners-sm">
            01. ARCHITECTURAL ADAPTATION
          </div>
          <h2 className="font-pixel-arcade text-lg sm:text-2xl md:text-3xl text-[#141414] tracking-tight mb-3 leading-snug">
            SAME EVIDENCE.
            <br />
            <span className="text-[#087F82]">DIFFERENT REALITIES.</span>
          </h2>
          <p className="text-base text-[#42443F] max-w-2xl leading-relaxed">
            PALIMPSEST does not change the facts of Case 09. Instead, it morphs its entire visual architecture to reflect the cognitive style of the investigator.
          </p>
        </div>

        {/* Interactive Specimen Box */}
        <div className="w-full bg-white border-2 border-[#171717] shadow-pixel p-6 md:p-8 flex flex-col gap-6 pixel-corners-sm">
          
          {/* Top Form Selection Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#E6E6DF]">
            <span className="font-mono text-xs text-[#85877F] uppercase tracking-wider mr-2 hidden sm:inline">
              PREVIEW SPECIMEN:
            </span>
            {previewFormsList.map((form) => {
              const isSelected = selectedPreviewForm === form.id;
              return (
                <button
                  key={form.id}
                  onClick={() => setSelectedPreviewForm(form.id)}
                  className={`btn-tactile btn-minecraft px-3.5 py-1.5 font-pixel text-[10px] font-bold tracking-wider uppercase border-2 border-[#171717] cursor-pointer pixel-corners-sm ${
                    isSelected
                      ? 'bg-[#087F82] text-white shadow-pixel-sm'
                      : 'bg-[#F0F0E9] text-[#141414] hover:bg-white'
                  }`}
                >
                  {form.label}
                </button>
              );
            })}
          </div>

          {/* Form Detail Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div>
              <span className="font-bold text-[#141414]">
                FORM: {previewFormsList.find(f => f.id === selectedPreviewForm)?.label}
              </span>
              <span className="text-[#85877F] mx-2">·</span>
              <span className="text-[#078286] font-semibold">
                {previewFormsList.find(f => f.id === selectedPreviewForm)?.tag}
              </span>
            </div>
            <p className="text-[#42443F] text-xs max-w-lg">
              {previewFormsList.find(f => f.id === selectedPreviewForm)?.description}
            </p>
          </div>

          {/* Dynamic Miniature UI Composition (Changes visually per form!) */}
          <div className="w-full bg-[#F7F7F2] border-2 border-[#191919] p-4 md:p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden">
            {/* Corner Crosshairs */}
            <span className="absolute top-2 left-2 font-mono text-[9px] text-[#85877F]">┌ [SPECIMEN]</span>
            <span className="absolute top-2 right-2 font-mono text-[9px] text-[#85877F]">LAYOUT: {selectedPreviewForm.toUpperCase()} ┐</span>

            {/* Form Specimen: DOSSIER */}
            {selectedPreviewForm === 'dossier' && (
              <div className="w-full max-w-2xl bg-white border border-[#191919] p-6 shadow-pixel-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#E6E6DF] pb-2 text-[10px] font-mono text-[#85877F]">
                  <span>DEEP READING DOSSIER // RECOVERED RECORD</span>
                  <span className="text-[#078286] font-bold">CREDIBILITY: 98%</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#141414]">
                  Acoustic Hydrophone Array 4 Telemetry (OCT 14, 23:42 UTC)
                </h3>
                <p className="font-serif text-sm text-[#42443F] leading-relaxed italic border-l-2 border-[#078286] pl-4">
                  "Transient surge: +86.4 dB peak at fundamental frequency 42.7 Hz. Harmonic overtone sequence detected in precise integer multiples. Non-stochastic envelope..."
                </p>
                <div className="text-[11px] font-mono text-[#85877F] flex items-center gap-4">
                  <span>WORDS: 248</span>
                  <span>EST. DWELL: 45s</span>
                  <span className="text-[#078286]">MARGIN ANNOTATION ACTIVE</span>
                </div>
              </div>
            )}

            {/* Form Specimen: RELATION ATLAS */}
            {selectedPreviewForm === 'atlas' && (
              <div className="w-full max-w-2xl bg-white border border-[#191919] p-4 shadow-pixel-sm flex flex-col items-center justify-center">
                <svg viewBox="0 0 460 180" className="w-full h-44">
                  {/* Connecting Edges */}
                  <line x1="80" y1="90" x2="230" y2="50" stroke="#191919" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="230" y1="50" x2="380" y2="90" stroke="#191919" strokeWidth="2" />
                  <line x1="230" y1="50" x2="230" y2="140" stroke="#078286" strokeWidth="2.5" />
                  <line x1="80" y1="90" x2="230" y2="140" stroke="#E6E6DF" strokeWidth="1.5" />
                  
                  {/* Node 1: Vance Log */}
                  <circle cx="80" cy="90" r="18" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                  <rect x="74" y="84" width="12" height="12" fill="#141414" />
                  <text x="80" y="122" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#141414">EV-01 VANCE</text>

                  {/* Center Node: Keycard Gamma-7 */}
                  <circle cx="230" cy="50" r="22" fill="#D9F0ED" stroke="#078286" strokeWidth="2.5" />
                  <rect x="222" y="42" width="16" height="16" fill="#078286" />
                  <text x="230" y="24" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#078286">EV-04 GAMMA-7</text>

                  {/* Node 3: Lin Statement */}
                  <circle cx="380" cy="90" r="18" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                  <rect x="374" y="84" width="12" height="12" fill="#141414" />
                  <text x="380" y="122" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#141414">EV-05 LIN WITNESS</text>

                  {/* Node 4: Microwave Intercept */}
                  <circle cx="230" cy="140" r="16" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
                  <rect x="225" y="135" width="10" height="10" fill="#078286" />
                  <text x="230" y="168" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#42443F">EV-03 UPLINK</text>
                </svg>
                <div className="font-mono text-[10px] text-[#078286] mt-1">
                  INTERACTIVE TOPOLOGY: 4 NODES · 4 RELATION EDGES · CONTRADICTION LINK DETECTED
                </div>
              </div>
            )}

            {/* Form Specimen: SIGNAL CONSOLE */}
            {selectedPreviewForm === 'console' && (
              <div className="w-full max-w-2xl bg-white border border-[#191919] p-4 shadow-pixel-sm font-mono text-xs flex flex-col gap-2">
                <div className="bg-[#141414] text-white p-2.5 flex items-center justify-between text-[11px]">
                  <span>QUERY_FILTER: [42.7Hz] // BUFFER: 12 HITS</span>
                  <span className="text-[#078286] font-bold">SWEEP: 0.04s</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                  <div className="p-2 bg-[#F0F0E9] border border-[#191919]">
                    <div className="text-[#85877F]">FREQ_SPIKE</div>
                    <div className="font-bold text-[#141414]">42.7 Hz / +86.4dB</div>
                  </div>
                  <div className="p-2 bg-[#F0F0E9] border border-[#191919]">
                    <div className="text-[#85877F]">PAYLOAD_SIZE</div>
                    <div className="font-bold text-[#141414]">14.4 MB / CRC-64</div>
                  </div>
                  <div className="p-2 bg-[#D9F0ED] border border-[#078286]">
                    <div className="text-[#078286]">WIPE_WINDOW</div>
                    <div className="font-bold text-[#078286]">540 SECONDS</div>
                  </div>
                </div>
                <div className="text-[10px] text-[#42443F] bg-[#F7F7F2] p-2 border border-[#E6E6DF]">
                  &gt; MATCH: SEC-VID-0000 CCTV WIPE 0x00 SCRIPT EXECUTED AT 23:41:04 UTC
                </div>
              </div>
            )}

            {/* Form Specimen: CHRONICLE */}
            {selectedPreviewForm === 'chronicle' && (
              <div className="w-full max-w-2xl bg-white border border-[#191919] p-5 shadow-pixel-sm flex flex-col gap-3 font-mono text-xs">
                <div className="text-[10px] text-[#85877F] uppercase tracking-wider pb-1 border-b border-[#E6E6DF] flex justify-between">
                  <span>TEMPORAL AXIS: OCTOBER 14, 2026</span>
                  <span className="text-[#078286] font-bold">BLACKOUT WINDOW: 23:41 - 23:50</span>
                </div>
                <div className="flex flex-col gap-2 relative pl-6 border-l-2 border-[#191919]">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-[#141414] border border-[#191919]"></span>
                    <span className="font-bold text-[#141414]">23:35 UTC</span> — Dr. Vance signs log; asserts Vault 03 safe.
                  </div>
                  <div className="relative text-[#078286] bg-[#D9F0ED] p-2 border border-[#078286]">
                    <span className="absolute -left-[31px] top-3 w-2.5 h-2.5 bg-[#078286] border border-[#191919]"></span>
                    <strong className="font-bold">23:41:00 UTC</strong> — Power drops. 32 cameras wiped. Hydrophones spike.
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-[#141414] border border-[#191919]"></span>
                    <span className="font-bold text-[#141414]">23:44:02 UTC</span> — Keycard Gamma-7 swiped; 42.8 kg removed.
                  </div>
                </div>
              </div>
            )}

            {/* Form Specimen: CROSS-EXAMINATION */}
            {selectedPreviewForm === 'compare' && (
              <div className="w-full max-w-2xl bg-white border border-[#191919] p-4 shadow-pixel-sm flex flex-col gap-3">
                <div className="text-[10px] font-mono text-[#078286] font-bold uppercase tracking-wider flex justify-between">
                  <span>SYNCHRONIZED AUDIT DISCREPANCY</span>
                  <span>CONTRADICTION FOUND</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#F7F7F2] border border-[#191919]">
                    <div className="text-[10px] text-[#85877F]">EV-01 // DR. VANCE LOG</div>
                    <div className="text-[#141414] font-medium mt-1">
                      "Gamma-7 safely secured in safe all night. Normal power grid failure."
                    </div>
                  </div>
                  <div className="p-3 bg-[#D9F0ED] border border-[#078286]">
                    <div className="text-[10px] text-[#078286] font-bold">EV-05 // CHIEF LIN DEPOSITION</div>
                    <div className="text-[#141414] font-medium mt-1">
                      "Fuel lines to diesel banks were sliced with 18mm ratcheting cutters."
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Specimen: LEDGER */}
            {selectedPreviewForm === 'ledger' && (
              <div className="w-full max-w-2xl bg-white border border-[#191919] shadow-pixel-sm text-xs font-mono overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F0F0E9] border-b border-[#191919] text-[10px] text-[#85877F]">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">TIMESTAMP</th>
                      <th className="p-2">CATEGORY</th>
                      <th className="p-2">CLASSIFICATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E6DF] text-[11px]">
                    <tr>
                      <td className="p-2 font-bold text-[#141414]">EV-01</td>
                      <td className="p-2">23:35 UTC</td>
                      <td className="p-2">LOGBOOK</td>
                      <td className="p-2 text-[#078286]">CONFIDENTIAL</td>
                    </tr>
                    <tr className="bg-[#F7F7F2]">
                      <td className="p-2 font-bold text-[#141414]">EV-02</td>
                      <td className="p-2">23:42 UTC</td>
                      <td className="p-2">TELEMETRY</td>
                      <td className="p-2 text-[#078286]">RESTRICTED</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-[#141414]">EV-03</td>
                      <td className="p-2">23:45 UTC</td>
                      <td className="p-2">TRANSMISSION</td>
                      <td className="p-2 text-red-700 font-bold">TOP SECRET</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#85877F] pt-2">
            <span>SPECIMEN RENDERING / NO BEHAVIOURAL TELEMETRY MODIFIED IN PREVIEW</span>
            <button
              onClick={onEnterArchive}
              className="text-[#078286] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>EXPERIENCE IN APP</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE EVOLUTION ENGINE */}
      <section id="section-engine" className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-10">
          <div className="inline-block border-2 border-[#171717] bg-white px-3 py-1 font-pixel text-[10px] font-bold text-[#087F82] uppercase mb-3 shadow-pixel-sm pixel-corners-sm">
            02. DETERMINISTIC BEHAVIOURAL ENGINE
          </div>
          <h2 className="font-pixel-arcade text-lg sm:text-2xl md:text-3xl text-[#141414] tracking-tight mb-3 leading-snug">
            IT WATCHES HOW YOU THINK.
            <br />
            <span className="text-[#087F82]">NOT WHO YOU ARE.</span>
          </h2>
          <p className="text-base text-[#42443F] max-w-2xl leading-relaxed">
            The adaptation algorithm is deterministic and client-side. It does not use opaque AI classifiers or scrape your identity. It measures observable in-app forensic inquiry methods.
          </p>
        </div>

        {/* 5 Behavioural Dimension Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Dimension 1 */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-pixel flex flex-col justify-between pixel-corners-sm">
            <div>
              <div className="flex items-center justify-between font-pixel text-[10px] text-[#85877F] mb-3">
                <span>PATTERN 01</span>
                <span className="text-[#087F82] font-bold">→ DOSSIER</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#141414] mb-2">
                Document Reading Depth
              </h3>
              <p className="text-xs text-[#42443F] leading-relaxed">
                Monitors active viewport dwell time, reading progression, and document completion. Reconstructs into a deep editorial reading room when long-form scrutiny is detected.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#85877F]">METRIC:</span>
              <span className="font-bold text-[#141414]">DWELL_MS &gt; 12000ms</span>
            </div>
          </div>

          {/* Dimension 2 */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-pixel flex flex-col justify-between pixel-corners-sm">
            <div>
              <div className="flex items-center justify-between font-pixel text-[10px] text-[#85877F] mb-3">
                <span>PATTERN 02</span>
                <span className="text-[#087F82] font-bold">→ RELATION ATLAS</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#141414] mb-2">
                Relational Reference Traversal
              </h3>
              <p className="text-xs text-[#42443F] leading-relaxed">
                Tracks cross-artifact hyperlinking, entity connection clicks, and graph browsing. Evolves into a node-link topological graph for associative explorers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#85877F]">METRIC:</span>
              <span className="font-bold text-[#141414]">EDGE_HOPS &gt; 4</span>
            </div>
          </div>

          {/* Dimension 3 */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-pixel flex flex-col justify-between pixel-corners-sm">
            <div>
              <div className="flex items-center justify-between font-pixel text-[10px] text-[#85877F] mb-3">
                <span>PATTERN 03</span>
                <span className="text-[#087F82] font-bold">→ SIGNAL CONSOLE</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#141414] mb-2">
                High-Velocity Search & Triage
              </h3>
              <p className="text-xs text-[#42443F] leading-relaxed">
                Identifies rapid keyword queries, category sweeps, and fast skim rates. Shifts into a high-density diagnostic console for fast filtering.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#85877F]">METRIC:</span>
              <span className="font-bold text-[#141414]">QUERIES_RATE &gt; 3/min</span>
            </div>
          </div>

          {/* Dimension 4 */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-pixel flex flex-col justify-between pixel-corners-sm">
            <div>
              <div className="flex items-center justify-between font-pixel text-[10px] text-[#85877F] mb-3">
                <span>PATTERN 04</span>
                <span className="text-[#087F82] font-bold">→ CHRONICLE</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#141414] mb-2">
                Sequential Chronology
              </h3>
              <p className="text-xs text-[#42443F] leading-relaxed">
                Detects temporal ordering, timeline scrubbing, and attempts to align blackout sequences. Aligns all evidence along a linear temporal causal axis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#85877F]">METRIC:</span>
              <span className="font-bold text-[#141414]">SCRUB_EVENTS &gt; 3</span>
            </div>
          </div>

          {/* Dimension 5 */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-pixel flex flex-col justify-between pixel-corners-sm">
            <div>
              <div className="flex items-center justify-between font-pixel text-[10px] text-[#85877F] mb-3">
                <span>PATTERN 05</span>
                <span className="text-[#087F82] font-bold">→ CROSS-EXAMINATION</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#141414] mb-2">
                Discrepancy & Contradiction Auditing
              </h3>
              <p className="text-xs text-[#42443F] leading-relaxed">
                Monitors side-by-side record comparison, contradiction reviews, and conflicting witness testimonies. Configures a split dual-pane cross-examiner.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#85877F]">METRIC:</span>
              <span className="font-bold text-[#141414]">PAIRED_AUDITS &gt; 2</span>
            </div>
          </div>

          {/* Live Engine Diagnostic Status Card */}
          <div className="bg-[#F0F0E9] border-2 border-[#171717] p-6 shadow-pixel flex flex-col justify-between pixel-corners-sm">
            <div>
              <div className="flex items-center justify-between font-pixel text-[10px] text-[#85877F] mb-2">
                <span>LIVE TELEMETRY</span>
                <span className="text-[#087F82] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#087F82] animate-pixel-pulse"></span>
                  ACTIVE
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#141414] mb-3">
                Current Calibration
              </h3>
              <div className="space-y-2 font-mono text-[11px]">
                {[
                  { label: 'DOSSIER', val: scores.dossier },
                  { label: 'ATLAS', val: scores.atlas },
                  { label: 'CONSOLE', val: scores.console },
                  { label: 'CHRONICLE', val: scores.chronicle },
                  { label: 'COMPARE', val: scores.compare },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center text-[10px] font-pixel">
                      <span>{s.label}:</span>
                      <span className="font-bold text-[#087F82]">{s.val}%</span>
                    </div>
                    {/* Minecraft-style segmented XP bar */}
                    <div className="w-full h-2 bg-[#E6E6DF] border border-[#171717] overflow-hidden">
                      <div
                        className="h-full bg-[#087F82] transition-all duration-300"
                        style={{
                          width: `${Math.max(5, s.val)}%`,
                          backgroundImage: 'repeating-linear-gradient(90deg, #087F82 0px, #087F82 4px, #0AB5B8 4px, #0AB5B8 6px)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] font-mono text-[#85877F] pt-2 border-t-2 border-[#171717] mt-3">
              HYSTERESIS THRESHOLD: 14% // COOLDOWN: 15s
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: CASE FILE 09 */}
      <section id="section-casefile" className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-10">
          <div className="inline-block border-2 border-[#171717] bg-white px-3 py-1 font-pixel text-[10px] font-bold text-[#087F82] uppercase mb-3 shadow-pixel-sm pixel-corners-sm">
            03. FICTIONAL INVESTIGATION
          </div>
          <h2 className="font-pixel-arcade text-lg sm:text-2xl md:text-3xl text-[#141414] tracking-tight mb-3 leading-snug">
            NINE MINUTES <span className="text-[#087F82]">ARE MISSING.</span>
          </h2>
          <p className="text-base text-[#42443F] max-w-2xl leading-relaxed">
            At 23:41 UTC on October 14, 2026, the Blackwood Deep-Core Subsurface Observatory experienced a complete system blackout. Exactly nine minutes later, power was restored. A 42.8 kg specimen was gone.
          </p>
        </div>

        {/* 3 Genuine Evidence Card Samples with Torn Edge Motif */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {EVIDENCE_RECORDS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-[#171717] shadow-pixel p-5 flex flex-col justify-between relative group hover:border-[#087F82] transition-colors"
            >
              {/* Torn top corner paper motif in CSS */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#F7F7F2] border-b border-l border-[#171717] pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-[#85877F] mb-2">
                  <span className="font-bold text-[#141414]">{item.code}</span>
                  <span className="text-[#087F82] font-semibold">{item.classification}</span>
                </div>

                <h3 className="font-display font-bold text-base text-[#141414] mb-2 leading-snug">
                  {item.title}
                </h3>

                <div className="font-mono text-[11px] text-[#85877F] mb-3">
                  {item.displayTime} · {item.source}
                </div>

                <p className="text-xs text-[#42443F] leading-relaxed line-clamp-4">
                  "{item.excerpt}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6E6DF] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#85877F]">CREDIBILITY: {item.credibility}%</span>
                <button
                  onClick={onEnterArchive}
                  className="text-[#087F82] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>INSPECT</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onEnterArchive}
            className="btn-tactile btn-minecraft bg-white hover:bg-[#F0F0E9] text-[#141414] border-2 border-[#171717] shadow-pixel px-6 py-3.5 font-pixel text-[10px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer pixel-corners-sm"
          >
            VIEW ALL 12 CASE FILE FRAGMENTS IN ARCHIVE ▶
          </button>
        </div>
      </section>

      {/* SECTION 4: FINAL CALL TO ACTION & FOOTER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8">
        <div className="w-full bg-white border-2 border-[#171717] shadow-pixel-lg p-8 md:p-14 text-center flex flex-col items-center justify-center relative overflow-hidden pixel-corners-sm">
          
          {/* Subtle background pixel motif */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-[#85877F] select-none">
            [EXPERIMENT 009 // FINAL RECEPTION]
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#85877F] select-none">
            58°12'N 04°22'W
          </div>

          <h2 className="font-pixel-arcade text-xl sm:text-2xl md:text-3xl text-[#141414] tracking-tight mb-4 max-w-2xl leading-relaxed">
            THE ARCHIVE WILL CHANGE.
            <br />
            <span className="text-[#087F82]">WILL YOU?</span>
          </h2>

          <p className="text-sm text-[#42443F] max-w-lg mb-8 leading-relaxed font-mono">
            Begin the investigation into Case 09. Discover the true reason behind the missing nine minutes and experience the impossible interface firsthand.
          </p>

          <button
            onClick={onEnterArchive}
            className="btn-tactile btn-minecraft bg-[#087F82] hover:bg-[#06676A] text-white border-2 border-[#171717] shadow-pixel px-8 py-4 text-xs sm:text-sm font-pixel-arcade font-bold tracking-wider uppercase flex items-center gap-3 cursor-pointer pixel-corners-sm"
          >
            <span>ENTER THE ARCHIVE</span>
            <span className="text-sm font-bold">▶</span>
          </button>
        </div>

        {/* Proper Editorial Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-[#171717] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#85877F]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#087F82] inline-block"></span>
            <span className="font-bold text-[#141414]">PALIMPSEST</span>
            <span>— The Interface That Learns You</span>
          </div>

          <div className="flex items-center gap-6">
            <span>BUILT FOR THE IMPOSSIBLE INTERFACE</span>
            <span>·</span>
            <span className="text-[#087F82]">STATUS: ZERO-LAG LOCAL ENGINE</span>
          </div>
        </footer>
      </section>

    </div>
  );
};

export default LandingSections;
