import type { RadioStation } from '../types';

export const radioStations: RadioStation[] = [
  {
    id: "station-shuddh-desi",
    frequency: "88.7",
    name: "SHUDDH DESI RADIO",
    genre: "RETRO BOLLYWOOD // EVERGREEN HINDI",
    tag: "LIVE BROADCAST",
    color: "#ffb703",
    country: "India",
    format: "mp3",
    streamUrl: "https://streamer.radio.co/se30891e37/listen",
    description: "Golden Era Melodies, Kishore Kumar, Mohd. Rafi & Lata Mangeshkar classics",
    synthPreset: "ambient",
    tracks: [
      {
        id: "sd-01",
        title: "Golden Era Hindi Classics",
        artist: "Retro Indian Radio Stream",
        duration: "LIVE",
        src: "https://streamer.radio.co/se30891e37/listen"
      }
    ]
  },
  {
    id: "station-bombay-beats",
    frequency: "94.3",
    name: "1.FM BOMBAY BEATS",
    genre: "HINDI RETRO // BOLLYWOOD HITS",
    tag: "24/7 BROADCAST",
    color: "#05ffa1",
    country: "India",
    format: "mp3",
    streamUrl: "https://strm112.1.fm/bombaybeats_mobile_mp3",
    description: "Timeless Bollywood hits and romantic evergreen Hindi cinema soundtracks",
    synthPreset: "lofi",
    tracks: [
      {
        id: "bb-01",
        title: "Bombay Retro Melodies",
        artist: "1.FM Bombay Beats India",
        duration: "LIVE",
        src: "https://strm112.1.fm/bombaybeats_mobile_mp3"
      }
    ]
  },
  {
    id: "station-bollywood-90s",
    frequency: "98.6",
    name: "BOLLYWOOD NOSTALGIA 90s",
    genre: "90s BOLLYWOOD // GOLDEN ERA",
    tag: "ARCHIVE STREAM",
    color: "#ff2a6d",
    country: "India",
    format: "mp3",
    streamUrl: "https://www.desizoneradio.com/relay3",
    description: "Authentic 90s Bollywood evergreen melodies & golden age film soundtracks",
    synthPreset: "retro-fm",
    tracks: [
      {
        id: "bn-01",
        title: "90s Bollywood Nostalgia",
        artist: "DesiZone Retro Archive",
        duration: "LIVE",
        src: "https://www.desizoneradio.com/relay3"
      }
    ]
  },
  {
    id: "station-radio-udaan",
    frequency: "101.5",
    name: "RADIO UDAAN",
    genre: "INDIAN CLASSICS // COMMUNITY BROADCAST",
    tag: "NATIONAL NETWORK",
    color: "#00d2ff",
    country: "India",
    format: "mp3",
    streamUrl: "https://stream.radioudaan.com/listen/radio_udaan/radio.mp3",
    description: "Community radio network broadcasting classic Indian music and heritage programs",
    synthPreset: "ambient",
    tracks: [
      {
        id: "ru-01",
        title: "Indian Heritage & Music Broadcast",
        artist: "Radio Udaan India",
        duration: "LIVE",
        src: "https://stream.radioudaan.com/listen/radio_udaan/radio.mp3"
      }
    ]
  },
  {
    id: "station-bollywood-classics",
    frequency: "103.7",
    name: "BOLLYWOOD CLASSIC BEATS",
    genre: "70s & 80s CLASSICS // RETRO HINDI",
    tag: "CLASSIC FREQUENCY",
    color: "#e63946",
    country: "India",
    format: "mp3",
    streamUrl: "https://drive.uber.radio/uber/bollywoodlove/icecast.audio",
    description: "Vintage Bollywood romantic ballads, acoustic strings and nostalgic vocals",
    synthPreset: "lofi",
    tracks: [
      {
        id: "bc-01",
        title: "Vintage Hindi Cinema Ballads",
        artist: "Bollywood Love & Classics",
        duration: "LIVE",
        src: "https://drive.uber.radio/uber/bollywoodlove/icecast.audio"
      }
    ]
  },
  {
    id: "station-nightride-fm",
    frequency: "106.8",
    name: "NIGHTRIDE FM",
    genre: "SYNTHWAVE // VINTAGE ANALOG",
    tag: "RELAY STATION",
    color: "#9d4edd",
    country: "International",
    format: "mp3",
    streamUrl: "https://stream.nightride.fm/nightride.mp3",
    description: "Pure 1980s analog synthesizers, neon tape drift, and vintage cathode ambiance",
    synthPreset: "synthwave",
    tracks: [
      {
        id: "nr-01",
        title: "Analog Synthwave Transmission",
        artist: "Nightride FM Broadcast",
        duration: "LIVE",
        src: "https://stream.nightride.fm/nightride.mp3"
      }
    ]
  }
];
