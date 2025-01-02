import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useStore } from './store/useStore'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import UnderConstruction from './components/UnderConstruction'
import { useEffect } from 'react'

// Simple boolean flag to control under construction mode
const IS_UNDER_CONSTRUCTION = false

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Show under construction page when flag is true
  if (IS_UNDER_CONSTRUCTION) {
    return <UnderConstruction />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
