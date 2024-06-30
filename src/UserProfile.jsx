
import React, { useState } from 'react'
import { ColorModeContext, useMode } from './theme';

import { Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import "./index.css";
import AccountManager from './scenes/AccountManager/AccountManager';
import UserSideBar from './pages/UserProfile/UserSideBar';
import UserTopBar from './pages/UserProfile/UserTopBar';
import UserProfileDetail from './pages/UserProfile/UserProfileDetail';
import ListRequestByUser from './pages/UserProfile/ListRequestByUser';
import UserTransactions from './pages/UserProfile/UserTransactions';
import ListCoursePurchased from './pages/UserProfile/ListCoursePurchased';

import StudentSchedule from './pages/UserProfile/ListScheduleStudent';
const UserProfile = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <UserSideBar isSidebar={isSidebar} />
            <main className="content">
              <UserTopBar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<UserProfileDetail />} />
                <Route path="/user-ticket-list" element={<ListRequestByUser />} />
                <Route path="/transaction" element={<UserTransactions/>}/>
                <Route path="/your-course" element={<ListCoursePurchased/>}/>
                <Route path="/weekly-schedule" element={<StudentSchedule/>}/>
                
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default UserProfile