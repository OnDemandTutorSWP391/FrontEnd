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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';


const ModeratorRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRatingId, setSelectedRatingId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchRatings = async () => {
    try {
      const response = await axiosClient.get(`/Ratings/get-all-ratings?page=${page + 1}`);
      setRatings(response.data.data);
      setTotalCount(response.data.data.length); // Assuming the API doesn't provide a total count
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (ratingId) => {
    setSelectedRatingId(ratingId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRatingId(null);
  };

  const handleDeleteRating = async () => {
    try {
      const response = await axiosClient.delete(`/Ratings/delete-rating?ratingId=${selectedRatingId}`);
      if (response.data.success) {
        setSnackbarMessage('Rating deleted successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
      handleCloseDialog();
      fetchRatings(); // Refresh the ratings list
    } catch (error) {
      console.error('Error deleting rating:', error);
      setSnackbarMessage('Error deleting rating. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Moderator Ratings Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tutor Name</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Star</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratings.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell>{rating.id}</TableCell>
                  <TableCell>{rating.tutorName}</TableCell>
                  <TableCell>{rating.studentName}</TableCell>
                  <TableCell>{rating.star}</TableCell>
                  <TableCell>{rating.description}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleOpenDialog(rating.id)}>
                      Delete
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
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this rating?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteRating} color="error">Delete</Button>
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

export default ModeratorRatings;