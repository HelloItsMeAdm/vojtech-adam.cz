import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    let io: IntersectionObserver | null = null;

    // Wait for view transition to complete (vtIn = 260ms) before observing
    const timer = setTimeout(() => {
      io = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io?.unobserve(e.target);
          }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );
      document.querySelectorAll('.reveal').forEach(el => io!.observe(el));
    }, 350);

    return () => {
      clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
