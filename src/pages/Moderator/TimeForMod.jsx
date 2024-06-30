import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, parseISO, isWithinInterval, parse } from 'date-fns';
import { axiosClient } from '../../axios/AxiosClient';


const WeeklySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [subjectLevelId, setSubjectLevelId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const convertDateFormat = (dateString) => {
    // Parse chuỗi ngày từ định dạng dd/MM/yyyy
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    // Format lại thành chuỗi ISO
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  };
  
  const fetchSchedules = async () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    try {
      const response = await axiosClient.get('/Times/times-for-mod', {
        params: {
          subjectLevelId: subjectLevelId,
          from: convertDateFormat(format(start, 'dd/MM/yyyy')),
          to: convertDateFormat(format(end, 'dd/MM/yyyy')),
          page: 1
        }
      });
      setSchedules(response.data.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedDate, subjectLevelId]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSubjectLevelIdChange = (event) => {
    setSubjectLevelId(event.target.value);
  };

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderWeekSchedule = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });
  
    return (
      <Box display="flex" justifyContent="space-between">
        {days.map((day) => (
          <Box key={day.toString()} width="13%" border="1px solid #ccc" p={1}>
            <Typography variant="subtitle2">{format(day, 'EEE dd/MM')}</Typography>
            {(schedules || [])  // Thêm kiểm tra null ở đây
              .filter(schedule => {
                const scheduleDate = parseISO(schedule.date.split('/').reverse().join('-'));
                return isWithinInterval(scheduleDate, { start, end }) && 
                       format(scheduleDate, 'dd/MM/yyyy') === format(day, 'dd/MM/yyyy');
              })
              .map(schedule => (
                <Paper 
                  key={schedule.id} 
                  elevation={3} 
                  sx={{ my: 1, p: 1, cursor: 'pointer' }}
                  onClick={() => handleScheduleClick(schedule)}
                >
                  <Typography variant="body2">{schedule.slotName}</Typography>
                  <Typography variant="caption">{`${schedule.startSlot} - ${schedule.endSlot}`}</Typography>
                </Paper>
              ))
            }
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>Weekly Schedule</Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <DatePicker
            label="Select Week"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            label="Subject Level ID"
            value={subjectLevelId}
            onChange={handleSubjectLevelIdChange}
          />
          <Button variant="contained" onClick={fetchSchedules}>Fetch Schedules</Button>
        </Box>
        {renderWeekSchedule()}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Schedule Details</DialogTitle>
          <DialogContent>
            {selectedSchedule && (
              <>
                <Typography><strong>ID:</strong> {selectedSchedule.id}</Typography>
                <Typography><strong>Subject Level ID:</strong> {selectedSchedule.subjectLevelId}</Typography>
                <Typography><strong>Slot Name:</strong> {selectedSchedule.slotName}</Typography>
                <Typography><strong>Start Time:</strong> {selectedSchedule.startSlot}</Typography>
                <Typography><strong>End Time:</strong> {selectedSchedule.endSlot}</Typography>
                <Typography><strong>Date:</strong> {selectedSchedule.date}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default WeeklySchedule;