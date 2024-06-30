import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Grid,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { postCreateTimeTutor } from '../../service/CourseService';

const CreateTutorSchedule = () => {
  const [scheduleData, setScheduleData] = useState({
    subjectLevelId: '',
    slotName: '',
    startSlot: null,
    endSlot: null,
    date: null
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      
      const formattedStartSlot = scheduleData.startSlot && scheduleData.date
        ? new Date(
            scheduleData.date.getFullYear(),
            scheduleData.date.getMonth(),
            scheduleData.date.getDate(),
            scheduleData.startSlot.getHours(),
            scheduleData.startSlot.getMinutes()
          ).toISOString()
        : null;
  
      const formattedEndSlot = scheduleData.endSlot && scheduleData.date
        ? new Date(
            scheduleData.date.getFullYear(),
            scheduleData.date.getMonth(),
            scheduleData.date.getDate(),
            scheduleData.endSlot.getHours(),
            scheduleData.endSlot.getMinutes()
          ).toISOString()
        : null;
  
      const formattedData = {
        subjectLevelId: scheduleData.subjectLevelId ? parseInt(scheduleData.subjectLevelId, 10) : null,
        slotName: scheduleData.slotName || "",
        startSlot: formattedStartSlot,
        endSlot: formattedEndSlot,
        date: formattedDate
      };
  
      console.log(formattedData);
      const response = await postCreateTimeTutor(formattedData);
      setSnackbarMessage('Schedule created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
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
      setSnackbarMessage('Error creating schedule. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Tutor Schedule
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="subjectLevelId"
                  label="Subject Level ID"
                  name="subjectLevelId"
                  type="number"
                  value={scheduleData.subjectLevelId}
                  onChange={handleInputChange}
                />
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
          </Box>
        </Paper>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CreateTutorSchedule;