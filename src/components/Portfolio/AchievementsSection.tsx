import React from 'react';
import { portfolioData } from '../../config/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="sec-achievements" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(0, 255, 170, 0.15)' }}>
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
          04
        </span>
        <h2 style={{
          fontFamily: 'var(--font-osd)',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          BROADCAST HONORS // ACHIEVEMENTS
        </h2>
      </div>

      <div
        className="crt-section-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.2rem'
        }}
      >
        {portfolioData.achievements.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#050f0c',
              border: '1px solid rgba(0, 255, 170, 0.25)',
              borderRadius: '8px',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.72rem'
            }}>
              <span style={{
                backgroundColor: 'rgba(255, 183, 3, 0.15)',
                color: '#ffb703',
                border: '1px solid #ffb703',
                padding: '2px 6px',
                borderRadius: '3px',
                fontWeight: 700
              }}>
                {item.badge}
              </span>
              <span style={{ color: '#8892b0' }}>{item.year}</span>
            </div>

            <h3 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#ffffff',
              marginTop: '4px'
            }}>
              {item.title}
            </h3>

            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.8rem',
              color: '#39ffb4',
              fontWeight: 600
            }}>
              {item.organization}
            </div>

            <p style={{
              fontSize: '0.85rem',
              color: '#c2cbd6',
              lineHeight: 1.5,
              marginTop: '2px'
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
