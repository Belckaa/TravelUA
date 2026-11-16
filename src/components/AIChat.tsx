import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message { id: number; text: string; sender: 'bot' | 'user' }

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привіт! Я ваш AI-фінансовий асистент. Чим можу допомогти?', sender: 'bot' }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      let botText = 'Вибачте, я не зрозумів. Спробуйте запитати про "бюджет", "інвестиції" або "економію".'
      const lower = userMsg.text.toLowerCase()
      
      if (lower.includes('бюджет') || lower.includes('витрат')) {
        botText = 'Рекомендую правило 50/30/20: 50% на потреби, 30% на бажання, 20% на заощадження. Ваші ліміти у розділі "Бюджет" допоможуть це контролювати!'
      } else if (lower.includes('інвест') || lower.includes('акці')) {
        botText = 'Диверсифікація — ключ до успіху. Не кладіть усі яйця в один кошик. Перевірте розподіл вашого портфеля у розділі "Портфель".'
      } else if (lower.includes('економ') || lower.includes('гроші')) {
        botText = 'Спробуйте метод "конвертів": виділіть ліміт на кожну категорію витрат і не перевищуйте його. Наш додаток вже має такий функціонал!'
      } else if (lower.includes('привіт') || lower.includes('добрий')) {
        botText = 'Вітаю! Готовий допомогти з вашими фінансами. Про що хочете дізнатися?'
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botText, sender: 'bot' }])
    }, 1000)
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <Bot size={20} color="var(--accent)" /> FinTrack AI
            </div>
            <button className="icon-btn" onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="chat-messages">
            {messages.map(m => (
              <div key={m.id} className={`chat-msg chat-msg--${m.sender}`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              className="input" 
              placeholder="Напишіть повідомлення..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              style={{ flex: 1, padding: '8px 12px' }}
            />
            <button type="submit" className="btn btn--primary" style={{ padding: '8px 12px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button className="chat-btn" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  )
}