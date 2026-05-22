import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { getConsent, setConsent } from '../../utils/analytics';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === 'accepted') {
      loadGA();
    } else if (consent === null) {
      // Small delay so banner slides in after page load
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  function accept() {
    setConsent('accepted');
    setVisible(false);
  }

  function reject() {
    setConsent('rejected');
    setVisible(false);
  }

  return (
    <div className={styles.banner} role="dialog" aria-label={t('cookie.aria')}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>{t('cookie.title')}</p>
          <p className={styles.desc}>
            <Trans i18nKey="cookie.desc">
              Používám analytické cookies (Google Analytics) pro sledování návštěvnosti. Kontaktní formulář je zpracováván přes Cloudflare Workers. Data neprodávám ani nesdílím s třetími stranami. <a href="/privacy.html" className={styles.privacyLink}>Zásady ochrany osobních údajů</a>
            </Trans>
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.accept} onClick={accept}>
            {t('cookie.accept_all')}
          </button>
          <button className={styles.reject} onClick={reject}>
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
