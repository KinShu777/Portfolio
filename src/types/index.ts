export type PowerState = 'off' | 'powering-on' | 'on';

export type ChannelId = 1 | 2 | 3 | 4;

export type CRTIntensity = 'off' | 'low' | 'medium' | 'high';

export type PhosphorTheme = 'color' | 'green' | 'amber' | 'cyan';

export type PhosphorBloom = 'low' | 'medium' | 'high';

export interface ChannelInfo {
  id: ChannelId;
  label: string;
  tag: string;
  frequency: string;
  description: string;
}

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src?: string; // Path to local MP3, e.g. /audio/song01.mp3
}

export interface RadioStation {
  id?: string;
  frequency: string;
  name: string;
  genre: string;
  tag: string;
  color: string;
  country?: string;
  streamUrl?: string;
  format?: string;
  description?: string;
  tracks: TrackInfo[];
  synthPreset: 'lofi' | 'ambient' | 'synthwave' | 'retro-fm';
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  techStack: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  previewNote?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string;
  status: string;
}

export interface SkillCategory {
  category: string;
  code: string;
  skills: { name: string; level: number; tag: string }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  badge: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
}

export interface PortfolioData {
  viewerCallsign: string;
  fullName: string;
  designation: string;
  tagline: string;
  transmissionCoordinates: string;
  broadcastFrequency: string;
  signalStatus: string;
  about: {
    terminalBio: string[];
    missionStatement: string;
    specs: { label: string; value: string }[];
  };
  education: EducationItem[];
  skills: SkillCategory[];
  achievements: AchievementItem[];
  experience: ExperienceItem[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    transmissionNode: string;
  };
}
