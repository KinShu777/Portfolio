import React, { useState } from 'react';
import { portfolioData } from '../../config/portfolioData';
import { GitHubIcon, LinkedInIcon } from '../UI/RetroIcons';
import { soundEngine } from '../../audio/soundEngine';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundEngine.playClick(800);
    navigator.clipboard?.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="sec-contact" style={{ padding: '2.5rem 1.5rem', marginBottom: '2rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.4rem' }}>
        <span style={{
          fontFamily: 'var(--font-badge)',
          fontSize: '0.65rem',
          color: '#000000',
          backgroundColor: '#00ffaa',
          padding: '3px 6px',
          borderRadius: '2px'
        }}>
          06
        </span>
        <h2 style={{
          fontFamily: 'var(--font-osd)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          BROADCAST UPLINK // CONTACT & SOCIALS
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Transmission Station Details */}
        <div style={{
          backgroundColor: '#050f0c',
          border: '1px solid rgba(0, 255, 170, 0.3)',
          borderRadius: '8px',
          padding: '1.3rem'
        }}>
          <div style={{
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.72rem',
            color: '#39ffb4',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(0, 255, 170, 0.2)',
            paddingBottom: '0.4rem'
          }}>
            DIRECT TRANSMISSION CHANNELS
          </div>

          <p style={{
            fontSize: '0.9rem',
            color: '#c2cbd6',
            lineHeight: 1.6,
            marginBottom: '1.2rem'
          }}>
            Open for software engineering opportunities, creative technical collaborations, and distributed systems discussions.
          </p>

          {/* Email Card with Copy Button */}
          <div style={{
            backgroundColor: '#091813',
            border: '1px solid #14382a',
            borderRadius: '6px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#567064', fontFamily: 'var(--font-telemetry)' }}>
                EMAIL ADDRESS:
              </div>
              <div style={{
                fontFamily: 'var(--font-telemetry)',
                fontSize: '0.85rem',
                color: '#ffffff',
                fontWeight: 600
              }}>
                {portfolioData.contact.email}
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              style={{
                backgroundColor: copied ? '#00e575' : '#183628',
                color: copied ? '#06120b' : '#39ffb4',
                border: '1px solid #00ffaa',
                borderRadius: '4px',
                padding: '6px 12px',
                fontFamily: 'var(--font-telemetry)',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>

          {/* Security Telemetry */}
          <div style={{
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.68rem',
            color: '#5d6878'
          }}>
            PGP FINGERPRINT: <span style={{ color: '#00ffaa' }}>{portfolioData.contact.pgpKeyFingerprint}</span>
          </div>
        </div>

        {/* Social Links & Archives */}
        <div style={{
          backgroundColor: '#050f0c',
          border: '1px solid rgba(0, 255, 170, 0.3)',
          borderRadius: '8px',
          padding: '1.3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.72rem',
              color: '#39ffb4',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(0, 255, 170, 0.2)',
              paddingBottom: '0.4rem'
            }}>
              EXTERNAL UPLINKS & CODE REPOSITORIES
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick(750)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#0b161c',
                  border: '1px solid #1b3240',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.82rem',
                  transition: 'background-color 0.2s'
                }}
              >
                <GitHubIcon size={18} color="#00e575" />
                <span>GITHUB // {portfolioData.contact.github}</span>
              </a>

              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick(750)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#0b161c',
                  border: '1px solid #1b3240',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.82rem',
                  transition: 'background-color 0.2s'
                }}
              >
                <LinkedInIcon size={18} color="#00e575" />
                <span>LINKEDIN // {portfolioData.contact.linkedin}</span>
              </a>
            </div>
          </div>

          {/* Broadcast transmission footer stamp */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px dashed rgba(0, 255, 170, 0.15)',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.65rem',
            color: '#607068',
            textAlign: 'center'
          }}>
            END OF CARRIER TRANSMISSION // 1984—2026 // ALL SIGNALS PRESERVED
          </div>
        </div>
      </div>
    </section>
  );
};
