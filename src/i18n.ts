import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  uk: {
    translation: {
      nav: { dashboard: 'Огляд', budget: 'Бюджет', portfolio: 'Портфель', markets: 'Ринки', settings: 'Налаштування', logout: 'Вийти' },
      dashboard: { title: 'Огляд', subtitle: 'Фінансовий стан за поточний місяць', income: 'Доходи', expense: 'Витрати', balance: 'Баланс', savings: 'Норма заощаджень', chartTitle: 'Динаміка за 6 місяців', recent: 'Останні транзакції' },
      budget: { title: 'Бюджет', subtitle: 'Керуйте своїми доходами та витратами', import: 'Імпорт з Monobank', add: 'Додати транзакцію', allTxns: 'Усі транзакції', save: 'Зберегти', type: 'Тип', amount: 'Сума (₴)', category: 'Категорія', desc: 'Опис', expense: 'Витрата', income: 'Дохід' },
      portfolio: { title: 'Портфель', subtitle: 'Ваші інвестиції та активи', add: 'Додати актив', total: 'Загальна вартість', pnl: 'Прибуток / Збиток', distribution: 'Розподіл активів', assets: 'Мої активи', qty: 'Кількість', buyPrice: 'Ціна купівлі ($)', currentPrice: 'Поточна ціна ($)' },
      markets: { title: 'Ринки', subtitle: 'Актуальні курси валют та новини', rates: 'Курси валют (НБУ)', news: 'Фінансові новини', load: 'Завантажити курси' },
      settings: { title: 'Налаштування', theme: 'Тема', dark: 'Темна', light: 'Світла', lang: 'Мова', uk: 'Українська', en: 'English' }
    }
  },
  en: {
    translation: {
      nav: { dashboard: 'Dashboard', budget: 'Budget', portfolio: 'Portfolio', markets: 'Markets', settings: 'Settings', logout: 'Logout' },
      dashboard: { title: 'Dashboard', subtitle: 'Financial status for current month', income: 'Income', expense: 'Expense', balance: 'Balance', savings: 'Savings Rate', chartTitle: '6 Months Dynamics', recent: 'Recent Transactions' },
      budget: { title: 'Budget', subtitle: 'Manage your income and expenses', import: 'Import from Monobank', add: 'Add Transaction', allTxns: 'All Transactions', save: 'Save', type: 'Type', amount: 'Amount (₴)', category: 'Category', desc: 'Description', expense: 'Expense', income: 'Income' },
      portfolio: { title: 'Portfolio', subtitle: 'Your investments and assets', add: 'Add Asset', total: 'Total Value', pnl: 'Profit / Loss', distribution: 'Asset Distribution', assets: 'My Assets', qty: 'Quantity', buyPrice: 'Purchase Price ($)', currentPrice: 'Current Price ($)' },
      markets: { title: 'Markets', subtitle: 'Current exchange rates and news', rates: 'Exchange Rates (NBU)', news: 'Financial News', load: 'Load Rates' },
      settings: { title: 'Settings', theme: 'Theme', dark: 'Dark', light: 'Light', lang: 'Language', uk: 'Ukrainian', en: 'English' }
    }
  }
}

i18n.use(initReactI18next).init({ resources, lng: 'uk', fallbackLng: 'en', interpolation: { escapeValue: false } })
export default i18n