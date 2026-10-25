import React from 'react';
import { portfolioData } from '../../config/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="sec-education" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0, 255, 170, 0.15)' }}>
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
          02
        </span>
        <h2 style={{
          fontFamily: 'var(--font-osd)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          ACADEMIC TRANSMISSION // EDUCATION
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {portfolioData.education.map((edu, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#050f0c',
              border: '1px solid rgba(0, 255, 170, 0.3)',
              borderRadius: '8px',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '8px'
            }}>
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em'
              }}>
                {edu.degree}
              </h3>
              <span style={{
                fontFamily: 'var(--font-telemetry)',
                fontSize: '0.78rem',
                color: '#39ffb4',
                backgroundColor: 'rgba(0, 255, 170, 0.12)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {edu.period}
              </span>
            </div>

            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.85rem',
              color: '#6ee7b7',
              fontWeight: 600
            }}>
              {edu.institution}
            </div>

            <p style={{
              fontSize: '0.88rem',
              color: '#c1cad7',
              marginTop: '4px',
              lineHeight: 1.5
            }}>
              {edu.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
