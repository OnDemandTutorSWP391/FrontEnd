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
import UserProfile from './UserProfile.jsx'
import CourseList from './pages/Course/CourseList.jsx'
import Tutor from './Tutor.jsx'
import CourseDetail from './pages/Course/CourseDetail.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="create-request" element={<CreateRequest/>}></Route>
        <Route path="course-list" element={<CourseList/>}></Route>
        <Route path="course-detail/:courseId" element={<CourseDetail/>}></Route>
        
      </Route>
      <Route path="forget-password" element={<ForgetPassword/>}/>
      <Route path="confirm-password" element ={<ForgetPassEnter/>}/>
      <Route>
    <Route path="/admin/*" element={<Admin />} />
    <Route path="/profile/*" element={<UserProfile/>}/>
    <Route path="/tutor/*" element={<Tutor/>}/>
    </Route>
      
    </Routes>
    
  </BrowserRouter>
  
)
