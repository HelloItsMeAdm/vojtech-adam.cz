export interface WebReference {
  name: string;
  desc: string;
  descEn: string;
  url: string;
  tech: string[];
}

export const webReferences: WebReference[] = [
  {
    name: 'Šlapni k nám',
    desc: 'Web pro finanční poradce — přehledná prezentace služeb s kontaktním formulářem.',
    descEn: 'Website for a financial advisors — clear service presentation with contact form.',
    url: 'https://slapniknam.cz/web',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Turnstile'],
  },
  {
    name: 'Moravskoslezský spolek na ochranu zvířat',
    desc: 'Web pro neziskovou organizaci — adopce zvířat, aktuality a fundraising.',
    descEn: 'Website for a non-profit animal welfare organization — adoptions, news and fundraising.',
    url: 'https://mssoz.cz/',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Čalounictví Klement',
    desc: 'Web pro čalounické studio — galerie prací, ceník a kontakt.',
    descEn: 'Website for an upholstery studio — portfolio gallery, pricing and contact.',
    url: '#',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];
