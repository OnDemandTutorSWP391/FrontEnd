import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './Layout/Layout.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx'
import ForgetPassEnter from './pages/ForgetPassword/ForgetPassEnter.jsx'
import Admin from './Admin.jsx'
import TopBar from './scenes/global/TopBar.jsx'
import CreateRequest from './pages/Request/CreateRequest.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="create-request" element={<CreateRequest/>}></Route>
      </Route>
      <Route path="forget-password" element={<ForgetPassword/>}/>
      <Route path="confirm-password" element ={<ForgetPassEnter/>}/>
      <Route>
    <Route path="/admin/*" element={<Admin />} />
    </Route>
      
    </Routes>
    
  </BrowserRouter>
  
)
