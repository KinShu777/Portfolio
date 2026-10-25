import React from 'react';
import type { ChannelId } from '../../types';
import { BroadcastHeader } from '../Portfolio/BroadcastHeader';
import { soundEngine } from '../../audio/soundEngine';

interface TestPatternChannelProps {
  onChannelChange: (ch: ChannelId) => void;
}

export const TestPatternChannel: React.FC<TestPatternChannelProps> = ({ onChannelChange }) => {
  return (
    <div className="crt-scroll-container" tabIndex={0} aria-label="Test Pattern Channel">
      <BroadcastHeader
        activeChannel={4}
        onChannelChange={onChannelChange}
      />

      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh'
      }}>
        {/* SMPTE Color Bars */}
        <div style={{
          width: 'min(92%, 580px)',
          aspectRatio: '4/3',
          border: '4px solid #333',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.8)'
        }}>
          {/* Top 7 Color Bars */}
          <div style={{ display: 'flex', height: '67%' }}>
            {['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'].map((color, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: color }} />
            ))}
          </div>

          {/* Middle Cast Bars */}
          <div style={{ display: 'flex', height: '8%' }}>
            {['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'].map((color, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: color }} />
            ))}
          </div>

          {/* Bottom Alignment & I/Q signals */}
          <div style={{ display: 'flex', height: '25%' }}>
            <div style={{ flex: 1.25, backgroundColor: '#00214c' }} />
            <div style={{ flex: 1.25, backgroundColor: '#ffffff' }} />
            <div style={{ flex: 1.25, backgroundColor: '#32006a' }} />
            <div style={{ flex: 1.25, backgroundColor: '#131313' }} />
            <div style={{ flex: 0.5, backgroundColor: '#090909' }} />
            <div style={{ flex: 0.5, backgroundColor: '#131313' }} />
            <div style={{ flex: 0.5, backgroundColor: '#1d1d1d' }} />
            <div style={{ flex: 1.25, backgroundColor: '#131313' }} />
          </div>
        </div>

        {/* Telemetry Footer */}
        <div style={{
          marginTop: '1.2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-telemetry)',
          color: '#39ffb4',
          fontSize: '0.78rem'
        }}>
          <div>NTSC SMPTE COLOR BAR CALIBRATION // 1.0 VP-P COMPOSITE</div>
          <button
            onClick={() => {
              soundEngine.playChannelSwitch();
              onChannelChange(1);
            }}
            style={{
              marginTop: '10px',
              backgroundColor: '#1b2230',
              color: '#ffffff',
              border: '1px solid #363e52',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ◀ RETURN TO CHANNEL 01 (MAIN)
          </button>
        </div>
      </div>
    </div>
  );
};
