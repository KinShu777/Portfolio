import React, { useState } from 'react';
import type { PowerState } from '../../types';
import { VolumeUpIcon, VolumeMuteIcon, PowerIcon } from './RetroIcons';
import { soundEngine } from '../../audio/soundEngine';

interface QuickControlsProps {
  powerState: PowerState;
  isMuted: boolean;
  onTogglePower: () => void;
  onToggleMute: () => void;
  onToggleRemote: () => void;
  isRemoteVisible: boolean;
}

export const QuickControls: React.FC<QuickControlsProps> = ({
  powerState,
  isMuted,
  onTogglePower,
  onToggleMute,
  onToggleRemote,
  isRemoteVisible
}) => {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <>
      <nav
        aria-label="Quick Access Controls"
        style={{
          position: 'fixed',
          top: '12px',
          right: '16px',
          zIndex: 70,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(12, 14, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '6px 10px',
          borderRadius: '20px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Power Toggle */}
        <button
          onClick={() => {
            soundEngine.playClick(350);
            onTogglePower();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: powerState === 'on' ? '#00ff88' : '#e63946',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-telemetry)'
          }}
          title={powerState === 'on' ? 'Power TV Off' : 'Power TV On'}
        >
          <PowerIcon size={14} />
          <span>{powerState === 'on' ? 'TV ON' : 'TV OFF'}</span>
        </button>

        <span style={{ color: '#333745' }}>|</span>

        {/* Master Mute */}
        <button
          onClick={() => {
            soundEngine.playClick(500);
            onToggleMute();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: isMuted ? '#ff4d4d' : '#cbd5e1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-telemetry)'
          }}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeMuteIcon size={14} /> : <VolumeUpIcon size={14} />}
          <span>{isMuted ? 'MUTED' : 'AUDIO'}</span>
        </button>

        <span style={{ color: '#333745' }}>|</span>

        {/* Remote Toggle */}
        <button
          onClick={() => {
            soundEngine.playClick(600);
            onToggleRemote();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: isRemoteVisible ? '#00ff88' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-telemetry)'
          }}
          title="Toggle Physical Remote Control"
        >
          REMOTE
        </button>

        <span style={{ color: '#333745' }}>|</span>

        {/* Keyboard Shortcuts Button */}
        <button
          onClick={() => {
            soundEngine.playClick(700);
            setShowShortcuts(!showShortcuts);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffb703',
            cursor: 'pointer',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-telemetry)'
          }}
          title="Keyboard Navigation Shortcuts"
        >
          KEYS [?]
        </button>
      </nav>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#12151e',
            border: '1px solid #00ffaa',
            borderRadius: '10px',
            padding: '1.5rem',
            maxWidth: '420px',
            width: '100%',
            fontFamily: 'var(--font-telemetry)',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.9)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #282d3e',
              paddingBottom: '0.6rem',
              marginBottom: '1rem',
              color: '#00ffaa',
              fontWeight: 700
            }}>
              <span>KEYBOARD TELEMETRY BINDINGS</span>
              <button
                onClick={() => setShowShortcuts(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#cbd5e1'
            }}>
              <kbd style={{ backgroundColor: '#1e2433', padding: '2px 6px', borderRadius: '4px', textAlign: 'center', color: '#00ffaa' }}>P</kbd>
              <span>Toggle TV Power On / Off</span>

              <kbd style={{ backgroundColor: '#1e2433', padding: '2px 6px', borderRadius: '4px', textAlign: 'center', color: '#00ffaa' }}>M</kbd>
              <span>Toggle Master Audio Mute</span>

              <kbd style={{ backgroundColor: '#1e2433', padding: '2px 6px', borderRadius: '4px', textAlign: 'center', color: '#00ffaa' }}>1 — 4</kbd>
              <span>Switch Channels (1: Portfolio, 2: Archive, 3: Radio, 4: Test)</span>

              <kbd style={{ backgroundColor: '#1e2433', padding: '2px 6px', borderRadius: '4px', textAlign: 'center', color: '#00ffaa' }}>+ / -</kbd>
              <span>Adjust Master Volume</span>

              <kbd style={{ backgroundColor: '#1e2433', padding: '2px 6px', borderRadius: '4px', textAlign: 'center', color: '#00ffaa' }}>R</kbd>
              <span>Toggle Physical Remote Control</span>

              <kbd style={{ backgroundColor: '#1e2433', padding: '2px 6px', borderRadius: '4px', textAlign: 'center', color: '#00ffaa' }}>SPACE</kbd>
              <span>Toggle Radio Play / Pause</span>
            </div>

            <div style={{
              marginTop: '1.2rem',
              textAlign: 'center',
              fontSize: '0.72rem',
              color: '#64748b'
            }}>
              PRESS [ESC] OR CLICK OUTSIDE TO CLOSE
            </div>
          </div>
        </div>
      )}
    </>
  );
};
