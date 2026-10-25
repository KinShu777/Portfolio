import React, { useState } from 'react';
import type { ChannelId } from '../../types';
import { BroadcastHeader } from '../Portfolio/BroadcastHeader';
import { soundEngine } from '../../audio/soundEngine';
import { CrtBackground } from '../../shaders/crt/CrtBackground';
import '../../shaders/crt/styles.css';
import type { CrtVariant } from '../../shaders/crt/crtScreens';

interface TestPatternChannelProps {
  onChannelChange: (ch: ChannelId) => void;
}

type DisplayMode = 'smpte' | CrtVariant;

export const TestPatternChannel: React.FC<TestPatternChannelProps> = ({ onChannelChange }) => {
  const [mode, setMode] = useState<DisplayMode>('terminal');
  const [speed, setSpeed] = useState<number>(1);
  const [motion, setMotion] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(1);

  const handleSelectMode = (newMode: DisplayMode) => {
    soundEngine.playClick(520);
    setMode(newMode);
  };

  return (
    <div className="crt-scroll-container" tabIndex={0} aria-label="Test Pattern & CRT Shader Channel">
      <BroadcastHeader
        activeChannel={4}
        onChannelChange={onChannelChange}
      />

      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        maxWidth: '820px',
        margin: '0 auto'
      }}>
        {/* Title and selector bar */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '1rem',
          borderBottom: '1px solid rgba(57, 255, 180, 0.3)',
          paddingBottom: '0.8rem'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.72rem',
              color: '#39ffb4',
              letterSpacing: '0.12em'
            }}>
              CALIBRATION LAB // CH 04 // WEBGL CRT COMPOSITE
            </div>
            <h1 style={{
              fontFamily: 'var(--font-osd)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 0 10px rgba(57, 255, 180, 0.5)'
            }}>
              CRT TUBE ENGINE & TEST LAB
            </h1>
          </div>

          <button
            onClick={() => {
              soundEngine.playChannelSwitch();
              onChannelChange(1);
            }}
            style={{
              backgroundColor: '#161922',
              color: '#39ffb4',
              border: '1px solid rgba(0, 255, 170, 0.3)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            ◀ RETURN TO CH 01
          </button>
        </div>

        {/* Variant selection tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '1.2rem',
          justifyContent: 'center',
          width: '100%'
        }}>
          {[
            { id: 'terminal' as const, label: 'ZION TERMINAL' },
            { id: 'cinematic' as const, label: 'FILM LEADER' },
            { id: 'blue-screen' as const, label: 'BLUE FAULT' },
            { id: 'nintendo' as const, label: '8-BIT CONSOLE' },
            { id: 'smpte' as const, label: 'SMPTE BARS' }
          ].map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectMode(tab.id)}
                style={{
                  backgroundColor: active ? '#00e575' : '#141824',
                  color: active ? '#000000' : '#8fa0be',
                  border: active ? '1px solid #00e575' : '1px solid #293249',
                  borderRadius: '4px',
                  padding: '7px 14px',
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.75rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  boxShadow: active ? '0 0 10px rgba(0, 229, 117, 0.4)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {active ? '● ' : ''}{tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Screen Frame */}
        <div style={{
          width: 'min(94%, 640px)',
          aspectRatio: '4/3',
          border: '3px solid #232a3b',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#05070c',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(0, 0, 0, 0.8)'
        }}>
          {mode === 'smpte' ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              {/* Top 7 Color Bars */}
              <div style={{ display: 'flex', height: '67%' }}>
                {['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'].map((color, i) => (
                  <div key={i} style={{ flex: 1, backgroundColor: color }} />
                ))}
              </div>
              {/* Middle Cast Bars */}
              <div style={{ display: 'flex', height: '8%' }}>
                {['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'].map((color, i) => (
                  <div key={i} style={{ flex: 1, backgroundColor: color }} />
                ))}
              </div>
              {/* Bottom Alignment & I/Q signals */}
              <div style={{ display: 'flex', height: '25%' }}>
                <div style={{ flex: 1.25, backgroundColor: '#00214c' }} />
                <div style={{ flex: 1.25, backgroundColor: '#ffffff' }} />
                <div style={{ flex: 1.25, backgroundColor: '#32006a' }} />
                <div style={{ flex: 1.25, backgroundColor: '#131313' }} />
                <div style={{ flex: 0.5, backgroundColor: '#090909' }} />
                <div style={{ flex: 0.5, backgroundColor: '#131313' }} />
                <div style={{ flex: 0.5, backgroundColor: '#1d1d1d' }} />
                <div style={{ flex: 1.25, backgroundColor: '#131313' }} />
              </div>
            </div>
          ) : (
            <CrtBackground
              variant={mode}
              speed={speed}
              motion={motion}
              brightness={brightness}
            />
          )}
        </div>

        {/* Live CRT Controls Bar */}
        {mode !== 'smpte' && (
          <div style={{
            marginTop: '1rem',
            width: 'min(94%, 640px)',
            backgroundColor: '#0b0f19',
            border: '1px solid #1f2738',
            borderRadius: '6px',
            padding: '10px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.72rem',
            color: '#8fa0be'
          }}>
            {/* Speed toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>SPEED:</span>
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  style={{
                    backgroundColor: speed === s ? '#00e575' : '#161c29',
                    color: speed === s ? '#000000' : '#ffffff',
                    border: '1px solid #2b354c',
                    borderRadius: '3px',
                    padding: '3px 8px',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Motion toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>MOTION:</span>
              <button
                onClick={() => setMotion(motion ? 0 : 1)}
                style={{
                  backgroundColor: motion ? '#39ffb4' : '#161c29',
                  color: motion ? '#000000' : '#888888',
                  border: '1px solid #2b354c',
                  borderRadius: '3px',
                  padding: '3px 10px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {motion ? 'ACTIVE' : 'FROZEN'}
              </button>
            </div>

            {/* Brightness slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>BEAM GAIN:</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                style={{ width: '80px', accentColor: '#00e575' }}
              />
            </div>
          </div>
        )}

        {/* Telemetry info callout */}
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontFamily: 'var(--font-telemetry)',
          color: '#39ffb4',
          fontSize: '0.75rem',
          lineHeight: 1.5
        }}>
          <div>RAW WEBGL CRT COMPOSITE // CURVED APERTURE-GRILLE & HALATION TUBE</div>
          <div style={{ color: '#7a8ba8', fontSize: '0.68rem', marginTop: '2px' }}>
            Curvature, Scanlines, Chromatic Aberration, Phosphor Bloom & Phosphor Grain
          </div>
        </div>
      </div>
    </div>
  );
};
