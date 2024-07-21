import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { postCreateTimeTutor } from '../../service/CourseService';
import { axiosClient } from '../../axios/AxiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTutorSchedule = () => {
  const [scheduleData, setScheduleData] = useState({
    subjectLevelId: '',
    slotName: '',
    startSlot: null,
    endSlot: null,
    date: null
  });
  const [subjectLevels, setSubjectLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjectLevels();
  }, []);

  const fetchSubjectLevels = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/SubjectLevels/get-all-subject-level-by-tutorId');
      setSubjectLevels(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subject levels:', error);
      setError('Error fetching subject levels. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScheduleData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setScheduleData(prevData => ({
      ...prevData,
      date: newDate
    }));
  };

  const handleTimeChange = (newTime, field) => {
    setScheduleData(prevData => ({
      ...prevData,
      [field]: newTime
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedDate = scheduleData.date ? scheduleData.date.toISOString().split('T')[0] : null;
      
      const formatTimeSlot = (date, time) => {
        if (!date || !time) return null;
        const combined = new Date(date);
        combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
        return combined.toISOString();
      };
  
      const formattedStartSlot = formatTimeSlot(scheduleData.date, scheduleData.startSlot);
      const formattedEndSlot = formatTimeSlot(scheduleData.date, scheduleData.endSlot);
  
      const formattedData = {
        subjectLevelId: scheduleData.subjectLevelId ? parseInt(scheduleData.subjectLevelId, 10) : null,
        slotName: scheduleData.slotName || "",
        startSlot: formattedStartSlot,
        endSlot: formattedEndSlot,
        date: formattedDate
      };
  
      console.log(formattedData);
      const response = await postCreateTimeTutor(formattedData);
      toast.success('Schedule created successfully!');
      // Reset form after successful submission
      setScheduleData({
        subjectLevelId: '',
        slotName: '',
        startSlot: null,
        endSlot: null,
        date: null
      });
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error('Error creating schedule. Please try again.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Tutor Schedule
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    required
                    fullWidth
                    id="subjectLevelId"
                    label="Subject Level"
                    name="subjectLevelId"
                    value={scheduleData.subjectLevelId}
                    onChange={handleInputChange}
                  >
                    {subjectLevels.map((level) => (
                      <MenuItem key={level.id} value={level.id}>
                        {`${level.subjectName} - ${level.levelName} (${level.serviceName})`}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="slotName"
                    label="Slot Name"
                    name="slotName"
                    value={scheduleData.slotName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Date"
                    value={scheduleData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    label="Start Time"
                    value={scheduleData.startSlot}
                    onChange={(newTime) => handleTimeChange(newTime, 'startSlot')}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    label="End Time"
                    value={scheduleData.endSlot}
                    onChange={(newTime) => handleTimeChange(newTime, 'endSlot')}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Schedule
              </Button>
              <ToastContainer />
            </Box>
          )}
        </Paper>
      </Container>
      <ToastContainer />
    </LocalizationProvider>
  );
};

export default CreateTutorSchedule;
