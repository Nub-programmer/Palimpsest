import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { 
  EvidenceItem, 
  StructuralForm, 
  BehaviourScores, 
  RawMetrics, 
  TransformationRecord, 
  InvestigationNote, 
  AppState 
} from '../types';
import { EVIDENCE_RECORDS, INITIAL_CASE_THEORY } from '../data/evidence';

const STORAGE_KEY = 'palimpsest_investigation_state_v1';
const MIN_INTERACTIONS_FOR_TRANSFORM = 4;
const HYSTERESIS_THRESHOLD = 14; // Must lead by at least this margin
const COOLDOWN_MS = 15000; // 15 seconds cooldown between automatic shifts

interface InvestigationContextType {
  // Data
  evidence: EvidenceItem[];
  activeArtifact: EvidenceItem;
  pinnedItems: EvidenceItem[];
  reviewedItems: EvidenceItem[];
  currentForm: StructuralForm;
  previewForm: StructuralForm | null;
  effectiveForm: StructuralForm; // previewForm ?? currentForm
  scores: BehaviourScores;
  rawMetrics: RawMetrics;
  transformations: TransformationRecord[];
  caseTheory: string;
  notes: InvestigationNote[];
  comparisonPair: [string, string];
  reducedMotion: boolean;
  latestNotification: string | null;

  // Actions
  setActiveArtifactId: (id: string) => void;
  togglePinArtifact: (id: string) => void;
  toggleReviewed: (id: string) => void;
  setCaseTheory: (theory: string) => void;
  setComparisonPair: (pair: [string, string]) => void;
  createNote: (title: string, content: string, linkedArtifactId?: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  setPreviewForm: (form: StructuralForm | null) => void;
  setReducedMotion: (reduced: boolean) => void;
  clearNotification: () => void;

  // Tracking methods for Behaviour Engine
  trackReadingDwell: (artifactId: string, ms: number) => void;
  trackRelationTraversal: (fromId: string, toId: string) => void;
  trackGraphInteraction: (nodeId: string) => void;
  trackSearch: (query: string) => void;
  trackFilterChange: (category: string) => void;
  trackTimelineInteraction: (eventId: string) => void;
  trackComparisonSession: (docA: string, docB: string) => void;
  trackContradictionPin: (contradictionId: string) => void;

  // Diagnostics & Resets
  resetAll: () => void;
  resetLayout: () => void;
  resetProfile: () => void;
}

const DEFAULT_METRICS: RawMetrics = {
  totalDwellMs: 0,
  readingEventsCount: 0,
  articlesFullyRead: [],
  relationTraversalsCount: 0,
  graphNodeClicks: 0,
  searchQueriesCount: 0,
  filterChangesCount: 0,
  timelineScrubCount: 0,
  chronologicalNavCount: 0,
  comparisonSessionsCount: 0,
  contradictionPinsCount: 0,
  totalInteractions: 0,
};

const DEFAULT_SCORES: BehaviourScores = {
  dossier: 20,
  atlas: 20,
  console: 20,
  chronicle: 20,
  compare: 20,
};

const INITIAL_NOTES: InvestigationNote[] = [
  {
    id: 'note-01',
    title: 'Diesel Fuel Line Discrepancy',
    content: 'Dr. Vance asserted in his log that the generator failure was due to thermal overcurrent. Mara Lin confirmed the lines were manually sliced with 18mm ratcheting cutters. Check Keycard Gamma-7 logs.',
    linkedArtifactId: 'EV-05',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'note-02',
    title: 'Harmonic 42.7 Hz vs Schumann 7.83 Hz',
    content: 'Hydrophone recorded integer overtones starting at 42.7 Hz. Meanwhile, the independent surface seismograph registered 7.83 Hz. Both confirm non-tectonic activity right beneath Borehole 04.',
    linkedArtifactId: 'EV-02',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  }
];

export const InvestigationContext = createContext<InvestigationContextType | null>(null);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state defensively from localStorage
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.currentForm && parsed.scores) {
          return {
            ...parsed,
            previewForm: null, // Don't persist preview lock
          };
        }
      }
    } catch {
      // fallback
    }

    return {
      currentForm: 'ledger',
      previewForm: null,
      scores: DEFAULT_SCORES,
      rawMetrics: DEFAULT_METRICS,
      transformations: [],
      activeArtifactId: 'EV-01',
      pinnedIds: ['EV-01', 'EV-03', 'EV-04'],
      reviewedIds: ['EV-01'],
      caseTheory: INITIAL_CASE_THEORY,
      notes: INITIAL_NOTES,
      comparisonPair: ['EV-01', 'EV-05'],
      reducedMotion: false,
      lastTransformationTime: 0,
    };
  });

  const [latestNotification, setLatestNotification] = useState<string | null>(null);

  // Active reading dwell timer reference
  const dwellStartTimeRef = useRef<number>(Date.now());
  const activeDocIdRef = useRef<string>(appState.activeArtifactId);

  // Synchronize active doc ref
  useEffect(() => {
    activeDocIdRef.current = appState.activeArtifactId;
    dwellStartTimeRef.current = Date.now();
  }, [appState.activeArtifactId]);

  // Persist state changes
  useEffect(() => {
    try {
      const toSave = { ...appState, previewForm: null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // localStorage quota or security restrictions
    }
  }, [appState]);

  // Compute normalised scores from raw metrics
  const recalculateScores = useCallback((metrics: RawMetrics): BehaviourScores => {
    // Weight each behavioural dimension
    const dossierWeight = (metrics.totalDwellMs / 4000) * 1.5 + 
                          metrics.readingEventsCount * 2 + 
                          metrics.articlesFullyRead.length * 8;
    
    const atlasWeight = metrics.relationTraversalsCount * 9 + 
                        metrics.graphNodeClicks * 6;

    const consoleWeight = metrics.searchQueriesCount * 8 + 
                          metrics.filterChangesCount * 5;

    const chronicleWeight = metrics.timelineScrubCount * 8 + 
                            metrics.chronologicalNavCount * 6;

    const compareWeight = metrics.comparisonSessionsCount * 10 + 
                          metrics.contradictionPinsCount * 12;

    const totalWeight = dossierWeight + atlasWeight + consoleWeight + chronicleWeight + compareWeight;

    if (totalWeight < 4) {
      return DEFAULT_SCORES;
    }

    // Convert into 0-100 percentage distribution
    const rawScores = {
      dossier: Math.round((dossierWeight / totalWeight) * 100),
      atlas: Math.round((atlasWeight / totalWeight) * 100),
      console: Math.round((consoleWeight / totalWeight) * 100),
      chronicle: Math.round((chronicleWeight / totalWeight) * 100),
      compare: Math.round((compareWeight / totalWeight) * 100),
    };

    return rawScores;
  }, []);

  // Evolution Engine Mutation Check
  const evaluateEvolution = useCallback((newMetrics: RawMetrics, newScores: BehaviourScores) => {
    setAppState((prev) => {
      const now = Date.now();
      
      // Check minimum interactions & cooldown
      if (newMetrics.totalInteractions < MIN_INTERACTIONS_FOR_TRANSFORM) {
        return { ...prev, rawMetrics: newMetrics, scores: newScores };
      }
      
      if (now - prev.lastTransformationTime < COOLDOWN_MS) {
        return { ...prev, rawMetrics: newMetrics, scores: newScores };
      }

      // Determine top score
      const scoreEntries: [keyof BehaviourScores, number][] = [
        ['dossier', newScores.dossier],
        ['atlas', newScores.atlas],
        ['console', newScores.console],
        ['chronicle', newScores.chronicle],
        ['compare', newScores.compare],
      ];

      scoreEntries.sort((a, b) => b[1] - a[1]);

      const [topCategory, topScore] = scoreEntries[0];
      const [, secondScore] = scoreEntries[1];

      // Form mapping
      const formMap: Record<keyof BehaviourScores, StructuralForm> = {
        dossier: 'dossier',
        atlas: 'atlas',
        console: 'console',
        chronicle: 'chronicle',
        compare: 'compare',
      };

      const targetForm = formMap[topCategory];

      // Apply Hysteresis: only transform if margin is substantial and target != current
      if (targetForm !== prev.currentForm && (topScore - secondScore >= HYSTERESIS_THRESHOLD || topScore >= 42)) {
        const reasonDescriptions: Record<keyof BehaviourScores, string> = {
          dossier: 'High dwell duration and comprehensive reading engagement detected across primary records.',
          atlas: 'Frequent relational reference hopping and associative graph exploration identified.',
          console: 'Rapid query frequency and index category filtering sweeps observed.',
          chronicle: 'Consistent sequential navigation and timestamp-ordered reconstruction detected.',
          compare: 'Direct multi-document discrepancy comparison and contradiction analysis detected.',
        };

        const formDisplayNames: Record<StructuralForm, string> = {
          ledger: 'LEDGER',
          dossier: 'DOSSIER',
          atlas: 'RELATION ATLAS',
          console: 'SIGNAL CONSOLE',
          chronicle: 'CHRONICLE',
          compare: 'CROSS-EXAMINATION',
        };

        const newRecord: TransformationRecord = {
          id: `mut-${now}`,
          timestamp: new Date().toLocaleTimeString(),
          fromForm: prev.currentForm,
          toForm: targetForm,
          triggerScore: topCategory,
          triggerValue: topScore,
          reason: reasonDescriptions[topCategory],
        };

        setLatestNotification(
          `INTERFACE RECONFIGURED: Evolved from ${formDisplayNames[prev.currentForm]} to ${formDisplayNames[targetForm]} (${topCategory.toUpperCase()} score: ${topScore}%).`
        );

        return {
          ...prev,
          currentForm: targetForm,
          scores: newScores,
          rawMetrics: newMetrics,
          lastTransformationTime: now,
          transformations: [newRecord, ...prev.transformations.slice(0, 19)],
        };
      }

      return {
        ...prev,
        scores: newScores,
        rawMetrics: newMetrics,
      };
    });
  }, []);

  // Tracking methods
  const trackReadingDwell = useCallback((artifactId: string, ms: number) => {
    // Only count if document visible
    if (document.hidden || ms < 1000) return;

    setAppState((prev) => {
      const isFull = ms > 9000 && !prev.rawMetrics.articlesFullyRead.includes(artifactId);
      const newArticles = isFull 
        ? [...prev.rawMetrics.articlesFullyRead, artifactId] 
        : prev.rawMetrics.articlesFullyRead;

      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        totalDwellMs: prev.rawMetrics.totalDwellMs + ms,
        readingEventsCount: prev.rawMetrics.readingEventsCount + 1,
        articlesFullyRead: newArticles,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };

      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackRelationTraversal = useCallback((_fromId: string, toId: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        relationTraversalsCount: prev.rawMetrics.relationTraversalsCount + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        activeArtifactId: toId,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackGraphInteraction = useCallback((nodeId: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        graphNodeClicks: prev.rawMetrics.graphNodeClicks + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        activeArtifactId: nodeId,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackSearch = useCallback((_query: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        searchQueriesCount: prev.rawMetrics.searchQueriesCount + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackFilterChange = useCallback((_category: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        filterChangesCount: prev.rawMetrics.filterChangesCount + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackTimelineInteraction = useCallback((eventId: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        timelineScrubCount: prev.rawMetrics.timelineScrubCount + 1,
        chronologicalNavCount: prev.rawMetrics.chronologicalNavCount + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        activeArtifactId: eventId,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackComparisonSession = useCallback((docA: string, docB: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        comparisonSessionsCount: prev.rawMetrics.comparisonSessionsCount + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      return {
        ...prev,
        comparisonPair: [docA, docB],
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  const trackContradictionPin = useCallback((contradictionId: string) => {
    setAppState((prev) => {
      const updatedMetrics: RawMetrics = {
        ...prev.rawMetrics,
        contradictionPinsCount: prev.rawMetrics.contradictionPinsCount + 1,
        totalInteractions: prev.rawMetrics.totalInteractions + 1,
      };
      const newScores = recalculateScores(updatedMetrics);
      evaluateEvolution(updatedMetrics, newScores);

      const alreadyPinned = prev.pinnedIds.includes(contradictionId);
      const newPinned = alreadyPinned ? prev.pinnedIds : [...prev.pinnedIds, contradictionId];

      return {
        ...prev,
        pinnedIds: newPinned,
        rawMetrics: updatedMetrics,
        scores: newScores,
      };
    });
  }, [recalculateScores, evaluateEvolution]);

  // Periodic flush for reading dwell time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden && activeDocIdRef.current) {
        const now = Date.now();
        const duration = now - dwellStartTimeRef.current;
        if (duration > 3000) {
          trackReadingDwell(activeDocIdRef.current, duration);
          dwellStartTimeRef.current = now;
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [trackReadingDwell]);

  // Actions
  const setActiveArtifactId = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      activeArtifactId: id,
    }));
  };

  const togglePinArtifact = (id: string) => {
    setAppState((prev) => {
      const exists = prev.pinnedIds.includes(id);
      return {
        ...prev,
        pinnedIds: exists ? prev.pinnedIds.filter((p) => p !== id) : [...prev.pinnedIds, id],
      };
    });
  };

  const toggleReviewed = (id: string) => {
    setAppState((prev) => {
      const exists = prev.reviewedIds.includes(id);
      return {
        ...prev,
        reviewedIds: exists ? prev.reviewedIds.filter((r) => r !== id) : [...prev.reviewedIds, id],
      };
    });
  };

  const setCaseTheory = (theory: string) => {
    setAppState((prev) => ({
      ...prev,
      caseTheory: theory,
    }));
  };

  const setComparisonPair = (pair: [string, string]) => {
    setAppState((prev) => ({
      ...prev,
      comparisonPair: pair,
    }));
  };

  const createNote = (title: string, content: string, linkedArtifactId?: string) => {
    const newNote: InvestigationNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      linkedArtifactId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAppState((prev) => ({
      ...prev,
      notes: [newNote, ...prev.notes],
    }));
  };

  const updateNote = (id: string, title: string, content: string) => {
    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === id ? { ...n, title, content, updatedAt: new Date().toISOString() } : n
      ),
    }));
  };

  const deleteNote = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
  };

  const setPreviewForm = (form: StructuralForm | null) => {
    setAppState((prev) => ({
      ...prev,
      previewForm: form,
    }));
  };

  const setReducedMotion = (reduced: boolean) => {
    setAppState((prev) => ({
      ...prev,
      reducedMotion: reduced,
    }));
  };

  const clearNotification = () => setLatestNotification(null);

  // Diagnostic Resets
  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAppState({
      currentForm: 'ledger',
      previewForm: null,
      scores: DEFAULT_SCORES,
      rawMetrics: DEFAULT_METRICS,
      transformations: [],
      activeArtifactId: 'EV-01',
      pinnedIds: ['EV-01', 'EV-03', 'EV-04'],
      reviewedIds: ['EV-01'],
      caseTheory: INITIAL_CASE_THEORY,
      notes: INITIAL_NOTES,
      comparisonPair: ['EV-01', 'EV-05'],
      reducedMotion: false,
      lastTransformationTime: 0,
    });
    setLatestNotification('INVESTIGATION RESET: All data and scores returned to factory state.');
  };

  const resetLayout = () => {
    setAppState((prev) => ({
      ...prev,
      currentForm: 'ledger',
      previewForm: null,
    }));
    setLatestNotification('LAYOUT RESTORED: Reset to default LEDGER matrix.');
  };

  const resetProfile = () => {
    setAppState((prev) => ({
      ...prev,
      scores: DEFAULT_SCORES,
      rawMetrics: DEFAULT_METRICS,
      currentForm: 'ledger',
      previewForm: null,
      transformations: [],
    }));
    setLatestNotification('PROFILE CLEARED: Behavioural telemetry recalibrated.');
  };

  // Find active artifact
  const activeArtifact = EVIDENCE_RECORDS.find((e) => e.id === appState.activeArtifactId) || EVIDENCE_RECORDS[0];
  const pinnedItems = EVIDENCE_RECORDS.filter((e) => appState.pinnedIds.includes(e.id));
  const reviewedItems = EVIDENCE_RECORDS.filter((e) => appState.reviewedIds.includes(e.id));
  const effectiveForm = appState.previewForm ?? appState.currentForm;

  return (
    <InvestigationContext.Provider
      value={{
        evidence: EVIDENCE_RECORDS,
        activeArtifact,
        pinnedItems,
        reviewedItems,
        currentForm: appState.currentForm,
        previewForm: appState.previewForm,
        effectiveForm,
        scores: appState.scores,
        rawMetrics: appState.rawMetrics,
        transformations: appState.transformations,
        caseTheory: appState.caseTheory,
        notes: appState.notes,
        comparisonPair: appState.comparisonPair,
        reducedMotion: appState.reducedMotion,
        latestNotification,

        setActiveArtifactId,
        togglePinArtifact,
        toggleReviewed,
        setCaseTheory,
        setComparisonPair,
        createNote,
        updateNote,
        deleteNote,
        setPreviewForm,
        setReducedMotion,
        clearNotification,

        trackReadingDwell,
        trackRelationTraversal,
        trackGraphInteraction,
        trackSearch,
        trackFilterChange,
        trackTimelineInteraction,
        trackComparisonSession,
        trackContradictionPin,

        resetAll,
        resetLayout,
        resetProfile,
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = () => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
