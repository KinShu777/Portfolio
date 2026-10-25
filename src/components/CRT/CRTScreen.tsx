import React from 'react';
import type { PowerState, ChannelId, CRTIntensity, PhosphorTheme } from '../../types';
import { CRTStartupSequence } from './CRTStartupSequence';
import { NoiseOverlay } from '../UI/NoiseOverlay';

interface CRTScreenProps {
  powerState: PowerState;
  activeChannel: ChannelId;
  crtIntensity: CRTIntensity;
  phosphorTheme: PhosphorTheme;
  isDegaussing: boolean;
  onStartupComplete: () => void;
  onPowerClick: () => void;
  children: React.ReactNode;
}

export const CRTScreen: React.FC<CRTScreenProps> = ({
  powerState,
  crtIntensity,
  phosphorTheme,
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
              [USE REMOTE CONTROL OR TV PANEL]
            </div>
          </div>
        )}

        {powerState === 'powering-on' && (
          <CRTStartupSequence onComplete={onStartupComplete} />
        )}

        {powerState === 'on' && (
          <div
            className={`crt-screen-curved crt-phosphor-glow-${crtIntensity}`}
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
