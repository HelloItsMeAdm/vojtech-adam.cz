import { useEffect } from 'react';

export default function Interactions() {
  useEffect(() => {
    // ── 3D tilt on .card elements ────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const card = (e.target as Element).closest('.card') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'none';
        card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) scale(1.025)`;
      }

      // Magnetic btn-primary — gentle pull, capped at 6px
      const btn = (e.target as Element).closest('.btn-primary') as HTMLElement | null;
      if (btn) {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = Math.max(-6, Math.min(6, (e.clientX - cx) * 0.14));
        const dy = Math.max(-4, Math.min(4, (e.clientY - cy) * 0.14));
        btn.style.transition = 'transform 0.18s ease, background var(--transition)';
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.classList.contains('card')) {
        el.style.transition = 'transform 0.55s cubic-bezier(.25,.46,.45,.94), box-shadow var(--transition), border-color var(--transition)';
        el.style.transform = '';
        setTimeout(() => { if (!el.matches(':hover')) el.style.transition = ''; }, 600);
      }

      if (el.classList.contains('btn-primary')) {
        el.style.transition = 'transform 0.4s cubic-bezier(.25,.46,.45,.94), background var(--transition)';
        el.style.transform = '';
        setTimeout(() => { if (!el.matches(':hover')) el.style.transition = ''; }, 450);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return null;
}
