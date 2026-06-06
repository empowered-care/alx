import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Community from './pages/Community'
import Dashboard from './pages/Dashboard'
import FhirExplorer from './pages/FhirExplorer'
import Grounding from './pages/Grounding'
import Landing from './pages/Landing'
import Trainer from './pages/Trainer'

function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState('enter')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage('exit')
    }
  }, [location, displayLocation.pathname])

  const onAnimationEnd = () => {
    if (stage === 'exit') {
      setDisplayLocation(location)
      setStage('enter')
    }
  }

  return (
    <div
      key={displayLocation.pathname}
      className={stage === 'enter' ? 'page-transition-enter' : 'page-transition-exit'}
      onAnimationEnd={onAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grounding" element={<Grounding />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/fhir" element={<FhirExplorer />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
