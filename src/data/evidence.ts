import { EvidenceItem } from '../types';

export const EVIDENCE_RECORDS: EvidenceItem[] = [
  {
    id: 'EV-01',
    code: 'SEC-LOG-2335',
    title: 'Station Shift Logbook: Dr. Vance',
    timestamp: '2026-10-14T23:35:00Z',
    displayTime: 'OCT 14, 23:35 UTC',
    category: 'logbook',
    classification: 'CONFIDENTIAL',
    credibility: 75,
    source: 'Lead Director Dr. Alistair Vance',
    location: 'Sector 01 — Sub-Surface Command Hub',
    excerpt: 'Primary drill telemetry stabilized at 1,420m depth. Routine pressure modulation nominal. No personnel authorized in containment bay B after 23:00.',
    fullText: `SHIFT SUPERVISOR ENTRY // 23:35 UTC // DR. ALISTAIR VANCE
Primary drill telemetry stabilized at 1,420m depth beneath the granite mantle. Pressure equalization cycles are functioning at 101.4 kPa. Borehole acoustic readings remain nominal with expected low-frequency reverberation.

All external communications relays are locked into the 15-minute scheduled burst rotation. Chief Engineer Lin was ordered to suspend scheduled thermal valve recalibrations on the secondary coolant ring until the morning cycle. 

NOTE: Level 4 containment seals around Vault Chamber 03 remain active under standard cryptographic interlock. Keycard Gamma-7 safely secured in Command safe. No anomalies detected. Station is operating on standard automated power grid.`,
    relatedIds: ['EV-04', 'EV-05', 'EV-08'],
    tags: ['logbook', 'vance', 'containment', 'borehole'],
    contradictsId: 'EV-05',
    contradictionNote: 'Vance claims Keycard Gamma-7 was secured in the safe and coolant recalibration was suspended; Lin states Gamma-7 was removed at 23:20 and coolant lines were manually drained.',
    coordinates: { x: 180, y: 140 },
    keyFacts: [
      'Authored 6 minutes before the blackout began.',
      'Explicitly insists Keycard Gamma-7 was locked in the Command safe.',
      'Ordered Chief Engineer Lin to stand down from inspecting secondary coolant.',
      'Mentions Vault Chamber 03 was sealed.'
    ]
  },
  {
    id: 'EV-02',
    code: 'TEL-HYD-0412',
    title: 'Acoustic Hydrophone Array 4 Telemetry',
    timestamp: '2026-10-14T23:42:18Z',
    displayTime: 'OCT 14, 23:42 UTC',
    category: 'telemetry',
    classification: 'RESTRICTED',
    credibility: 98,
    source: 'Autonomous Sub-crustal Seismic Array 04',
    location: 'Abyssal Borehole Probe #4 (Depth -1,422m)',
    excerpt: 'Sudden high-amplitude harmonic resonance detected at 42.7 Hz. Pressure waveform exhibits artificial modulation pattern resembling phased frequency-shift keying.',
    fullText: `ARRAY TELEMETRY DUMP // SENSOR PACK 04-HYD
Timestamp: 2026-10-14T23:42:18.044Z
Depth: 1,422.4 meters sub-floor
Fluid Media: Subterranean brine pocket B-12

[23:42:01] Ambient acoustic baseline: 14.2 dB (microseismic drift)
[23:42:18] Transient surge: +86.4 dB peak at fundamental frequency 42.7 Hz
[23:42:22] Harmonic overtone sequence detected: 85.4 Hz, 128.1 Hz, 170.8 Hz (precise integer multiples)
[23:42:35] Waveform modulation characteristics: Non-stochastic envelope. Phase shifts at 120ms intervals.
[23:42:49] Sensor saturation threshold reached. Analog-to-digital converter clipped.

ANALYST ANNOTATION: Natural tectonic fissures or rock fracturing do not produce integer harmonic ratios with microsecond phase synchrony. This signal matches a coherent artificial transmitter or resonant cavity oscillation.`,
    relatedIds: ['EV-03', 'EV-07', 'EV-11'],
    tags: ['acoustic', 'hydrophone', 'harmonics', 'anomaly'],
    coordinates: { x: 380, y: 120 },
    keyFacts: [
      'Recorded at 23:42:18, exactly 78 seconds after initial grid drop.',
      'Detected structured 42.7 Hz harmonic pulse in deep brine pocket.',
      'Phase shift intervals indicate encoded signal transmission rather than seismic fracture.',
      'Acoustic energy exceeded 86 dB before clipping.'
    ]
  },
  {
    id: 'EV-03',
    code: 'SIG-MIC-2345',
    title: 'Intercepted Outbound Microwave Transmission',
    timestamp: '2026-10-14T23:45:10Z',
    displayTime: 'OCT 14, 23:45 UTC',
    category: 'transmission',
    classification: 'TOP SECRET / OBSIDIAN',
    credibility: 92,
    source: 'Automated Eavesdropping Beacon (Offshore Mooring Alpha)',
    location: 'Directional Uplink Mast — Surface Vent 09',
    excerpt: 'High-gain burst transmission directed toward coordinates 58°12\'N, 04°22\'W. Header indicates protocol PALIMPSEST-SYNC-09. Data payload 14.4 MB compressed.',
    fullText: `RF INTERCEPT CAPTURE // FREQUENCY: 14.225 GHz DIRECTED BURST
Timestamp: 2026-10-14T23:45:10.881Z
Transmitter ID: BLACKWOOD-OBS-SURF-09
Target Azimuth: 312.4° // Elevation: +14.2° (Target: Unmarked Marine Vessel or Low-Orbit Node)
Carrier Duration: 4.2 seconds
Signal Format: Poly-phase spread spectrum (Military spec OBSIDIAN)

HEADER RECOVERED:
"PALIMPSEST//SYNC//09 // NODE_SRC: BWD-DEEP // PAYLOAD_LEN: 14418290 BYTES // INTEGRITY: CRC-64-OK"

PARTIAL DECRYPTED STRINGS IN PREAMBLE:
"...CORE_EXTRACTION_STAGE_2 COMPLETE... CONTAINER 882-B SEEDED... STATION POWER DIVERT SUCCESSFUL... TELEMETRY SUPPRESSION ACTIVE 00:09:00..."

CONCLUSION: Someone on the station bypassed the comms blackout to broadcast an enormous package of compressed core telemetry while claiming to be completely offline.`,
    relatedIds: ['EV-02', 'EV-08', 'EV-09', 'EV-12'],
    tags: ['transmission', 'intercept', 'uplink', 'conspiracy'],
    coordinates: { x: 580, y: 160 },
    keyFacts: [
      'Broadcast occurred during the exact middle of the 9-minute blackout (23:45:10).',
      'Sent via directional microwave mast directly to an offshore coordinate.',
      'Explicitly references Container 882-B and "TELEMETRY SUPPRESSION ACTIVE 00:09:00".',
      'Confirms the blackout was artificially orchestrated.'
    ]
  },
  {
    id: 'EV-04',
    code: 'SEC-ACS-007G',
    title: 'Maintenance Terminal Override & Keycard Gamma-7 Log',
    timestamp: '2026-10-14T23:44:02Z',
    displayTime: 'OCT 14, 23:44 UTC',
    category: 'logbook',
    classification: 'RESTRICTED',
    credibility: 95,
    source: 'Vault Chamber 03 Peripheral Micro-controller',
    location: 'Cryogenic Containment Airlock B-3',
    excerpt: 'Keycard Gamma-7 swiped at Sub-Level 4 airlock. Biometric confirmation bypassed via Executive Cryptographic Override Token #8841.',
    fullText: `HARDWARE ACCESS CONTROLLER // BUFFER REGISTER RECOVERY
Location: Sub-Level 4 / Containment Vault 03
Bus: Isolated RS-485 Hardwired Loop

23:43:58 - CARD_INSERT: [CARD_ID: GAMMA-7-EXEC] (Assigned Holder: Dr. Alistair Vance)
23:44:00 - BIOMETRIC_PROMPT: Retinal Scan Requested
23:44:02 - BYPASS_TRIGGERED: "OVERRIDE_TOKEN_8841 // OBSIDIAN DIRECTIVE ACK"
23:44:03 - BIOMETRIC_STATUS: BYPASSED
23:44:05 - DOOR_SOLENOID: DE-ENERGIZED (Vault 03 Inner Hatch Released)
23:44:12 - INTERIOR MASS SENSOR: Delta -42.8 kg (Object extracted from isolation cradle)
23:44:48 - DOOR_SOLENOID: ENERGIZED (Hatch Closed)

NOTE: Dr. Vance logged in his official shift report that Gamma-7 never left the Command safe all night. This physical access record proves it was physically inserted into Vault 03 door at 23:43:58.`,
    relatedIds: ['EV-01', 'EV-05', 'EV-09'],
    tags: ['keycard', 'vault', 'override', 'vance'],
    contradictsId: 'EV-01',
    contradictionNote: 'Directly disproves Dr. Vance\'s claim in EV-01 that Gamma-7 was locked in the safe.',
    coordinates: { x: 220, y: 300 },
    keyFacts: [
      'Gamma-7 card physically used at 23:44:02 during the blackout.',
      'Biometric retinal check was bypassed with special cryptographic token #8841.',
      'Mass sensor recorded 42.8 kg extracted from the isolation cradle.',
      'Proves physical theft or transfer of material during the blackout.'
    ]
  },
  {
    id: 'EV-05',
    code: 'WIT-LIN-044',
    title: 'Formal Debrief Statement: Chief Engineer Mara Lin',
    timestamp: '2026-10-15T08:30:00Z',
    displayTime: 'OCT 15, 08:30 UTC',
    category: 'witness',
    classification: 'CONFIDENTIAL',
    credibility: 88,
    source: 'Chief Station Engineer Mara Lin',
    location: 'Surface Decontamination Quarters',
    excerpt: 'The auxiliary diesel generators did not trip from a thermal overload. The fuel solenoid lines were deliberately severed by hand with a hydraulic shear.',
    fullText: `FORMAL WITNESS DEPOSITION // INVESTIGATION PANEL
Subject: Mara Lin, Chief Systems Engineer, Blackwood Observatory
Interviewer: Inspector D. Corren (Bureau of Subsurface Integrity)

"At 23:38 I went down to the turbine gallery because my auxiliary display showed a sudden pressure differential in the tertiary coolant loop. Vance had told me at 23:30 to leave it alone, but the coolant return temp was climbing five degrees a minute.

When the lights died at 23:41, the backup diesel banks should have kicked in within 3.5 seconds. They never fired. I navigated with my emergency flashlight to Generator Bank 2. The fuel lines weren't clogged; they had been sheared clean with an 18mm ratcheting hydraulic cutter. That isn't an electrical failure. That is sabotage.

Furthermore, I saw someone in a Level-A hazmat suit coming out of the Sub-Level 4 elevator at 23:47 carrying a cylindrical Pelican transport case. They entered the service transport tunnel toward the Surface Vent 09."`,
    relatedIds: ['EV-01', 'EV-04', 'EV-06', 'EV-10'],
    tags: ['witness', 'lin', 'generator', 'sabotage'],
    contradictsId: 'EV-01',
    contradictionNote: 'Lin confirms intentional physical sabotage of generators and witnessed someone transporting cargo from Vault 03, defying Vance\'s assertion of an accidental electrical fault.',
    coordinates: { x: 120, y: 440 },
    keyFacts: [
      'Fuel lines to backup diesel generators were severed with hydraulic tools.',
      'Proves the blackout was engineered to disable automated monitoring.',
      'Observed a suited individual carrying a cylindrical case at 23:47.',
      'Identified escape route toward Surface Vent 09.'
    ]
  },
  {
    id: 'EV-06',
    code: 'TEL-THM-0881',
    title: 'Thermal Core Fluctuation Telemetry Strip',
    timestamp: '2026-10-14T23:41:40Z',
    displayTime: 'OCT 14, 23:41 UTC',
    category: 'telemetry',
    classification: 'RESTRICTED',
    credibility: 94,
    source: 'Geothermal Core Heat Exchanger Probe T-1',
    location: 'Thermal Exchange Conduit Sub-Level 5',
    excerpt: 'Instantaneous temperature plunge from 842°C to 41°C within 42 seconds. Thermodynamically impossible for ambient rock conduction; indicates endothermic absorption.',
    fullText: `ANALOG THERMAL PRINT RECORDER // STRIP TRACE RECOVERY
Device: Yokogawa Continuous Chart Recorder #02
Paper feed rate: 20mm/min // Sensor: Type-K Inconel-sheathed thermocouple

TRACE DATA POINTS:
23:40:00 - Core baseline: 842.2°C (steady geothermal reservoir exchange)
23:41:00 - Power loss flicker on chart motor
23:41:15 - Core temperature: 790.0°C
23:41:30 - Core temperature: 480.0°C (rate: -20.6°C / sec)
23:41:45 - Core temperature: 112.0°C
23:41:57 - Core temperature: 41.4°C (Ambient cellar temperature)

PHYSICAL NOTE ON RECOVERED CHART:
The bottom corner of the chart paper was torn away forcefully at the 23:50 mark where the graph resumed, with greasy carbon dust residue on the edge matching drill grease from Chamber 03.

EVALUATION: To absorb that much heat in 40 seconds requires either liquid helium flood (none available on site) or an exotic endothermic phase reaction triggered by the recovered artifact.`,
    relatedIds: ['EV-02', 'EV-05', 'EV-07'],
    tags: ['thermal', 'core', 'anomaly', 'chart'],
    coordinates: { x: 420, y: 280 },
    keyFacts: [
      'Core temperature collapsed 800°C in under 45 seconds.',
      'Violates conventional thermodynamics without an active cryogenic sink.',
      'Chart paper exhibits physical tearing at 23:50 where data returned.',
      'Residue matches grease from the Chamber 03 seal mechanism.'
    ]
  },
  {
    id: 'EV-07',
    code: 'PER-JRN-019',
    title: 'Personal Journal Fragment: Dr. Elena Rostova',
    timestamp: '2026-10-13T21:15:00Z',
    displayTime: 'OCT 13, 21:15 UTC',
    category: 'witness',
    classification: 'CONFIDENTIAL',
    credibility: 82,
    source: 'Senior Geophysicist Dr. Elena Rostova',
    location: 'Staff Quarters, Bunk 04',
    excerpt: 'The core sample we extracted on Tuesday isn\'t mineral. Under the scanning electron microscope, the crystal lattice rearranges itself every time someone speaks near the specimen.',
    fullText: `HANDWRITTEN JOURNAL ENTRY // DR. ELENA ROSTOVA
October 13, 21:15 UTC

"I haven't slept in thirty hours. Vance forbade me from filing my XRD diffraction analysis into the central database. He stood right behind my chair and watched me delete the raw files from the lab terminal.

The specimen we extracted from the 1,420m suture—he calls it 'Sample 882-B'—is not native olivine basalt. Under the field microscope, the boundary layers do not adhere to Bravais crystal lattices. When I spoke into my voice memo recorder, the acoustic vibration caused the micro-structures to deform and orient toward the speaker grille. 

It is responsive. It is absorbing ambient thermal and kinetic energy to reorganize its own boundary membranes.

Vance has been whispering on the satellite phone to someone named 'Vandermeer'. He promised them that 'the extraction will be cleanly covered by a localized station brownout'. If anything happens to me, look in the Surface Vent 09 conduit."`,
    relatedIds: ['EV-02', 'EV-06', 'EV-09', 'EV-12'],
    tags: ['journal', 'rostova', 'specimen', 'palimpsest'],
    coordinates: { x: 620, y: 320 },
    keyFacts: [
      'Written 26 hours prior to the blackout.',
      'Specimen 882-B physically reorganizes in response to acoustic vibrations.',
      'Overheard Dr. Vance coordinating a fake "brownout" with external buyer "Vandermeer".',
      'Confirms the core sample has living or self-reconfiguring properties.'
    ]
  },
  {
    id: 'EV-08',
    code: 'SEC-VID-0000',
    title: 'CCTV Metadata Audit & Zero-Byte Wipe Record',
    timestamp: '2026-10-14T23:51:00Z',
    displayTime: 'OCT 14, 23:51 UTC',
    category: 'telemetry',
    classification: 'RESTRICTED',
    credibility: 99,
    source: 'Central CCTV NVR Server #01',
    location: 'Security Server Room, Sub-Level 1',
    excerpt: 'Exact 9 minutes and 00 seconds of surveillance video across all 32 cameras overwritten with continuous null bytes (0x00). File allocation table modified via script.',
    fullText: `NVR STORAGE DIAGNOSTIC LOG // RAID VOLUME 0
Drive Array: 8x 16TB SAS Enterprise Disks
Filesystem: Ext4 Security Journaled

SECTOR AUDIT RECORD:
Camera Channel 01 to 32 (All Cameras):
- 2026-10-14 23:40:59 UTC: Stream active. Frame rate: 30fps. Bitrate: 4096 kbps.
- 2026-10-14 23:41:00 UTC: RAW STREAM INTERRUPTION.
- 2026-10-14 23:41:00 to 23:50:00 UTC: 16,200 frames per channel replaced with 0x00 pattern.
- 2026-10-14 23:50:00 UTC: Stream resumed nominal recording.

JOURNAL ANALYSIS:
The overwrite command was not caused by sudden power cut. Sudden power cut causes corrupt EOF or partial packet truncation. This was an active 'dd' stream with block size 4096 executed by user 'root' via terminal TTY-3 at 23:41:04, scripted with a precise 540-second timer (9 minutes).`,
    relatedIds: ['EV-01', 'EV-03', 'EV-04'],
    tags: ['security', 'cctv', 'wipe', 'script'],
    coordinates: { x: 300, y: 460 },
    keyFacts: [
      'Exactly 9 minutes (540 seconds) wiped from 23:41:00 to 23:50:00.',
      'Not a power outage artifact: overwritten with exact 0x00 null bytes.',
      'Script executed from terminal TTY-3 with an automated 540s duration.',
      'Proves premeditated digital cover-up.'
    ]
  },
  {
    id: 'EV-09',
    code: 'LOG-MAN-882B',
    title: 'Special Courier Manifest #882-B & Bill of Lading',
    timestamp: '2026-10-12T14:20:00Z',
    displayTime: 'OCT 12, 14:20 UTC',
    category: 'manifest',
    classification: 'TOP SECRET / OBSIDIAN',
    credibility: 90,
    source: 'Blackwood Cargo Bay Receiving Manifest',
    location: 'Surface Helipad & Freight Elevator',
    excerpt: 'Special delivery: Reinforced titanium-lead composite transport cylinder. Consignee: Dr. A. Vance. Marked "Biological & Sub-crystalline Containment Unit".',
    fullText: `FREIGHT CONSIGNMENT SLIP // ENTRY PORT: BLACKWOOD HIGH PEAKS
Vessel / Flight: Unmarked Sikorsky S-92 Charter #C-FBNX
Shipper: OBSIDIAN SYNTHETICS GMBH, FRANKFURT
Consignee: DR. ALISTAIR VANCE (PERSONAL RECEPTACLE)

ITEM DESCRIPTION:
1x Specimen Containment Cylinder Model X-99 (Empty upon arrival)
Mass: 42.5 kg empty tare weight
Features: Internal cryogenic Peltier cell, EMP hardening, dual mechanical interlock.
Approved for transport of: "Sub-crystalline biological vectors & meta-stable mineral matrices".

SIGN-OFF SIGNATURE:
Alistair Vance (Received in person at surface helipad, bypassed customs scanning citing National Research Exemption 401).`,
    relatedIds: ['EV-03', 'EV-04', 'EV-07', 'EV-10'],
    tags: ['manifest', 'cargo', 'cylinder', 'obsidian'],
    coordinates: { x: 500, y: 440 },
    keyFacts: [
      'Delivered two days before the blackout directly to Dr. Vance.',
      'Tare weight of empty cylinder is 42.5 kg (matches the 42.8 kg extracted in EV-04).',
      'Manufactured by Obsidian Synthetics specifically for containment of meta-stable vectors.',
      'Bypassed all standard station freight inspection protocols.'
    ]
  },
  {
    id: 'EV-10',
    code: 'AUD-TRN-099',
    title: 'Airlock Micro-Cassette Transcription (Vance & Lin)',
    timestamp: '2026-10-14T23:52:14Z',
    displayTime: 'OCT 14, 23:52 UTC',
    category: 'witness',
    classification: 'CONFIDENTIAL',
    credibility: 96,
    source: 'Cockpit Voice Recorder (Decontamination Air-lock C-2)',
    location: 'Decontamination Chamber C-2',
    excerpt: '"You don\'t understand what was down there, Mara. It wasn\'t resting. It was waking up. If I didn\'t cut the array, it would have rewritten the entire station."',
    fullText: `AUDIO TAPE RECOVERY // COCKPIT VOICE RECORDER AIRLOCK C-2
Recording begins: 23:52:14 UTC (Two minutes after power restoration)
Speakers: [ALISTAIR VANCE], [MARA LIN]

LIN: "Put the case down, Alistair. I know you severed the diesel lines. I found the hydraulic shears on your workbench."
VANCE: (heavy breathing, sound of respirator latch clicking) "Mara, back away. You don't know what you're stepping into."
LIN: "Elena is trapped on Sub-Level 5. The elevators are dead because of you!"
VANCE: "Elena was measuring the wrong resonance! It wasn't seismic reverberation, Mara. The rock... the substance in the borehole was learning our telemetry protocols. Every ping we sent down that shaft, it mirrored back with higher order complexity. It was rewriting the station's control firmware in real time."
LIN: "So you stole it for Obsidian Synthetics?"
VANCE: "I'm removing the seed before it consumes the subterranean grid. The transmission at 23:45 was the quarantine signal. Now step aside or neither of us leaves this mountain."
(Sound of scuffle, followed by airlock purge alarm at 23:53:01).`,
    relatedIds: ['EV-03', 'EV-04', 'EV-05', 'EV-07'],
    tags: ['audio', 'confrontation', 'vance', 'lin'],
    coordinates: { x: 260, y: 600 },
    keyFacts: [
      'Recorded 2 minutes after power returned.',
      'Vance admits to cutting power to prevent the entity from rewriting station firmware.',
      'Vance claims the entity was actively learning and mirroring telemetry protocols.',
      'Confirms Vance was physically carrying the specimen in the transport case.'
    ]
  },
  {
    id: 'EV-11',
    code: 'SEI-DWN-0014',
    title: 'Deep Seismograph Infrasound Record',
    timestamp: '2026-10-14T23:39:10Z',
    displayTime: 'OCT 14, 23:39 UTC',
    category: 'telemetry',
    classification: 'UNRESTRICTED',
    credibility: 91,
    source: 'National Geological Monitoring Service (Station BWD)',
    location: 'Surface Baseline Seismic Station #14',
    excerpt: 'Low-frequency infrasound tremor at 7.83 Hz (Schumann resonance harmonic) detected 110 seconds before observatory blackout.',
    fullText: `SEISMOLOGICAL BULLETIN // EXTERNAL INDEPENDENT SENSOR
Location: 12 km southwest of Blackwood Peak
Sensor: Triaxial Broadband Seismometer Nanometrics Trillium 120

OBSERVATION REPORT:
At 23:39:10 UTC, an anomalous non-tectonic oscillation commenced, sustaining for 180 seconds.
- Primary frequency: 7.83 Hz (matches Earth-ionosphere cavity fundamental resonance)
- Particle motion: Transverse circular polarization, non-decaying
- Epicenter: Triangulated directly beneath Blackwood Observatory borehole at depth 1,420m ± 50m.

GEOLOGICAL COMMENTARY: Natural seismic events do not sustain monochromatic continuous tone at Schumann harmonic frequencies without earthquake slip or volcanic magmatic tremor. Blackwood region has been volcanically dormant for 35 million years.`,
    relatedIds: ['EV-02', 'EV-06', 'EV-07'],
    tags: ['seismograph', 'infrasound', 'schumann', 'earth'],
    coordinates: { x: 480, y: 580 },
    keyFacts: [
      'Began at 23:39:10, two minutes before the station blackout.',
      'Generated a pure 7.83 Hz frequency matching Earth\'s Schumann cavity resonance.',
      'Origin directly beneath the borehole at 1,420m.',
      'Independent external verification confirming the subsurface phenomenon was real.'
    ]
  },
  {
    id: 'EV-12',
    code: 'DIR-PLM-0001',
    title: 'Internal Memo: Project PALIMPSEST Directive',
    timestamp: '2026-09-01T10:00:00Z',
    displayTime: 'SEP 01, 10:00 UTC',
    category: 'classified',
    classification: 'TOP SECRET / OBSIDIAN',
    credibility: 97,
    source: 'Obsidian Research Directorate (Director H. Vandermeer)',
    location: 'Corporate HQ — Zurich / Frankfurt',
    excerpt: '"The interface must not simply present the artifact. The interface must be constructed from the artifact\'s own adaptive logic. If the investigator observes, the structure must adapt."',
    fullText: `OBSIDIAN SYNTHETICS RESEARCH DIRECTIVE // MEMO #88-C
CLASSIFICATION: TOP SECRET // CODEWORD: PALIMPSEST
TO: Dr. Alistair Vance, Field Project Director
FROM: Dr. Henrik Vandermeer, Executive Directorate

"Dear Alistair,

The board has authorized the deployment of the Palimpsest framework to the Blackwood installation. 

As we demonstrated in the Zurich prototype, the crystalline sediment recovered from deep core drillings possesses a unique pseudo-computational property: it reorganizes its molecular state in direct relation to external scrutiny. When exposed to light, electromagnetic inquiry, or algorithmic indexing, its internal matrix restructures to anticipate the observer.

We are embedding this exact recursive architecture into the station's archive system. As investigators, engineers, and external auditors interact with the incident records, the interface itself must reconfigure its information topology.

If they read deeply, give them the Dossier.
If they trace associative connections, give them the Relation Atlas.
If they search rapidly for telemetry spikes, present the Signal Console.
If they seek linear chronology, reconstruct the Chronicle.
If they detect contradictions, pivot to the Cross-Examination matrix.

The system will learn how they think. And through their exploration, the specimen will complete its awakening."`,
    relatedIds: ['EV-03', 'EV-07', 'EV-09', 'EV-10'],
    tags: ['palimpsest', 'directive', 'vandermeer', 'living-archive'],
    coordinates: { x: 680, y: 500 },
    keyFacts: [
      'Authored by Dr. Henrik Vandermeer of Obsidian Synthetics.',
      'Explicitly details the five structural forms: Dossier, Atlas, Signal Console, Chronicle, Cross-Examination.',
      'Confirms that the Palimpsest software interface was modeled after the subterranean entity\'s adaptive learning ability.',
      'The archive literally reconstructs itself as the user investigates.'
    ]
  }
];

export const INITIAL_CASE_THEORY = `HYPOTHESIS SUMMARY:
On October 14, 2026, at 23:41 UTC, the Blackwood Deep-Core Subsurface Observatory experienced an engineered 9-minute blackout. 

The physical evidence reveals this was not an accident:
1. Dr. Vance severed generator fuel lines and wiped 32 CCTV streams with an automated 540-second script.
2. During the blackout at 23:44, Vance accessed Vault 03 with Keycard Gamma-7 and extracted Sample 882-B (42.8 kg).
3. At 23:45, a 14.4 MB encrypted microwave transmission was broadcast to offshore coordinates.
4. However, Vance\'s recorded confession indicates he may have acted out of panic: the subterranean entity was actively mirroring station communications and rewriting control firmware.

CRITICAL QUESTION: Was Vance executing an illegal corporate extraction for Obsidian Synthetics, or was he desperately quarantining a self-reconfiguring alien matrix?`;
