const GA_ID = 'G-YRZLCH6D4R';
const CONSENT_DENIED = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
} as const;
const CONSENT_GRANTED = {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
} as const;
let gaEnabled = false;
let autoTrackingStarted = false;
let lastPagePath: string | null = null;
const SCROLL_THRESHOLDS = [25, 50, 75, 90];
let trackedScrollDepths = new Set<number>();
let sectionObserver: IntersectionObserver | null = null;
const observedSections = new WeakSet<Element>();
let scrollTicking = false;
const DOWNLOAD_EXTENSIONS = [
  'pdf', 'zip', 'rar', '7z', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv',
];

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function loadGA() {
  if (gaEnabled) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('consent', 'update', CONSENT_GRANTED);
  window.gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false });
  gaEnabled = true;
  initAutoTracking();
}

function canTrack() {
  return getConsent() === 'accepted' && typeof window.gtag === 'function';
}

function getPagePath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (!canTrack()) return;
  window.gtag('event', eventName, params);
}

export function trackPageView(path?: string) {
  if (!canTrack()) return;
  const pagePath = path ?? getPagePath();
  if (lastPagePath === pagePath) return;
  lastPagePath = pagePath;
  trackEvent('page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: document.title,
    page_referrer: document.referrer || undefined,
  });
}

export function resetScrollDepth() {
  trackedScrollDepths = new Set<number>();
}

export function observeSections() {
  if (!sectionObserver) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const label = (entry.target as HTMLElement).dataset.analyticsSection;
          if (label) {
            trackEvent('section_view', {
              section: label,
              page_path: getPagePath(),
            });
          }
          sectionObserver?.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
  }

  document.querySelectorAll('[data-analytics-section]').forEach((section) => {
    if (observedSections.has(section)) return;
    observedSections.add(section);
    sectionObserver?.observe(section);
  });
}

function handleScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    scrollTicking = false;
    if (!canTrack()) return;
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) return;
    const percent = Math.round((scrollTop / scrollHeight) * 100);

    SCROLL_THRESHOLDS.forEach((threshold) => {
      if (percent >= threshold && !trackedScrollDepths.has(threshold)) {
        trackedScrollDepths.add(threshold);
        trackEvent('scroll_depth', {
          percent_scrolled: threshold,
          page_path: getPagePath(),
        });
      }
    });
  });
}

function getLinkText(el: HTMLAnchorElement | HTMLButtonElement) {
  const label = el.getAttribute('data-analytics-label');
  if (label) return label;
  const text = el.textContent?.trim().replace(/\s+/g, ' ') || '';
  return text.slice(0, 120);
}

function handleDocumentClick(event: MouseEvent) {
  if (!canTrack()) return;
  const target = event.target as HTMLElement | null;
  if (!target) return;
  const link = target.closest('a[href]') as HTMLAnchorElement | null;
  const button = target.closest('button') as HTMLButtonElement | null;

  if (link) {
    const rawHref = link.getAttribute('href') || '';
    if (!rawHref || rawHref.startsWith('#')) return;

    if (rawHref.startsWith('mailto:')) {
      trackEvent('contact_click', { method: 'email', link_url: rawHref });
      return;
    }
    if (rawHref.startsWith('tel:')) {
      trackEvent('contact_click', { method: 'phone', link_url: rawHref });
      return;
    }
    if (rawHref.startsWith('https://wa.me/')) {
      trackEvent('contact_click', { method: 'whatsapp', link_url: rawHref });
      return;
    }

    let url: URL | null = null;
    try {
      url = new URL(rawHref, window.location.origin);
    } catch {
      return;
    }

    const isExternal = url.origin !== window.location.origin;
    const extension = url.pathname.split('.').pop()?.toLowerCase() || '';
    const isDownload =
      link.hasAttribute('download') || DOWNLOAD_EXTENSIONS.includes(extension);

    if (isDownload) {
      trackEvent('file_download', {
        link_url: url.href,
        file_name: url.pathname.split('/').pop(),
        file_extension: extension || undefined,
      });
    }

    if (isExternal) {
      trackEvent('click', {
        link_url: url.href,
        link_domain: url.hostname,
        outbound: true,
        link_text: getLinkText(link),
      });
      return;
    }

    if (link.dataset.analytics === 'cta') {
      trackEvent('cta_click', {
        label: getLinkText(link),
        link_url: url.href,
        page_path: getPagePath(),
      });
    }
    return;
  }

  if (button && button.dataset.analytics === 'cta') {
    trackEvent('cta_click', {
      label: getLinkText(button),
      page_path: getPagePath(),
    });
  }
}

export function initAutoTracking() {
  if (autoTrackingStarted) return;
  autoTrackingStarted = true;
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('click', handleDocumentClick, { capture: true });
  observeSections();
}

export function getConsent(): 'accepted' | 'rejected' | null {
  return localStorage.getItem('cookie_consent') as 'accepted' | 'rejected' | null;
}

export function setConsent(value: 'accepted' | 'rejected') {
  localStorage.setItem('cookie_consent', value);
  if (value === 'accepted') {
    loadGA();
  } else if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', CONSENT_DENIED);
  }
  window.dispatchEvent(new CustomEvent('cookie_consent', { detail: value }));
}
