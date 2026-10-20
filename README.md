# PALIMPSEST — THE INTERFACE THAT LEARNS YOU

> An award-quality adaptive web application and living forensic archive engineered for **THE IMPOSSIBLE INTERFACE** competition.

---

## 01. The Concept & Vision

Traditional websites impose a fixed hierarchy of information onto every visitor regardless of how they process evidence. **PALIMPSEST** challenges this paradigm: it is an archive that observes how you investigate and reconstructs its layout, typography, and structural topology to match your cognitive style.

Built on an art-directed **white graph-paper canvas** with sharp black structural ink, hard-offset tactile shadows (`4px 4px 0 #191919`), and signature pixelated teal signals (`#078286`), PALIMPSEST unites retro-speculative cryptography aesthetics with an interactive WebGL2 **FaultyTerminal** pixel installation.

---

## 02. The Six Structural Forms

1. **LEDGER (Default / Neutral)**: High-density matrix overview prioritizing structured index metadata while initial cognitive signals are collected.
2. **DOSSIER (Deep Reader)**: Expanded typographic measure, margin annotations, and distraction-free layout for investigators who dwell deeply on primary source records.
3. **RELATION ATLAS (Associative Explorer)**: Spatial node-link network with interactive topology foregrounding conspiratorial links, reference citations, and conflicting testimonies.
4. **SIGNAL CONSOLE (High-Velocity Triage)**: Telemetry dashboard with rapid-fire keyword filtering, telemetry metrics, and query logs.
5. **CHRONICLE (Temporal Thinker)**: Strict timestamped causality axis spotlighting the critical 9-minute blackout window (23:41:00 to 23:50:00 UTC).
6. **CROSS-EXAMINATION (Discrepancy Auditor)**: Synchronized dual-pane comparison workspace designed to pinpoint contradictions between testimonies.

---

## 03. The Deterministic Behavioural Evolution Engine

The central adaptation engine runs entirely locally without opaque AI wrappers or external APIs. It analyzes observable forensic actions across five normalized dimensions:

$$\text{Score}_k = \frac{\text{Weight}_k}{\sum \text{Weights}} \times 100$$

### Tracked Behavioural Metrics:
- **Dossier Score**: Active viewport dwell time ($\ge 4\text{s}$ reading), full article completion, and text scrolling.
- **Atlas Score**: Relational hyperlink traversals (`relatedIds` hopping) and graph node expansions.
- **Console Score**: Search query frequency, category filter sweeps, and rapid record scanning.
- **Chronicle Score**: Sequential timeline scrubbing and timestamp-ordered investigations.
- **Cross-Examination Score**: Dual-document side-by-side comparisons and contradiction pinning.

### Stabilization & Anti-Flicker Mechanisms:
- **Minimum Interaction Gate**: Requires $\ge 4$ meaningful forensic actions before any automatic mutation is permitted.
- **Hysteresis Margin**: The winning score must lead the second-place score by $\ge 14\%$ (or reach an absolute $\ge 42\%$ threshold) to avoid oscillation between close scores.
- **Cooldown Interval**: Enforces a minimum 15-second grace period between automatic structural reconfigurations.
- **Judge Preview Mode**: Available in `/app/evolution`, allowing competition judges to immediately preview and lock any of the 6 layouts without falsifying their real behavioral profile.

---

## 04. Case File 09: The Missing Nine Minutes

The application is populated with 12 interconnected, fictional records detailing an incident at the **Blackwood Deep-Core Subsurface Observatory** on October 14, 2026:
- **23:35 UTC**: Dr. Vance signs the shift logbook, asserting Keycard Gamma-7 is locked in the command safe.
- **23:39 UTC**: Independent surface seismograph registers a continuous 7.83 Hz infrasound tone.
- **23:41 UTC**: Complete station blackout. All 32 CCTV cameras overwritten with `0x00` null bytes via a 540-second script.
- **23:42 UTC**: Hydrophone Array 4 registers anomalous 42.7 Hz integer harmonics in deep borehole brine.
- **23:44 UTC**: Keycard Gamma-7 is physically swiped at Sub-Level 4; 42.8 kg extracted from Chamber 03.
- **23:45 UTC**: 14.4 MB encrypted microwave transmission broadcast to an offshore vessel.
- **23:50 UTC**: Power returns. Chief Engineer Mara Lin discovers severed diesel generator fuel lines.
- **23:52 UTC**: Tense confrontation recorded in airlock between Vance and Lin regarding the awakening entity.

---

## 05. Visual Architecture & Design Language

- **Palette**:
  - Canvas: `#F7F7F2` (Warm graph paper)
  - Surfaces: `#FFFFFF` (Raised white panels)
  - Ink: `#141414` (Primary black)
  - Secondary Ink: `#42443F`
  - Muted: `#85877F`
  - Grid Lines: `#E6E6DF`
  - Structural Borders: `#171717`
  - Signature Teal: `#087F82`
  - Pale Teal Accent: `#D9F0ED`
- **Pixel Typography & Zero-Lag Graphics**:
  - Main display typography: `"Press Start 2P"` arcade lettering and `"Silkscreen"` for genuine 8-bit styling
  - Supporting monospace: `"IBM Plex Mono"`
  - Symmetrical 100% SVG pixel insignia with stepped geometry
  - Lightweight `PixelSignalMatrix` illustration with visible square pixels and zero JS animation loops
  - Tactile offset shadows (`box-shadow: 4px 4px 0 #171717`) that press 1–2px on active click

---

## 06. Local Persistence

All investigation artifacts, notes, pinned evidence, working hypotheses, case theories, and behavioural telemetry are stored locally in the browser's `localStorage` (`palimpsest_investigation_state_v1`). State is preserved across page refreshes, route changes, and interface reconfigurations. Dedicated reset controls for layout, profile, and master factory state are provided in **Settings**.

---

## 07. Profile Testing Recipes (For Evaluators)

To test the evolutionary engine deterministically:

1. **Trigger DOSSIER (Deep Reader)**:
   - Open `/app/archive`.
   - Select an evidence document (e.g. `EV-01` or `EV-02`) and read continuously for $\sim 15$ seconds.
   - Click between 2–3 records and dwell on their full text.

2. **Trigger RELATION ATLAS (Associative Explorer)**:
   - Open `/app/archive` or `/app/atlas`.
   - Click the "CROSS-REFERENCES" buttons (e.g., `EV-04`, `EV-05`, `EV-09`) to hop across records 4–5 times in sequence.
   - Interact with nodes in the topological graph.

3. **Trigger SIGNAL CONSOLE (High-Velocity Triage)**:
   - Open `/app/archive`.
   - Rapidly type searches into the filter box (`42.7`, `Gamma-7`, `Vance`, `blackout`) and toggle 3–4 category filters.

4. **Trigger CHRONICLE (Temporal Thinker)**:
   - Open `/app/chronicle`.
   - Click through timepoints sequentially along the temporal axis.

5. **Trigger CROSS-EXAMINATION (Discrepancy Auditor)**:
   - Open `/app/compare`.
   - Switch comparison pairs and click "PIN CONTRADICTION FINDING ★".

Alternatively, open `/app/evolution` and use **JUDGE PREVIEW MODE** to switch immediately between any layout.

---

## 08. Running & Building the Application

### Development:
```bash
npm run dev
```
The server will run on port `3000`.

### Production Build:
```bash
npm run build
```
Generates production assets in `dist/`.

### Linting:
```bash
npm run lint
```
Checks TypeScript compilation with `--noEmit`.
