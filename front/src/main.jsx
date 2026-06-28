import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import BlogPanel from './pages/BlogPanel.jsx'
import CoursesPanel from './pages/CoursesPanel.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<BlogPanel />} />
        <Route path="/courses" element={<CoursesPanel />} />
      </Routes>
    </Router>
  </StrictMode>,
)
