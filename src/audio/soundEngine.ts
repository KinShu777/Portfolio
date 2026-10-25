// Procedural Web Audio API Sound Engine
// Synthesizes authentic retro CRT hardware sounds & ambient radio music without copyrighted files

class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private volume: number = 0.7;

  // Radio streaming
  private radioAudioElement: HTMLAudioElement | null = null;
  private isRadioPlaying: boolean = false;
  private proceduralRadioTimer: number | null = null;
  private proceduralOscillators: OscillatorNode[] = [];

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.radioAudioElement) {
      this.radioAudioElement.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- 1. Tactile Mechanical Button Click ---
  public playClick(pitch: number = 600) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  // --- 2. CRT Power-On Sequence (Degauss Coil Thump + Flyback Whine) ---
  public playCRTPowerOn() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;

    // A. Heavy Mechanical Switch Snap
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'square';
    snapOsc.frequency.setValueAtTime(320, now);
    snapOsc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
    snapGain.gain.setValueAtTime(0.4, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    snapOsc.connect(snapGain);
    snapGain.connect(this.masterGain);
    snapOsc.start(now);
    snapOsc.stop(now + 0.05);

    // B. Degauss Coil Low-Frequency Resonant "Thump-Whoosh" (60Hz -> 30Hz decay)
    const degaussOsc = ctx.createOscillator();
    const degaussGain = ctx.createGain();
    degaussOsc.type = 'sine';
    degaussOsc.frequency.setValueAtTime(95, now + 0.06);
    degaussOsc.frequency.exponentialRampToValueAtTime(28, now + 0.85);
    degaussGain.gain.setValueAtTime(0.001, now + 0.06);
    degaussGain.gain.linearRampToValueAtTime(0.45, now + 0.12);
    degaussGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    degaussOsc.connect(degaussGain);
    degaussGain.connect(this.masterGain);
    degaussOsc.start(now + 0.06);
    degaussOsc.stop(now + 0.95);

    // C. 15.734 kHz Cathode Ray Flyback Transformer Whine (subtle high-pitch tone)
    const flybackOsc = ctx.createOscillator();
    const flybackGain = ctx.createGain();
    flybackOsc.type = 'sine';
    flybackOsc.frequency.setValueAtTime(15734, now + 0.3); // NTSC horizontal scanline frequency!
    flybackGain.gain.setValueAtTime(0.0001, now + 0.3);
    flybackGain.gain.linearRampToValueAtTime(0.035, now + 0.6);
    flybackGain.gain.exponentialRampToValueAtTime(0.005, now + 1.4);
    flybackOsc.connect(flybackGain);
    flybackGain.connect(this.masterGain);
    flybackOsc.start(now + 0.3);
    flybackOsc.stop(now + 1.5);
  }

  // --- 3. White Noise Static Burst (Startup / Channel change) ---
  public playStaticBurst(durationMs: number = 280, volumeMultiplier: number = 0.25) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const bufferSize = Math.floor(ctx.sampleRate * (durationMs / 1000));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Filter to sound like 1980s RF tuner demodulation
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volumeMultiplier, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
  }

  // --- 4. Channel Switch Clunk + Static ---
  public playChannelSwitch() {
    this.playClick(240);
    setTimeout(() => {
      this.playStaticBurst(220, 0.2);
    }, 40);
  }

  // --- 5. Radio Tuning Interference Squeal ---
  public playRadioTuning() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const startFreq = 800 + Math.random() * 600;
    const endFreq = 400 + Math.random() * 800;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
    this.playStaticBurst(160, 0.12);
  }

  // --- 6. Procedural Ambient Synth for Radio ---
  // Plays atmospheric chords when MP3 file is not yet uploaded!
  public startProceduralRadio(preset: string) {
    this.stopProceduralRadio();
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const chords: Record<string, number[][]> = {
      lofi: [
        [220.0, 261.63, 329.63, 392.0], // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
        [164.81, 196.0, 246.94, 329.63]  // Em7
      ],
      synthwave: [
        [130.81, 196.0, 246.94, 329.63], // Cmaj7
        [110.0, 164.81, 220.0, 261.63], // Am
        [87.31, 130.81, 174.61, 220.0], // F
        [98.0, 146.83, 196.0, 246.94]   // G
      ],
      ambient: [
        [110.0, 164.81, 246.94], // A drone
        [123.47, 185.0, 277.18], // B drone
        [98.0, 146.83, 220.0]    // G drone
      ],
      'retro-fm': [
        [146.83, 220.0, 293.66],
        [174.61, 261.63, 349.23]
      ]
    };

    const chordList = chords[preset] || chords.lofi;
    let step = 0;

    const playChordStep = () => {
      if (!this.isRadioPlaying) return;
      this.clearActiveOscillators();

      const currentChord = chordList[step % chordList.length];
      step++;

      currentChord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = preset === 'synthwave' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq * (idx === 0 ? 0.5 : 1), this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(preset === 'synthwave' ? 700 : 450, this.ctx.currentTime);

        // Smooth breathing envelope
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035 / currentChord.length, this.ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 5.0);
        this.proceduralOscillators.push(osc);
      });
    };

    playChordStep();
    this.proceduralRadioTimer = window.setInterval(playChordStep, 4800);
  }

  private clearActiveOscillators() {
    this.proceduralOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.proceduralOscillators = [];
  }

  public stopProceduralRadio() {
    if (this.proceduralRadioTimer !== null) {
      clearInterval(this.proceduralRadioTimer);
      this.proceduralRadioTimer = null;
    }
    this.clearActiveOscillators();
  }

  // --- 7. High-Level Radio Play / Pause / Station Switch ---
  public playRadioTrack(src?: string, synthPreset: string = 'lofi') {
    this.isRadioPlaying = true;
    this.initContext();

    if (src) {
      if (!this.radioAudioElement) {
        this.radioAudioElement = new Audio();
        this.radioAudioElement.loop = true;
      }
      this.radioAudioElement.src = src;
      this.radioAudioElement.volume = this.isMuted ? 0 : this.volume;
      this.radioAudioElement.play().catch(() => {
        // Autoplay policy or 404 on local file -> fallback to procedural synthesizer!
        this.startProceduralRadio(synthPreset);
      });
    } else {
      this.startProceduralRadio(synthPreset);
    }
  }

  public pauseRadio() {
    this.isRadioPlaying = false;
    if (this.radioAudioElement) {
      this.radioAudioElement.pause();
    }
    this.stopProceduralRadio();
  }

  public isRadioActive(): boolean {
    return this.isRadioPlaying;
  }
}

export const soundEngine = new RetroSoundEngine();
