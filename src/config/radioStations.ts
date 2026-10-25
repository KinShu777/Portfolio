import type { RadioStation } from '../types';

export const radioStations: RadioStation[] = [
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
        title: "[TRACK 01 — Neon Boulevard]",
        artist: "[ARTIST 01 / VINTAGE SYNTH COLLECTIVE]",
        duration: "03:45",
        src: "/audio/song01.mp3" // Put your MP3 in public/audio/song01.mp3
      },
      {
        id: "nd-02",
        title: "[TRACK 02 — Midnight Transmission]",
        artist: "[ARTIST 02 / ANALOG RESEARCH]",
        duration: "04:12",
        src: "/audio/song02.mp3"
      }
    ]
  },
  {
    frequency: "94.3",
    name: "Lo-Fi Broadcast",
    genre: "Cassette Beats / Study Stream",
    tag: "TRANSMISSION 24/7",
    color: "#05ffa1",
    synthPreset: "lofi",
    tracks: [
      {
        id: "lf-01",
        title: "[TRACK 03 — Phosphor Rain]",
        artist: "[LO-FI STATION ARCHIVES]",
        duration: "02:50",
        src: "/audio/song03.mp3"
      },
      {
        id: "lf-02",
        title: "[TRACK 04 — Warm Cathode Glow]",
        artist: "[SAMPLE LAB 94]",
        duration: "03:15",
        src: "/audio/song04.mp3"
      }
    ]
  },
  {
    frequency: "101.5",
    name: "Deep Ambient Lab",
    genre: "Atmospheric Drones / Deep Space",
    tag: "TELEMETRY LABS",
    color: "#00d2ff",
    synthPreset: "ambient",
    tracks: [
      {
        id: "amb-01",
        title: "[TRACK 05 — Ionospheric Reflection]",
        artist: "[DEEP FREQUENCY INSTITUTE]",
        duration: "05:22",
        src: "/audio/song05.mp3"
      }
    ]
  },
  {
    frequency: "106.8",
    name: "Retro Static Wire",
    genre: "Shortwave Broadcasts & Chimes",
    tag: "EXPERIMENTAL RELAY",
    color: "#ffb703",
    synthPreset: "retro-fm",
    tracks: [
      {
        id: "rf-01",
        title: "[TRACK 06 — Numbers Station Echo]",
        artist: "[ANTENNA ARRAY 88]",
        duration: "04:08",
        src: "/audio/song06.mp3"
      }
    ]
  }
];
