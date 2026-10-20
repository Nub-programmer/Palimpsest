import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

interface NotesViewProps {
  initialLinkedId?: string;
  onOpenDocument: (id: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({ 
  initialLinkedId, 
  onOpenDocument 
}) => {
  const { notes, createNote, updateNote, deleteNote, evidence } = useInvestigation();

  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || '');
  const [noteSearch, setNoteSearch] = useState<string>('');

  // Editing state
  const activeNote = notes.find((n) => n.id === selectedNoteId) || notes[0];
  const [editTitle, setEditTitle] = useState<string>(activeNote?.title || '');
  const [editContent, setEditContent] = useState<string>(activeNote?.content || '');
  const [editLinkedId, setEditLinkedId] = useState<string>(
    initialLinkedId || activeNote?.linkedArtifactId || ''
  );
  const [saveIndicator, setSaveIndicator] = useState<string>('Saved');

  // Synchronize when active note changes
  React.useEffect(() => {
    if (activeNote) {
      setEditTitle(activeNote.title);
      setEditContent(activeNote.content);
      setEditLinkedId(activeNote.linkedArtifactId || '');
    }
  }, [activeNote]);

  const handleTitleChange = (val: string) => {
    setEditTitle(val);
    setSaveIndicator('Saving...');
    if (activeNote) {
      updateNote(activeNote.id, val, editContent);
    }
    setTimeout(() => setSaveIndicator('Saved'), 400);
  };

  const handleContentChange = (val: string) => {
    setEditContent(val);
    setSaveIndicator('Saving...');
    if (activeNote) {
      updateNote(activeNote.id, editTitle, val);
    }
    setTimeout(() => setSaveIndicator('Saved'), 400);
  };

  const handleCreateNew = () => {
    createNote('Untitled Investigation Memo', 'Observation details...', initialLinkedId);
    setTimeout(() => {
      // select newest note
      if (notes.length > 0) {
        setSelectedNoteId(notes[0].id);
      }
    }, 50);
  };

  const filteredNotes = notes.filter((n) => {
    const q = noteSearch.toLowerCase();
    return !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
  });

  const linkedArtifact = editLinkedId ? evidence.find((e) => e.id === editLinkedId) : undefined;

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#171717] p-4 md:p-6 shadow-pixel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pixel-corners-sm">
        <div>
          <div className="flex items-center gap-2 font-pixel text-[10px] text-[#85877F] uppercase mb-1">
            <span className="w-2.5 h-2.5 bg-[#087F82] border border-[#171717] inline-block"></span>
            <span>FIELD RESEARCH WORKSPACE</span>
            <span>·</span>
            <span>{notes.length} INVESTIGATIVE ENTRIES</span>
          </div>
          <h1 className="font-pixel-arcade text-lg sm:text-2xl text-[#141414] leading-snug">
            FORENSIC RESEARCH NOTES
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="btn-tactile btn-minecraft bg-[#087F82] hover:bg-[#06676A] text-white border-2 border-[#171717] shadow-pixel px-4 py-2.5 font-pixel text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer pixel-corners-sm"
        >
          <span>+ NEW MEMO</span>
        </button>
      </div>

      {/* Split: Notes Index List / Note Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Note Index (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border-2 border-[#171717] shadow-pixel flex flex-col max-h-[700px] pixel-corners-sm">
          {/* Search Box */}
          <div className="p-3 bg-[#F0F0E9] border-b-2 border-[#171717]">
            <input
              type="text"
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              placeholder="Search field notes..."
              className="w-full bg-white border-2 border-[#171717] px-3 py-1.5 font-mono text-xs text-[#141414] focus:outline-none pixel-corners-sm"
            />
          </div>

          {/* Notes List */}
          <div className="overflow-y-auto divide-y divide-[#E6E6DF] flex-1">
            {filteredNotes.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-[#85877F]">
                NO NOTES MATCH SEARCH
              </div>
            ) : (
              filteredNotes.map((n) => {
                const isSelected = n.id === activeNote?.id;
                const linked = evidence.find((e) => e.id === n.linkedArtifactId);

                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNoteId(n.id)}
                    className={`p-3.5 transition-colors cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-[#D9F0ED] border-l-4 border-l-[#087F82]'
                        : 'hover:bg-[#F7F7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#85877F]">
                      <span>{new Date(n.updatedAt).toLocaleTimeString()}</span>
                      {linked && (
                        <span className="text-[#087F82] font-pixel text-[9px] font-bold">
                          LINK: {linked.code}
                        </span>
                      )}
                    </div>
                    <div className="font-display font-semibold text-sm text-[#141414] truncate">
                      {n.title}
                    </div>
                    <p className="font-mono text-xs text-[#42443F] line-clamp-2">
                      {n.content}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Note Editor (lg:col-span-8) */}
        {activeNote ? (
          <div className="lg:col-span-8 bg-white border-2 border-[#171717] shadow-pixel p-6 flex flex-col gap-4 pixel-corners-sm">
            
            {/* Header: Title & Save Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#171717]">
              <div className="flex-1">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="font-display font-bold text-xl sm:text-2xl text-[#141414] w-full bg-transparent border-b-2 border-transparent hover:border-[#E6E6DF] focus:border-[#087F82] focus:outline-none py-1"
                  placeholder="Note Title..."
                />
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-[#087F82] text-[10px] font-pixel font-semibold">{saveIndicator}</span>
                <button
                  onClick={() => deleteNote(activeNote.id)}
                  className="btn-tactile btn-minecraft px-2.5 py-1 text-red-700 bg-red-50 border-2 border-red-300 font-pixel text-[9px] font-bold cursor-pointer pixel-corners-sm"
                >
                  DELETE ✕
                </button>
              </div>
            </div>

            {/* Linked Artifact Selector Bar */}
            <div className="flex flex-wrap items-center gap-3 p-2.5 bg-[#F0F0E9] border-2 border-[#171717] font-mono text-xs pixel-corners-sm">
              <span className="text-[#85877F] text-[10px] font-pixel">LINKED ARTIFACT:</span>
              <select
                value={editLinkedId}
                onChange={(e) => {
                  setEditLinkedId(e.target.value);
                  createNote(editTitle, editContent, e.target.value || undefined);
                }}
                className="bg-white border-2 border-[#171717] px-2.5 py-1 text-xs text-[#141414] focus:outline-none cursor-pointer pixel-corners-sm"
              >
                <option value="">None (General Memo)</option>
                {evidence.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.code} — {item.title}
                  </option>
                ))}
              </select>

              {linkedArtifact && (
                <button
                  onClick={() => onOpenDocument(linkedArtifact.id)}
                  className="text-[#087F82] font-pixel text-[10px] font-bold hover:underline cursor-pointer ml-auto flex items-center gap-1"
                >
                  <span>OPEN {linkedArtifact.code}</span>
                  <span>↗</span>
                </button>
              )}
            </div>

            {/* Content Body Editor */}
            <textarea
              value={editContent}
              onChange={(e) => handleContentChange(e.target.value)}
              rows={14}
              className="w-full bg-[#FAF9F5] border-2 border-[#171717] p-4 font-mono text-xs sm:text-sm text-[#141414] leading-relaxed focus:outline-none focus:border-[#087F82] shadow-inner resize-y pixel-corners-sm"
              placeholder="Record your observations, notes, deductions, or discrepancy flags..."
            />

            <div className="pt-2 border-t-2 border-[#171717] flex items-center justify-between font-mono text-[11px] text-[#85877F]">
              <span>CHARACTERS: {editContent.length}</span>
              <span className="text-[#087F82] font-pixel text-[9px]">PERPETUALLY SAVED ACROSS RECONFIGURATIONS</span>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-white border-2 border-[#171717] p-12 text-center font-mono text-xs text-[#85877F] pixel-corners-sm">
            NO NOTE SELECTED
          </div>
        )}

      </div>

    </div>
  );
};

export default NotesView;
