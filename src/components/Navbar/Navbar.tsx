import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { trackEvent } from '../../utils/analytics';
import styles from './Navbar.module.css';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const switchLangLabel = lang === 'cs' ? t('nav.switch_lang_to_en') : t('nav.switch_lang_to_cs');
  const switchThemeLabel = theme === 'dark' ? t('nav.switch_theme_light') : t('nav.switch_theme_dark');

  const handleLangToggle = () => {
    const nextLang = lang === 'cs' ? 'en' : 'cs';
    trackEvent('language_switch', { to: nextLang });
    toggleLang();
  };

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    trackEvent('theme_switch', { to: nextTheme });
    toggleTheme();
  };

  const handleMenuToggle = () => {
    setMenuOpen(o => {
      const next = !o;
      trackEvent('menu_toggle', { state: next ? 'open' : 'closed' });
      return next;
    });
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/o-mne', label: t('nav.about') },
    { to: '/projekty', label: t('nav.projects') },
    { to: '/fotografie', label: t('nav.photography') },
    { to: '/weby', label: t('nav.webdesign') },
    { to: '/kontakt', label: t('nav.contact') },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} container`}>
        <NavLink to="/" className={styles.logo} aria-label={t('nav.logo_aria')}>
          <img src="/favicon.svg" alt="VA" className={styles.logoImg} />
        </NavLink>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map((link, idx) => (
            <li key={link.to} style={{ '--i': idx } as React.CSSProperties}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.linkNum}>{String(idx + 1).padStart(2, '0')}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className={styles.menuFooter} style={{ '--i': links.length } as React.CSSProperties}>
            <a href="mailto:kontakt@vojtech-adam.cz" className={styles.menuEmail}>
              kontakt@vojtech-adam.cz
            </a>
          </li>
        </ul>

        <div className={styles.controls}>
          <button
            className={`btn btn-ghost ${styles.iconBtn}`}
            onClick={handleLangToggle}
            aria-label={switchLangLabel}
            title={switchLangLabel}
          >
            <span className={styles.langLabel}>{lang === 'cs' ? 'EN' : 'CS'}</span>
          </button>

          <button
            className={`btn btn-ghost ${styles.iconBtn}`}
            onClick={handleThemeToggle}
            aria-label={switchThemeLabel}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={`btn btn-ghost ${styles.iconBtn} ${styles.menuBtn}`}
            onClick={handleMenuToggle}
            aria-label={menuOpen ? t('nav.menu_close') : t('nav.menu_open')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
