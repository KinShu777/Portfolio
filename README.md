# THE CRT PORTFOLIO // Interactive Broadcast Transmission

> An atmospheric, cinematic, 1980s/1990s vintage CRT television personal portfolio website built with React, Vite, TypeScript, Vanilla CSS, and the Web Audio API.

---

## 📺 Concept & Features

- **Vintage Physical CRT Chassis**: Detailed Sony/Trinitron-inspired CRT casing with curved glass reflections, bezel lip, speaker grille, ventilation slots, dual rotary knobs (Channel & Volume/Tuning), and standby/active LED indicator.
- **Scroll-Triggered Remote Discovery**: When visitors scroll down, a tactile infrared TV remote control smoothly glides into view from below.
- **Authentic 13-Stage CRT Boot Sequence**:
  1. Mechanical power switch depression.
  2. Synthesized electrical switch click & degauss coil low-frequency thump.
  3. High-frequency 15.734 kHz flyback cathode whine.
  4. Glowing horizontal phosphor beam collapsing and expanding vertically.
  5. White noise RF static flash & chromatic aberration glitch.
  6. "SIGNAL ACQUIRED" welcome broadcast transmission banner.
  7. Smooth reveal of the digital portfolio inside the curved glass.
- **The Screen IS the Website**: Content inside the CRT glass is vertically scrollable with a custom phosphor scrollbar, broadcast header HUD (live timestamp, REC indicator, channel badge), and high-contrast readable typography.
- **Dedicated Channels**:
  - **Channel 01 — Portfolio**: Home, About Dossier, Education, Skills, Achievements, Experience, and Contact & Social Uplinks.
  - **Channel 02 — Project Archive**: Filterable repertory cards, live demo links, source code, and case study modals.
  - **Channel 03 — Retro FM Radio Deck**: Real frequency tuning dial, station presets, audio visualizer, procedural synth engine, and support for local MP3 playlists.
  - **Channel 04 — SMPTE Test Pattern**: Classic analog broadcast color bars and calibration signals.
- **Procedural Web Audio Engine**: Zero copyright issues out of the box — synthesizes authentic mechanical clicks, static bursts, tuning squeals, and ambient synth chords via the Web Audio API.
- **CRT Calibration Controls**: In-TV adjustments for CRT intensity (`LOW`, `MEDIUM`, `HIGH`, `OFF`), phosphor coatings (`Color`, `Green`, `Amber`, `Cyan`), and degaussing.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### Installation & Local Run
```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
portfolio/
├── index.html                     # Retro Google fonts (VT323, Share Tech Mono, Space Grotesk)
├── package.json                   # Project config & scripts
├── public/
│   ├── favicon.svg                # Custom CRT TV SVG icon
│   ├── audio/                     # Directory for your MP3 tracks
│   │   └── README.md              # Audio instructions
│   └── assets/                    # Directory for your images and previews
│       ├── profile.webp           # (Optional) Your portrait
│       └── projects/              # (Optional) Project screenshots
└── src/
    ├── main.tsx                   # React root entry
    ├── App.tsx                    # Master Controller: scroll discovery, power, channels, shortcuts
    ├── index.css                  # Complete CRT physical chassis, scanlines, glass & remote styles
    ├── types/
    │   └── index.ts               # TypeScript data definitions & channel states
    ├── config/
    │   ├── portfolioData.ts       # Your bio, education, skills, achievements, experience, contact
    │   ├── projectsData.ts        # Project archive entries and case studies
    │   └── radioStations.ts       # Radio station presets, frequencies, and track playlists
    ├── audio/
    │   └── soundEngine.ts         # Procedural Web Audio API sound synthesizer
    └── components/
        ├── CRT/
        │   ├── CRTFrame.tsx       # Physical television cabinet, vents, knobs, speaker grille, LED
        │   ├── CRTScreen.tsx      # Curved glass bezel, scanlines, vignette, phosphor reflections
        │   ├── CRTStartupSequence.tsx # 13-stage startup animation sequence
        │   └── CRTControlsPanel.tsx   # Calibration drawer (intensity, phosphor color, degauss)
        ├── Remote/
        │   └── TVRemote.tsx       # Infrared remote with tactile rubber keys, IR LED, 1-9 keypad
        ├── Channels/
        │   ├── PortfolioChannel.tsx      # Channel 01: Main portfolio website
        │   ├── ProjectArchiveChannel.tsx # Channel 02: Dedicated Project Archive
        │   ├── RetroRadioChannel.tsx     # Channel 03: Retro FM Radio Tuner
        │   └── TestPatternChannel.tsx    # Channel 04: SMPTE color bars
        ├── Portfolio/
        │   ├── BroadcastHeader.tsx   # Sticky OSD bar with time, REC blinker, section jump
        │   ├── HomeSection.tsx       # Transmission coordinates, hero, profile asset box
        │   ├── AboutSection.tsx      # Dossier console, bio, hardware/systems specs
        │   ├── EducationSection.tsx  # Academic timeline
        │   ├── SkillsSection.tsx     # Analog telemetry meters
        │   ├── AchievementsSection.tsx # Award accolades
        │   ├── ExperienceSection.tsx # Chronological service logs
        │   └── ContactSection.tsx    # Uplink console, copy email, GitHub, LinkedIn
        └── UI/
            ├── RetroIcons.tsx        # Tailored pixel-sharp SVG icons
            ├── NoiseOverlay.tsx      # Procedural canvas analog RF static generator
            └── QuickControls.tsx     # Floating accessibility bar & keyboard shortcuts modal
```

---

## 🎨 Asset Checklist & Placeholders

The codebase is built with clean, working visual placeholders. Whenever you are ready to personalize the site, here are the assets you can provide:

| Asset | Where It Appears | Recommended Specs | Visual Style Recommendation | Target Path |
| :--- | :--- | :--- | :--- | :--- |
| **Profile Photo / Avatar** | Home Section (`HomeSection.tsx`) | `400 x 400` px (1:1 ratio), WebP/PNG | Stylized monochrome, 8-bit pixel art, or analog film portrait | `public/assets/profile.webp` |
| **Project 01 Preview** | Project Archive (`ProjectArchiveChannel.tsx`) | `1280 x 720` px (16:9 ratio), WebP/PNG | System screenshot, dark terminal, or UI recording | `public/assets/projects/proj-01.webp` |
| **Project 02 Preview** | Project Archive (`ProjectArchiveChannel.tsx`) | `1280 x 720` px (16:9 ratio), WebP/PNG | Interactive canvas capture or visual engine screenshot | `public/assets/projects/proj-02.webp` |
| **Project 03 Preview** | Project Archive (`ProjectArchiveChannel.tsx`) | `1280 x 720` px (16:9 ratio), WebP/PNG | Backend architecture diagram or benchmark dashboard | `public/assets/projects/proj-03.webp` |
| **Project 04 Preview** | Project Archive (`ProjectArchiveChannel.tsx`) | `1280 x 720` px (16:9 ratio), WebP/PNG | CLI terminal recording or command output | `public/assets/projects/proj-04.webp` |
| **Custom Audio Tracks** | FM Radio Deck (`RetroRadioChannel.tsx`) | `.mp3` format, 128-320 kbps | Lo-fi beats, synthwave, ambient drone, or your favorite retro music | `public/audio/song01.mp3` through `song06.mp3` |

---

## 📻 How to Configure the FM Radio & Local MP3 Files

1. Place your MP3 files in the `public/audio/` directory:
   ```
   public/audio/song01.mp3
   public/audio/song02.mp3
   public/audio/song03.mp3
   ```
2. Open [`src/config/radioStations.ts`](file:///c:/Users/aldol/OneDrive/Documents/portfolio/src/config/radioStations.ts).
3. Customize station frequencies, station names, genres, track titles, and audio source paths:
   ```ts
   {
     frequency: "88.7",
     name: "Night Drive FM",
     genre: "Synthwave / Analog Drift",
     tag: "BROADCAST LATE NIGHT",
     color: "#ff2a6d",
     synthPreset: "synthwave",
     tracks: [
       {
         id: "nd-01",
         title: "Your Song Name",
         artist: "Your Artist Name",
         duration: "03:45",
         src: "/audio/song01.mp3"
       }
     ]
   }
   ```
4. *Zero Audio File Fallback*: If you run the site before uploading any audio files, the built-in procedural Web Audio API synthesizer automatically generates soothing retro FM chords in real time so there are never broken audio buttons.

---

## ✍️ How to Edit Your Portfolio Information

All personal content is centralized in cleanly structured configuration files with clearly marked placeholders:

1. **Personal Information, Education, Skills, Experience, and Contact**:
   - Edit [`src/config/portfolioData.ts`](file:///c:/Users/aldol/OneDrive/Documents/portfolio/src/config/portfolioData.ts).
   - Look for items like:
     - `[YOUR DEGREE]`
     - `[YOUR UNIVERSITY]`
     - `[YOUR ACHIEVEMENT]`
     - `[YOUR ROLE]`
     - `[YOUR EMAIL]`
     - `[YOUR GITHUB]`
     - `[YOUR LINKEDIN]`
2. **Project Entries & Case Studies**:
   - Edit [`src/config/projectsData.ts`](file:///c:/Users/aldol/OneDrive/Documents/portfolio/src/config/projectsData.ts).
   - Add as many projects as you want; cards and category filter tabs automatically adapt!

---

## ⌨️ Keyboard Shortcuts & Accessibility

| Key | Action |
| :--- | :--- |
| `P` | Toggle TV Power (Power On / Off) |
| `M` | Master Audio Mute Toggle |
| `1` | Switch to **Channel 01: Portfolio Transmission** |
| `2` | Switch to **Channel 02: Dedicated Project Archive** |
| `3` | Switch to **Channel 03: Retro FM Radio Deck** |
| `4` | Switch to **Channel 04: SMPTE Color Test Pattern** |
| `+` / `-` | Volume Up / Volume Down |
| `R` | Toggle Physical TV Remote Control visibility |
| `Space` | Play / Pause Radio Broadcast |
| `Escape` | Skip Startup Sequence / Close Modals |

- **Reduced Motion**: Respects `prefers-reduced-motion` media query by removing screen flicker, phosphor line beam expansion, and heavy transitions.
- **Contrast & Readability**: Content uses high-contrast typography (`#ffffff` on `#050f0c`) to ensure the retro CRT aesthetic does not compromise readability.

---

## 🌐 Deploying to Vercel

This repository is ready for immediate deployment to Vercel:

1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

---

## 📡 Browser Limitations & Notes
- Modern browsers require user interaction (e.g. clicking the remote, power button, or scrolling) before playing audio via the Web Audio API or `<audio>` elements. The site is designed around this requirement.
- Hardware-accelerated CSS filters and canvas elements are utilized for scanlines and static, ensuring consistent 60 FPS performance on desktops, laptops, and mobile devices.
