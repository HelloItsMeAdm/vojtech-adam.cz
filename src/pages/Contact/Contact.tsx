import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import SEOHead from '../../components/SEO/SEOHead';
import { GitHubIcon, InstagramIcon, WhatsAppIcon, EmailIcon, PhoneIcon } from '../../components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { trackEvent } from '../../utils/analytics';
import styles from './Contact.module.css';

// Public site key — safe to have in frontend code
// In dev, CF test key always passes (no domain restriction)
const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? '1x00000000000000000000AA'
  : '0x4AAAAAADSkWEKzWEg-bIVF';

// Use apex domain in production so /api/* hits the Worker even from www
// For local testing replace with your Worker URL from CF dashboard
const PROD_API_ORIGIN = 'https://vojtech-adam.cz';
const API_URL = import.meta.env.DEV
  ? '/api/contact'
  : `${PROD_API_ORIGIN}/api/contact`;

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// ── Turnstile widget ───────────────────────────────────────────────────────────

function TurnstileWidget({ onToken, onExpire, theme }: {
  onToken: (token: string) => void;
  onExpire: () => void;
  theme: 'dark' | 'light';
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load Turnstile script once
  useEffect(() => {
    const existing = document.getElementById('cf-turnstile-script');
    if (existing) {
      if ((window as any).turnstile) setLoaded(true);
      else existing.addEventListener('load', () => setLoaded(true));
      return;
    }
    const s = document.createElement('script');
    s.id    = 'cf-turnstile-script';
    s.src   = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, []);

  // Render widget when script is ready
  useEffect(() => {
    const ts = (window as any).turnstile;
    if (!loaded || !ts || !ref.current || widgetId.current) return;

    widgetId.current = ts.render(ref.current, {
      sitekey:            TURNSTILE_SITE_KEY,
      callback:           onToken,
      'expired-callback': onExpire,
      'error-callback':   onExpire,
      theme,
      size: 'normal',
    });

    return () => {
      if (widgetId.current) {
        (window as any).turnstile?.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [loaded, onToken, onExpire, theme]);

  return <div ref={ref} className={styles.turnstile} />;
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const formStartedRef = useRef(false);

  const [status,  setStatus]  = useState<FormStatus>('idle');
  const [errMsg,  setErrMsg]  = useState('');
  const [tsToken, setTsToken] = useState<string | null>(null);
  const [hp,      setHp]      = useState(''); // honeypot value (must stay empty)

  const { theme } = useTheme();

  const handleToken  = useCallback((t: string) => setTsToken(t),   []);
  const handleExpire = useCallback(()           => setTsToken(null), []);

  const handleFormFocus = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent('form_start', { form_id: 'contact', form_name: 'contact' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!tsToken) {
      setErrMsg(t('contact.error_verification'));
      return;
    }

    const data = new FormData(formRef.current);
    setStatus('sending');
    setErrMsg('');
    trackEvent('form_submit', { form_id: 'contact', form_name: 'contact' });

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    data.get('user_name'),
          email:   data.get('user_email'),
          subject: data.get('subject'),
          message: data.get('message'),
          token:   tsToken,
          _hp:     hp, // honeypot — should be empty
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrMsg(json.error || t('contact.form_error'));
        setStatus('error');
        trackEvent('form_submit_error', {
          form_id: 'contact',
          reason: json.error ? 'server' : 'unknown',
        });
        // Reset Turnstile so user can retry
        (window as any).turnstile?.reset();
        setTsToken(null);
        return;
      }

      setStatus('success');
      formRef.current.reset();
      trackEvent('generate_lead', { form_id: 'contact', form_name: 'contact' });
    } catch {
      setErrMsg(t('contact.error_network'));
      setStatus('error');
      trackEvent('form_submit_error', { form_id: 'contact', reason: 'network' });
    }
  };

  const socials = [
    { icon: <EmailIcon size={22} />,    label: t('contact.social_email'), value: 'kontakt@vojtech-adam.cz',   href: 'mailto:kontakt@vojtech-adam.cz' },
    { icon: <PhoneIcon size={22} />,    label: t('contact.phone'),        value: '+420 608 073 334',          href: 'tel:+420608073334' },
    { icon: <WhatsAppIcon size={22} />, label: t('contact.social_whatsapp'), value: '+420 608 073 334',        href: 'https://wa.me/420608073334' },
    { icon: <GitHubIcon size={22} />,   label: t('contact.social_github'), value: 'helloitsmeadm',             href: 'https://github.com/helloitsmeadm' },
    { icon: <InstagramIcon size={22} />,label: t('contact.social_instagram'), value: '@photographer_vojtech',  href: 'https://www.instagram.com/photographer_vojtech/' },
  ];

  return (
    <main className={styles.main}>
      <SEOHead
        title={t('contact.seo_title')}
        description={t('contact.seo_desc')}
        canonical="/kontakt"
      />
      <div className="container">
        <div className={styles.inner}>

          {/* ── Info column ──────────────────────────────────── */}
          <div className={styles.info} data-analytics-section="contact_info">
            <p className="section-label">{t('contact.section_label')}</p>
            <h1>{t('contact.title')}</h1>
            <p className={styles.subtitle}>{t('contact.subtitle')}</p>

            <div className={styles.socialList}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialItem}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <div>
                    <div className={styles.socialLabel}>{s.label}</div>
                    <div className={styles.socialValue}>{s.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Form ─────────────────────────────────────────── */}
          <div className={`card ${styles.formCard}`} data-analytics-section="contact_form">
            {status === 'success' ? (
              <div className={styles.successMsg}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.particle}
                    style={{
                      '--angle': `${i * 45}deg`,
                      '--dist':  `${55 + (i % 3) * 20}px`,
                      animationDelay: `${i * 60}ms`,
                    } as React.CSSProperties}
                  />
                ))}
                <div className={styles.successRing}>
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                    <circle className={styles.successCircle} cx="45" cy="45" r="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <polyline className={styles.successCheck} points="28,46 40,58 64,32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.successText}>
                  <h3 className={styles.successTitle}>{t('contact.success_title')}</h3>
                  <p>{t('contact.form_success')}</p>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onFocusCapture={handleFormFocus}
                className={styles.form}
                noValidate
              >

                {/* Honeypot — invisible to humans, bots fill it in */}
                <input
                  type="text"
                  name="_hp"
                  value={hp}
                  onChange={e => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
                />

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">{t('contact.form_name')}</label>
                    <input id="name" name="user_name" type="text" className="form-input" placeholder={t('contact.placeholder_name')} required autoComplete="name" maxLength={100} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">{t('contact.form_email')}</label>
                    <input id="email" name="user_email" type="email" className="form-input" placeholder={t('contact.placeholder_email')} required autoComplete="email" maxLength={254} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">{t('contact.form_subject')}</label>
                  <input id="subject" name="subject" type="text" className="form-input" required maxLength={200} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">{t('contact.form_message')}</label>
                  <textarea id="message" name="message" className="form-textarea" rows={5} required maxLength={5000} />
                </div>

                {/* Cloudflare Turnstile bot check */}
                <TurnstileWidget
                  onToken={handleToken}
                  onExpire={handleExpire}
                  theme={theme === 'dark' ? 'dark' : 'light'}
                />

                {(status === 'error' || errMsg) && (
                  <p className={styles.errorMsg}>{errMsg || t('contact.form_error')}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'sending' || !tsToken}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {status === 'sending' ? t('contact.form_sending') : t('contact.form_send')}
                </button>

                {!tsToken && status === 'idle' && (
                  <p className={styles.tsHint}>
                    {t('contact.ts_hint')}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
