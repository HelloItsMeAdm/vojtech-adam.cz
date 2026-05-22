import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../data/projects';
import {
  CodeIcon, SmartphoneIcon, GlobeIcon, CameraIcon,
  ServerIcon, WrenchIcon, MusicIcon, ChartIcon,
} from '../Icons';
import { trackEvent } from '../../utils/analytics';
import styles from './ProjectModal.module.css';

function projectIcon(icon: Project['icon'], size = 32) {
  switch (icon) {
    case 'smartphone': return <SmartphoneIcon size={size} />;
    case 'globe': return <GlobeIcon size={size} />;
    case 'camera': return <CameraIcon size={size} />;
    case 'server': return <ServerIcon size={size} />;
    case 'tool': return <WrenchIcon size={size} />;
    case 'music': return <MusicIcon size={size} />;
    case 'chart': return <ChartIcon size={size} />;
    default: return <CodeIcon size={size} />;
  }
}

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useTranslation();
  const projectName = t(`${project.i18nKey}.name`);
  const projectDesc = t(`${project.i18nKey}.desc`);

  const handleClose = useCallback(() => {
    trackEvent('modal_close', { modal: 'project', item_id: project.slug });
    onClose();
  }, [onClose, project.slug]);

  useEffect(() => {
    trackEvent('view_item', {
      item_id: project.slug,
      item_name: projectName,
      item_category: project.icon,
      view_type: 'modal',
    });
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [handleClose, project.slug, projectName, project.icon]);

  const screenshots = project.screenshots ?? [];
  const isPublic = project.visibility === 'public';

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div
        className={`${styles.modal} ${isPublic ? styles.modalPublic : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={handleClose} aria-label={t('projects.modal_close')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.header}>
          <div className={styles.iconWrap}>{projectIcon(project.icon, isPublic ? 48 : 40)}</div>
          <div className={styles.headerText}>
            <div className={styles.headerMeta}>
              <span className={`status status-${project.status}`}>
                {t(`projects.status_${project.status}`)}
              </span>
            </div>
            <h2>{projectName}</h2>
            <div className={styles.tags}>
              {project.tags.map(tag => <span key={tag} className="tag tag-accent">{tag}</span>)}
            </div>
          </div>
        </div>

        <p className={styles.desc}>{projectDesc}</p>

        {project.links.length > 0 && (
          <div className={styles.cta}>
            <p className={styles.ctaLabel}>{t('projects.modal_cta_label')}</p>
            <div className={styles.ctaButtons}>
              {project.links.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={i === 0 ? styles.ctaPrimary : styles.ctaSecondary}
                >
                  {t(`${project.i18nKey}.links.${link.labelKey}`)}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {screenshots.length > 0 && (
          <div
            className={`${styles.screenshots} ${
              screenshots.length === 1 ? styles.single : ""
            } ${screenshots.length === 2 ? styles.two : ""}`}
          >
            {screenshots.map((src, i) => (
              <div key={i} className={styles.screenshotWrap}>
                <img
                  src={src}
                  alt={t('common.screenshot_alt', { name: projectName, index: i + 1 })}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
