import ThemeToggle from './components/ThemeToggle'
import SurfaceCard from './components/SurfaceCard'
import MemoizedPanel from './components/MemoizedPanel'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme, mode } = useTheme()
  const activeAppearance = mode === 'system' ? `${theme} (following OS)` : theme

  return (
    <main className="app-shell">
      <section className="content-card">
        <p className="eyebrow">ASSIGNMENT 7</p>
        <h1>Chroma theme lab</h1>
        <p className="subtitle">Context API · persistence · system sync · no flash</p>

        <ThemeToggle />

        <p className="appearance">
          Active appearance: <span className="appearance-tag">{activeAppearance}</span>
        </p>
      </section>

      <section className="panel-grid" aria-label="Theme demonstration panels">
        <SurfaceCard />
        <MemoizedPanel />
      </section>
    </main>
  )
}

export default App
