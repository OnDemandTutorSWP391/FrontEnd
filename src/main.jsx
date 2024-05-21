import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './Layout/Layout.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
    <Route path="login" element={<LoginPage />} />
    </Route>

  </Routes>

  </BrowserRouter>
  
)
