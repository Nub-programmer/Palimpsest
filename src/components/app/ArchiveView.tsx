import React, { useState, useMemo } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { EvidenceCategory, EvidenceItem } from '../../types';

interface ArchiveViewProps {
  onNavigateToCompare?: (docA: string, docB: string) => void;
  onNavigateToNotes?: (linkedDocId: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ 
  onNavigateToCompare,
  onNavigateToNotes 
}) => {
  const {
    evidence,
    activeArtifact,
    setActiveArtifactId,
    pinnedItems,
    togglePinArtifact,
    reviewedItems,
    toggleReviewed,
    effectiveForm,
    trackSearch,
    trackFilterChange,
    trackRelationTraversal,
  } = useInvestigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'credibility' | 'code'>('timestamp');
  const [pinFeedback, setPinFeedback] = useState<string | null>(null);

  const handleTogglePin = (id: string) => {
    const willPin = !pinnedItems.some((p) => p.id === id);
    togglePinArtifact(id);
    setPinFeedback(willPin ? '+1 PINNED TO BOARD ★' : '-1 REMOVED FROM BOARD');
    setTimeout(() => setPinFeedback(null), 2000);
  };

  // Handle Search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      trackSearch(q);
    }
  };

  // Handle Category Filter
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    trackFilterChange(cat);
  };

  // Handle Related Item Hop
  const handleHopToRelated = (relatedId: string) => {
    trackRelationTraversal(activeArtifact.id, relatedId);
  };

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'ALL RECORDS' },
    { id: 'logbook', label: 'LOGBOOKS' },
    { id: 'telemetry', label: 'TELEMETRY' },
    { id: 'transmission', label: 'TRANSMISSIONS' },
    { id: 'witness', label: 'WITNESS' },
    { id: 'manifest', label: 'MANIFESTS' },
    { id: 'classified', label: 'CLASSIFIED' },
  ];

  // Filter and Sort Evidence
  const filteredEvidence = useMemo(() => {
    return evidence.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.fullText.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'timestamp') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      if (sortBy === 'credibility') {
        return b.credibility - a.credibility;
      }
      return a.code.localeCompare(b.code);
    });
  }, [evidence, selectedCategory, searchQuery, sortBy]);

  const isPinned = pinnedItems.some((p) => p.id === activeArtifact.id);
  const isReviewed = reviewedItems.some((r) => r.id === activeArtifact.id);

  // Contradiction partner lookup
  const contradictionTarget = activeArtifact.contradictsId
    ? evidence.find((e) => e.id === activeArtifact.contradictsId)
    : undefined;

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-2 border-[#191919] p-4 shadow-pixel flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search records, transcripts, telemetry, codes..."
            className="w-full bg-[#F7F7F2] border border-[#191919] px-3.5 py-2 font-mono text-xs text-[#141414] focus:outline-none focus:bg-white focus:border-[#078286]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#85877F] hover:text-[#141414]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`btn-tactile px-3 py-1.5 font-pixel text-[10px] font-bold tracking-wider uppercase border-2 border-[#171717] whitespace-nowrap cursor-pointer pixel-corners-sm ${
                selectedCategory === cat.id
                  ? 'bg-[#087F82] text-white shadow-pixel-sm'
                  : 'bg-[#F0F0E9] text-[#141414] hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <span className="text-[#85877F] text-[11px] font-pixel">SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#F0F0E9] border-2 border-[#171717] px-2.5 py-1.5 font-mono text-xs text-[#141414] focus:outline-none cursor-pointer pixel-corners-sm"
          >
            <option value="timestamp">Chronology (Time)</option>
            <option value="credibility">Credibility Rating</option>
            <option value="code">Artifact Code</option>
          </select>
        </div>

      </div>

      {/* Main Split: Left Artifact List / Right Document Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Artifact List (lg:col-span-4 or 5) */}
        <div className={`${effectiveForm === 'dossier' ? 'lg:col-span-4' : 'lg:col-span-5'} bg-white border-2 border-[#171717] shadow-pixel flex flex-col max-h-[780px] pixel-corners-sm`}>
          <div className="p-3 bg-[#F0F0E9] border-b-2 border-[#171717] flex items-center justify-between text-xs font-pixel">
            <span className="font-bold text-[#141414]">ARCHIVE INDEX</span>
            <span className="text-[#85877F]">{filteredEvidence.length} MATCHES</span>
          </div>

          <div className="overflow-y-auto divide-y divide-[#E6E6DF] flex-1">
            {filteredEvidence.map((item) => {
              const isSelected = item.id === activeArtifact.id;
              const itemReviewed = reviewedItems.some((r) => r.id === item.id);
              const itemPinned = pinnedItems.some((p) => p.id === item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveArtifactId(item.id)}
                  className={`p-3.5 transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-[#D9F0ED] border-l-4 border-l-[#087F82]'
                      : 'hover:bg-[#F7F7F2] hover:border-l-4 hover:border-l-[#85877F]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#85877F]">
                    <span className="font-bold text-[#141414]">{item.code}</span>
                    <div className="flex items-center gap-1.5">
                      {itemPinned && (
                        <span className="w-2 h-2 bg-[#087F82] border border-[#171717] inline-block animate-pixel-pulse" title="Pinned to caseboard"></span>
                      )}
                      {itemReviewed && (
                        <span className="text-[9px] text-[#087F82] font-pixel font-bold uppercase">READ</span>
                      )}
                      <span className="text-[#087F82] uppercase font-semibold font-pixel text-[9px]">{item.category}</span>
                    </div>
                  </div>

                  <div className="font-display font-semibold text-sm text-[#141414] leading-snug">
                    {item.title}
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-[#85877F]">
                    <span>{item.displayTime}</span>
                    <span>CRED: {item.credibility}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Document Reader (lg:col-span-8 or 7) */}
        <div className={`${effectiveForm === 'dossier' ? 'lg:col-span-8' : 'lg:col-span-7'} bg-white border-2 border-[#171717] shadow-pixel p-6 md:p-8 flex flex-col gap-6 relative pixel-corners-sm`}>
          
          {/* Top Document Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b-2 border-[#171717]">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#85877F] uppercase mb-1">
                <span className="font-bold text-[#141414]">{activeArtifact.code}</span>
                <span>/</span>
                <span className="text-[#087F82] font-bold">{activeArtifact.classification}</span>
                <span>/</span>
                <span>{activeArtifact.location}</span>
              </div>
              <h2 className="font-pixel-arcade text-base sm:text-xl text-[#141414] leading-snug">
                {activeArtifact.title}
              </h2>
            </div>

            {/* Quick Actions: Pin, Mark Reviewed, Create Note */}
            <div className="flex items-center gap-2 font-pixel text-[10px] shrink-0 relative">
              {pinFeedback && (
                <div className="absolute -top-8 right-0 bg-[#087F82] text-white font-pixel text-[9px] px-2.5 py-1 border border-[#171717] animate-pixel-toast pixel-corners-sm shadow-pixel-sm z-20 whitespace-nowrap">
                  {pinFeedback}
                </div>
              )}
              <button
                onClick={() => handleTogglePin(activeArtifact.id)}
                className={`btn-tactile btn-minecraft px-3 py-1.5 border-2 border-[#171717] font-bold uppercase cursor-pointer pixel-corners-sm ${
                  isPinned 
                    ? 'bg-[#087F82] text-white shadow-pixel-sm' 
                    : 'bg-[#F0F0E9] text-[#141414] hover:bg-white'
                }`}
              >
                {isPinned ? '★ PINNED' : '☆ PIN FINDING'}
              </button>

              <button
                onClick={() => toggleReviewed(activeArtifact.id)}
                className={`btn-tactile btn-minecraft px-3 py-1.5 border-2 border-[#171717] font-bold uppercase cursor-pointer pixel-corners-sm ${
                  isReviewed
                    ? 'bg-[#141414] text-white'
                    : 'bg-white text-[#141414] hover:bg-[#F0F0E9]'
                }`}
              >
                {isReviewed ? '✓ REVIEWED' : 'MARK READ'}
              </button>

              {onNavigateToNotes && (
                <button
                  onClick={() => onNavigateToNotes(activeArtifact.id)}
                  className="btn-tactile px-2.5 py-1.5 border-2 border-[#171717] bg-[#F0F0E9] hover:bg-white text-[#141414] cursor-pointer pixel-corners-sm"
                  title="Create note linked to this artifact"
                >
                  ✎ NOTE
                </button>
              )}
            </div>
          </div>

          {/* Metadata Card Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F0F0E9] p-3 border-2 border-[#171717] font-mono text-xs pixel-corners-sm shadow-pixel-sm">
            <div>
              <div className="text-[10px] text-[#85877F] font-pixel">TIMESTAMP</div>
              <div className="font-bold text-[#141414]">{activeArtifact.displayTime}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#85877F] font-pixel">SOURCE</div>
              <div className="font-bold text-[#141414] truncate" title={activeArtifact.source}>
                {activeArtifact.source}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#85877F] font-pixel">CREDIBILITY</div>
              <div className="font-bold text-[#087F82]">{activeArtifact.credibility}% NOMINAL</div>
            </div>
            <div>
              <div className="text-[10px] text-[#85877F] font-pixel">SECURITY</div>
              <div className="font-bold text-red-700">{activeArtifact.classification}</div>
            </div>
          </div>

          {/* Contradiction Alert Box (if present) */}
          {contradictionTarget && (
            <div className="bg-[#D9F0ED] border-2 border-[#087F82] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs pixel-corners-sm shadow-pixel-sm">
              <div>
                <div className="font-bold text-[#087F82] uppercase flex items-center gap-2 font-pixel text-[11px]">
                  <span>⚠ CONTRADICTION DETECTED WITH {contradictionTarget.code}</span>
                </div>
                <p className="text-[#141414] text-[11px] mt-1 leading-relaxed">
                  {activeArtifact.contradictionNote}
                </p>
              </div>

              {onNavigateToCompare && (
                <button
                  onClick={() => onNavigateToCompare(activeArtifact.id, contradictionTarget.id)}
                  className="btn-tactile btn-minecraft bg-[#087F82] text-white px-3.5 py-1.5 border-2 border-[#171717] font-pixel text-[10px] font-bold uppercase whitespace-nowrap cursor-pointer shrink-0 pixel-corners-sm"
                >
                  CROSS-EXAMINE ▶
                </button>
              )}
            </div>
          )}

          {/* Full Text Recovered Dossier Content */}
          <div className="prose max-w-none">
            <div className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider mb-2">
              RECOVERED TRANSCRIPT // PRIMARY RECORD
            </div>
            <div className="bg-[#FAF9F5] border-2 border-[#171717] p-5 font-mono text-xs sm:text-[13px] text-[#141414] leading-relaxed whitespace-pre-wrap shadow-inner pixel-corners-sm">
              {activeArtifact.fullText}
            </div>
          </div>

          {/* Key Facts Summary */}
          <div>
            <div className="text-[10px] font-pixel text-[#85877F] uppercase tracking-wider mb-2">
              VERIFIED FORENSIC OBSERVATIONS
            </div>
            <ul className="space-y-1.5 font-mono text-xs text-[#42443F]">
              {activeArtifact.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#087F82] font-bold">▪</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Artifacts Reference Links */}
          <div className="pt-4 border-t-2 border-[#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[#85877F] uppercase text-[10px] font-pixel">CROSS-REFERENCES:</span>
              {activeArtifact.relatedIds.map((relId) => {
                const rel = evidence.find((e) => e.id === relId);
                if (!rel) return null;
                return (
                  <button
                    key={relId}
                    onClick={() => handleHopToRelated(relId)}
                    className="btn-tactile btn-minecraft px-2.5 py-1 bg-[#F0F0E9] hover:bg-[#D9F0ED] border-2 border-[#171717] text-[#141414] font-bold text-[11px] cursor-pointer flex items-center gap-1 pixel-corners-sm"
                  >
                    <span>{rel.code}</span>
                    <span className="text-[#087F82]">↗</span>
                  </button>
                );
              })}
            </div>

            <div className="font-pixel text-[9px] text-[#85877F]">
              REFERENTIAL TRAVERSAL MONITORED
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ArchiveView;
