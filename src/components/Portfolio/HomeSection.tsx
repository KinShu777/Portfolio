import React from 'react';
import { portfolioData } from '../../config/portfolioData';
import { ExternalLinkIcon } from '../UI/RetroIcons';
import { soundEngine } from '../../audio/soundEngine';

interface HomeSectionProps {
  onOpenArchive: () => void;
  onOpenRadio: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onOpenArchive,
  onOpenRadio
}) => {
  return (
    <section id="sec-home" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0, 255, 170, 0.15)' }}>
      {/* Telemetry band */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-telemetry)',
        fontSize: '0.72rem',
        color: '#52b788',
        letterSpacing: '0.08em',
        marginBottom: '1.5rem',
        borderBottom: '1px dashed rgba(0, 255, 170, 0.2)',
        paddingBottom: '0.6rem'
      }}>
        <span>COORDINATES: {portfolioData.transmissionCoordinates}</span>
        <span>STATUS: {portfolioData.signalStatus}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Left Column: Transmission Identity */}
        <div>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(0, 229, 117, 0.12)',
            border: '1px solid #00e575',
            color: '#39ffb4',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            marginBottom: '1rem',
            letterSpacing: '0.1em'
          }}>
            ▶ CARRIER SIGNAL LOCKED // CH 01
          </div>

          <h1 style={{
            fontFamily: 'var(--font-osd)',
            fontSize: 'clamp(2.5rem, 5.5vw, 3.8rem)',
            lineHeight: 1.05,
            letterSpacing: '0.06em',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(0, 255, 170, 0.6)',
            marginBottom: '0.6rem'
          }}>
            {portfolioData.fullName}
          </h1>

          <div style={{
            fontFamily: 'var(--font-telemetry)',
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            color: '#39ffb4',
            letterSpacing: '0.12em',
            marginBottom: '1.2rem',
            fontWeight: 600
          }}>
            {portfolioData.designation}
          </div>

          <p style={{
            color: '#c0c9d6',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.8rem',
            maxWidth: '540px'
          }}>
            {portfolioData.tagline}. Exploring computational craftsmanship, responsive systems, and tangible digital interfaces.
          </p>

          {/* Action Button Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={() => {
                soundEngine.playChannelSwitch();
                onOpenArchive();
              }}
              style={{
                backgroundColor: '#00e575',
                color: '#06120b',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 18px',
                fontFamily: 'var(--font-telemetry)',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 14px rgba(0, 229, 117, 0.4)'
              }}
            >
              <span>EXPLORE PROJECT ARCHIVE</span>
              <ExternalLinkIcon size={14} color="#06120b" />
            </button>

            <button
              onClick={() => {
                soundEngine.playChannelSwitch();
                onOpenRadio();
              }}
              style={{
                backgroundColor: '#1b2230',
                color: '#39ffb4',
                border: '1px solid rgba(0, 255, 170, 0.4)',
                borderRadius: '4px',
                padding: '10px 16px',
                fontFamily: 'var(--font-telemetry)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                letterSpacing: '0.08em'
              }}
            >
              TUNE RETRO RADIO (FM)
            </button>
          </div>
        </div>

        {/* Right Column: Analog Oscilloscope / Portrait Placeholder Card */}
        <div style={{
          background: 'linear-gradient(145deg, #0d1616 0%, #060c0c 100%)',
          border: '1px solid rgba(0, 255, 170, 0.3)',
          borderRadius: '12px',
          padding: '1.2rem',
          boxShadow: 'inset 0 0 20px rgba(0, 255, 170, 0.05)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(0, 255, 170, 0.15)',
            paddingBottom: '0.5rem',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.68rem',
            color: '#39ffb4'
          }}>
            <span>TRANSMISSION FEED // VIDEO CARRIER</span>
            <span>OSD-CAM 01</span>
          </div>

          {/* Profile Photo / Transmission Feed */}
          <div style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 255, 170, 0.4)',
            backgroundColor: '#050d0a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src="/assets/avatar.jpg"
              alt="Avinash - Operator Profile"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                filter: 'contrast(1.08) brightness(0.95)'
              }}
            />
            {/* OSD CRT overlay markings */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.62rem',
              color: '#00ffaa',
              backgroundColor: 'rgba(5, 15, 10, 0.75)',
              padding: '2px 6px',
              borderRadius: '2px',
              backdropFilter: 'blur(2px)',
              zIndex: 2
            }}>
              LIVE FEED // OP-01
            </div>
            {/* Scanline sub-overlay on photo */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0, 0, 0, 0.22) 2px, rgba(0, 0, 0, 0.22) 4px)',
              pointerEvents: 'none',
              zIndex: 1
            }} />
          </div>

          {/* Quick Specs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginTop: '1rem',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.68rem'
          }}>
            <div style={{ background: '#0a1613', padding: '6px 8px', borderRadius: '4px', border: '1px solid #143026' }}>
              <span style={{ color: '#566e66' }}>CARRIER:</span> <span style={{ color: '#00ffaa' }}>471.25 MHz</span>
            </div>
            <div style={{ background: '#0a1613', padding: '6px 8px', borderRadius: '4px', border: '1px solid #143026' }}>
              <span style={{ color: '#566e66' }}>SYNC:</span> <span style={{ color: '#00ffaa' }}>HORIZONTAL LOCK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
