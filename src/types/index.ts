export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'certification';
  year: string;
  titleKey: string;
  subtitleKey: string;
}

export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';
