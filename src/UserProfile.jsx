
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
                
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default UserProfile