import React, { useState, useEffect } from 'react';
import type { ChannelId } from '../../types';
import { RadioIcon } from '../UI/RetroIcons';
import { soundEngine } from '../../audio/soundEngine';

interface BroadcastHeaderProps {
  activeChannel: ChannelId;
  onChannelChange: (ch: ChannelId) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const BroadcastHeader: React.FC<BroadcastHeaderProps> = ({
  activeChannel,
  onChannelChange,
  onNavigateSection
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} NTSC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'HOME', id: 'sec-home' },
    { label: 'ABOUT', id: 'sec-about' },
    { label: 'EDU', id: 'sec-education' },
    { label: 'SKILLS', id: 'sec-skills' },
    { label: 'AWARDS', id: 'sec-achievements' },
    { label: 'LOGS', id: 'sec-experience' },
    { label: 'CONTACT', id: 'sec-contact' }
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick(600);
    if (activeChannel !== 1) {
      onChannelChange(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigateSection) onNavigateSection(id);
  };

  return (
    <header className="crt-broadcast-hud" role="banner">
      {/* Left: Channel indicator & REC blinker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          backgroundColor: '#072418',
          border: '1px solid #00e575',
          padding: '2px 8px',
          borderRadius: '3px',
          fontWeight: 700,
          color: '#39ffb4',
          fontFamily: 'var(--font-badge)',
          fontSize: '0.62rem'
        }}>
          CH 0{activeChannel}
        </div>

        <div className="hud-rec-indicator">
          <span className="hud-rec-dot" />
          <span>LIVE BROADCAST</span>
        </div>

        <span style={{ color: '#566072', display: 'none' }} className="d-sm-inline">
          |
        </span>

        <span style={{ color: '#00ffaa', letterSpacing: '0.08em', fontSize: '0.72rem' }}>
          {timeStr}
        </span>
      </div>

      {/* Middle: In-screen Quick Jumps */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} aria-label="Broadcast Navigation">
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#8be9c8',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              padding: '2px 4px',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8be9c8')}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right: Dedicated PROJECT ARCHIVE button & Radio Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => {
            soundEngine.playChannelSwitch();
            onChannelChange(2);
          }}
          style={{
            backgroundColor: activeChannel === 2 ? '#ffb703' : '#14362b',
            color: activeChannel === 2 ? '#000000' : '#39ffb4',
            border: '1px solid #00ffaa',
            padding: '3px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            boxShadow: '0 0 8px rgba(0, 255, 170, 0.25)'
          }}
          title="Switch to Channel 02: Dedicated Project Archive"
        >
          ★ PROJECT ARCHIVE
        </button>

        <button
          onClick={() => {
            soundEngine.playChannelSwitch();
            onChannelChange(3);
          }}
          style={{
            backgroundColor: activeChannel === 3 ? '#ff2a6d' : '#1f1b2d',
            color: activeChannel === 3 ? '#ffffff' : '#ff79c6',
            border: '1px solid #ff79c6',
            padding: '3px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.68rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Tune to Retro FM Radio Deck"
        >
          <RadioIcon size={12} />
          <span>RADIO</span>
        </button>
      </div>
    </header>
  );
};
