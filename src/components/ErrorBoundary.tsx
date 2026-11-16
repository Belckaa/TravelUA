import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="auth">
          <div className="auth__card" style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--danger)' }}>Щось пішло не так</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Виникла непередбачена помилка.</p>
            <button className="btn btn--primary" onClick={() => window.location.reload()}>
              Оновити сторінку
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
