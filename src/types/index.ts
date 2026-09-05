export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

export type TimelineKey =
  | 'eduTitle'
  | 'eduSubtitle'
  | 'cert1Title'
  | 'cert1Subtitle'
  | 'cert2Title'
  | 'cert2Subtitle'
  | 'cert3Title'
  | 'cert3Subtitle'
  | 'ongoing';

export interface TimelineItem {
  id: string;
  type: 'education' | 'certification';
  year: string;
  titleKey: TimelineKey;
  subtitleKey: TimelineKey;
}

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';