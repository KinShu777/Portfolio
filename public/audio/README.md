# Retro Radio Audio Directory

Place your custom audio tracks (MP3, WAV, OGG) here.

### Default Configured Tracks:
- `song01.mp3` — Night Drive FM (Track 01)
- `song02.mp3` — Night Drive FM (Track 02)
- `song03.mp3` — Lo-Fi Broadcast (Track 03)
- `song04.mp3` — Lo-Fi Broadcast (Track 04)
- `song05.mp3` — Deep Ambient Lab (Track 05)
- `song06.mp3` — Retro Static Wire (Track 06)

### How It Works:
If these files are not present or not yet loaded, the website uses its built-in procedural Web Audio API synthesizer to generate ambient retro synth frequencies and lo-fi chords in real time.

When you add your own MP3 files here, the radio will automatically stream them!
Configure titles, artists, and frequencies in `src/config/radioStations.ts`.
