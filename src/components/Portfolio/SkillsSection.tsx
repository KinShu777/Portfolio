import React from 'react';
import { portfolioData } from '../../config/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="sec-skills" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0, 255, 170, 0.15)' }}>
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
          03
        </span>
        <h2 style={{
          fontFamily: 'var(--font-osd)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          TECHNICAL SPECTRUM // SKILLS
        </h2>
      </div>

      <div style={{
        fontFamily: 'var(--font-telemetry)',
        fontSize: '0.72rem',
        color: '#52b788',
        marginBottom: '1.2rem',
        letterSpacing: '0.06em'
      }}>
        ACTIVE & APPLIED TOOLING SPECTRUM // CONTEXTUAL FAMILIARITY
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {portfolioData.skills.map((category, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#050f0c',
              border: '1px solid rgba(0, 255, 170, 0.25)',
              borderRadius: '8px',
              padding: '1.2rem'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 255, 170, 0.2)',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.75rem',
              color: '#39ffb4',
              fontWeight: 700
            }}>
              <span>{category.category}</span>
              <span style={{ color: '#52b788', fontSize: '0.68rem' }}>{category.code}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-telemetry)',
                    fontSize: '0.78rem',
                    marginBottom: '4px'
                  }}>
                    <span style={{ color: '#ffffff' }}>{skill.name}</span>
                    <span style={{ color: '#00ffaa' }}>{skill.tag}</span>
                  </div>

                  {/* Analog Meter Bar */}
                  <div style={{
                    height: '6px',
                    backgroundColor: '#0c1b16',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    display: 'flex',
                    border: '1px solid #143026'
                  }}>
                    <div
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: '#00e575',
                        boxShadow: '0 0 6px #00e575',
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
