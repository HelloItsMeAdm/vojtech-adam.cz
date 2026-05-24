import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEO/SEOHead";
import { publicProjects } from "../../data/projects";
import { teaserPhotos } from "../../data/photos";
import {
  ArrowRightIcon,
  CodeIcon,
  SmartphoneIcon,
  GlobeIcon,
  CameraIcon,
  DroneIcon,
  PaletteIcon,
  ResponsiveIcon,
  ShieldIcon,
  WrenchIcon,
} from "../../components/Icons";
import StickyFeatures, {
  type StickyFeatureItem,
} from "../../components/StickyFeatures/StickyFeatures";
import SkeletonImage from "../../components/SkeletonImage/SkeletonImage";
import styles from "./Home.module.css";

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  justintime: <SmartphoneIcon size={28} />,
  fastcoupons: <SmartphoneIcon size={28} />,
  fotografie: <CameraIcon size={28} />,
  "weby-na-zakazku": <GlobeIcon size={28} />,
};

export default function Home() {
  const { t } = useTranslation();
  const hasPhotos = teaserPhotos.length > 0;

  const featuredProjects = publicProjects.slice(0, 3);

  const webFeatures: StickyFeatureItem[] = [
    {
      icon: <PaletteIcon size={48} />,
      label: t("home.webfeature_design_label"),
      title: t("home.webfeature_design_title"),
      desc: t("home.webfeature_design_desc"),
    },
    {
      icon: <ResponsiveIcon size={48} />,
      label: t("home.webfeature_responsive_label"),
      title: t("home.webfeature_responsive_title"),
      desc: t("home.webfeature_responsive_desc"),
    },
    {
      icon: <ShieldIcon size={48} />,
      label: t("home.webfeature_security_label"),
      title: t("home.webfeature_security_title"),
      desc: t("home.webfeature_security_desc"),
    },
    {
      icon: <WrenchIcon size={48} />,
      label: t("home.webfeature_maintenance_label"),
      title: t("home.webfeature_maintenance_title"),
      desc: t("home.webfeature_maintenance_desc"),
    },
  ];

  return (
    <main className={styles.main}>
      <SEOHead
        title={t("home.seo_title")}
        description={t("home.seo_desc")}
        canonical="/"
      />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero} data-analytics-section="home_hero">
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.orb0} aria-hidden />
        <div className={styles.orb1} aria-hidden />
        <div className={styles.orb2} aria-hidden />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.heroGreeting}>{t("home.hero_greeting")}</p>
              <h1 className={styles.heroName}>{t("home.hero_name")}</h1>
              {t("home.hero_alias") && (
                <p className={styles.heroAlias}>{t("home.hero_alias")}</p>
              )}
              <p className={styles.heroDesc}>{t("home.hero_desc")}</p>
              <div className={styles.heroCta}>
                <Link
                  to="/projekty"
                  className="btn btn-primary"
                  data-analytics="cta"
                  data-analytics-label="home_hero_projects"
                >
                  {t("home.hero_cta_projects")} <ArrowRightIcon />
                </Link>
                <Link
                  to="/kontakt"
                  className="btn btn-secondary"
                  data-analytics="cta"
                  data-analytics-label="home_hero_contact"
                >
                  {t("home.hero_cta_contact")}
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden>
              <div className={styles.heroGlow} />
              <img src="/favicon.svg" alt="" className={styles.heroLogo} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section
        className={`section ${styles.projectsSection}`}
        data-analytics-section="home_projects"
      >
        <div className="container">
          <div className={`section-header ${styles.sectionHeader} reveal`}>
            <p className="section-label">{t("home.section_projects")}</p>
            <h2>{t("home.section_projects_desc")}</h2>
          </div>
          <div className="grid-3">
            {featuredProjects.map((p, i) => (
              <Link
                key={p.slug}
                to={`/projekty/${p.slug}`}
                className={`card ${styles.projectCard} reveal`}
                data-analytics="cta"
                data-analytics-label={`home_project_${p.slug}`}
                style={
                  { "--reveal-delay": `${i * 100}ms` } as React.CSSProperties
                }
              >
                <div className={styles.projectIcon}>
                  {PROJECT_ICONS[p.slug] ?? <CodeIcon size={28} />}
                </div>
                <h3>{t(`${p.i18nKey}.name`)}</h3>
                <p className="text-muted">{t(`${p.i18nKey}.short_desc`)}</p>
                <div className={styles.projectTags}>
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className={`status status-${p.status} ${styles.projectStatus}`}
                >
                  {t(`projects.status_${p.status}`)}
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.sectionCta}>
            <Link
              to="/projekty"
              className="btn btn-secondary"
              data-analytics="cta"
              data-analytics-label="home_projects_all"
            >
              {t("projects.all_projects")} <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Web design — sticky scroll showcase ─────────── */}
      <section
        className={`section ${styles.webSection}`}
        data-analytics-section="home_webdesign"
      >
        <div className="container">
          <div className={`section-header ${styles.sectionHeader} reveal`}>
            <p className="section-label">{t("home.section_webdesign")}</p>
            <h2>{t("home.section_webdesign_desc")}</h2>
          </div>
          <StickyFeatures features={webFeatures} />
          <div className={styles.sectionCta}>
            <Link
              to="/weby"
              className="btn btn-primary"
              data-analytics="cta"
              data-analytics-label="home_webdesign_more"
            >
              {t("home.see_more")} <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Photography teaser ───────────────────────────── */}
      <section
        className={`section ${styles.photoSection}`}
        data-analytics-section="home_photography"
      >
        <div className="container">
          <div className={`${styles.photoLayout} reveal`}>
            <div className={styles.photoText}>
              <p className="section-label">{t("home.section_photography")}</p>
              <h2>{t("home.section_photography_desc")}</h2>
              <div className={styles.photoMeta}>
                <div className={styles.photoMetaItem}>
                  <CameraIcon size={20} />
                  <span>{t("home.section_photography_list_item")}</span>
                </div>
                <div className={styles.photoMetaItem}>
                  <DroneIcon size={20} />
                  <span>DJI Mini 4 Pro</span>
                </div>
              </div>
              <div className={styles.photoLinks}>
                <a
                  href="https://www.instagram.com/photographer_vojtech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  data-analytics-label="home_photography_instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://stock.adobe.com/cz/contributor/212297235/VojtechAdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  data-analytics-label="home_photography_adobe_stock"
                >
                  Adobe Stock
                </a>
                <Link
                  to="/fotografie"
                  className="btn btn-ghost"
                  data-analytics="cta"
                  data-analytics-label="home_photography_more"
                >
                  {t("home.see_more")} <ArrowRightIcon />
                </Link>
              </div>
            </div>

            {/* Photo grid */}
            <div className={styles.photoGrid}>
              {hasPhotos ? (
                teaserPhotos.map((photo, i) => (
                  <div
                    key={i}
                    className={`${styles.photoCell} ${styles[`cell${i}`]}`}
                  >
                    <SkeletonImage
                      src={photo.src}
                      alt={t(photo.i18nKey)}
                      loading="lazy"
                    />
                    {photo.category === "drone" && (
                      <div className={styles.photoCategoryBadge}>
                        <DroneIcon size={12} />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                /* Placeholder grid when no photos are set */
                <>
                  <div
                    className={`${styles.photoCell} ${styles.cell0} ${styles.placeholder}`}
                  >
                    <CameraIcon size={32} />
                    <span>{t("home.section_photography")}</span>
                  </div>
                  <div
                    className={`${styles.photoCell} ${styles.cell1} ${styles.placeholder}`}
                  >
                    <DroneIcon size={32} />
                    <span>DJI Mini 4 Pro</span>
                  </div>
                  <div
                    className={`${styles.photoCell} ${styles.cell2} ${styles.placeholder}`}
                  />
                  <div
                    className={`${styles.photoCell} ${styles.cell3} ${styles.placeholder}`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
