import React, { useState, useEffect } from 'react';
import type { ChannelId } from '../../types';
import { radioStations } from '../../config/radioStations';
import { BroadcastHeader } from '../Portfolio/BroadcastHeader';
import { soundEngine } from '../../audio/soundEngine';

interface RetroRadioChannelProps {
  onChannelChange: (ch: ChannelId) => void;
}

export const RetroRadioChannel: React.FC<RetroRadioChannelProps> = ({ onChannelChange }) => {
  const [stationIndex, setStationIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioStatus, setRadioStatus] = useState<'stopped' | 'connecting' | 'live' | 'fallback'>('stopped');
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const currentStation = radioStations[stationIndex];
  const currentTrack = currentStation.tracks[trackIndex] || currentStation.tracks[0];

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
    setVolume(soundEngine.getVolume());
    setIsPlaying(soundEngine.isRadioActive());

    const unsubscribe = soundEngine.subscribeRadioStatus((status) => {
      setRadioStatus(status);
      if (status === 'stopped') {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    });

    return () => {
      unsubscribe();
      // Surgical cleanup: pause radio stream when navigating away from Channel 03
      soundEngine.pauseRadio();
    };
  }, []);

  const handleStationChange = (newIdx: number) => {
    soundEngine.playRadioTuning();
    const validIdx = (newIdx + radioStations.length) % radioStations.length;
    setStationIndex(validIdx);
    setTrackIndex(0);

    if (isPlaying) {
      const nextStation = radioStations[validIdx];
      const streamSrc = nextStation.streamUrl || nextStation.tracks[0]?.src;
      soundEngine.playRadioTrack(streamSrc, nextStation.synthPreset);
    }
  };

  const handleTogglePlay = () => {
    soundEngine.playClick(600);
    if (isPlaying) {
      soundEngine.pauseRadio();
      setIsPlaying(false);
    } else {
      const streamSrc = currentStation.streamUrl || currentTrack?.src;
      soundEngine.playRadioTrack(streamSrc, currentStation.synthPreset);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundEngine.setVolume(newVol);
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="crt-scroll-container" tabIndex={0} aria-label="Retro FM Radio Transmission">
      <BroadcastHeader
        activeChannel={3}
        onChannelChange={onChannelChange}
      />

      <div style={{ padding: '2rem 1.5rem', maxWidth: '820px', margin: '0 auto' }}>
        {/* Header telemetry */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 42, 109, 0.3)',
          paddingBottom: '0.8rem'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.72rem',
              color: '#ff2a6d',
              letterSpacing: '0.12em'
            }}>
              BROADCAST RECEIVER // CH 03 // STEREO FM
            </div>
            <h1 style={{
              fontFamily: 'var(--font-osd)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#ffffff',
              letterSpacing: '0.06em',
              textShadow: '0 0 10px rgba(255, 42, 109, 0.6)'
            }}>
              VINTAGE FM TUNER & FREQUENCY DECK
            </h1>
          </div>

          <button
            onClick={() => {
              soundEngine.playChannelSwitch();
              onChannelChange(1);
            }}
            style={{
              backgroundColor: '#161922',
              color: '#39ffb4',
              border: '1px solid rgba(0, 255, 170, 0.3)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            ◀ RETURN TO CH 01
          </button>
        </div>

        {/* Physical Radio Tuner Unit */}
        <div
          className="radio-tuner-unit"
          style={{
            backgroundColor: '#0c0e14',
            border: '2px solid #282d3e',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {/* Backlit Frequency Dial Display */}
          <div style={{
            backgroundColor: '#05070a',
            border: '2px solid #1a1e2b',
            borderRadius: '10px',
            padding: '1.2rem',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.9)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Frequency tuning scale with red needle */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-telemetry)',
              fontSize: '0.72rem',
              color: '#5d647a',
              marginBottom: '6px',
              padding: '0 8px'
            }}>
              <span>88.0</span>
              <span>92.0</span>
              <span>96.0</span>
              <span>100.0</span>
              <span>104.0</span>
              <span>108.0 MHz</span>
            </div>

            {/* Dial track with ruler ticks */}
            <div style={{
              height: '32px',
              backgroundColor: '#0d1017',
              borderRadius: '4px',
              border: '1px solid #232838',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              overflow: 'hidden'
            }}>
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: i % 5 === 0 ? '18px' : '8px',
                    backgroundColor: i % 5 === 0 ? '#4e556b' : '#232838'
                  }}
                />
              ))}

              {/* Red Tuning Needle positioned according to active station */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  backgroundColor: '#ff3366',
                  boxShadow: '0 0 8px #ff3366',
                  left: `${(stationIndex / (radioStations.length - 1)) * 85 + 7}%`,
                  transition: 'left 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)',
                  zIndex: 10
                }}
              />
            </div>

            {/* Large Fluorescent VFD Display */}
            <div
              className="radio-vfd-display"
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#020d09',
                border: '1px solid #00e575',
                borderRadius: '6px',
                padding: '12px 16px'
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.68rem',
                  color: '#00e575',
                  letterSpacing: '0.1em'
                }}>
                  FREQUENCY // STATION
                </div>
                <div style={{
                  fontFamily: 'var(--font-osd)',
                  fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                  color: '#39ffb4',
                  textShadow: '0 0 10px rgba(57, 255, 180, 0.7)',
                  lineHeight: 1
                }}>
                  FM {currentStation.frequency}
                </div>
                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  fontWeight: 700,
                  marginTop: '4px'
                }}>
                  {currentStation.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.72rem',
                  color: '#8be9c8'
                }}>
                  {currentStation.genre} // {currentStation.tag}
                </div>
              </div>

              {/* Status & Now Playing */}
              <div style={{ textAlign: 'right', maxWidth: '360px' }}>
                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.65rem',
                  color: !isPlaying
                    ? '#e63946'
                    : radioStatus === 'live'
                    ? '#00e575'
                    : radioStatus === 'fallback'
                    ? '#ffb703'
                    : '#00d2ff',
                  fontWeight: 700,
                  letterSpacing: '0.1em'
                }}>
                  {!isPlaying
                    ? '○ STANDBY // RECEIVER OFF'
                    : radioStatus === 'live'
                    ? '● LIVE // ONLINE BROADCAST'
                    : radioStatus === 'fallback'
                    ? '▲ SIGNAL LOST // LOCAL SYNTH FALLBACK'
                    : '◌ TUNING // CONNECTING TO STREAM...'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.85rem',
                  color: '#ffb703',
                  fontWeight: 600,
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {currentStation.description || currentTrack.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.72rem',
                  color: '#94a3b8'
                }}>
                  {currentTrack.artist} // {currentStation.country ? currentStation.country.toUpperCase() : 'INDIA'} // {currentTrack.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Visualizer Waveform Bars */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '4px',
            height: '42px',
            backgroundColor: '#07090f',
            borderRadius: '6px',
            padding: '4px 10px',
            border: '1px solid #1a1e2c'
          }}>
            {Array.from({ length: 32 }).map((_, i) => {
              const h = isPlaying ? Math.sin(i * 0.4 + Date.now() * 0.003) * 16 + 20 : 4;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}px`,
                    backgroundColor: i > 26 ? '#ff3366' : i > 20 ? '#ffb703' : '#00e575',
                    borderRadius: '1px',
                    transition: 'height 0.15s ease'
                  }}
                />
              );
            })}
          </div>

          {/* Radio Transport Controls */}
          <div
            className="radio-transport-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Tuning Prev / Next */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleStationChange(stationIndex - 1)}
                style={{
                  backgroundColor: '#191d29',
                  color: '#ffffff',
                  border: '1px solid #333a4f',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                ◀ PREV STATION
              </button>

              <button
                onClick={() => handleStationChange(stationIndex + 1)}
                style={{
                  backgroundColor: '#191d29',
                  color: '#ffffff',
                  border: '1px solid #333a4f',
                  borderRadius: '6px',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                NEXT STATION ▶
              </button>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={handleTogglePlay}
              style={{
                backgroundColor: isPlaying ? '#ff2a6d' : '#00e575',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 24px',
                fontFamily: 'var(--font-telemetry)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                boxShadow: isPlaying ? '0 0 12px rgba(255, 42, 109, 0.5)' : '0 0 12px rgba(0, 229, 117, 0.5)'
              }}
            >
              {isPlaying ? '■ STOP BROADCAST' : '▶ TUNE & PLAY FM'}
            </button>

            {/* Volume & Mute */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleToggleMute}
                style={{
                  backgroundColor: isMuted ? '#4a151b' : '#191d29',
                  color: isMuted ? '#ff4d4d' : '#ffffff',
                  border: '1px solid #333a4f',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontFamily: 'var(--font-telemetry)',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                {isMuted ? 'UNMUTE' : 'MUTE'}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                style={{ width: '80px', accentColor: '#00e575' }}
                aria-label="Radio Volume Slider"
              />
            </div>
          </div>

          {/* Retro Receiver Info Callout */}
          <div style={{
            backgroundColor: '#0a1017',
            border: '1px dashed #24354c',
            borderRadius: '8px',
            padding: '12px',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.72rem',
            color: '#7fa4cd',
            lineHeight: 1.5
          }}>
            <strong style={{ color: '#ffffff' }}>AUTHENTIC INTERNET RADIO RECEIVER:</strong>
            <br />
            1. Tunes live online radio streams specializing in Indian retro & Bollywood golden age classics.
            <br />
            2. Integrated with CRT TV chassis physical volume knob, mute button, and channel tuner.
            <br />
            <em>Note: In the event of network dropouts or stream unreachability, the system automatically falls back to local procedural Web Audio synthesis.</em>
          </div>
        </div>
      </div>
    </div>
  );
};
