export interface CurrencyRate {
  cc: string
  rate: number
  txt: string
}

export interface HistoricalRate {
  date: string
  displayDate: string
  rate: number
}

export async function fetchCurrencyRates(): Promise<CurrencyRate[]> {
  try {
    const res = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    const data = await res.json()
    return data.filter((item: any) => ['USD', 'EUR', 'PLN', 'GBP'].includes(item.cc))
  } catch (error) {
    console.error('Failed to fetch rates', error)
    return []
  }
}

export function generateHistoricalData(currentRate: number, days: number = 7): HistoricalRate[] {
  const data: HistoricalRate[] = []
  let rate = currentRate
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const displayDate = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
    
    const change = (Math.random() - 0.45) * (currentRate * 0.005)
    if (i !== 0) rate = rate + change
    
    data.push({ date: dateStr, displayDate, rate: Number(rate.toFixed(2)) })
  }
  data[data.length - 1].rate = currentRate
  return data
}

const getDateOffset = (offset: number) => {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return d.toISOString().split('T')[0]
}

export const mockNews = [
  { id: 1, title: 'НБУ зберіг облікову ставку на рівні 13.5%', date: getDateOffset(1), source: 'НБУ', currency: 'ALL', impact: 'neutral' },
  { id: 2, title: 'Курс долара знизився після заяви МВФ', date: getDateOffset(2), source: 'Економічна правда', currency: 'USD', impact: 'down' },
  { id: 3, title: 'Євро оновило максимум за останні 3 місяці', date: getDateOffset(3), source: 'РБК-Україна', currency: 'EUR', impact: 'up' },
  { id: 4, title: 'Фунт стерлінгів падає через економічні ризики', date: getDateOffset(4), source: 'Bloomberg', currency: 'GBP', impact: 'down' },
  { id: 5, title: 'Польський злотий зміцнів на тлі інфляції', date: getDateOffset(2), source: 'PAP', currency: 'PLN', impact: 'up' },
]