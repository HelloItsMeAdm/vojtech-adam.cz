import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import SEOHead from "../../components/SEO/SEOHead";
import { webReferences } from "../../data/webdesign";
import {
  ExternalLinkIcon,
  CheckIcon,
  PaletteIcon,
  ServerIcon,
  WrenchIcon,
  CodeIcon,
  MessageIcon,
  RocketIcon,
} from "../../components/Icons";
import StickyFeatures, {
  type StickyFeatureItem,
} from "../../components/StickyFeatures/StickyFeatures";
import styles from "./WebDesign.module.css";

const offers = [
  { key: "design", icon: <PaletteIcon size={22} /> },
  { key: "hosting", icon: <ServerIcon size={22} /> },
  { key: "maintenance", icon: <WrenchIcon size={22} /> },
] as const;

function BrowserMockup({
  url,
  name,
  desc,
  wip,
}: {
  url: string;
  name: string;
  desc: string;
  wip?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.browser}>
      <div className={styles.browserBar}>
        <div className={styles.browserDots}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.browserUrl}>
          {wip ? t("webdesign.browser_coming") : url.replace("https://", "")}
        </div>
      </div>
      <div className={styles.browserContent}>
        <div className={styles.browserSite}>
          <p className={styles.browserSiteName}>{name}</p>
          <p className={styles.browserSiteDesc}>{desc}</p>
          {!wip && (
            <a
              href={`https://${url.replace("https://", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary ${styles.browserBtn}`}
              data-analytics-label={`webdesign_reference_${name}`}
            >
              {t("webdesign.browser_open")} <ExternalLinkIcon />
            </a>
          )}
          {wip && (
            <span className="tag tag-accent">{t("webdesign.browser_wip")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WebDesign() {
  const { t, i18n } = useTranslation();
  const isCs = i18n.language === "cs";

  const processSteps: StickyFeatureItem[] = [
    {
      icon: <MessageIcon size={48} />,
      label: t("webdesign.process.consultation.label"),
      title: t("webdesign.process.consultation.title"),
      desc: t("webdesign.process.consultation.desc"),
    },
    {
      icon: <PaletteIcon size={48} />,
      label: t("webdesign.process.design.label"),
      title: t("webdesign.process.design.title"),
      desc: t("webdesign.process.design.desc"),
    },
    {
      icon: <CodeIcon size={48} />,
      label: t("webdesign.process.development.label"),
      title: t("webdesign.process.development.title"),
      desc: t("webdesign.process.development.desc"),
    },
    {
      icon: <RocketIcon size={48} />,
      label: t("webdesign.process.launch.label"),
      title: t("webdesign.process.launch.title"),
      desc: t("webdesign.process.launch.desc"),
    },
  ];

  return (
    <main className={styles.main}>
      <SEOHead
        title={t("webdesign.seo_title")}
        description={t("webdesign.seo_desc")}
        canonical="/weby"
      />
      {/* ── Hero ────────────────────────────────────────── */}
      <section className={styles.hero} data-analytics-section="webdesign_hero">
        <div className={styles.heroBg} aria-hidden />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className="section-label">{t("webdesign.hero_label")}</p>
              <h1 className={styles.heroTitle}>
                <Trans i18nKey="webdesign.hero_title">
                  <span className={styles.accent}>fungují.</span>
                </Trans>
              </h1>
              <p className={styles.heroSubtitle}>{t("webdesign.subtitle")}</p>
              <Link
                to="/kontakt"
                className={`btn btn-primary ${styles.heroCta}`}
                data-analytics="cta"
                data-analytics-label="webdesign_hero_contact"
              >
                {t("webdesign.cta")}
              </Link>
            </div>

            <div className={styles.heroFeatures}>
              {offers.map((o) => (
                <div key={o.key} className={styles.heroFeature}>
                  <span className={styles.heroFeatureIcon}>{o.icon}</span>
                  <span>{t(`webdesign.offer_${o.key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process — sticky scroll ─────────────────────── */}
      <section
        className={`section ${styles.processSection}`}
        data-analytics-section="webdesign_process"
      >
        <div className="container">
          <div className="section-header reveal">
            <p className="section-label">{t("webdesign.process_label")}</p>
            <h2>{t("webdesign.process_title")}</h2>
          </div>
          <StickyFeatures features={processSteps} />
        </div>
      </section>

      {/* ── References ──────────────────────────────────── */}
      <section
        className="section"
        data-analytics-section="webdesign_references"
      >
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("webdesign.references_title")}</p>
            <h2>{t("webdesign.references_title")}</h2>
          </div>

          {/* Featured — Šlapni k nám */}
          <div className={styles.featuredRef}>
            <div className={styles.featuredText}>
              <div className={styles.featuredBadge}>
                {t("webdesign.featured.badge")}
              </div>
              <h3>Šlapni k nám</h3>
              <p>{t("webdesign.featured.desc")}</p>
              <div className={styles.featuredStats}>
                <div className={styles.featuredStat}>
                  <span className={styles.featuredStatNum}>43</span>
                  <span>{t("webdesign.featured.stat_partners")}</span>
                </div>
                <div className={styles.featuredStat}>
                  <span className={styles.featuredStatNum}>100%</span>
                  <span>{t("webdesign.featured.stat_individual")}</span>
                </div>
              </div>
              <a
                href="https://slapniknam.cz/web"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-analytics-label="webdesign_featured_slapniknam"
              >
                slapniknam.cz <ExternalLinkIcon />
              </a>
            </div>
            <BrowserMockup
              url="slapniknam.cz/web"
              name="Šlapni k nám"
              desc={t("webdesign.featured.mockup_desc")}
            />
          </div>

          {/* Other references */}
          <div className={styles.refGrid}>
            {webReferences
              .filter((r) => r.name !== "Šlapni k nám")
              .map((ref) => (
                <BrowserMockup
                  key={ref.name}
                  url={ref.url}
                  name={ref.name}
                  desc={isCs ? ref.desc : ref.descEn}
                  wip={ref.url === "#"}
                />
              ))}
          </div>
        </div>
      </section>

      {/* ── Price note ──────────────────────────────────── */}
      <section
        className={`section ${styles.priceSection}`}
        data-analytics-section="webdesign_price"
      >
        <div className="container">
          <div className={styles.priceNote}>
            <CheckIcon size={18} />
            <p>{t("webdesign.price_note")}</p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        className={`section ${styles.ctaSection}`}
        data-analytics-section="webdesign_cta"
      >
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>{t("webdesign.cta_title")}</h2>
            <p>{t("webdesign.cta_desc")}</p>
            <Link
              to="/kontakt"
              className={`btn btn-primary ${styles.ctaBtn}`}
              data-analytics="cta"
              data-analytics-label="webdesign_cta_contact"
            >
              {t("webdesign.cta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
