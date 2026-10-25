import React, { useState } from 'react';
import type { ChannelId, ProjectItem } from '../../types';
import { projectsData } from '../../config/projectsData';
import { BroadcastHeader } from '../Portfolio/BroadcastHeader';
import { GitHubIcon, ExternalLinkIcon, TerminalIcon } from '../UI/RetroIcons';
import { soundEngine } from '../../audio/soundEngine';

interface ProjectArchiveChannelProps {
  onChannelChange: (ch: ChannelId) => void;
}

export const ProjectArchiveChannel: React.FC<ProjectArchiveChannelProps> = ({ onChannelChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['ALL', ...Array.from(new Set(projectsData.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'ALL'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <div className="crt-scroll-container" tabIndex={0} aria-label="Project Archive Transmission">
      <BroadcastHeader
        activeChannel={2}
        onChannelChange={onChannelChange}
      />

      <div style={{ padding: '2rem 1.5rem' }}>
        {/* Channel Banner */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 183, 3, 0.3)',
          paddingBottom: '1rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.72rem',
              color: '#ffb703',
              letterSpacing: '0.1em',
              marginBottom: '4px'
            }}>
              <span>TRANSMISSION ARCHIVE // CHANNEL 02</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-osd)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#ffffff',
              letterSpacing: '0.06em',
              textShadow: '0 0 10px rgba(255, 183, 3, 0.5)'
            }}>
              PROJECT ARCHIVE & LAB REPERTORY
            </h1>
          </div>

          <button
            onClick={() => {
              soundEngine.playChannelSwitch();
              onChannelChange(1);
            }}
            style={{
              backgroundColor: '#1b2230',
              color: '#39ffb4',
              border: '1px solid rgba(0, 255, 170, 0.4)',
              borderRadius: '4px',
              padding: '8px 14px',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              letterSpacing: '0.06em'
            }}
          >
            ◀ RETURN TO CHANNEL 01 (MAIN)
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="project-category-tabs"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '2rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick(600);
                setSelectedCategory(cat);
              }}
              style={{
                backgroundColor: selectedCategory === cat ? '#ffb703' : '#141822',
                color: selectedCategory === cat ? '#000000' : '#d1d5db',
                border: '1px solid #363b4d',
                borderRadius: '4px',
                padding: '6px 12px',
                fontFamily: 'var(--font-telemetry)',
                fontSize: '0.72rem',
                fontWeight: selectedCategory === cat ? 700 : 400,
                cursor: 'pointer',
                letterSpacing: '0.06em'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className="crt-section-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              style={{
                backgroundColor: '#0a0d14',
                border: '1px solid rgba(255, 183, 3, 0.3)',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Media Preview Box */}
              <div style={{
                height: '180px',
                backgroundColor: '#07090f',
                borderBottom: '1px solid rgba(255, 183, 3, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {project.imageUrl ? (
                  <>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: 'contrast(1.05) brightness(0.92)'
                      }}
                    />
                    {/* Retro raster scanline texture on preview */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0, 0, 0, 0.25) 2px, rgba(0, 0, 0, 0.25) 4px)',
                      pointerEvents: 'none'
                    }} />
                    {/* Status badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      fontFamily: 'var(--font-telemetry)',
                      fontSize: '0.6rem',
                      color: '#ffb703',
                      backgroundColor: 'rgba(10, 14, 20, 0.85)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                      border: '1px solid rgba(255, 183, 3, 0.3)'
                    }}>
                      RASTER CAPTURE // {project.number}
                    </div>
                  </>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.2rem',
                    textAlign: 'center'
                  }}>
                    <TerminalIcon size={24} color="#ffb703" />
                    <div style={{
                      fontFamily: 'var(--font-telemetry)',
                      fontSize: '0.75rem',
                      color: '#ffffff',
                      fontWeight: 700,
                      marginTop: '0.5rem',
                      letterSpacing: '0.04em'
                    }}>
                      {project.previewNote || 'NO SIGNAL PREVIEW'}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.3rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-badge)',
                    fontSize: '0.62rem',
                    color: '#ffb703'
                  }}>
                    {project.number}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-telemetry)',
                    fontSize: '0.65rem',
                    color: '#94a3b8',
                    backgroundColor: '#171c28',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}>
                    {project.category}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  {project.title}
                </h3>

                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.8rem',
                  color: '#38bdf8',
                  marginBottom: '10px'
                }}>
                  {project.subtitle}
                </div>

                <p style={{
                  fontSize: '0.86rem',
                  color: '#cbd5e1',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                  flex: 1
                }}>
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-telemetry)',
                        fontSize: '0.65rem',
                        backgroundColor: '#101626',
                        color: '#93c5fd',
                        border: '1px solid #1e293b',
                        padding: '2px 6px',
                        borderRadius: '3px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metric Telemetry */}
                {project.metrics && (
                  <div style={{
                    fontFamily: 'var(--font-telemetry)',
                    fontSize: '0.68rem',
                    color: '#34d399',
                    backgroundColor: 'rgba(52, 211, 153, 0.08)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    marginBottom: '14px',
                    borderLeft: '2px solid #34d399'
                  }}>
                    {project.metrics}
                  </div>
                )}

                {/* Action Links */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '12px'
                }}>
                  {project.githubUrl && (
                    project.githubUrl.startsWith('http') && !project.githubUrl.includes('[NEEDS INPUT') ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundEngine.playClick(650)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#e2e8f0',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-telemetry)',
                          fontSize: '0.72rem',
                          backgroundColor: '#1a2233',
                          padding: '6px 10px',
                          borderRadius: '4px'
                        }}
                      >
                        <GitHubIcon size={14} />
                        <span>CODE</span>
                      </a>
                    ) : (
                      <span
                        title="Pending repository uplink"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#64748b',
                          fontFamily: 'var(--font-telemetry)',
                          fontSize: '0.72rem',
                          backgroundColor: '#0c1017',
                          border: '1px dashed #2d3748',
                          padding: '6px 10px',
                          borderRadius: '4px'
                        }}
                      >
                        <GitHubIcon size={14} color="#64748b" />
                        <span>[CODE PENDING]</span>
                      </span>
                    )
                  )}

                  {project.liveUrl && (
                    project.liveUrl.startsWith('http') && !project.liveUrl.includes('[NEEDS INPUT') ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundEngine.playClick(650)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#ffb703',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-telemetry)',
                          fontSize: '0.72rem',
                          backgroundColor: 'rgba(255, 183, 3, 0.12)',
                          border: '1px solid rgba(255, 183, 3, 0.4)',
                          padding: '6px 10px',
                          borderRadius: '4px'
                        }}
                      >
                        <ExternalLinkIcon size={14} />
                        <span>LIVE DEMO</span>
                      </a>
                    ) : (
                      <span
                        title="Pending live deployment uplink"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#64748b',
                          fontFamily: 'var(--font-telemetry)',
                          fontSize: '0.72rem',
                          backgroundColor: '#0c1017',
                          border: '1px dashed #2d3748',
                          padding: '6px 10px',
                          borderRadius: '4px'
                        }}
                      >
                        <ExternalLinkIcon size={14} color="#64748b" />
                        <span>[DEMO PENDING]</span>
                      </span>
                    )
                  )}

                  <button
                    onClick={() => {
                      soundEngine.playClick(750);
                      setActiveModalProject(project);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontFamily: 'var(--font-telemetry)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      marginLeft: 'auto'
                    }}
                  >
                    [SPEC]
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      {activeModalProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          zIndex: 90
        }}>
          <div
            className="project-modal-card"
            style={{
              backgroundColor: '#0c1017',
              border: '2px solid #ffb703',
              borderRadius: '12px',
              maxWidth: '560px',
              width: '100%',
              padding: '1.5rem',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 183, 3, 0.3)',
              paddingBottom: '0.6rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.78rem',
              color: '#ffb703'
            }}>
              <span>CASE STUDY TELEMETRY // {activeModalProject.number}</span>
              <button
                onClick={() => setActiveModalProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <h2 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '8px' }}>
              {activeModalProject.title}
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              {activeModalProject.description}
            </p>

            <div style={{
              backgroundColor: '#131924',
              padding: '12px',
              borderRadius: '6px',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.78rem',
              color: '#93c5fd',
              marginBottom: '1.2rem'
            }}>
              ASSET CONFIGURATION: Replace this case study placeholder with your architectural diagrams, latency benchmarks, or user test recordings.
            </div>

            <button
              onClick={() => setActiveModalProject(null)}
              style={{
                backgroundColor: '#ffb703',
                color: '#000000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                fontWeight: 700,
                fontFamily: 'var(--font-telemetry)',
                cursor: 'pointer'
              }}
            >
              CLOSE DOSSIER [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
