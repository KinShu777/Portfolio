import React from 'react';
import type { CRTIntensity, PhosphorTheme, PhosphorBloom } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface CRTControlsPanelProps {
  intensity: CRTIntensity;
  onIntensityChange: (level: CRTIntensity) => void;
  phosphorTheme: PhosphorTheme;
  onPhosphorChange: (theme: PhosphorTheme) => void;
  bloom: PhosphorBloom;
  onBloomChange: (bloom: PhosphorBloom) => void;
  onDegauss: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const CRTControlsPanel: React.FC<CRTControlsPanelProps> = ({
  intensity,
  onIntensityChange,
  phosphorTheme,
  onPhosphorChange,
  bloom,
  onBloomChange,
  onDegauss,
  isOpen,
  onToggle
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => {
          soundEngine.playClick(500);
          onToggle();
        }}
        className="crt-tv-power-btn"
        style={{
          width: 'auto',
          padding: '4px 8px',
          fontSize: '0.58rem',
          letterSpacing: '0.08em',
          background: isOpen ? '#2b2d38' : undefined
        }}
        title="CRT Display Calibration Panel"
      >
        CRT ADJ
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          right: '0',
          width: '210px',
          backgroundColor: '#161820',
          border: '1px solid #363948',
          borderRadius: '8px',
          boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.8), 0 12px 24px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          padding: '12px',
          zIndex: 90,
          fontFamily: 'var(--font-telemetry)',
          fontSize: '0.7rem',
          color: '#c5cad6'
        }}>
          <div style={{
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            color: '#00ffaa',
            marginBottom: '8px',
            borderBottom: '1px solid #282a36',
            paddingBottom: '4px',
            fontWeight: 700
          }}>
            CATHODE RAY CALIBRATION
          </div>

          {/* Intensity selector */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.62rem', color: '#888ea0', marginBottom: '4px' }}>
              CRT EFFECT INTENSITY:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {(['off', 'low', 'medium', 'high'] as CRTIntensity[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    soundEngine.playClick(650);
                    onIntensityChange(lvl);
                  }}
                  style={{
                    backgroundColor: intensity === lvl ? '#00e575' : '#222530',
                    color: intensity === lvl ? '#0a0d14' : '#a0a6b5',
                    border: '1px solid #3a3e4e',
                    borderRadius: '4px',
                    padding: '3px 0',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Phosphor theme */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.62rem', color: '#888ea0', marginBottom: '4px' }}>
              PHOSPHOR COATING:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {(['color', 'green', 'amber', 'cyan'] as PhosphorTheme[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    soundEngine.playClick(600);
                    onPhosphorChange(p);
                  }}
                  style={{
                    backgroundColor: phosphorTheme === p ? '#2b2e3c' : '#1c1e27',
                    color: p === 'green' ? '#39ff14' : p === 'amber' ? '#ffb703' : p === 'cyan' ? '#00f0ff' : '#ffffff',
                    border: phosphorTheme === p ? '1px solid #00ffaa' : '1px solid #2d3140',
                    borderRadius: '4px',
                    padding: '3px 0',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Phosphor Glow / Bloom selector */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '0.62rem', color: '#888ea0', marginBottom: '4px' }}>
              PHOSPHOR GLOW / BLOOM:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
              {(['low', 'medium', 'high'] as PhosphorBloom[]).map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    soundEngine.playClick(620);
                    onBloomChange(b);
                  }}
                  style={{
                    backgroundColor: bloom === b ? '#00e575' : '#222530',
                    color: bloom === b ? '#0a0d14' : '#a0a6b5',
                    border: '1px solid #3a3e4e',
                    borderRadius: '4px',
                    padding: '3px 0',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Degauss Button */}
          <button
            onClick={() => {
              soundEngine.playClick(300);
              onDegauss();
            }}
            style={{
              width: '100%',
              backgroundColor: '#303444',
              color: '#00ffcc',
              border: '1px solid #4a5068',
              borderRadius: '4px',
              padding: '6px',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            ⚡ DEGAUSS COIL
          </button>
        </div>
      )}
    </div>
  );
};
