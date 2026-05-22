import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let raf: number;
    let tx = -9999, ty = -9999;
    let ox = -9999, oy = -9999;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const tick = () => {
      ox += (tx - ox) * 0.055;
      oy += (ty - oy) * 0.055;
      outer.style.transform = `translate(${ox - 300}px, ${oy - 300}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0,
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,.09) 0%, rgba(99,102,241,.04) 45%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: -1,
        willChange: 'transform',
      }}
    />
  );
}
