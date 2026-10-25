import React from 'react';
import { portfolioData } from '../../config/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sec-about" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0, 255, 170, 0.15)' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
        <span style={{
          fontFamily: 'var(--font-badge)',
          fontSize: '0.65rem',
          color: '#000000',
          backgroundColor: '#00ffaa',
          padding: '3px 6px',
          borderRadius: '2px'
        }}>
          01
        </span>
        <h2 style={{
          fontFamily: 'var(--font-osd)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          OPERATOR DOSSIER // ABOUT ME
        </h2>
      </div>

      <div
        className="crt-section-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Terminal Log Console */}
        <div style={{
          backgroundColor: '#040d0a',
          border: '1px solid rgba(0, 255, 170, 0.35)',
          borderRadius: '8px',
          padding: '1.2rem',
          boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.8)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(0, 255, 170, 0.2)',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.7rem',
            color: '#39ffb4'
          }}>
            <span>TRANSCRIPT_LOG.TXT</span>
            <span>UTF-8 // 2400 BAUD</span>
          </div>

          <div style={{
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            color: '#bbf7d0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem'
          }}>
            {portfolioData.about.terminalBio.map((line, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {line}
              </p>
            ))}
          </div>

          {/* Mission Quote */}
          <div style={{
            marginTop: '1.2rem',
            padding: '10px 14px',
            backgroundColor: 'rgba(0, 229, 117, 0.08)',
            borderLeft: '3px solid #00ffaa',
            fontFamily: 'var(--font-body)',
            fontSize: '0.86rem',
            color: '#e2e8f0',
            fontStyle: 'italic'
          }}>
            "{portfolioData.about.missionStatement}"
          </div>
        </div>

        {/* Hardware & System Specifications Table */}
        <div style={{
          backgroundColor: '#071012',
          border: '1px solid rgba(0, 255, 170, 0.25)',
          borderRadius: '8px',
          padding: '1.2rem'
        }}>
          <div style={{
            borderBottom: '1px solid rgba(0, 255, 170, 0.2)',
            paddingBottom: '0.5rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.7rem',
            color: '#39ffb4'
          }}>
            HARDWARE & OPERATOR TELEMETRY
          </div>

          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.78rem'
          }}>
            <tbody>
              {portfolioData.about.specs.map((spec, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{
                    padding: '8px 0',
                    color: '#6ee7b7',
                    width: '40%',
                    letterSpacing: '0.05em'
                  }}>
                    {spec.label}:
                  </td>
                  <td style={{
                    padding: '8px 0',
                    color: '#f8fafc',
                    fontWeight: 600
                  }}>
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
