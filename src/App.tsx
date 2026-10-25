import { useState, useEffect, useCallback } from 'react';
import type { PowerState, ChannelId, CRTIntensity, PhosphorTheme } from './types';
import { CRTFrame } from './components/CRT/CRTFrame';
import { CRTScreen } from './components/CRT/CRTScreen';
import { TVRemote } from './components/Remote/TVRemote';
import { QuickControls } from './components/UI/QuickControls';
import { PortfolioChannel } from './components/Channels/PortfolioChannel';
import { ProjectArchiveChannel } from './components/Channels/ProjectArchiveChannel';
import { RetroRadioChannel } from './components/Channels/RetroRadioChannel';
import { TestPatternChannel } from './components/Channels/TestPatternChannel';
import { soundEngine } from './audio/soundEngine';

export function App() {
  const [powerState, setPowerState] = useState<PowerState>('off');
  const [isRemoteVisible, setIsRemoteVisible] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<ChannelId>(1);
  const [crtIntensity, setCrtIntensity] = useState<CRTIntensity>('medium');
  const [phosphorTheme, setPhosphorTheme] = useState<PhosphorTheme>('color');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDegaussing, setIsDegaussing] = useState<boolean>(false);

  // Phase 2: Scroll detection to discover the remote
  useEffect(() => {
    const handleScrollOrWheel = () => {
      // Any scroll action or touch move reveals the remote!
      if (!isRemoteVisible) {
        setIsRemoteVisible(true);
        soundEngine.playClick(450);
      }
    };

    window.addEventListener('scroll', handleScrollOrWheel, { passive: true });
    window.addEventListener('wheel', handleScrollOrWheel, { passive: true });
    window.addEventListener('touchmove', handleScrollOrWheel, { passive: true });

    // Also auto-hint after 4 seconds if user has not scrolled
    const hintTimer = setTimeout(() => {
      setIsRemoteVisible(true);
    }, 4500);

    return () => {
      window.removeEventListener('scroll', handleScrollOrWheel);
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('touchmove', handleScrollOrWheel);
      clearTimeout(hintTimer);
    };
  }, [isRemoteVisible]);

  // Power switch handler
  const handleTogglePower = useCallback(() => {
    if (powerState === 'off') {
      soundEngine.playCRTPowerOn();
      setPowerState('powering-on');
    } else {
      soundEngine.playClick(280);
      setPowerState('off');
      soundEngine.pauseRadio();
    }
  }, [powerState]);

  // Channel switching
  const handleChannelChange = useCallback((ch: ChannelId) => {
    soundEngine.playChannelSwitch();
    setActiveChannel(ch);
  }, []);

  const handleChannelNext = useCallback(() => {
    const nextCh = ((activeChannel % 4) + 1) as ChannelId;
    handleChannelChange(nextCh);
  }, [activeChannel, handleChannelChange]);

  const handleChannelPrev = useCallback(() => {
    const prevCh = (activeChannel === 1 ? 4 : activeChannel - 1) as ChannelId;
    handleChannelChange(prevCh);
  }, [activeChannel, handleChannelChange]);

  // Volume controls
  const handleVolumeUp = useCallback(() => {
    const newVol = Math.min(1, soundEngine.getVolume() + 0.1);
    soundEngine.setVolume(newVol);
  }, []);

  const handleVolumeDown = useCallback(() => {
    const newVol = Math.max(0, soundEngine.getVolume() - 0.1);
    soundEngine.setVolume(newVol);
  }, []);

  const handleToggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  // Degauss coil effect
  const handleDegauss = useCallback(() => {
    soundEngine.playCRTPowerOn();
    setIsDegaussing(true);
    setTimeout(() => setIsDegaussing(false), 900);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const key = e.key.toUpperCase();

      if (key === 'P') {
        handleTogglePower();
      } else if (key === 'M') {
        handleToggleMute();
      } else if (key === '1') {
        handleChannelChange(1);
      } else if (key === '2') {
        handleChannelChange(2);
      } else if (key === '3') {
        handleChannelChange(3);
      } else if (key === '4') {
        handleChannelChange(4);
      } else if (key === '+' || key === '=') {
        handleVolumeUp();
      } else if (key === '-' || key === '_') {
        handleVolumeDown();
      } else if (key === 'R') {
        setIsRemoteVisible(prev => !prev);
      } else if (key === ' ') {
        e.preventDefault();
        if (soundEngine.isRadioActive()) {
          soundEngine.pauseRadio();
        } else {
          soundEngine.playRadioTrack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePower, handleToggleMute, handleChannelChange, handleVolumeUp, handleVolumeDown]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Quick accessibility bar */}
      <QuickControls
        powerState={powerState}
        isMuted={isMuted}
        onTogglePower={handleTogglePower}
        onToggleMute={handleToggleMute}
        onToggleRemote={() => setIsRemoteVisible(!isRemoteVisible)}
        isRemoteVisible={isRemoteVisible}
      />

      {/* Main Physical CRT television */}
      <CRTFrame
        powerState={powerState}
        onTogglePower={handleTogglePower}
        onChannelNext={handleChannelNext}
        onVolumeRotate={handleVolumeUp}
        crtIntensity={crtIntensity}
        onIntensityChange={setCrtIntensity}
        phosphorTheme={phosphorTheme}
        onPhosphorChange={setPhosphorTheme}
        onDegauss={handleDegauss}
      >
        <CRTScreen
          powerState={powerState}
          activeChannel={activeChannel}
          crtIntensity={crtIntensity}
          phosphorTheme={phosphorTheme}
          isDegaussing={isDegaussing}
          onStartupComplete={() => setPowerState('on')}
          onPowerClick={handleTogglePower}
        >
          {/* Active Broadcast Channel inside the CRT screen */}
          {activeChannel === 1 && (
            <PortfolioChannel onChannelChange={handleChannelChange} />
          )}
          {activeChannel === 2 && (
            <ProjectArchiveChannel onChannelChange={handleChannelChange} />
          )}
          {activeChannel === 3 && (
            <RetroRadioChannel onChannelChange={handleChannelChange} />
          )}
          {activeChannel === 4 && (
            <TestPatternChannel onChannelChange={handleChannelChange} />
          )}
        </CRTScreen>
      </CRTFrame>

      {/* Scroll Discovery Indicator (when remote is hidden) */}
      {!isRemoteVisible && powerState === 'off' && (
        <div
          onClick={() => setIsRemoteVisible(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#8be9c8',
            fontFamily: 'var(--font-telemetry)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            backgroundColor: 'rgba(10, 15, 20, 0.85)',
            border: '1px solid rgba(0, 255, 170, 0.3)',
            padding: '6px 14px',
            borderRadius: '20px',
            cursor: 'pointer',
            zIndex: 60,
            animation: 'prompt-flicker 2s infinite'
          }}
        >
          ▼ SCROLL DOWN TO DISCOVER THE TV REMOTE
        </div>
      )}

      {/* Physical TV Remote Control */}
      <TVRemote
        isVisible={isRemoteVisible}
        powerState={powerState}
        activeChannel={activeChannel}
        isMuted={isMuted}
        onTogglePower={handleTogglePower}
        onChannelChange={handleChannelChange}
        onChannelNext={handleChannelNext}
        onChannelPrev={handleChannelPrev}
        onVolumeUp={handleVolumeUp}
        onVolumeDown={handleVolumeDown}
        onToggleMute={handleToggleMute}
      />
    </div>
  );
}

export default App;
