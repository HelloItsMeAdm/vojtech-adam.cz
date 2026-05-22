import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Reset on route change
    bar.style.transform = 'scaleX(0)';

    const update = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? scrollY / docH : 0;
      bar.style.transform = `scaleX(${pct})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 65%, #7c3aed))',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
