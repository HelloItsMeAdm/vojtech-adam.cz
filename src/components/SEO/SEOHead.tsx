import { Helmet } from 'react-helmet-async';
import { useLang } from '../../context/LangContext';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

const BASE_URL = 'https://vojtech-adam.cz';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
}: SEOHeadProps) {
  const { lang } = useLang();
  const fullTitle = title.includes('Vojtěch Adam') ? title : `${title} | Vojtěch Adam`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const ogLocale = lang === 'cs' ? 'cs_CZ' : 'en_US';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="cs" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content="Vojtěch Adam" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
