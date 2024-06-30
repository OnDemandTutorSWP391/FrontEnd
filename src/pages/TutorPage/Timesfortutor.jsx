import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, parseISO, isValid, parse } from 'date-fns';
import { axiosClient } from '../../axios/AxiosClient';

const TutorSchedule = () => {
  const [times, setTimes] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [subjectLevelId, setSubjectLevelId] = useState('');
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [updatedSlotName, setUpdatedSlotName] = useState('');
  const [updatedStartSlot, setUpdatedStartSlot] = useState('');
  const [updatedEndSlot, setUpdatedEndSlot] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchTimes = async () => {
    try {
      const fromDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
      const toDate = endOfWeek(currentWeek, { weekStartsOn: 1 });
      
      // Chuyển đổi ngày thành định dạng ISO 8601
      const fromDateISO = fromDate.toISOString();
      const toDateISO = toDate.toISOString();
      
      let url = `/Times/times-for-Tutor?from=${fromDateISO}&to=${toDateISO}`;
      if (subjectLevelId) url += `&subjectLevelId=${subjectLevelId}`;

      const response = await axiosClient.get(url);
      
      // Chuyển đổi ngày trong dữ liệu phản hồi từ ISO 8601 về "dd/MM/yyyy"
      const formattedTimes = response.data.data.map(time => {
        let formattedDate = time.date;
        try {
          const parsedDate = parseISO(time.date);
          if (isValid(parsedDate)) {
            formattedDate = format(parsedDate, 'dd/MM/yyyy');
          }
        } catch (error) {
          console.warn(`Invalid date format for time ${time.id}: ${time.date}`);
        }
        return {
          ...time,
          date: formattedDate
        };
      });
      
      setTimes(formattedTimes);
    } catch (error) {
      console.error('Error fetching times:', error);
    }
  };

  useEffect(() => {
    fetchTimes();
  }, [currentWeek, subjectLevelId]);

  const handlePreviousWeek = () => {
    setCurrentWeek(prevWeek => subWeeks(prevWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
  };

  const handleOpenUpdateDialog = (time) => {
    setSelectedTime(time);
    setUpdatedSlotName(time.slotName);
    setUpdatedStartSlot(time.startSlot);
    setUpdatedEndSlot(time.endSlot);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedTime(null);
  };

  const handleUpdateTime = async () => {
    try {
      let dateISO = selectedTime.date;
      const parsedDate = parse(selectedTime.date, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        dateISO = parsedDate.toISOString();
      } else {
        console.warn(`Invalid date format: ${selectedTime.date}`);
      }

      await axiosClient.put(`/Times/update-time-for-Tutor?timeId=${selectedTime.id}`, {
        date: dateISO,
        slotName: updatedSlotName,
        startSlot: updatedStartSlot,
        endSlot: updatedEndSlot
      });
      setSnackbarMessage('Time updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseUpdateDialog();
      fetchTimes();
    } catch (error) {
      console.error('Error updating time:', error);
      setSnackbarMessage('Error updating time. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const renderDaySchedule = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    const dayTimes = times.filter(time => time.date === formattedDate);
    return (
      <Box>
        <Typography variant="h6">{format(date, 'EEEE, dd/MM/yyyy')}</Typography>
        {dayTimes.length > 0 ? (
          dayTimes.map(time => (
            <Box key={time.id} sx={{ mb: 1, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography>{time.slotName}: {time.startSlot} - {time.endSlot}</Typography>
              <Button size="small" onClick={() => handleOpenUpdateDialog(time)}>Update</Button>
            </Box>
          ))
        ) : (
          <Typography>No classes scheduled</Typography>
        )}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tutor Schedule
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Week"
                value={currentWeek}
                onChange={(newValue) => setCurrentWeek(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Subject Level ID"
                value={subjectLevelId}
                onChange={(e) => setSubjectLevelId(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button onClick={handlePreviousWeek}>Previous Week</Button>
              <Button onClick={handleNextWeek}>Next Week</Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {eachDayOfInterval({
              start: startOfWeek(currentWeek, { weekStartsOn: 1 }),
              end: endOfWeek(currentWeek, { weekStartsOn: 1 })
            }).map((day) => (
              <Grid item xs={12} sm={6} md={3} key={day.toString()}>
                {renderDaySchedule(day)}
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Time</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="slotName"
              label="Slot Name"
              type="text"
              fullWidth
              variant="outlined"
              value={updatedSlotName}
              onChange={(e) => setUpdatedSlotName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="startSlot"
              label="Start Time"
              type="time"
              fullWidth
              variant="outlined"
              value={updatedStartSlot}
              onChange={(e) => setUpdatedStartSlot(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              margin="dense"
              id="endSlot"
              label="End Time"
              type="time"
              fullWidth
              variant="outlined"
              value={updatedEndSlot}
              onChange={(e) => setUpdatedEndSlot(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
            <Button onClick={handleUpdateTime}>Update</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default TutorSchedule;