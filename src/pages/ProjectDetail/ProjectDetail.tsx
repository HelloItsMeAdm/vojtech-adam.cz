import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../../data/projects';
import SEOHead from '../../components/SEO/SEOHead';
import type { Project } from '../../data/projects';
import {
  ArrowLeftIcon, ExternalLinkIcon, CodeIcon, SmartphoneIcon,
  GlobeIcon, CameraIcon, ServerIcon, WrenchIcon, MusicIcon, ChartIcon,
} from '../../components/Icons';
import { trackEvent } from '../../utils/analytics';
import styles from './ProjectDetail.module.css';

function projectIcon(icon: Project['icon'], size = 36) {
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

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const project = projects.find(p => p.slug === slug && p.visibility === 'public');
  if (!project) return <Navigate to="/projekty" replace />;
  const projectName = t(`${project.i18nKey}.name`);
  const projectShortDesc = t(`${project.i18nKey}.short_desc`);
  const projectDesc = t(`${project.i18nKey}.desc`);

  useEffect(() => {
    trackEvent('view_item', {
      item_id: project.slug,
      item_name: projectName,
      item_category: project.icon,
    });
  }, [project.slug, projectName, project.icon]);

  return (
    <main className={styles.main} data-analytics-section="project_detail">
      <SEOHead
        title={projectName}
        description={projectShortDesc}
        canonical={`/projekty/${project.slug}`}
      />
      <div className="container">
        <div className={styles.inner}>
          <Link to="/projekty" className={`btn btn-ghost ${styles.back}`}>
            <ArrowLeftIcon /> {t('common.back')}
          </Link>

          <header className={styles.header}>
            <div className={styles.headerTop}>
              <div className={styles.projectIcon}>
                {projectIcon(project.icon)}
              </div>
              <span className={`status status-${project.status}`}>
                {t(`projects.status_${project.status}`)}
              </span>
            </div>
            <h1>{projectName}</h1>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className="tag tag-accent">{tag}</span>
              ))}
            </div>
          </header>

          <div className={styles.body}>
            {project.image && (
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={projectName} className={styles.image} />
              </div>
            )}

            <div className={styles.description}>
              <p>{projectDesc}</p>
            </div>

            {project.links.length > 0 && (
              <div className={styles.links}>
                {project.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {t(`${project.i18nKey}.links.${link.labelKey}`)} <ExternalLinkIcon />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
