
import React, { useState } from 'react'
import { ColorModeContext, useMode } from './theme';

import { Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import "./index.css";

import TutorSideBar from './pages/TutorPage/TutorSideBar';
import TutorTopBar from './pages/TutorPage/TutorTopBar';
import TutorProfileDetail from './pages/TutorPage/TutorProfileDetail';
import ListRequestByTutor from './pages/TutorPage/ListRequestByTutor';
import TutorRegister from './pages/TutorPage/TutorRegister';
import CreateTutorSchedule from './pages/TutorPage/CreateTimeForStudent';
import TutorTransaction from './pages/TutorPage/TutorTransaction';
import TutorSchedule from './pages/TutorPage/Timesfortutor';
import StudentList from './pages/TutorPage/ListStudentTutor';
import RegisterSubjectLevel from './pages/TutorPage/RegisterSubjectLevel';
import TutorRatings from './pages/TutorPage/TutorRatings';
import TutorSubjects from './pages/Moderator/TutorSubjects';
import TransferCoinsToTutor from './pages/TutorPage/TransferCoinsToTutor';

const Tutor = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <TutorSideBar isSidebar={isSidebar} />
            <main className="content">
              <TutorTopBar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<TutorProfileDetail />} />
                <Route path="/user-ticket-list" element={<ListRequestByTutor />} />
                <Route path="/tutor-register" element={<TutorRegister />} />
                <Route path="/create-time" element={<CreateTutorSchedule />} />
                <Route path='/transaction' element={<TutorTransaction/>}/>
                <Route path='/schedule' element={<TutorSchedule/>}/>
                <Route path='/studentlist' element={<StudentList/>}/>
                <Route path='/register-subject-level' element={<RegisterSubjectLevel/>}/>
                <Route path='/my-rating' element={<TutorRatings/>}/>
                <Route path='/my-subject-level' element={<TutorSubjects/>}/>
                <Route path='/transfer-coin' element={<TransferCoinsToTutor/>}/>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export default Tutor