import { useTranslation } from 'react-i18next'
import { useThemeStore } from '../store/themeStore'
import { Button } from '../components/Button'
import { Sun, Moon, Globe } from 'lucide-react'

export function SettingsPage() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">{t('settings.title')}</h1>
      </header>

      <section className="card">
        <h2 className="card__title"><Sun size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('settings.theme')}</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant={theme === 'dark' ? 'primary' : 'secondary'} onClick={() => theme === 'light' && toggleTheme()}>
            <Moon size={16} /> {t('settings.dark')}
          </Button>
          <Button variant={theme === 'light' ? 'primary' : 'secondary'} onClick={() => theme === 'dark' && toggleTheme()}>
            <Sun size={16} /> {t('settings.light')}
          </Button>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title"><Globe size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('settings.lang')}</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant={i18n.language === 'uk' ? 'primary' : 'secondary'} onClick={() => i18n.changeLanguage('uk')}>
            {t('settings.uk')}
          </Button>
          <Button variant={i18n.language === 'en' ? 'primary' : 'secondary'} onClick={() => i18n.changeLanguage('en')}>
            {t('settings.en')}
          </Button>
        </div>
      </section>
    </div>
  )
}