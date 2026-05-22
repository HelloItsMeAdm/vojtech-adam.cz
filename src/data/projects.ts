export type ProjectStatus = 'active' | 'inactive' | 'wip';
export type ProjectVisibility = 'public' | 'personal';

export interface Project {
  slug: string;
  i18nKey: string;
  icon: 'smartphone' | 'globe' | 'camera' | 'server' | 'code' | 'music' | 'chart' | 'tool';
  image?: string;
  screenshots?: string[];
  tags: string[];
  status: ProjectStatus;
  visibility: ProjectVisibility;
  links: { labelKey: string; url: string }[];
}

export const projects: Project[] = [
  // ── Veřejné / featured ───────────────────────────────────
  {
    slug: 'fotografie',
    i18nKey: 'projects.items.fotografie',
    icon: 'camera',
    tags: ['Fotografie', 'DJI Mini 4 Pro', 'Adobe Lightroom', 'Adobe Stock', 'Davinci Resolve'],
    status: 'active',
    visibility: 'public',
    links: [
      { labelKey: 'instagram', url: 'https://www.instagram.com/photographer_vojtech/' },
      { labelKey: 'adobe_stock', url: 'https://stock.adobe.com/cz/contributor/212297235/VojtechAdam' },
    ],
  },
  {
    slug: 'weby-na-zakazku',
    i18nKey: 'projects.items.weby-na-zakazku',
    icon: 'globe',
    tags: ['React', 'HTML/CSS', 'Tailwind CSS', 'Webhosting', 'Cloudflare'],
    status: 'active',
    visibility: 'public',
    links: [
      { labelKey: 'learn_more', url: '/weby' },
    ],
  },
  {
    slug: 'slapniknam',
    i18nKey: 'projects.items.slapniknam',
    icon: 'chart',
    tags: ['Finanční poradenství', 'React', 'Instagram', 'Marketing'],
    status: 'active',
    visibility: 'public',
    links: [
      { labelKey: 'website', url: 'https://slapniknam.cz/web' },
      { labelKey: 'instagram', url: 'https://www.instagram.com/slapniknam/' },
    ],
  },

  // ── Osobní / vedlejší ─────────────────────────────────────
  {
    slug: 'justintime',
    i18nKey: 'projects.items.justintime',
    icon: 'smartphone',
    image: '/images/projects/justintime.png',
    screenshots: ['/images/projects/justintime.png','/images/projects/justintime-logo.png'],
    tags: ['Android', 'Kotlin', 'Google Maps API'],
    status: 'active',
    visibility: 'personal',
    links: [
      { labelKey: 'google_play', url: 'https://vojtech-adam.cz/playstore' },
    ],
  },
  {
    slug: 'fastcoupons',
    i18nKey: 'projects.items.fastcoupons',
    icon: 'smartphone',
    image: '/images/projects/fastcoupons.png',
    screenshots: ['/images/projects/fastcoupons.png','/images/projects/fastcoupons-logo.png'],
    tags: ['Android', 'Kotlin'],
    status: 'inactive',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'raspberry-pi-dashboard',
    i18nKey: 'projects.items.raspberry-pi-dashboard',
    icon: 'server',
    screenshots: ['/images/projects/rpi-dashboard.png'],
    tags: ['Raspberry Pi', 'Python', 'JavaScript', 'Jellyfin'],
    status: 'active',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'rolety',
    i18nKey: 'projects.items.rolety',
    icon: 'tool',
    screenshots: ['/images/projects/rolety.png'],
    tags: ['JavaScript', 'Home automation'],
    status: 'active',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'bettermusic',
    i18nKey: 'projects.items.bettermusic',
    icon: 'music',
    screenshots: ['/images/projects/bettermusic-1.jpeg','/images/projects/bettermusic-2.jpeg','/images/projects/bettermusic-3.jpeg'],
    tags: ['Flutter', 'Dart', 'Android', 'iOS'],
    status: 'inactive',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'customocto',
    i18nKey: 'projects.items.customocto',
    icon: 'code',
    tags: ['Firebase', 'OctoPrint', 'Python', 'Android'],
    status: 'inactive',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'reelpanel',
    i18nKey: 'projects.items.reelpanel',
    icon: 'chart',
    screenshots: ['/images/projects/reelpanel.png'],
    tags: ['FastAPI', 'SQLite', 'Alpine.js', 'Raspberry Pi'],
    status: 'active',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'survival-games-leaderboard',
    i18nKey: 'projects.items.survival-games-leaderboard',
    icon: 'chart',
    screenshots: ['/images/projects/survival-games-leaderboard.png'],
    tags: ['Node.js', 'JavaScript', 'Minecraft'],
    status: 'inactive',
    visibility: 'personal',
    links: [],
  },
  {
    slug: 'webfactory',
    i18nKey: 'projects.items.webfactory',
    icon: 'globe',
    screenshots: ['/images/projects/webfactory.png'],
    tags: ['React', 'TypeScript', 'CRM'],
    status: 'active',
    visibility: 'personal',
    links: [],
  },
];

export const publicProjects = projects.filter(p => p.visibility === 'public');
export const personalProjects = projects.filter(p => p.visibility === 'personal');
