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
import SubjectLevel from './scenes/SubjectLevel/SubjectLevel';
import StudentJoinManager from './scenes/StudentJoin/StudentJoinManager';
import WeeklySchedule from './scenes/WeeklySchedule/WeeklySchedule';
import ModeratorLevels from './scenes/Level/ListLevel';
import RequestCategoryList from './scenes/RequestCategory/ListRequestCategory';
import ModeratorRequests from './scenes/Request/ListRequest';
import ModeratorResponses from './scenes/Response/ModeratorResponses';
import ModeratorSubjects from './scenes/Subject/ModeratorSubjects';
import RatingManager from './scenes/RatingManager/RatingManager';


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
              <Route path="/subject-level" element={<SubjectLevel />} />
              <Route path="/student-join" element={<StudentJoinManager />} />
              <Route path="/time-admin" element={<WeeklySchedule />} />
              <Route path="/level" element={<ModeratorLevels />} />
              <Route path="/request-category" element={<RequestCategoryList />} />
              <Route path="/request" element={<ModeratorRequests />} />
              <Route path="/response" element={<ModeratorResponses />} />
              <Route path="/subject" element={<ModeratorSubjects />} />
              <Route path="/rating" element={<RatingManager />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin