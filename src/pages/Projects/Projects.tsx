import { useState } from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEO/SEOHead";
import { publicProjects, personalProjects } from "../../data/projects";
import type { Project } from "../../data/projects";
import {
  CodeIcon,
  SmartphoneIcon,
  GlobeIcon,
  CameraIcon,
  ServerIcon,
  WrenchIcon,
  MusicIcon,
  ChartIcon,
  ExternalLinkIcon,
} from "../../components/Icons";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import { trackEvent } from "../../utils/analytics";
import styles from "./Projects.module.css";

export function projectIcon(icon: Project["icon"], size = 32) {
  switch (icon) {
    case "smartphone":
      return <SmartphoneIcon size={size} />;
    case "globe":
      return <GlobeIcon size={size} />;
    case "camera":
      return <CameraIcon size={size} />;
    case "server":
      return <ServerIcon size={size} />;
    case "tool":
      return <WrenchIcon size={size} />;
    case "music":
      return <MusicIcon size={size} />;
    case "chart":
      return <ChartIcon size={size} />;
    default:
      return <CodeIcon size={size} />;
  }
}

function PublicCard({
  p,
  onClick,
}: {
  p: Project;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const projectName = t(`${p.i18nKey}.name`);
  const projectShortDesc = t(`${p.i18nKey}.short_desc`);
  const handleClick = () => {
    trackEvent('select_content', {
      content_type: 'project_card',
      item_id: p.slug,
      item_name: projectName,
      project_visibility: p.visibility,
    });
    onClick();
  };
  return (
    <button
      className={`card ${styles.card} ${styles.cardPublic}`}
      onClick={handleClick}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{projectIcon(p.icon)}</div>
        <span className={`status status-${p.status}`}>
          {t(`projects.status_${p.status}`)}
        </span>
      </div>
      <h2 className={styles.cardTitle}>{projectName}</h2>
      <p className={styles.cardDesc}>{projectShortDesc}</p>
      <div className={styles.tags}>
        {p.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {p.links.length > 0 && (
        <div className={styles.cardLinks}>
          {p.links.slice(0, 2).map((l) => (
            <span key={l.url} className={styles.cardLinkHint}>
              <ExternalLinkIcon size={12} /> {t(`${p.i18nKey}.links.${l.labelKey}`)}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

function PersonalCard({
  p,
  onClick,
}: {
  p: Project;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const projectName = t(`${p.i18nKey}.name`);
  const projectShortDesc = t(`${p.i18nKey}.short_desc`);
  const hasPreview = (p.screenshots?.length ?? 0) > 0;
  const handleClick = () => {
    if (!hasPreview) return;
    trackEvent('select_content', {
      content_type: 'project_card',
      item_id: p.slug,
      item_name: projectName,
      project_visibility: p.visibility,
    });
    onClick();
  };
  return (
    <button
      className={`card ${styles.card} ${styles.cardPersonal}`}
      onClick={handleClick}
      style={{ cursor: hasPreview ? "pointer" : "default" }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{projectIcon(p.icon)}</div>
        <div className={styles.cardHeaderRight}>
          <span className={`status status-${p.status}`}>
            {t(`projects.status_${p.status}`)}
          </span>
          {hasPreview && (
            <span className={styles.previewHint}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {t("projects.preview")}
            </span>
          )}
        </div>
      </div>
      <h2 className={styles.cardTitle}>{projectName}</h2>
      <p className={styles.cardDesc}>{projectShortDesc}</p>
      <div className={styles.tags}>
        {p.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <main className={styles.main}>
      <SEOHead
        title={t("projects.seo_title")}
        description={t("projects.seo_desc")}
        canonical="/projekty"
      />
      <div className="container">
        <section className="section" data-analytics-section="projects_public">
          <div className="section-header">
            <p className="section-label">{t("projects.section_label_portfolio")}</p>
            <h1>{t("projects.title")}</h1>
            <p className={styles.subtitle}>{t("projects.subtitle")}</p>
          </div>
          <div className={styles.grid}>
            {publicProjects.map((p) => (
              <PublicCard
                key={p.slug}
                p={p}
                onClick={() => setActiveProject(p)}
              />
            ))}
          </div>
        </section>

        <hr className="divider" />

        <section
          className="section-sm"
          style={{ paddingBottom: "5rem" }}
          data-analytics-section="projects_personal"
        >
          <div className="section-header">
            <p className="section-label">
              {t("projects.section_label_personal")}
            </p>
            <h2>{t("projects.section_title_other")}</h2>
            <p className={styles.subtitle}>
              {t("projects.section_desc_personal")}
            </p>
          </div>
          <div className={styles.grid}>
            {personalProjects.map((p) => (
              <PersonalCard
                key={p.slug}
                p={p}
                onClick={() => setActiveProject(p)}
              />
            ))}
          </div>
        </section>
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </main>
  );
}
