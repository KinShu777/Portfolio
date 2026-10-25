import React, { useState, useEffect } from 'react';
import { NoiseOverlay } from '../UI/NoiseOverlay';

interface CRTStartupSequenceProps {
  onComplete: () => void;
  viewerCallsign?: string;
}

export const CRTStartupSequence: React.FC<CRTStartupSequenceProps> = ({
  onComplete,
  viewerCallsign = "GALLERY OF AVINASH"
}) => {
  // Stages:
  // 0: Initial black screen (300ms)
  // 1: Center horizontal phosphor beam (600ms)
  // 2: Vertical raster expansion (500ms)
  // 3: Static burst + flicker + chromatic glitch (600ms)
  // 4: Screen stabilizing (400ms)
  // 5: Welcome broadcast transmission text (1400ms)
  // 6: Transition complete -> onComplete()
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const timers: number[] = [];

    // Stage 1: Horizontal beam after brief black
    timers.push(setTimeout(() => setStage(1), 320));

    // Stage 2: Vertical raster expansion
    timers.push(setTimeout(() => setStage(2), 850));

    // Stage 3: Static & chromatic distortion
    timers.push(setTimeout(() => setStage(3), 1350));

    // Stage 4: Raster stabilization
    timers.push(setTimeout(() => setStage(4), 1950));

    // Stage 5: Welcome message
    timers.push(setTimeout(() => setStage(5), 2350));

    // Stage 6: Complete
    timers.push(setTimeout(() => {
      onComplete();
    }, 4200));

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <div className={`crt-startup-container ${stage === 3 ? 'crt-chromatic-flash' : ''}`} style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: '#040608',
      zIndex: 40,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Stage 1 & 2: Expanding phosphor cathode beam */}
      {(stage === 1 || stage === 2) && (
        <div
          className="crt-beam-line"
          style={{
            height: stage === 2 ? '100%' : '3px',
            transition: 'height 0.45s cubic-bezier(0.1, 0.9, 0.2, 1)'
          }}
        />
      )}

      {/* Stage 3: Intense static burst */}
      {stage === 3 && (
        <NoiseOverlay burst={true} />
      )}

      {/* Stage 5: Broadcast welcome screen */}
      {stage >= 5 && (
        <div className="crt-welcome-screen">
          <div style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#39ffb4',
            letterSpacing: '0.25em',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-osd)'
          }}>
            SIGNAL ACQUIRED
          </div>
          <div style={{
            fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
            color: '#a0aec0',
            letterSpacing: '0.15em',
            marginBottom: '1rem',
            fontFamily: 'var(--font-telemetry)'
          }}>
            CHANNEL 01 // FREQ: 471.25 MHz
          </div>
          <div style={{
            width: '180px',
            height: '2px',
            backgroundColor: '#00e575',
            boxShadow: '0 0 8px #00e575',
            margin: '0.5rem auto 1.2rem'
          }} />
          <div style={{
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: '#ffffff',
            letterSpacing: '0.12em',
            fontWeight: 700,
            textShadow: '0 0 12px rgba(0, 229, 117, 0.7)'
          }}>
            {viewerCallsign}
          </div>
          <div style={{
            marginTop: '1.2rem',
            fontSize: '0.9rem',
            color: '#718096',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-telemetry)'
          }}>
            INITIALIZING PORTFOLIO TRANSMISSION...
          </div>
        </div>
      )}

      {/* Skip button for accessibility */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          zIndex: 60,
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(0, 255, 170, 0.4)',
          color: '#39ffb4',
          fontFamily: 'var(--font-telemetry)',
          fontSize: '0.7rem',
          padding: '4px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          letterSpacing: '0.05em'
        }}
      >
        SKIP INTRO [ESC]
      </button>
    </div>
  );
};
