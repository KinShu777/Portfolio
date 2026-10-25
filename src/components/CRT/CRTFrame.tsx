import React, { useState, useRef, useEffect } from 'react';
import type { PowerState, ChannelId, CRTIntensity, PhosphorTheme, PhosphorBloom } from '../../types';
import { RadioIcon } from '../UI/RetroIcons';
import { CRTControlsPanel } from './CRTControlsPanel';
import { soundEngine } from '../../audio/soundEngine';

interface CRTFrameProps {
  powerState: PowerState;
  activeChannel: ChannelId;
  isMuted?: boolean;
  volume: number;
  onTogglePower: () => void;
  onChannelChange: (ch: ChannelId) => void;
  onChannelNext: () => void;
  onChannelPrev: () => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute?: () => void;
  crtIntensity: CRTIntensity;
  onIntensityChange: (lvl: CRTIntensity) => void;
  phosphorTheme: PhosphorTheme;
  onPhosphorChange: (theme: PhosphorTheme) => void;
  bloom: PhosphorBloom;
  onBloomChange: (bloom: PhosphorBloom) => void;
  onDegauss: () => void;
  children: React.ReactNode;
}

export const CRTFrame: React.FC<CRTFrameProps> = ({
  powerState,
  activeChannel,
  volume,
  onTogglePower,
  onChannelChange,
  onChannelNext,
  onChannelPrev,
  onVolumeChange,
  crtIntensity,
  onIntensityChange,
  phosphorTheme,
  onPhosphorChange,
  bloom,
  onBloomChange,
  onDegauss,
  children
}) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const knobRef = useRef<HTMLDivElement | null>(null);
  const isDraggingKnob = useRef<boolean>(false);
  const startY = useRef<number>(0);
  const startVol = useRef<number>(volume);

  // Knob rotation angle: Volume 0 => -135deg, Volume 1 => +135deg (total 270deg sweep)
  const knobAngle = -135 + volume * 270;

  // Wheel interaction for analog volume knob
  const handleKnobWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    soundEngine.playRadioTuning();
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    const nextVol = Math.max(0, Math.min(1, volume + delta));
    onVolumeChange(nextVol);
  };

  // Drag interaction for analog volume knob
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingKnob.current = true;
    startY.current = e.clientY;
    startVol.current = volume;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingKnob.current) return;
    const deltaY = startY.current - e.clientY; // drag up = increase
    const nextVol = Math.max(0, Math.min(1, startVol.current + deltaY / 120));
    onVolumeChange(nextVol);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingKnob.current) {
      isDraggingKnob.current = false;
      soundEngine.playRadioTuning();
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDraggingKnob.current = false;
    };
    window.addEventListener('pointerup', handleGlobalMouseUp);
    return () => window.removeEventListener('pointerup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="crt-apparatus-wrapper">
      <div className="crt-cabinet">
        {/* Top ventilation slits */}
        <div className="crt-cabinet-vents" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="crt-vent-slit" />
          ))}
        </div>

        {/* The screen housing */}
        {children}

        {/* Physical TV Hardware Control Side Panel */}
        <aside className="crt-hardware-panel" aria-label="Television Hardware Controls">
          {/* Top Brand Plate */}
          <div className="crt-brand-emblem">
            <span className="crt-brand-dot" />
            <span>KV-1984</span>
          </div>

          {/* 1. POWER BUTTON (Image 3: circular brushed metal button with power icon, no 'power' text) */}
          <div className="crt-control-group crt-power-group">
            <button
              type="button"
              className={`crt-vintage-power-btn ${powerState === 'on' ? 'power-on' : ''}`}
              onClick={() => {
                soundEngine.playClick(320);
                onTogglePower();
              }}
              title={powerState === 'on' ? 'TV On (Click to turn off)' : 'TV Off (Click to turn on)'}
              aria-label="Power Button"
            >
              <div className="power-btn-outer-bezel">
                <div className="power-btn-inner-ring">
                  <div className="power-btn-cap">
                    <svg viewBox="0 0 24 24" className="power-symbol-svg" aria-hidden="true">
                      <line x1="12" y1="3.5" x2="12" y2="11" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* 2. CHANNEL KNOB (Image 1 & 2: knurled perimeter, metallic face, crossbar, with 'CHANNEL' written on it) */}
          <div className="crt-control-group">
            <div className="crt-dial-container">
              {/* Channel tick marks 1, 2, 3, 4 around dial */}
              <div className="crt-channel-tick-ring" aria-hidden="true">
                <span className={`channel-num num-1 ${activeChannel === 1 ? 'active' : ''}`}>1</span>
                <span className={`channel-num num-2 ${activeChannel === 2 ? 'active' : ''}`}>2</span>
                <span className={`channel-num num-3 ${activeChannel === 3 ? 'active' : ''}`}>3</span>
                <span className={`channel-num num-4 ${activeChannel === 4 ? 'active' : ''}`}>4</span>
              </div>

              {/* Rotary Channel Knob */}
              <div
                className="crt-vintage-knob crt-channel-knob"
                style={{
                  transform: `rotate(${(activeChannel - 1) * 75 - 112}deg)`
                }}
                onClick={() => {
                  soundEngine.playChannelSwitch();
                  onChannelNext();
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  soundEngine.playChannelSwitch();
                  if (e.deltaY < 0) onChannelNext();
                  else onChannelPrev();
                }}
                title={`Channel: CH 0${activeChannel} (Click or scroll to rotate)`}
                aria-label="Channel Selector Knob"
                role="button"
                tabIndex={0}
              >
                <div className="knob-knurled-skirt" />
                <div className="knob-metallic-face channel-metallic-face">
                  <div className="knob-crossbar-pointer" />
                  <span className="knob-label-engraved">CHANNEL</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. VOLUME KNOB (Image 2: gold/champagne brushed knurled knob with indicator notch, 0-11 scale, 'VOLUME' written on it) */}
          <div className="crt-control-group">
            <div className="crt-dial-container">
              {/* Radial tick marks and 0 to 11 scale */}
              <div className="crt-volume-tick-ring" aria-hidden="true">
                <div className="vol-radial-ticks">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="vol-tick-line"
                      style={{
                        transform: `rotate(${-135 + i * (270 / 11)}deg)`
                      }}
                    />
                  ))}
                </div>
                <span className="vol-scale-num scale-0">0</span>
                <span className="vol-scale-num scale-11">11</span>
              </div>

              {/* Rotary Volume Knob */}
              <div
                ref={knobRef}
                className="crt-vintage-knob crt-volume-knob"
                style={{
                  transform: `rotate(${knobAngle}deg)`
                }}
                onWheel={handleKnobWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                title={`Volume: ${Math.round(volume * 100)}% (Drag up/down or scroll wheel)`}
                aria-label="Volume Knob"
                role="slider"
                aria-valuenow={Math.round(volume * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
              >
                <div className="knob-knurled-skirt vol-knurled-skirt" />
                <div className="knob-metallic-face vol-metallic-face">
                  <div className="vol-indicator-notch" />
                  <span className="knob-label-engraved vol-label-engraved">VOLUME</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. VINTAGE STYLED RADIO BUTTON (Image 1: classic TV pushbutton switch with metallic bezel) */}
          <div className="crt-control-group crt-radio-group">
            <button
              type="button"
              className={`crt-vintage-radio-btn ${activeChannel === 3 ? 'radio-active' : ''}`}
              onClick={() => {
                soundEngine.playChannelSwitch();
                onChannelChange(3);
              }}
              title="Tune to Channel 03: Retro FM Radio"
              aria-label="Radio Tuner Mode"
            >
              <div className="vintage-switch-collar">
                <div className="vintage-switch-cap">
                  <RadioIcon size={12} color={activeChannel === 3 ? '#ff2a6d' : '#949bb0'} />
                  <span>RADIO</span>
                </div>
                <div className={`vintage-switch-indicator ${activeChannel === 3 ? 'indicator-on' : ''}`} />
              </div>
            </button>
          </div>

          {/* Acoustic Speaker Slits */}
          <div className="crt-speaker-grille" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="crt-speaker-slit" />
            ))}
          </div>

          {/* 5. CRT ADJ BUTTON AT THE VERY END */}
          <div className="crt-bottom-cluster">
            <CRTControlsPanel
              intensity={crtIntensity}
              onIntensityChange={onIntensityChange}
              phosphorTheme={phosphorTheme}
              onPhosphorChange={onPhosphorChange}
              bloom={bloom}
              onBloomChange={onBloomChange}
              onDegauss={onDegauss}
              isOpen={isServiceOpen}
              onToggle={() => setIsServiceOpen(!isServiceOpen)}
            />
          </div>
        </aside>

        {/* Base feet / stand */}
        <div className="crt-stand" aria-hidden="true">
          <div className="crt-foot" />
          <div className="crt-foot" />
        </div>
      </div>
    </div>
  );
};
