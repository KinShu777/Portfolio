import React, { useState } from 'react';
import type { PowerState, CRTIntensity, PhosphorTheme } from '../../types';
import { PowerIcon } from '../UI/RetroIcons';
import { CRTControlsPanel } from './CRTControlsPanel';
import { soundEngine } from '../../audio/soundEngine';

interface CRTFrameProps {
  powerState: PowerState;
  onTogglePower: () => void;
  onChannelNext: () => void;
  onVolumeRotate: () => void;
  crtIntensity: CRTIntensity;
  onIntensityChange: (lvl: CRTIntensity) => void;
  phosphorTheme: PhosphorTheme;
  onPhosphorChange: (theme: PhosphorTheme) => void;
  onDegauss: () => void;
  children: React.ReactNode;
}

export const CRTFrame: React.FC<CRTFrameProps> = ({
  powerState,
  onTogglePower,
  onChannelNext,
  onVolumeRotate,
  crtIntensity,
  onIntensityChange,
  phosphorTheme,
  onPhosphorChange,
  onDegauss,
  children
}) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);

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

        {/* Hardware side panel */}
        <aside className="crt-hardware-panel" aria-label="Physical Television Controls">
          {/* Brand plate */}
          <div className="crt-brand-emblem">
            <span className="crt-brand-dot" />
            <span>KV-1984</span>
          </div>

          {/* Dual Rotary Knobs */}
          <div className="crt-knob-cluster">
            <div className="crt-rotary-knob-wrap">
              <span className="crt-knob-label">CH SELECT</span>
              <button
                type="button"
                className="crt-rotary-knob"
                onClick={() => {
                  soundEngine.playChannelSwitch();
                  onChannelNext();
                }}
                title="Rotate Channel Selector"
                aria-label="Rotate Channel Knob"
              />
            </div>

            <div className="crt-rotary-knob-wrap">
              <span className="crt-knob-label">VOL / TUNE</span>
              <button
                type="button"
                className="crt-rotary-knob"
                onClick={() => {
                  soundEngine.playRadioTuning();
                  onVolumeRotate();
                }}
                title="Rotate Volume & Fine Tuning"
                aria-label="Rotate Volume Tuning Knob"
              />
            </div>
          </div>

          {/* Speaker acoustic slits */}
          <div className="crt-speaker-grille" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="crt-speaker-slit" />
            ))}
          </div>

          {/* Bottom cluster: Indicator LED & Physical Power switch */}
          <div className="crt-bottom-cluster">
            {/* Service Controls Toggle */}
            <CRTControlsPanel
              intensity={crtIntensity}
              onIntensityChange={onIntensityChange}
              phosphorTheme={phosphorTheme}
              onPhosphorChange={onPhosphorChange}
              onDegauss={onDegauss}
              isOpen={isServiceOpen}
              onToggle={() => setIsServiceOpen(!isServiceOpen)}
            />

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
              <PowerIcon size={12} color={powerState === 'on' ? '#00ff88' : '#e63946'} />
              <span>PWR</span>
            </button>
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
