import type { RadioStation } from '../types';

export const radioStations: RadioStation[] = [
  {
    frequency: "88.7",
    name: "NIGHT DRIVE FM",
    genre: "SYNTHWAVE / ANALOG DRIFT",
    tag: "BROADCAST LATE NIGHT",
    color: "#ff2a6d",
    synthPreset: "synthwave",
    tracks: [
      {
        id: "nd-01",
        title: "[PROCEDURAL SYNTH CARRIER — PRESET 01]",
        artist: "[PROCEDURAL SYNTHESIZER / LOCAL MP3 PLACEHOLDER]",
        duration: "--:--",
        src: "" // Supports local MP3 when provided, e.g. /audio/song01.mp3
      }
    ]
  },
  {
    frequency: "94.3",
    name: "AFTER HOURS",
    genre: "LO-FI / DOWNTEMPO",
    tag: "TRANSMISSION 24/7",
    color: "#05ffa1",
    synthPreset: "lofi",
    tracks: [
      {
        id: "ah-01",
        title: "[PROCEDURAL LO-FI CHORD STREAM]",
        artist: "[WARM CATHODE LAB / LOCAL MP3 PLACEHOLDER]",
        duration: "--:--",
        src: ""
      }
    ]
  },
  {
    frequency: "98.6",
    name: "DEEP SIGNAL",
    genre: "AMBIENT / ATMOSPHERIC",
    tag: "TELEMETRY LABS",
    color: "#00d2ff",
    synthPreset: "ambient",
    tracks: [
      {
        id: "ds-01",
        title: "[PROCEDURAL AMBIENT RESONANCE]",
        artist: "[IONOSPHERIC ARRAY / LOCAL MP3 PLACEHOLDER]",
        duration: "--:--",
        src: ""
      }
    ]
  },
  {
    frequency: "103.7",
    name: "SHORTWAVE",
    genre: "EXPERIMENTAL / RADIO STATIC",
    tag: "EXPERIMENTAL RELAY",
    color: "#ffb703",
    synthPreset: "retro-fm",
    tracks: [
      {
        id: "sw-01",
        title: "[PROCEDURAL SHORTWAVE CHIMES]",
        artist: "[NUMBERS BROADCAST / LOCAL MP3 PLACEHOLDER]",
        duration: "--:--",
        src: ""
      }
    ]
  }
];
