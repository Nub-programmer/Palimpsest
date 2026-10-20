import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { EvidenceItem } from '../../types';

interface AtlasViewProps {
  onOpenDocument: (id: string) => void;
  onNavigateToCompare?: (docA: string, docB: string) => void;
}

export const AtlasView: React.FC<AtlasViewProps> = ({ 
  onOpenDocument,
  onNavigateToCompare 
}) => {
  const { 
    evidence, 
    activeArtifact, 
    trackGraphInteraction,
    pinnedItems,
    togglePinArtifact 
  } = useInvestigation();

  const [selectedNodeId, setSelectedNodeId] = useState<string>(activeArtifact.id);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedItem = evidence.find((e) => e.id === selectedNodeId) || activeArtifact;
  const isPinned = pinnedItems.some((p) => p.id === selectedItem.id);

  // Handle Node Click
  const handleNodeClick = (node: EvidenceItem) => {
    setSelectedNodeId(node.id);
    trackGraphInteraction(node.id);
  };

  // Compile all unique edges from the genuine dataset
  const edges = React.useMemo(() => {
    const list: { from: EvidenceItem; to: EvidenceItem; isContradiction: boolean }[] = [];
    const seen = new Set<string>();

    evidence.forEach((source) => {
      source.relatedIds.forEach((targetId) => {
        const target = evidence.find((e) => e.id === targetId);
        if (target) {
          const key1 = `${source.id}-${target.id}`;
          const key2 = `${target.id}-${source.id}`;
          if (!seen.has(key1) && !seen.has(key2)) {
            seen.add(key1);
            const isContradiction = source.contradictsId === target.id || target.contradictsId === source.id;
            list.push({ from: source, to: target, isContradiction });
          }
        }
      });
    });

    return list;
  }, [evidence]);

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Header & Controls */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1.5">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span>TOPOLOGICAL RELATION ATLAS</span>
            <span>·</span>
            <span>12 FORENSIC ENTITIES</span>
          </div>
          <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
            CASE 09 ASSOCIATIVE NETWORK
          </h1>
        </div>

        {/* Graph Controls */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1 bg-[#F0F0E9] border border-[#191919] p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.15))}
              className="px-2 py-0.5 hover:bg-white text-[#141414] font-bold cursor-pointer"
            >
              -
            </button>
            <span className="px-2 text-[11px] text-[#42443F]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
              className="px-2 py-0.5 hover:bg-white text-[#141414] font-bold cursor-pointer"
            >
              +
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-2 py-0.5 text-[10px] text-[#85877F] hover:text-[#141414] underline"
            >
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#F0F0E9] border border-[#191919] px-2.5 py-1.5 font-mono text-xs text-[#141414] focus:outline-none cursor-pointer"
          >
            <option value="all">Show All Categories</option>
            <option value="logbook">Logbooks</option>
            <option value="telemetry">Telemetry</option>
            <option value="transmission">Transmissions</option>
            <option value="witness">Witness</option>
            <option value="manifest">Manifests</option>
            <option value="classified">Classified</option>
          </select>
        </div>
      </div>

      {/* Main Workspace Split: Large SVG Canvas + Selected Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive SVG Graph Canvas (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border-2 border-[#171717] shadow-pixel p-4 relative overflow-hidden pixel-corners-sm" style={{ minHeight: '560px' }}>
          
          {/* Subtle Grid Canvas Background */}
          <div className="absolute inset-0 bg-graph-paper-fine pointer-events-none opacity-60"></div>
          
          {/* Graph Legend */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 border-2 border-[#171717] px-3 py-2 font-mono text-[10px] space-y-1 shadow-pixel-sm pixel-corners-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#171717]"></span>
              <span>VERIFIED RELATION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-red-600"></span>
              <span className="text-red-700 font-bold">CONTRADICTION LINK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
              <span>ACTIVE INSPECTED NODE</span>
            </div>
          </div>

          {/* SVG Diagram Area */}
          <div className="w-full h-full min-h-[500px] flex items-center justify-center overflow-auto">
            <svg
              viewBox="0 0 820 680"
              className="w-full h-full max-w-[820px] transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            >
              {/* Edges */}
              <g className="edges">
                {edges.map((edge, idx) => {
                  const isHighlighted = edge.from.id === selectedNodeId || edge.to.id === selectedNodeId;
                  const isContradiction = edge.isContradiction;

                  return (
                    <line
                      key={idx}
                      x1={edge.from.coordinates.x}
                      y1={edge.from.coordinates.y}
                      x2={edge.to.coordinates.x}
                      y2={edge.to.coordinates.y}
                      stroke={
                        isContradiction 
                          ? '#DC2626' 
                          : isHighlighted 
                          ? '#087F82' 
                          : '#C8C8BF'
                      }
                      strokeWidth={isHighlighted || isContradiction ? 2.5 : 1.2}
                      strokeDasharray={isContradiction ? '4 3' : isHighlighted ? '6 3' : undefined}
                      opacity={isHighlighted || isContradiction ? 1 : 0.65}
                      className={isHighlighted ? 'animate-pixel-pulse' : undefined}
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {evidence.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isRelated = selectedItem.relatedIds.includes(node.id);
                  const isDimmed = filterCategory !== 'all' && node.category !== filterCategory;
                  const isContradictionTarget = selectedItem.contradictsId === node.id;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.coordinates.x}, ${node.coordinates.y})`}
                      onClick={() => handleNodeClick(node)}
                      className="cursor-pointer group"
                      opacity={isDimmed ? 0.25 : 1}
                      style={{ imageRendering: 'pixelated' }}
                    >
                      {/* Minecraft Selection Corner Brackets if selected */}
                      {isSelected && (
                        <g className="animate-pixel-pulse">
                          <rect x="-26" y="-26" width="12" height="3" fill="#087F82" />
                          <rect x="-26" y="-26" width="3" height="12" fill="#087F82" />
                          <rect x="14" y="-26" width="12" height="3" fill="#087F82" />
                          <rect x="23" y="-26" width="3" height="12" fill="#087F82" />
                          <rect x="-26" y="23" width="12" height="3" fill="#087F82" />
                          <rect x="-26" y="14" width="3" height="12" fill="#087F82" />
                          <rect x="14" y="23" width="12" height="3" fill="#087F82" />
                          <rect x="23" y="14" width="3" height="12" fill="#087F82" />
                        </g>
                      )}

                      {/* Main Square Minecraft Block */}
                      <rect
                        x={isSelected ? -20 : -16}
                        y={isSelected ? -20 : -16}
                        width={isSelected ? 40 : 32}
                        height={isSelected ? 40 : 32}
                        fill={
                          isSelected 
                            ? '#087F82' 
                            : isContradictionTarget
                            ? '#FEE2E2'
                            : isRelated 
                            ? '#D9F0ED' 
                            : '#FFFFFF'
                        }
                        stroke={
                          isSelected 
                            ? '#171717' 
                            : isContradictionTarget
                            ? '#DC2626'
                            : isRelated
                            ? '#087F82'
                            : '#171717'
                        }
                        strokeWidth={isSelected || isContradictionTarget ? 2.5 : 2}
                        className="transition-all duration-100 group-hover:scale-105"
                      />

                      {/* Voxel Highlight Corner */}
                      {isSelected && (
                        <rect x="-17" y="-17" width="6" height="6" fill="#0AB5B8" />
                      )}

                      {/* Center Symbol / Code */}
                      <text
                        textAnchor="middle"
                        dy="4"
                        fontSize={isSelected ? '10' : '9'}
                        fontFamily="monospace"
                        fontWeight="bold"
                        fill={isSelected ? '#FFFFFF' : isContradictionTarget ? '#DC2626' : '#141414'}
                      >
                        {node.id.replace('EV-', '')}
                      </text>

                      {/* Node Label Below */}
                      <text
                        textAnchor="middle"
                        y={isSelected ? 34 : 28}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fill={isSelected ? '#087F82' : '#42443F'}
                        className="pointer-events-none"
                      >
                        {node.code}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="mt-2 pt-2 border-t border-[#E6E6DF] flex items-center justify-between font-mono text-[11px] text-[#85877F]">
            <span>CLICK NODE TO INSPECT CONVERGENCE</span>
            <span className="text-[#078286] font-semibold">12 NODES · {edges.length} RELATIONAL EDGES</span>
          </div>
        </div>

        {/* Right Column: Node Inspector Drawer (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col justify-between max-h-[680px] pixel-corners-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] mb-4">
              <div>
                <span className="font-pixel text-[10px] text-[#85877F] uppercase tracking-wider block">
                  NODE SPECIFICATION
                </span>
                <span className="font-mono text-sm font-bold text-[#141414]">
                  {selectedItem.code}
                </span>
              </div>

              <button
                onClick={() => togglePinArtifact(selectedItem.id)}
                className={`btn-tactile btn-minecraft px-3 py-1.5 text-[10px] font-pixel font-bold border-2 border-[#171717] cursor-pointer pixel-corners-sm ${
                  isPinned ? 'bg-[#087F82] text-white shadow-pixel-sm' : 'bg-[#F0F0E9] text-[#141414]'
                }`}
              >
                {isPinned ? '★ PINNED' : '☆ PIN'}
              </button>
            </div>

            <h2 className="font-display font-bold text-lg text-[#141414] mb-2 leading-snug">
              {selectedItem.title}
            </h2>

            <div className="font-mono text-[11px] text-[#85877F] mb-4 space-y-1">
              <div>TIME: <strong className="text-[#141414]">{selectedItem.displayTime}</strong></div>
              <div>SOURCE: <strong className="text-[#141414]">{selectedItem.source}</strong></div>
              <div>CREDIBILITY: <strong className="text-[#087F82]">{selectedItem.credibility}%</strong></div>
            </div>

            <div className="p-3 bg-[#F7F7F2] border-2 border-[#171717] font-mono text-xs text-[#42443F] leading-relaxed mb-4 pixel-corners-sm">
              "{selectedItem.excerpt}"
            </div>

            {/* Contradiction Warning */}
            {selectedItem.contradictsId && (
              <div className="p-3 bg-red-50 border-2 border-red-400 text-xs font-mono text-red-900 mb-4 pixel-corners-sm">
                <div className="font-bold mb-1 font-pixel text-[10px]">⚠ CONTRADICTION DETECTED:</div>
                <p className="text-[11px] leading-relaxed">
                  {selectedItem.contradictionNote}
                </p>
                {onNavigateToCompare && (
                  <button
                    onClick={() => onNavigateToCompare(selectedItem.id, selectedItem.contradictsId!)}
                    className="mt-2 text-xs font-bold text-red-800 underline block cursor-pointer"
                  >
                    Compare directly in Cross-Exam ▶
                  </button>
                )}
              </div>
            )}

            {/* Linked Nodes List */}
            <div className="space-y-2">
              <span className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider block">
                CONNECTED NEIGHBORS ({selectedItem.relatedIds.length}):
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {selectedItem.relatedIds.map((relId) => {
                  const rel = evidence.find((e) => e.id === relId);
                  if (!rel) return null;
                  return (
                    <button
                      key={relId}
                      onClick={() => handleNodeClick(rel)}
                      className="btn-tactile btn-minecraft px-2.5 py-1 bg-[#F0F0E9] hover:bg-[#D9F0ED] border-2 border-[#171717] text-[#141414] text-[11px] font-bold cursor-pointer pixel-corners-sm"
                    >
                      {rel.code} ▶
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#171717] flex flex-col gap-2">
            <button
              onClick={() => onOpenDocument(selectedItem.id)}
              className="btn-tactile btn-minecraft w-full py-3 bg-[#087F82] hover:bg-[#06676A] text-white border-2 border-[#171717] shadow-pixel font-pixel text-[10px] font-bold uppercase tracking-wider cursor-pointer text-center pixel-corners-sm"
            >
              OPEN FULL DOSSIER ▶
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AtlasView;
