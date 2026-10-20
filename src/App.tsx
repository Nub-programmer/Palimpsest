import React, { useState, useEffect } from 'react';
import { InvestigationProvider, useInvestigation } from './context/InvestigationContext';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import LandingSections from './components/LandingSections';
import AppShell from './components/app/AppShell';
import DashboardView from './components/app/DashboardView';
import ArchiveView from './components/app/ArchiveView';
import AtlasView from './components/app/AtlasView';
import ChronicleView from './components/app/ChronicleView';
import CompareView from './components/app/CompareView';
import CaseboardView from './components/app/CaseboardView';
import NotesView from './components/app/NotesView';
import EvolutionView from './components/app/EvolutionView';
import SettingsView from './components/app/SettingsView';

function MainApp() {
  const { setActiveArtifactId } = useInvestigation();

  // Route management: 'landing' or 'app'
  const [currentMode, setCurrentMode] = useState<'landing' | 'app'>(() => {
    if (window.location.pathname.startsWith('/app') || window.location.hash.startsWith('#/app')) {
      return 'app';
    }
    return 'landing';
  });

  // Active view inside the app
  const [activeAppView, setActiveAppView] = useState<string>(() => {
    const hash = window.location.hash.replace('#/app/', '').replace('#/app', '');
    const validViews = ['dashboard', 'archive', 'atlas', 'chronicle', 'compare', 'caseboard', 'notes', 'evolution', 'settings'];
    return validViews.includes(hash) ? hash : 'dashboard';
  });

  const [comparePreset, setComparePreset] = useState<[string, string] | undefined>(undefined);
  const [notePresetLinkedId, setNotePresetLinkedId] = useState<string | undefined>(undefined);

  // Sync with browser URL / hash
  useEffect(() => {
    const updateFromUrl = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/app') || hash.startsWith('#/app')) {
        setCurrentMode('app');
        const viewFromHash = hash.replace('#/app/', '').replace('#/app', '');
        const validViews = ['dashboard', 'archive', 'atlas', 'chronicle', 'compare', 'caseboard', 'notes', 'evolution', 'settings'];
        if (validViews.includes(viewFromHash)) {
          setActiveAppView(viewFromHash);
        }
      } else {
        setCurrentMode('landing');
      }
    };

    window.addEventListener('popstate', updateFromUrl);
    window.addEventListener('hashchange', updateFromUrl);
    return () => {
      window.removeEventListener('popstate', updateFromUrl);
      window.removeEventListener('hashchange', updateFromUrl);
    };
  }, []);

  const navigateToApp = (view: string = 'dashboard') => {
    setCurrentMode('app');
    setActiveAppView(view);
    window.history.pushState({}, '', `#/app/${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setCurrentMode('landing');
    window.history.pushState({}, '', '#/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDocumentInArchive = (id: string) => {
    setActiveArtifactId(id);
    navigateToApp('archive');
  };

  const handleNavigateToCompare = (docA: string, docB: string) => {
    setComparePreset([docA, docB]);
    navigateToApp('compare');
  };

  const handleNavigateToNotes = (linkedDocId?: string) => {
    setNotePresetLinkedId(linkedDocId);
    navigateToApp('notes');
  };

  // Keyboard shortcut for quick triage
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'Escape' && currentMode === 'app') {
        navigateToApp('dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMode]);

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#141414]">
      {currentMode === 'landing' ? (
        <div className="w-full bg-graph-paper min-h-screen flex flex-col">
          {/* Header */}
          <Header
            onEnterArchive={() => navigateToApp('dashboard')}
            onNavigateSection={(secId) => {
              const el = document.getElementById(secId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Hero Section */}
          <main className="flex-1">
            <LandingHero
              onEnterArchive={() => navigateToApp('dashboard')}
              onExploreEngine={() => {
                const el = document.getElementById('section-engine');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Supporting Sections */}
            <LandingSections onEnterArchive={() => navigateToApp('dashboard')} />
          </main>
        </div>
      ) : (
        <AppShell
          currentView={activeAppView}
          onNavigate={(view) => {
            setActiveAppView(view);
            window.history.pushState({}, '', `#/app/${view}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExitToLanding={navigateToLanding}
        >
          {activeAppView === 'dashboard' && (
            <DashboardView
              onNavigate={(view) => {
                setActiveAppView(view);
                window.history.pushState({}, '', `#/app/${view}`);
              }}
            />
          )}

          {activeAppView === 'archive' && (
            <ArchiveView
              onNavigateToCompare={handleNavigateToCompare}
              onNavigateToNotes={handleNavigateToNotes}
            />
          )}

          {activeAppView === 'atlas' && (
            <AtlasView
              onOpenDocument={handleOpenDocumentInArchive}
              onNavigateToCompare={handleNavigateToCompare}
            />
          )}

          {activeAppView === 'chronicle' && (
            <ChronicleView onOpenDocument={handleOpenDocumentInArchive} />
          )}

          {activeAppView === 'compare' && (
            <CompareView
              initialPair={comparePreset}
              onOpenDocument={handleOpenDocumentInArchive}
            />
          )}

          {activeAppView === 'caseboard' && (
            <CaseboardView
              onOpenDocument={handleOpenDocumentInArchive}
              onNavigateToNotes={() => navigateToApp('notes')}
            />
          )}

          {activeAppView === 'notes' && (
            <NotesView
              initialLinkedId={notePresetLinkedId}
              onOpenDocument={handleOpenDocumentInArchive}
            />
          )}

          {activeAppView === 'evolution' && <EvolutionView />}

          {activeAppView === 'settings' && <SettingsView />}
        </AppShell>
      )}
    </div>
  );
}

export default function App() {
  return (
    <InvestigationProvider>
      <MainApp />
    </InvestigationProvider>
  );
}
