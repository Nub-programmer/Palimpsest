export type EvidenceCategory = 
  | 'logbook' 
  | 'telemetry' 
  | 'transmission' 
  | 'witness' 
  | 'manifest' 
  | 'classified';

export type StructuralForm = 
  | 'ledger' 
  | 'dossier' 
  | 'atlas' 
  | 'console' 
  | 'chronicle' 
  | 'compare';

export interface EvidenceItem {
  id: string;
  code: string;
  title: string;
  timestamp: string; // ISO or exact UTC formatted
  displayTime: string;
  category: EvidenceCategory;
  classification: 'UNRESTRICTED' | 'CONFIDENTIAL' | 'RESTRICTED' | 'TOP SECRET / OBSIDIAN';
  credibility: number; // 0 to 100
  source: string;
  location: string;
  excerpt: string;
  fullText: string;
  relatedIds: string[];
  tags: string[];
  contradictsId?: string;
  contradictionNote?: string;
  coordinates: { x: number; y: number }; // Relative coordinates for atlas graph
  keyFacts: string[];
}

export interface BehaviourScores {
  dossier: number;    // Deep reader (dwell, scroll depth, comprehensive reading)
  atlas: number;      // Associative explorer (relation traversal, graph usage)
  console: number;    // Signal console (rapid queries, tag filter sweeps)
  chronicle: number;  // Chronological thinker (timeline scrubbing, timestamp sequencing)
  compare: number;    // Cross-examiner (side-by-side comparison, contradiction analysis)
}

export interface RawMetrics {
  totalDwellMs: number;
  readingEventsCount: number;
  articlesFullyRead: string[];
  relationTraversalsCount: number;
  graphNodeClicks: number;
  searchQueriesCount: number;
  filterChangesCount: number;
  timelineScrubCount: number;
  chronologicalNavCount: number;
  comparisonSessionsCount: number;
  contradictionPinsCount: number;
  totalInteractions: number;
}

export interface TransformationRecord {
  id: string;
  timestamp: string;
  fromForm: StructuralForm;
  toForm: StructuralForm;
  triggerScore: keyof BehaviourScores;
  triggerValue: number;
  reason: string;
}

export interface InvestigationNote {
  id: string;
  title: string;
  content: string;
  linkedArtifactId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  currentForm: StructuralForm;
  previewForm: StructuralForm | null; // For judge / manual preview
  scores: BehaviourScores;
  rawMetrics: RawMetrics;
  transformations: TransformationRecord[];
  activeArtifactId: string;
  pinnedIds: string[];
  reviewedIds: string[];
  caseTheory: string;
  notes: InvestigationNote[];
  comparisonPair: [string, string];
  reducedMotion: boolean;
  lastTransformationTime: number;
}
