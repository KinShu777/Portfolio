import { useState, useEffect, useCallback } from 'react';
import type { PowerState, ChannelId, CRTIntensity, PhosphorTheme, PhosphorBloom } from './types';
import { CRTFrame } from './components/CRT/CRTFrame';
import { CRTScreen } from './components/CRT/CRTScreen';
import { PortfolioChannel } from './components/Channels/PortfolioChannel';
import { ProjectArchiveChannel } from './components/Channels/ProjectArchiveChannel';
import { RetroRadioChannel } from './components/Channels/RetroRadioChannel';
import { TestPatternChannel } from './components/Channels/TestPatternChannel';
import { soundEngine } from './audio/soundEngine';

export function App() {
  const [powerState, setPowerState] = useState<PowerState>('off');
  const [activeChannel, setActiveChannel] = useState<ChannelId>(1);
  const [crtIntensity, setCrtIntensity] = useState<CRTIntensity>('medium');
  const [phosphorTheme, setPhosphorTheme] = useState<PhosphorTheme>('color');
  const [bloom, setBloom] = useState<PhosphorBloom>('medium');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isDegaussing, setIsDegaussing] = useState<boolean>(false);

  // Sync initial soundEngine values
  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
    setVolume(soundEngine.getVolume());
  }, []);

  // Power switch handler (Physical TV Power Button)
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
  const handleVolumeChange = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    soundEngine.setVolume(clamped);
  }, []);

  const handleVolumeUp = useCallback(() => {
    handleVolumeChange(volume + 0.08);
  }, [volume, handleVolumeChange]);

  const handleVolumeDown = useCallback(() => {
    handleVolumeChange(volume - 0.08);
  }, [volume, handleVolumeChange]);

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

  // Keyboard navigation shortcuts (preserved for accessibility)
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
    <div className="crt-viewport-container">
      {/* Physical CRT television occupying essentially the entire viewport */}
      <CRTFrame
        powerState={powerState}
        activeChannel={activeChannel}
        isMuted={isMuted}
        volume={volume}
        onTogglePower={handleTogglePower}
        onChannelChange={handleChannelChange}
        onChannelNext={handleChannelNext}
        onChannelPrev={handleChannelPrev}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        crtIntensity={crtIntensity}
        onIntensityChange={setCrtIntensity}
        phosphorTheme={phosphorTheme}
        onPhosphorChange={setPhosphorTheme}
        bloom={bloom}
        onBloomChange={setBloom}
        onDegauss={handleDegauss}
      >
        <CRTScreen
          powerState={powerState}
          activeChannel={activeChannel}
          crtIntensity={crtIntensity}
          phosphorTheme={phosphorTheme}
          bloom={bloom}
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
    </div>
  );
}

export default App;
