import { useState } from 'react';
import type { PowerState, ChannelId } from '../../types';
import {
  PowerIcon,
  ChannelUpIcon,
  ChannelDownIcon,
  VolumeUpIcon,
  VolumeMuteIcon,
  RadioIcon
} from '../UI/RetroIcons';
import { soundEngine } from '../../audio/soundEngine';

interface TVRemoteProps {
  isVisible: boolean;
  powerState: PowerState;
  activeChannel: ChannelId;
  isMuted: boolean;
  onTogglePower: () => void;
  onChannelChange: (ch: ChannelId) => void;
  onChannelNext: () => void;
  onChannelPrev: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onToggleMute: () => void;
}

export const TVRemote: React.FC<TVRemoteProps> = ({
  isVisible,
  powerState: _powerState,
  activeChannel,
  isMuted,
  onTogglePower,
  onChannelChange,
  onChannelNext,
  onChannelPrev,
  onVolumeUp,
  onVolumeDown,
  onToggleMute
}) => {
  const [isIrFlashing, setIsIrFlashing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const triggerIrPulse = () => {
    setIsIrFlashing(true);
    setTimeout(() => setIsIrFlashing(false), 120);
  };

  const handleButtonClick = (action: () => void) => {
    triggerIrPulse();
    action();
  };

  return (
    <div
      className="remote-outer-shell"
      style={{
        transform: isVisible
          ? (isMinimized ? 'translateY(calc(100% - 38px))' : 'translateY(0)')
          : 'translateY(130%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      aria-label="Physical TV Remote Control"
    >
      <div className="remote-body">
        {/* Infrared emitter diode window */}
        <div
          className="remote-ir-window"
          style={{
            backgroundColor: isIrFlashing ? '#ff0033' : '#3c0909',
            boxShadow: isIrFlashing ? '0 0 12px 3px #ff0033' : 'none',
            transition: 'all 0.08s ease'
          }}
          aria-hidden="true"
        />

        {/* Remote brand & minimize bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div className="remote-plate" style={{ margin: 0, padding: 0, border: 'none' }}>
            REMOTE RM-101
          </div>
          <button
            onClick={() => {
              soundEngine.playClick(800);
              setIsMinimized(!isMinimized);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#8e92a4',
              cursor: 'pointer',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-telemetry)'
            }}
            title={isMinimized ? 'Expand Remote' : 'Dock Remote'}
          >
            {isMinimized ? '▲ EXPAND' : '▼ DOCK'}
          </button>
        </div>

        {/* Top Control Row: Power & Mute */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
          <button
            className="remote-btn remote-btn-power"
            onClick={() => handleButtonClick(() => {
              soundEngine.playClick(340);
              onTogglePower();
            })}
            title="Power On / Off"
            aria-label="Remote Power Button"
            style={{ height: '36px' }}
          >
            <PowerIcon size={14} color="#ffffff" />
            <span style={{ marginLeft: '4px' }}>POWER</span>
          </button>

          <button
            className="remote-btn"
            onClick={() => handleButtonClick(() => {
              soundEngine.playClick(520);
              onToggleMute();
            })}
            title="Mute Audio"
            aria-label="Mute Audio"
            style={{ height: '36px', color: isMuted ? '#ff4d4d' : undefined }}
          >
            {isMuted ? <VolumeMuteIcon size={14} /> : <VolumeUpIcon size={14} />}
            <span style={{ marginLeft: '4px' }}>{isMuted ? 'UNMUTE' : 'MUTE'}</span>
          </button>
        </div>

        {/* Direct Channels & Radio Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
          <button
            className="remote-btn"
            onClick={() => handleButtonClick(() => {
              soundEngine.playChannelSwitch();
              onChannelChange(3);
            })}
            style={{
              height: '30px',
              backgroundColor: activeChannel === 3 ? '#23382f' : undefined,
              color: activeChannel === 3 ? '#00ff88' : undefined,
              fontSize: '0.65rem'
            }}
            title="Switch to Retro Radio (CH 03)"
          >
            <RadioIcon size={12} />
            <span style={{ marginLeft: '4px' }}>RADIO</span>
          </button>

          <button
            className="remote-btn"
            onClick={() => handleButtonClick(() => {
              soundEngine.playChannelSwitch();
              onChannelChange(2);
            })}
            style={{
              height: '30px',
              backgroundColor: activeChannel === 2 ? '#3b2f23' : undefined,
              color: activeChannel === 2 ? '#ffb703' : undefined,
              fontSize: '0.65rem'
            }}
            title="Switch to Project Archive (CH 02)"
          >
            <span>ARCHIVE</span>
          </button>
        </div>

        {/* Rocker cluster: Channel & Volume Up/Down */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
          {/* Channel Rocker */}
          <div style={{
            background: '#191b22',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid #2b2e3c',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <button
              className="remote-btn"
              onClick={() => handleButtonClick(() => {
                soundEngine.playChannelSwitch();
                onChannelNext();
              })}
              title="Channel Up"
              aria-label="Channel Up"
              style={{ height: '28px' }}
            >
              <ChannelUpIcon size={14} />
            </button>
            <div style={{
              textAlign: 'center',
              fontSize: '0.58rem',
              color: '#717585',
              fontFamily: 'var(--font-telemetry)'
            }}>
              CH
            </div>
            <button
              className="remote-btn"
              onClick={() => handleButtonClick(() => {
                soundEngine.playChannelSwitch();
                onChannelPrev();
              })}
              title="Channel Down"
              aria-label="Channel Down"
              style={{ height: '28px' }}
            >
              <ChannelDownIcon size={14} />
            </button>
          </div>

          {/* Volume Rocker */}
          <div style={{
            background: '#191b22',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid #2b2e3c',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <button
              className="remote-btn"
              onClick={() => handleButtonClick(() => {
                soundEngine.playClick(700);
                onVolumeUp();
              })}
              title="Volume Up"
              aria-label="Volume Up"
              style={{ height: '28px' }}
            >
              +
            </button>
            <div style={{
              textAlign: 'center',
              fontSize: '0.58rem',
              color: '#717585',
              fontFamily: 'var(--font-telemetry)'
            }}>
              VOL
            </div>
            <button
              className="remote-btn"
              onClick={() => handleButtonClick(() => {
                soundEngine.playClick(400);
                onVolumeDown();
              })}
              title="Volume Down"
              aria-label="Volume Down"
              style={{ height: '28px' }}
            >
              -
            </button>
          </div>
        </div>

        {/* 1-9 Numeric Keypad */}
        <div className="remote-keypad-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const isAssigned = num <= 4;
            const isSelected = activeChannel === num;
            return (
              <button
                key={num}
                className="remote-btn remote-keypad-btn"
                onClick={() => handleButtonClick(() => {
                  soundEngine.playClick(500 + num * 40);
                  if (num === 1) onChannelChange(1);
                  else if (num === 2) onChannelChange(2);
                  else if (num === 3) onChannelChange(3);
                  else if (num === 4) onChannelChange(4);
                  else soundEngine.playStaticBurst(120, 0.1);
                })}
                style={{
                  color: isSelected ? '#00ff88' : isAssigned ? '#ffffff' : '#696e80',
                  boxShadow: isSelected ? '0 0 6px rgba(0,255,136,0.3)' : undefined
                }}
                title={
                  num === 1 ? 'CH 01: Portfolio' :
                  num === 2 ? 'CH 02: Projects' :
                  num === 3 ? 'CH 03: Retro Radio' :
                  num === 4 ? 'CH 04: Test Pattern' :
                  `Channel ${num} (Static)`
                }
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Quick legend footer */}
        <div style={{
          fontSize: '0.55rem',
          color: '#55596b',
          textAlign: 'center',
          fontFamily: 'var(--font-telemetry)',
          letterSpacing: '0.04em'
        }}>
          1:PORTFOLIO 2:ARCHIVE 3:RADIO 4:TEST
        </div>
      </div>
    </div>
  );
};
