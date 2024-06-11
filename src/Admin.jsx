import React, { useState } from 'react'
import { ColorModeContext, useMode } from './theme';
import SideBar from './scenes/global/SideBar';
import TopBar from './scenes/global/TopBar';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './scenes/global/SideBar';
import Dashboard from './scenes/dashboard/Dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import "./index.css";
import AccountManager from './scenes/AccountManager/AccountManager';


const Admin = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <TopBar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/admin-dash" element={<Dashboard />} />
              <Route path="/manage-account" element={<AccountManager />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin