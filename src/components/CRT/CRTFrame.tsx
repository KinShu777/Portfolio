import React, { useState, useRef, useEffect } from 'react';
import type { PowerState, ChannelId, CRTIntensity, PhosphorTheme, PhosphorBloom } from '../../types';
import { PowerIcon, RadioIcon, VolumeMuteIcon, VolumeUpIcon } from '../UI/RetroIcons';
import { CRTControlsPanel } from './CRTControlsPanel';
import { soundEngine } from '../../audio/soundEngine';

interface CRTFrameProps {
  powerState: PowerState;
  activeChannel: ChannelId;
  isMuted: boolean;
  volume: number;
  onTogglePower: () => void;
  onChannelChange: (ch: ChannelId) => void;
  onChannelNext: () => void;
  onChannelPrev: () => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
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
  isMuted,
  volume,
  onTogglePower,
  onChannelChange,
  onChannelNext,
  onChannelPrev,
  onVolumeChange,
  onToggleMute,
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

  // Knob rotation angle: Volume 0 => -135deg, Volume 1 => +135deg
  const knobAngle = -135 + volume * 270;

  // Wheel interaction for analog volume knob
  const handleKnobWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    soundEngine.playRadioTuning();
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    const nextVol = Math.max(0, Math.min(1, volume + delta));
    onVolumeChange(nextVol);
  };

  // Drag interaction for analog knob
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

  // Prevent scroll during knob drag
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
        <aside className="crt-hardware-panel" aria-label="Physical Television Controls">
          {/* Brand plate */}
          <div className="crt-brand-emblem">
            <span className="crt-brand-dot" />
            <span>KV-1984</span>
          </div>

          {/* Section 1: Power Button & Indicator LED */}
          <div className="crt-panel-section">
            <div className="crt-indicator-row">
              <div
                className={`crt-led ${powerState === 'on' ? 'led-on' : 'led-standby'}`}
                title={`Status: ${powerState === 'on' ? 'POWER ON' : 'STANDBY'}`}
              />
              <span className="crt-led-label">POWER</span>
            </div>

            <button
              type="button"
              className={`crt-tv-power-btn ${powerState === 'on' ? 'depressed' : ''}`}
              onClick={() => {
                soundEngine.playClick(320);
                onTogglePower();
              }}
              title="Physical TV Power Switch"
              aria-label="Physical TV Power Button"
            >
              <PowerIcon size={13} color={powerState === 'on' ? '#00ff88' : '#e63946'} />
              <span>POWER</span>
            </button>
          </div>

          {/* Section 2: Channel Controls (CH+ / CH-) */}
          <div className="crt-panel-section">
            <div className="crt-panel-section-label">
              <span>CH SELECT</span>
              <span className="crt-channel-badge-mini">0{activeChannel}</span>
            </div>
            <div className="crt-channel-rocker">
              <button
                type="button"
                className="crt-hardware-btn"
                onClick={() => {
                  soundEngine.playChannelSwitch();
                  onChannelNext();
                }}
                title="Channel Up (CH+)"
                aria-label="Channel Up"
              >
                ▲ CH+
              </button>
              <button
                type="button"
                className="crt-hardware-btn"
                onClick={() => {
                  soundEngine.playChannelSwitch();
                  onChannelPrev();
                }}
                title="Channel Down (CH-)"
                aria-label="Channel Down"
              >
                ▼ CH-
              </button>
            </div>
          </div>

          {/* Section 3: Analog Volume / Tune Rotary Knob */}
          <div className="crt-panel-section">
            <span className="crt-knob-label">VOL / TUNE</span>
            <div
              ref={knobRef}
              className="crt-rotary-knob"
              style={{
                transform: `rotate(${knobAngle}deg)`
              }}
              onWheel={handleKnobWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              title={`Analog Volume: ${Math.round(volume * 100)}% (Drag up/down or scroll wheel)`}
              aria-label="Analog Volume and Tuning Knob"
              role="slider"
              aria-valuenow={Math.round(volume * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <div className="crt-knob-readout">
              {Math.round(volume * 100)}%
            </div>
          </div>

          {/* Section 4: Mute & Radio Physical Buttons */}
          <div className="crt-panel-section crt-button-row">
            {/* Mute Button with Indicator */}
            <div className="crt-btn-with-led">
              <button
                type="button"
                className={`crt-hardware-btn crt-btn-square ${isMuted ? 'active-mute' : ''}`}
                onClick={() => {
                  soundEngine.playClick(520);
                  onToggleMute();
                }}
                title={isMuted ? 'Unmute Audio' : 'Mute Master Audio'}
                aria-label="Mute Audio"
              >
                {isMuted ? <VolumeMuteIcon size={12} color="#ff4d4d" /> : <VolumeUpIcon size={12} />}
                <span>MUTE</span>
              </button>
              <div
                className={`crt-subtle-indicator ${isMuted ? 'active' : ''}`}
                title={isMuted ? 'Muted' : 'Audio Active'}
              />
            </div>

            {/* Radio Button */}
            <button
              type="button"
              className={`crt-hardware-btn crt-btn-square ${activeChannel === 3 ? 'active-radio' : ''}`}
              onClick={() => {
                soundEngine.playChannelSwitch();
                onChannelChange(3);
              }}
              title="Tune to Channel 03: Retro FM Radio"
              aria-label="Retro FM Radio"
            >
              <RadioIcon size={12} color={activeChannel === 3 ? '#ff2a6d' : 'currentColor'} />
              <span>RADIO</span>
            </button>
          </div>

          {/* Acoustic Speaker Slits */}
          <div className="crt-speaker-grille" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="crt-speaker-slit" />
            ))}
          </div>

          {/* Bottom Service Calibration Toggle */}
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

        {/* Realistic base feet / stand */}
        <div className="crt-stand" aria-hidden="true">
          <div className="crt-foot" />
          <div className="crt-foot" />
        </div>
      </div>
    </div>
  );
};
