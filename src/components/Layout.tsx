import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Wallet, LogOut, PieChart, TrendingUp, Settings, Sun, Moon } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import { useTranslation } from 'react-i18next'
import { AIChat } from './AIChat'

export function Layout() {
  const { t } = useTranslation()
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => { logout(); navigate('/login') }

  const NAV = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard, end: true },
    { to: '/budget', label: t('nav.budget'), icon: Wallet },
    { to: '/portfolio', label: t('nav.portfolio'), icon: PieChart },
    { to: '/markets', label: t('nav.markets'), icon: TrendingUp },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ]

  const TABS = [
    { label: 'Overview', path: '/' },
    { label: 'Budget', path: '/budget' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Markets', path: '/markets' },
  ]

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__logo">₴</span>
          <span>FinTrack</span>
        </div>
        <nav className="sidebar__nav">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}>
              <Icon size={18} /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 8px' }}>
             <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Theme</span>
             <button onClick={toggleTheme} className="icon-btn" style={{ color: 'var(--text)' }}>
               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
          </div>
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div className="sidebar__user-name">{user?.name}</div>
              <div className="sidebar__user-email">{user?.email}</div>
            </div>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
            <LogOut size={14} /> {t('nav.logout')}
          </button>
        </div>
      </aside>
      
      <main className="main">
        {/* Вкладки тепер зверху на всіх сторінках */}
        <div className="tabs" style={{ marginBottom: '24px' }}>
          {TABS.map(tab => (
            <div key={tab.path} className={`tab ${location.pathname === tab.path ? 'tab--active' : ''}`} onClick={() => navigate(tab.path)}>
              {tab.label}
            </div>
          ))}
        </div>
        
        <Outlet />
      </main>
      <AIChat />
    </div>
  )
}