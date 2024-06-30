import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [subjectLevelId, setSubjectLevelId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchStudents = async () => {
    try {
      let url = `/StudentJoins/student-join-list-for-tutor?page=${page + 1}&pageSize=${rowsPerPage}`;
      if (subjectLevelId) url += `&subjectLevelId=${subjectLevelId}`;
      if (studentId) url += `&studentId=${studentId}`;

      console.log(`Fetching students from: ${url}`); // Logging the URL

      const response = await axiosClient.get(url);

      console.log('Response data:', response.data); // Logging the response data

      setStudents(response.data.data || []); // Ensure students is an array
      setTotalCount(response.data.totalCount || 0); // Ensure totalCount is a number
    } catch (error) {
      console.error('Error fetching students:', error);
      setSnackbar({ open: true, message: 'Error fetching students', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, rowsPerPage, subjectLevelId, studentId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(`/StudentJoins/delete-student-for-tutor?studentJoinId=${selectedStudent.id}`);
      console.log(selectedStudent.id);
      setSnackbar({ open: true, message: 'Student deleted successfully', severity: 'success' });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      setSnackbar({ open: true, message: 'Error deleting student', severity: 'error' });
    }
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Student List
        </Typography>
        <TextField
          label="Subject Level ID"
          value={subjectLevelId}
          onChange={(e) => setSubjectLevelId(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button variant="contained" onClick={() => setPage(0)} sx={{ mt: 2 }}>
          Filter
        </Button>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Subject Level ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students && students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.userId}</TableCell>
                    <TableCell>{student.subjectLevelId}</TableCell>
                    <TableCell>
                      <Button color="error" onClick={() => handleDeleteClick(student)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
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
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student from the course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentList;
