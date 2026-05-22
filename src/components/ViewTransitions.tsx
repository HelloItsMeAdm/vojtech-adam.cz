import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export default function ViewTransitions() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!('startViewTransition' in document)) return;

    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;
      if (anchor.target === '_blank') return;
      if (anchor.origin !== window.location.origin) return;

      const to = anchor.pathname + anchor.search + anchor.hash;
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (!to || to === current) return;

      e.preventDefault();

      (document as any).startViewTransition(() => {
        flushSync(() => {
          window.scrollTo(0, 0);
          navigate(to);
        });
      });
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, [navigate]);

  return null;
}
