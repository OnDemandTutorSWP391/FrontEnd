import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';


const ModeratorSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchSubjects = async () => {
    try {
      const response = await axiosClient.get(`/Subjects/get-all?page=${page + 1}`);
      setSubjects(response.data.data);
      setTotalCount(response.data.data.length); // Assuming the API doesn't provide a total count
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddDialog = () => {
    setSubjectName('');
    setOpenAddDialog(true);
  };

  const handleOpenUpdateDialog = (subject) => {
    setSelectedSubject(subject);
    setSubjectName(subject.name);
    setOpenUpdateDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setOpenUpdateDialog(false);
    setSelectedSubject(null);
    setSubjectName('');
  };

  const handleAddSubject = async () => {
    try {
      const response = await axiosClient.post('/Subjects/create-subject', { name: subjectName });
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject:', error);
      setSnackbarMessage('Error adding subject. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateSubject = async () => {
    try {
      const response = await axiosClient.put(`/Subjects/update-subject?id=${selectedSubject.id}`, { name: subjectName });
      setSnackbarMessage(response.data.message);
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

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Moderator Subjects
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleOpenAddDialog}>
            Add New Subject
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bg-slate-500 !text-xl !font-bold">ID</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Name</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.id}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenUpdateDialog(subject)}>
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

      <Dialog open={openAddDialog || openUpdateDialog} onClose={handleCloseDialog}>
        <DialogTitle>{openAddDialog ? 'Add New Subject' : 'Update Subject'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subjectName"
            label="Subject Name"
            type="text"
            fullWidth
            variant="outlined"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={openAddDialog ? handleAddSubject : handleUpdateSubject}>
            {openAddDialog ? 'Add' : 'Update'}
          </Button>
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

export default ModeratorSubjects;