import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getConsent,
  initAutoTracking,
  loadGA,
  observeSections,
  resetScrollDepth,
  trackPageView,
} from '../utils/analytics';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (getConsent() !== 'accepted') return;
    loadGA();
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
    resetScrollDepth();
    observeSections();
  }, [location]);

  useEffect(() => {
    if (getConsent() === 'accepted') {
      loadGA();
      initAutoTracking();
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<'accepted' | 'rejected'>).detail;
      if (detail !== 'accepted') return;
      loadGA();
      initAutoTracking();
      trackPageView();
      resetScrollDepth();
      observeSections();
    };

    window.addEventListener('cookie_consent', handler as EventListener);
    return () => window.removeEventListener('cookie_consent', handler as EventListener);
  }, []);

  return null;
}
