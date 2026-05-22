import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './StickyFeatures.module.css';

export interface StickyFeatureItem {
  icon: ReactNode;
  label: string;
  title: string;
  desc: string;
}

export default function StickyFeatures({ features }: { features: StickyFeatureItem[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.5;
      let bestIdx = 0;
      let bestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = (r.top + r.bottom) / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      setActive(bestIdx);
    };

    window.addEventListener('scroll', update, { passive: true });
    // Initial call after layout settles
    const t = setTimeout(update, 100);
    return () => {
      window.removeEventListener('scroll', update);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={styles.root}>
      {/* Sticky visual panel */}
      <div className={styles.sticky}>
        <div className={styles.card}>
          {features.map((f, i) => (
            <div key={i} className={`${styles.visual} ${active === i ? styles.visualActive : ''}`}>
              <div className={styles.visualIcon}>{f.icon}</div>
              <span className={styles.visualLabel}>{f.label}</span>
            </div>
          ))}
          <div className={styles.dots}>
            {features.map((_, i) => (
              <span key={i} className={`${styles.dot} ${active === i ? styles.dotActive : ''}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable items */}
      <div className={styles.list}>
        {features.map((f, i) => (
          <div
            key={i}
            ref={el => { itemRefs.current[i] = el; }}
            className={`${styles.item} ${active === i ? styles.itemActive : ''}`}
          >
            <div className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</div>
            <div className={styles.itemBody}>
              <h3 className={styles.itemTitle}>{f.title}</h3>
              <p className={styles.itemDesc}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
