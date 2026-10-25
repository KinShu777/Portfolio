import React from 'react';
import { portfolioData } from '../../config/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="sec-experience" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0, 255, 170, 0.15)' }}>
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
          05
        </span>
        <h2 style={{
          fontFamily: 'var(--font-osd)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          BUILD LOG // INDEPENDENT PROJECTS
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
        {portfolioData.experience.map((exp) => (
          <div
            key={exp.id}
            style={{
              backgroundColor: '#050f0c',
              border: '1px solid rgba(0, 255, 170, 0.25)',
              borderRadius: '8px',
              padding: '1.3rem'
            }}
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {exp.role}
              </h3>
              <span style={{
                fontFamily: 'var(--font-telemetry)',
                fontSize: '0.78rem',
                color: '#39ffb4',
                backgroundColor: 'rgba(0, 255, 170, 0.12)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {exp.period}
              </span>
            </div>

            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.86rem',
              color: '#6ee7b7',
              marginBottom: '10px',
              fontWeight: 600
            }}>
              {exp.organization} — <span style={{ color: '#8892b0', fontWeight: 400 }}>{exp.location}</span>
            </div>

            <ul style={{
              paddingLeft: '1.2rem',
              color: '#c2cbd6',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              marginBottom: '12px'
            }}>
              {exp.highlights.map((h, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {h}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {exp.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    fontFamily: 'var(--font-telemetry)',
                    fontSize: '0.68rem',
                    backgroundColor: '#0b1f18',
                    color: '#8be9c8',
                    border: '1px solid #194636',
                    padding: '2px 8px',
                    borderRadius: '3px'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
