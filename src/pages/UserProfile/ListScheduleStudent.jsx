import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  TextField,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, parseISO, isValid } from 'date-fns';
import { getCourseStudent, getCourseStudentWithFilter } from "../../service/CourseService";

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [subjectLevelId, setSubjectLevelId] = useState('');

  const fetchSchedule = async () => {
    try {
      const fromDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
      const toDate = endOfWeek(currentWeek, { weekStartsOn: 1 });
      
      // Chuyển đổi ngày thành định dạng ISO 8601
      const fromDateISO = fromDate.toISOString();
      const toDateISO = toDate.toISOString();
      
      let response;
      if (!subjectLevelId) {
        response = await getCourseStudent(1, fromDateISO, toDateISO);
      } else {
        response = await getCourseStudentWithFilter(subjectLevelId, 1, fromDateISO, toDateISO);
      }
      
      // Chuyển đổi ngày trong dữ liệu phản hồi từ ISO 8601 về "dd/MM/yyyy"
      const formattedSchedule = response.data.data.map(item => {
        let formattedDate = item.date;
        try {
          const parsedDate = parseISO(item.date);
          if (isValid(parsedDate)) {
            formattedDate = format(parsedDate, 'dd/MM/yyyy');
          }
        } catch (error) {
          console.warn(`Invalid date format for item ${item.id}: ${item.date}`);
        }
        return {
          ...item,
          date: formattedDate
        };
      });
      
      setSchedule(formattedSchedule);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setSchedule([]);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [currentWeek, subjectLevelId]);

  const handlePreviousWeek = () => {
    setCurrentWeek(prevWeek => subWeeks(prevWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
  };

  const renderDaySchedule = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    const daySchedule = schedule.filter(item => item.date === formattedDate);
    return (
      <Box>
        <Typography variant="h6">{format(date, 'EEEE, dd/MM/yyyy')}</Typography>
        {daySchedule.length > 0 ? (
          daySchedule.map(item => (
            <Box key={item.id} sx={{ mb: 1, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography>{item.slotName}: {item.startSlot} - {item.endSlot}</Typography>
              <Typography>Subject Level ID: {item.subjectLevelId}</Typography>
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
            Student Schedule
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
      </Container>
    </LocalizationProvider>
  );
};

export default StudentSchedule;