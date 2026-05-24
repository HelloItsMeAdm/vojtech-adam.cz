import React from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEO/SEOHead";
import { skills, timeline, type SkillIcon } from "../../data/skills";
import {
  TvIcon,
  CameraIcon,
  CodeIcon,
  NewspaperIcon,
  DroneIcon,
  GlobeIcon,
  ServerIcon,
  PaletteIcon,
  VideoIcon,
  BranchIcon,
} from "../../components/Icons";
import StickyFeatures, {
  type StickyFeatureItem,
} from "../../components/StickyFeatures/StickyFeatures";
import styles from "./About.module.css";

const mediaItems = [
  {
    id: "cnn",
    outlet: "CNN Prima News",
    year: "2024",
    icon: "tv" as const,
    image: "/images/media/cnn.png",
    links: [] as { labelKey: string; url: string }[],
  },
  {
    id: "school_notebooks",
    outlet: "OA & SOŠ Logistická Opava",
    year: "2024",
    icon: "camera" as const,
    image: "/images/media/school_notebooks.png",
    links: [] as { labelKey: string; url: string }[],
  },
  {
    id: "bruntalsky_info",
    outlet: "Bruntálský Info",
    year: "2024",
    icon: "newspaper" as const,
    image: "/images/media/bruntalsky_info.jpg",
    links: [] as { labelKey: string; url: string }[],
  },
  {
    id: "dance_up",
    outlet: "Vítkovský Zpravodaj",
    year: "2025",
    icon: "newspaper" as const,
    image: "/images/media/dance_up.png",
    links: [
      {
        labelKey: "my_instagram",
        url: "https://www.instagram.com/photographer_vojtech/",
      },
      {
        labelKey: "dance_up_instagram",
        url: "https://www.instagram.com/ts_danceup/",
      },
    ],
  },
  {
    id: "hlaska_opava",
    outlet: "Hláska Opava",
    year: "2025",
    icon: "newspaper" as const,
    image: "/images/media/hlaska_opava.png",
    links: [] as { labelKey: string; url: string }[],
  },
];

function getAge() {
  const birth = new Date("2005-05-29");
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

export default function About() {
  const { t } = useTranslation();

  const skillIcon = (icon: SkillIcon) => {
    const props = { size: 16, className: styles.skillTagIcon };
    switch (icon) {
      case "code":
        return <CodeIcon {...props} />;
      case "server":
        return <ServerIcon {...props} />;
      case "git":
        return <BranchIcon {...props} />;
      case "camera":
        return <CameraIcon {...props} />;
      case "drone":
        return <DroneIcon {...props} />;
      case "palette":
        return <PaletteIcon {...props} />;
      case "video":
        return <VideoIcon {...props} />;
      default:
        return <CodeIcon {...props} />;
    }
  };

  const skillGroups = [
    {
      key: "dev",
      title: t("about.skills_dev"),
      items: skills.filter((s) => s.category === "dev"),
    },
    {
      key: "creative",
      title: t("about.skills_creative"),
      items: skills.filter((s) => s.category === "creative"),
    },
  ];

  const expertiseAreas: StickyFeatureItem[] = [
    {
      icon: <CodeIcon size={48} />,
      label: t("about.expertise.development.label"),
      title: t("about.expertise.development.title"),
      desc: t("about.expertise.development.desc"),
    },
    {
      icon: <GlobeIcon size={48} />,
      label: t("about.expertise.websites.label"),
      title: t("about.expertise.websites.title"),
      desc: t("about.expertise.websites.desc"),
    },
    {
      icon: <CameraIcon size={48} />,
      label: t("about.expertise.photography.label"),
      title: t("about.expertise.photography.title"),
      desc: t("about.expertise.photography.desc"),
    },
    {
      icon: <DroneIcon size={48} />,
      label: t("about.expertise.drone.label"),
      title: t("about.expertise.drone.title"),
      desc: t("about.expertise.drone.desc"),
    },
  ];

  return (
    <main className={styles.main}>
      <SEOHead
        title={t("about.seo_title")}
        description={t("about.seo_desc")}
        canonical="/o-mne"
      />
      <div className="container">
        {/* ── Header ──────────────────────────────────────── */}
        <section
          className={`section ${styles.headerSection}`}
          data-analytics-section="about_header"
        >
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <p className="section-label">{t("about.section_label_who")}</p>
              <h1>{t("about.title")}</h1>
              <p className={styles.bio}>{t("about.bio", { age: getAge() })}</p>
            </div>
            <div className={styles.headerImageWrap}>
              <img
                src="/images/vojtech-adam-hero.jpg"
                alt="Vojtech Adam"
                className={styles.headerImage}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>
      </div>

      {/* ── Expertise areas — sticky scroll ─────────────── */}
      <section
        className={`section ${styles.expertiseSection}`}
        data-analytics-section="about_expertise"
      >
        <div className="container">
          <div className={`section-header reveal`}>
            <p className="section-label">{t("about.section_label_what")}</p>
            <h2>{t("about.section_title_areas")}</h2>
          </div>
          <StickyFeatures features={expertiseAreas} />
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────── */}
      <section
        className={`section-sm ${styles.skillsSection}`}
        data-analytics-section="about_skills"
      >
        <div className="container">
          <h2 className={`${styles.sectionTitle} reveal`}>
            {t("about.skills_title")}
          </h2>
          <div className={styles.skillsGrid}>
            {skillGroups.map((group, groupIndex) => (
              <div key={group.key} className={styles.skillGroup}>
                <p
                  className={`${styles.skillCategory} reveal`}
                  style={
                    {
                      "--reveal-delay": `${groupIndex * 120}ms`,
                    } as React.CSSProperties
                  }
                >
                  {group.title}
                </p>
                <div className={styles.skillTags}>
                  {group.items.map((skill, skillIndex) => (
                    <span
                      key={skill.name}
                      className={`${styles.skillTag} reveal`}
                      style={
                        {
                          "--reveal-delay": `${groupIndex * 120 + skillIndex * 60}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {skillIcon(skill.icon)}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />

        {/* ── Timeline ────────────────────────────────────── */}
        <section
          className={`section-sm ${styles.timelineSection}`}
          data-analytics-section="about_timeline"
        >
          <h2 className={styles.sectionTitle}>{t("about.timeline_title")}</h2>
          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`${styles.timelineItem} reveal`}
                style={
                  { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                }
              >
                <div className={styles.timelineLeft}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <div className={styles.timelineDot} />
                </div>
                <div className={styles.timelineContent}>
                  <h3>{t(`${item.i18nKey}.title`)}</h3>
                  <p className="text-muted">{t(`${item.i18nKey}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* ── Media ───────────────────────────────────────── */}
        <section
          className={`section-sm ${styles.mediaSection}`}
          data-analytics-section="about_media"
        >
          <h2 className={styles.sectionTitle}>{t("about.media_title")}</h2>
          <div className={styles.mediaList}>
            {mediaItems.map((item, i) => (
              <div
                key={i}
                className={`${styles.mediaCard} reveal`}
                style={
                  { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                }
              >
                <div className={styles.mediaIconWrap}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.outlet}
                      className={styles.mediaImage}
                    />
                  ) : (
                    <div className={styles.mediaIcon}>
                      {item.icon === "tv" ? (
                        <TvIcon size={28} />
                      ) : item.icon === "newspaper" ? (
                        <NewspaperIcon size={28} />
                      ) : (
                        <CameraIcon size={28} />
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.mediaBody}>
                  <div className={styles.mediaHeader}>
                    <span className={styles.mediaOutlet}>{item.outlet}</span>
                    <span className={styles.mediaYear}>{item.year}</span>
                  </div>
                  <h3 className={styles.mediaTitle}>
                    {t(`media.items.${item.id}.title`)}
                  </h3>
                  <p className={styles.mediaDesc}>
                    {t(`media.items.${item.id}.desc`)}
                  </p>
                  {item.links.length > 0 && (
                    <div className={styles.mediaLinks}>
                      {item.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.mediaLink}
                        >
                          {t(`media.items.${item.id}.links.${link.labelKey}`)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
