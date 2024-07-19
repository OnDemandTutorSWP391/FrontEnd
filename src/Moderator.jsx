
import React, { useState } from 'react'
import { ColorModeContext, useMode } from './theme';

import { Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import "./index.css";
import ModeratorDetail from './pages/Moderator/ModeratorDetail';
import ModTopBar from './pages/Moderator/ModTopBar';
import ModSideBar from './pages/Moderator/ModSideBar';
import ModeratorRequests from './pages/Moderator/ListRequest';
import WeeklySchedule from './pages/Moderator/TimeForMod';
import ModeratorResponses from './pages/Moderator/ModeratorResponses';
import ModeratorLevels from './pages/Moderator/ListLevel';
import ModeratorSubjects from './pages/Moderator/ModeratorSubjects';
import SubjectLevelList from './pages/Moderator/ManageSubjectLevel';
import RequestCategoryList from './pages/Moderator/ListRequestCategory';
import ModeratorRatings from './pages/Moderator/ModeratorRatings';
import TutorList from './pages/TutorList/TutorList';
import TutorList12 from './pages/Moderator/TutorList';
const Moderator = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <ModSideBar isSidebar={isSidebar} />
            <main className="content">
              <ModTopBar setIsSidebar={setIsSidebar} />
              <Routes>
                
                 <Route path="/" element={<ModeratorRequests />} /> 
                 <Route path="/list-time" element={<WeeklySchedule />} /> 
                 <Route path="/list-response" element={<ModeratorResponses />} /> 
                 <Route path="/list-level" element={<ModeratorLevels />} /> 
                 <Route path="/list-subject" element={<ModeratorSubjects />} /> 
                 <Route path="/list-subjectLevel" element={<SubjectLevelList />} /> 
                 <Route path="/list-RequestCategory" element={<RequestCategoryList />} /> 
                 <Route path="/manage-rating" element={<ModeratorRatings />} /> 
                 <Route path="/tutor-list" element={<TutorList12 />} /> 
                
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default Moderator