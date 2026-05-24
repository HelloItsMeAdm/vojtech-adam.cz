import React, { useState, useEffect, useCallback } from "react";
import { useTranslation, Trans } from "react-i18next";
import SEOHead from "../../components/SEO/SEOHead";
import { photos } from "../../data/photos";
import {
  InstagramIcon,
  AdobeStockIcon,
  ExternalLinkIcon,
  CameraIcon,
  DroneIcon,
  TvIcon,
  NewspaperIcon,
} from "../../components/Icons";
import { trackEvent } from "../../utils/analytics";
import styles from "./Photography.module.css";

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
    outlet: "Hláška Opava",
    year: "2025",
    icon: "newspaper" as const,
    image: "/images/media/hlaska_opava.png",
    links: [] as { labelKey: string; url: string }[],
  },
];

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: (typeof photos)[number];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const photoAlt = t(photo.i18nKey);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button
        className={styles.lightboxClose}
        onClick={onClose}
        aria-label={t("photography.lightbox_close")}
      >
        ✕
      </button>
      <button
        className={styles.lightboxPrev}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label={t("photography.lightbox_prev")}
      >
        ‹
      </button>
      <div className={styles.lightboxImg} onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photoAlt} />
        <p className={styles.lightboxCaption}>{photoAlt}</p>
      </div>
      <button
        className={styles.lightboxNext}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label={t("photography.lightbox_next")}
      >
        ›
      </button>
    </div>
  );
}

export default function Photography() {
  const { t } = useTranslation();
  const hasPhotos = photos.length > 0;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openPhoto = useCallback(
    (i: number) => {
      const photo = photos[i];
      trackEvent("gallery_open", {
        item_id: photo.i18nKey,
        item_name: t(photo.i18nKey),
        index: i,
        category: photo.category,
      });
      setActiveIndex(i);
    },
    [t],
  );

  const closePhoto = useCallback(() => {
    if (activeIndex === null) return;
    const photo = photos[activeIndex];
    trackEvent("gallery_close", {
      item_id: photo.i18nKey,
      item_name: t(photo.i18nKey),
      index: activeIndex,
    });
    setActiveIndex(null);
  }, [activeIndex, t]);

  const prevPhoto = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      const nextIndex = (i - 1 + photos.length) % photos.length;
      const photo = photos[nextIndex];
      trackEvent("gallery_navigate", {
        direction: "prev",
        item_id: photo.i18nKey,
        item_name: t(photo.i18nKey),
        index: nextIndex,
      });
      return nextIndex;
    });
  }, [t]);

  const nextPhoto = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      const nextIndex = (i + 1) % photos.length;
      const photo = photos[nextIndex];
      trackEvent("gallery_navigate", {
        direction: "next",
        item_id: photo.i18nKey,
        item_name: t(photo.i18nKey),
        index: nextIndex,
      });
      return nextIndex;
    });
  }, [t]);

  const [featured, ...rest] = photos;

  return (
    <main className={styles.main}>
      <SEOHead
        title={t("photography.seo_title")}
        description={t("photography.seo_desc")}
        canonical="/fotografie"
      />
      {/* ── Hero ────────────────────────────────────────── */}
      <section
        className={styles.hero}
        data-analytics-section="photography_hero"
      >
        <div className={styles.heroBg} aria-hidden />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className="section-label">{t("photography.hero_label")}</p>
              <h1 className={styles.heroTitle}>
                <Trans i18nKey="photography.hero_title">
                  <span className={styles.accent}>objektivem.</span>
                </Trans>
              </h1>
              <p className={styles.heroSubtitle}>{t("photography.subtitle")}</p>
              <div className={styles.heroCta}>
                <a
                  href="https://www.instagram.com/photographer_vojtech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  data-analytics-label="photography_hero_instagram"
                >
                  <InstagramIcon size={18} /> Instagram
                </a>
                <a
                  href="https://stock.adobe.com/cz/contributor/212297235/VojtechAdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  data-analytics-label="photography_hero_adobe_stock"
                >
                  <AdobeStockIcon size={18} /> Adobe Stock
                </a>
              </div>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <CameraIcon size={28} />
                <div>
                  <span className={styles.statNum}>Canon EOS 200D</span>
                  <span className={styles.statLabel}>
                    {t("photography.stat_camera")}
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <DroneIcon size={28} />
                <div>
                  <span className={styles.statNum}>DJI Mini 4 Pro</span>
                  <span className={styles.statLabel}>
                    {t("photography.stat_drone")}
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <AdobeStockIcon size={28} />
                <div>
                  <span className={styles.statNum}>Adobe Stock</span>
                  <span className={styles.statLabel}>
                    {t("photography.stat_stock")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ─────────────────────────────────────── */}
      {hasPhotos && (
        <section
          className={`section ${styles.gallerySection}`}
          data-analytics-section="photography_gallery"
        >
          <div className="container">
            {/* Featured */}
            <div className={styles.featured} onClick={() => openPhoto(0)}>
              <img
                src={featured.src}
                alt={t(featured.i18nKey)}
                loading="eager"
              />
              <div className={styles.featuredOverlay}>
                <span className={styles.featuredLabel}>
                  {t(featured.i18nKey)}
                </span>
                <span className={styles.featuredHint}>
                  {t("photography.featured_hint")}
                </span>
              </div>
              {featured.category === "drone" && (
                <div className={styles.droneBadge}>
                  <DroneIcon size={12} />
                </div>
              )}
            </div>

            {/* Grid */}
            <div className={styles.grid}>
              {rest.map((photo, i) => (
                <div
                  key={photo.i18nKey}
                  className={`${styles.gridItem} reveal`}
                  style={
                    { "--reveal-delay": `${i * 55}ms` } as React.CSSProperties
                  }
                  onClick={() => openPhoto(i + 1)}
                >
                  <img src={photo.src} alt={t(photo.i18nKey)} loading="lazy" />
                  <div className={styles.gridOverlay}>
                    <span>{t(photo.i18nKey)}</span>
                  </div>
                  {photo.category === "drone" && (
                    <div className={styles.droneBadge}>
                      <DroneIcon size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Placeholder ──────────────────────────────────── */}
      {!hasPhotos && (
        <section
          className={`section ${styles.gallerySection}`}
          data-analytics-section="photography_gallery_placeholder"
        >
          <div className="container">
            <div className={styles.noPhotos}>
              <div className={styles.noPhotosGrid} aria-hidden>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.noPhotosCell} />
                ))}
              </div>
              <div className={styles.noPhotosText}>
                <p>{t("photography.no_photos")}</p>
                <div
                  style={{
                    display: "flex",
                    gap: ".75rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="https://www.instagram.com/photographer_vojtech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    data-analytics-label="photography_placeholder_instagram"
                  >
                    <InstagramIcon size={16} /> Instagram <ExternalLinkIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Equipment strip ──────────────────────────────── */}
      <section
        className={`section-sm ${styles.equipSection}`}
        data-analytics-section="photography_equipment"
      >
        <div className="container">
          <div className={styles.equipGrid}>
            {[
              {
                icon: <CameraIcon size={22} />,
                label: "Canon EOS 200D",
                sub: t("photography.equip_portrait"),
              },
              {
                icon: <DroneIcon size={22} />,
                label: "DJI Mini 4 Pro",
                sub: t("photography.equip_aerial"),
              },
              {
                icon: <CameraIcon size={22} />,
                label: "Adobe Lightroom",
                sub: t("photography.equip_post"),
              },
              {
                icon: <AdobeStockIcon size={22} />,
                label: "Adobe Stock",
                sub: t("photography.equip_stock"),
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`${styles.equipItem} reveal`}
                style={
                  { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                }
              >
                <span className={styles.equipIcon}>{item.icon}</span>
                <div>
                  <span className={styles.equipLabel}>{item.label}</span>
                  <span className={styles.equipSub}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media mentions ───────────────────────────────── */}
      <section
        className={`section ${styles.mediaSection}`}
        data-analytics-section="photography_media"
      >
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("photography.media_label")}</p>
            <h2>{t("photography.media_title")}</h2>
          </div>
          <div className={styles.mediaList}>
            {mediaItems.map((item, i) => (
              <div
                key={item.id}
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
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────── */}
      {activeIndex !== null && (
        <Lightbox
          photo={photos[activeIndex]}
          onClose={closePhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </main>
  );
}
