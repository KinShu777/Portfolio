import React from 'react';
import type { ChannelId } from '../../types';
import { BroadcastHeader } from '../Portfolio/BroadcastHeader';
import { HomeSection } from '../Portfolio/HomeSection';
import { AboutSection } from '../Portfolio/AboutSection';
import { EducationSection } from '../Portfolio/EducationSection';
import { SkillsSection } from '../Portfolio/SkillsSection';
import { AchievementsSection } from '../Portfolio/AchievementsSection';
import { ExperienceSection } from '../Portfolio/ExperienceSection';
import { ContactSection } from '../Portfolio/ContactSection';

interface PortfolioChannelProps {
  onChannelChange: (ch: ChannelId) => void;
}

export const PortfolioChannel: React.FC<PortfolioChannelProps> = ({ onChannelChange }) => {
  return (
    <div className="crt-scroll-container" tabIndex={0} aria-label="Portfolio Channel Transmission">
      <BroadcastHeader
        activeChannel={1}
        onChannelChange={onChannelChange}
      />
      <HomeSection
        onOpenArchive={() => onChannelChange(2)}
        onOpenRadio={() => onChannelChange(3)}
      />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <AchievementsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};
