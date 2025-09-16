import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import MindMapCanvas from './pages/MindMapCanvas'
import ViewMindMaps from './pages/ViewMindMaps'
import Templates from './pages/Templates'
import AboutUs from './pages/AboutUs'
import Pricing from './pages/Pricing'

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50"
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<MindMapCanvas />} />
          <Route path="/view" element={<ViewMindMaps />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </motion.div>
    </Router>
  )
}

export default App

