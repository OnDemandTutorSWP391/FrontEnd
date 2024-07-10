import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';

const TutorSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [levels, setLevels] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchSubjects = async () => {
    try {
      const response = await axiosClient.get(`/SubjectLevels/get-all-subject-level-by-tutorId?page=${page + 1}`);
      setSubjects(response.data.data);
      setTotalCount(response.data.data.length);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await axiosClient.get('/Levels/get-all');
      setLevels(response.data.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  const fetchSubjectList = async () => {
    try {
      const response = await axiosClient.get('/Subjects/get-all');
      setSubjectList(response.data.data);
    } catch (error) {
      console.error('Error fetching subject list:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchLevels();
    fetchSubjectList();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (subject) => {
    setSelectedSubject(subject);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubject(null);
  };

  const handleUpdateSubject = async () => {
    try {
      const response = await axiosClient.put(`/SubjectLevels/update-subject-level-for-tutor?id=${selectedSubject.id}`, {
        levelId: selectedSubject.levelId,
        subjectId: selectedSubject.subjectId,
        tutorId: selectedSubject.tutorId,
        name: selectedSubject.serviceName,
        description: selectedSubject.description,
        url: selectedSubject.url,
        coin: selectedSubject.coin,
        limitMember: parseInt(selectedSubject.limitMember.split('/')[1]),
        image: selectedSubject.image
      });
      setSnackbarMessage('Subject updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
      setSnackbarMessage('Error updating subject. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedSubject(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tutor Subject Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Limit</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.id}</TableCell>
                  <TableCell>{subject.levelName}</TableCell>
                  <TableCell>{subject.subjectName}</TableCell>
                  <TableCell>{subject.serviceName}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>{subject.coin}</TableCell>
                  <TableCell>{subject.limitMember}</TableCell>
                  <TableCell>
                    <Chip 
                      label={subject.isLocked ? 'Locked' : 'Active'} 
                      color={subject.isLocked ? 'error' : 'success'} 
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDialog(subject)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Subject</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select
              name="levelId"
              value={selectedSubject?.levelId || ''}
              onChange={handleInputChange}
            >
              {levels.map((level) => (
                <MenuItem key={level.id} value={level.id}>{level.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              name="subjectId"
              value={selectedSubject?.subjectId || ''}
              onChange={handleInputChange}
            >
              {subjectList.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            name="serviceName"
            label="Service Name"
            value={selectedSubject?.serviceName || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Description"
            value={selectedSubject?.description || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="url"
            label="URL"
            value={selectedSubject?.url || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="coin"
            label="Coin"
            type="number"
            value={selectedSubject?.coin || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="limitMember"
            label="Limit Member"
            value={selectedSubject?.limitMember?.split('/')[1] || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="image"
            label="Image URL"
            value={selectedSubject?.image || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateSubject} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TutorSubjects;