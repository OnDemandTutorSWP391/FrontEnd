import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx';
import ForgetPassEnter from './pages/ForgetPassword/ForgetPassEnter.jsx';
import Admin from './Admin.jsx';

import CreateRequest from './pages/Request/CreateRequest.jsx';
import UserProfile from './UserProfile.jsx';
import CourseList from './pages/Course/CourseList.jsx';
import Tutor from './Tutor.jsx';
import CourseDetail from './pages/Course/CourseDetail.jsx';
import CoinDeposit from './pages/CoinDeposit/CoinDeposit.jsx';

import NotFound from './pages/404NotFound/NotFound.jsx';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute.jsx';
import Moderator from './Moderator.jsx';
import PaymentResult from './pages/CoinDeposit/PaymentResult.jsx';
import TutorList from './pages/TutorList/TutorList.jsx';
import TutorDetail from './pages/TutorDetail/TutorDetail.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="create-request" element={<CreateRequest />} />
          <Route path="course-list" element={<CourseList />} />
          <Route path="course-detail/:courseId" element={<CourseDetail />} />
          <Route path="tutor-detail/:tutorId" element={<TutorDetail />} />
          <Route path="coin-deposit" element={<CoinDeposit />} />
          <Route path="payment-result" element={<PaymentResult />} />
          <Route path="tutor-list" element={<TutorList />} />
          
        </Route>
        
      </Route>
      <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="confirm-password" element={<ForgetPassEnter />} />

      {/* Admin Routes */}
      <Route path="admin/*" element={<Admin />} />

      {/* Profile Routes */}
      <Route path="profile/*" element={<UserProfile />} />

      {/* Tutor Routes */}
      <Route path="tutor/*" element={<Tutor />} />
      <Route path="moderator/*" element={<Moderator />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);