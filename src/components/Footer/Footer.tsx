import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GitHubIcon, InstagramIcon, AdobeStockIcon } from "../Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandName}>Vojtěch Adam</div>
          <p className={styles.brandDesc}>{t("footer.brand_desc")}</p>
          <div className={styles.social}>
            <a
              href="https://github.com/helloitsmeadm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/photographer_vojtech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://stock.adobe.com/cz/contributor/212297235/VojtechAdam"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adobe Stock"
            >
              <AdobeStockIcon size={18} />
            </a>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.footerNav} aria-label={t("footer.nav_aria")}>
          <p className={styles.navTitle}>{t("footer.nav_title")}</p>
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/o-mne">{t("nav.about")}</Link>
          <Link to="/projekty">{t("nav.projects")}</Link>
          <Link to="/fotografie">{t("nav.photography")}</Link>
          <Link to="/weby">{t("nav.webdesign")}</Link>
          <Link to="/kontakt">{t("nav.contact")}</Link>
        </nav>

        {/* Contact */}
        <div className={styles.contactCol}>
          <p className={styles.navTitle}>{t("footer.contact_title")}</p>
          <a
            href="mailto:kontakt@vojtech-adam.cz"
            className={styles.contactItem}
          >
            kontakt@vojtech-adam.cz
          </a>
          <a
            href="https://www.instagram.com/photographer_vojtech/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            @photographer_vojtech
          </a>
          <Link
            to="/kontakt"
            className={styles.contactCta}
            data-analytics="cta"
            data-analytics-label="footer_contact_cta"
          >
            {t("footer.contact_cta")}
          </Link>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <span>
            © {year} Vojtěch Adam · {t("footer.made_with")}
          </span>
          <Link
            to="/privacy.html"
            className={styles.privacyLink}
            data-analytics="cta"
            data-analytics-label="footer_privacy"
          >
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
