import React from 'react';
import type { PowerState, ChannelId, CRTIntensity, PhosphorTheme, PhosphorBloom } from '../../types';
import { CRTStartupSequence } from './CRTStartupSequence';
import { NoiseOverlay } from '../UI/NoiseOverlay';

interface CRTScreenProps {
  powerState: PowerState;
  activeChannel: ChannelId;
  crtIntensity: CRTIntensity;
  phosphorTheme: PhosphorTheme;
  bloom: PhosphorBloom;
  isDegaussing: boolean;
  onStartupComplete: () => void;
  onPowerClick: () => void;
  children: React.ReactNode;
}

export const CRTScreen: React.FC<CRTScreenProps> = ({
  powerState,
  crtIntensity,
  phosphorTheme,
  bloom,
  isDegaussing,
  onStartupComplete,
  onPowerClick,
  children
}) => {
  // Theme color styling
  const getPhosphorFilter = () => {
    switch (phosphorTheme) {
      case 'green':
        return 'hue-rotate(85deg) saturate(1.4)';
      case 'amber':
        return 'sepia(1) saturate(3) hue-rotate(5deg)';
      case 'cyan':
        return 'hue-rotate(150deg) saturate(1.2)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className={`crt-screen-bezel ${isDegaussing ? 'crt-chromatic-flash' : ''}`}
      style={{
        transform: isDegaussing ? 'scale(0.985) rotate(-0.5deg)' : 'none',
        transition: 'transform 0.25s ease'
      }}
    >
      <div className={`crt-screen-glass crt-intensity-${crtIntensity}`}>
        {/* Curvature & ambient room reflections */}
        <div className="crt-glass-overlay" aria-hidden="true" />

        {/* Subtle aged CRT glass imperfections (periphery hairline scratches, micro-dust) */}
        <svg
          className="crt-aged-glass-overlay"
          viewBox="0 0 1000 750"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Top-left corner micro hairline scratch */}
          <path d="M 35,45 Q 65,38 95,58" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" fill="none" />
          <path d="M 28,60 Q 42,75 52,98" stroke="rgba(255,255,255,0.11)" strokeWidth="0.5" fill="none" />

          {/* Top-right corner hairline */}
          <path d="M 940,42 Q 960,60 972,85" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" fill="none" />
          <path d="M 915,35 Q 945,32 965,48" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" fill="none" />

          {/* Bottom-left corner bezel stress hairline */}
          <path d="M 32,710 Q 55,690 78,715" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" fill="none" />
          <path d="M 45,725 Q 70,720 90,732" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" fill="none" />

          {/* Bottom-right corner subtle hairline */}
          <path d="M 950,710 Q 968,685 978,665" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" fill="none" />
          <path d="M 920,728 Q 942,718 962,724" stroke="rgba(255,255,255,0.11)" strokeWidth="0.5" fill="none" />

          {/* Extremely sparse microscopic dust particles along top and bottom edges (center remains completely clean) */}
          <circle cx="85" cy="30" r="0.8" fill="rgba(255,255,255,0.18)" />
          <circle cx="160" cy="22" r="0.6" fill="rgba(255,255,255,0.14)" />
          <circle cx="840" cy="25" r="0.7" fill="rgba(255,255,255,0.16)" />
          <circle cx="915" cy="70" r="0.6" fill="rgba(255,255,255,0.15)" />
          <circle cx="70" cy="680" r="0.7" fill="rgba(255,255,255,0.15)" />
          <circle cx="120" cy="728" r="0.8" fill="rgba(255,255,255,0.16)" />
          <circle cx="880" cy="725" r="0.6" fill="rgba(255,255,255,0.14)" />
          <circle cx="935" cy="690" r="0.7" fill="rgba(255,255,255,0.18)" />
        </svg>

        {/* Scanlines layer */}
        {crtIntensity !== 'off' && (
          <div className="crt-scanlines" aria-hidden="true" />
        )}

        {/* Background ambient phosphor noise */}
        {powerState === 'on' && crtIntensity === 'high' && (
          <NoiseOverlay opacity={0.04} />
        )}

        {/* SCREEN STATES */}
        {powerState === 'off' && (
          <div
            className="crt-screen-off"
            onClick={onPowerClick}
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div className="crt-power-prompt">
              PRESS THE POWER BUTTON
            </div>
            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.25)',
              letterSpacing: '0.12em',
              marginTop: '0.8rem'
            }}>
              [USE TV HARDWARE PANEL OR CLICK SCREEN]
            </div>
          </div>
        )}

        {powerState === 'powering-on' && (
          <CRTStartupSequence onComplete={onStartupComplete} />
        )}

        {powerState === 'on' && (
          <div
            className={`crt-screen-curved crt-phosphor-glow-${crtIntensity} crt-bloom-${bloom}`}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              filter: getPhosphorFilter(),
              animation: crtIntensity === 'high' ? 'crt-flicker 0.12s infinite' : 'none'
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
