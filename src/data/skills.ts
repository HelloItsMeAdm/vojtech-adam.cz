export type SkillIcon = 'code' | 'server' | 'git' | 'camera' | 'drone' | 'palette' | 'video';

export interface Skill {
  name: string;
  level: number;
  category: 'dev' | 'creative';
  icon: SkillIcon;
}

export interface TimelineItem {
  year: string;
  i18nKey: string;
}

export const skills: Skill[] = [
  // Dev
  { name: 'React / TypeScript', level: 75, category: 'dev', icon: 'code' },
  { name: 'HTML & CSS', level: 90, category: 'dev', icon: 'code' },
  { name: 'JavaScript', level: 80, category: 'dev', icon: 'code' },
  { name: 'Git', level: 75, category: 'dev', icon: 'git' },
  { name: 'PHP', level: 55, category: 'dev', icon: 'server' },
  { name: 'Webhosting & Linux', level: 70, category: 'dev', icon: 'server' },
  // Creative
  { name: 'Fotografie', level: 80, category: 'creative', icon: 'camera' },
  { name: 'DJI Drone', level: 75, category: 'creative', icon: 'drone' },
  { name: 'Adobe Lightroom', level: 70, category: 'creative', icon: 'palette' },
  { name: 'Adobe Premiere', level: 55, category: 'creative', icon: 'video' },
  { name: 'Davinci Resolve', level: 60, category: 'creative', icon: 'video' },
];

export const timeline: TimelineItem[] = [
  {
    year: '2020',
    i18nKey: 'about.timeline_items.2020',
  },
  {
    year: '2021',
    i18nKey: 'about.timeline_items.2021',
  },
  {
    year: '2022',
    i18nKey: 'about.timeline_items.2022',
  },
  {
    year: '2023',
    i18nKey: 'about.timeline_items.2023',
  },
  {
    year: '2024',
    i18nKey: 'about.timeline_items.2024',
  },
  {
    year: '2025',
    i18nKey: 'about.timeline_items.2025',
  },
];
