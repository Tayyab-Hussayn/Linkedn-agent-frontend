import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DownloadPage from './pages/DownloadPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
