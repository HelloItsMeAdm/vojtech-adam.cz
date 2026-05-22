import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main style={{ paddingTop: '64px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '4rem' }}>🔍</span>
        <h1>{t('common.not_found')}</h1>
        <p className="text-muted">{t('common.not_found_desc')}</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '.5rem' }}>{t('nav.home')}</Link>
      </div>
    </main>
  );
}
