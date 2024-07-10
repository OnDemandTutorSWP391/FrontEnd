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
  TextField,
  Rating,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';


const StudentRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [newStar, setNewStar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newDescription, setNewDescription] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/Ratings/get-ratings-by-student-id?page=${page + 1}`);
      setRatings(response.data.data || []);
      setTotalCount(response.data.totalCount || response.data.data.length || 0);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      showSnackbar('Error fetching ratings', 'error');
      setRatings([]);
    } finally {
      setLoading(false);
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

  const handleOpenUpdateDialog = (rating) => {
    setSelectedRating(rating);
    setNewStar(rating.star);
    setNewDescription(rating.description);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRating(null);
    setNewStar(0);
    setNewDescription('');
  };

  const handleUpdateRating = async () => {
    try {
      if (!selectedRating || !selectedRating.id) {
        showSnackbar('Invalid rating selected', 'error');
        return;
      }
      
      console.log('Updating rating:', { id: selectedRating.id, star: newStar, description: newDescription });
      
      await axiosClient.put(`/Ratings/update-rating?ratingId=${selectedRating.id}`, {
        star: newStar,
        description: newDescription
      });
      showSnackbar('Rating updated successfully', 'success');
      handleCloseDialog();
      fetchRatings();
    } catch (error) {
      console.error('Error updating rating:', error);
      showSnackbar('Error updating rating', 'error');
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      await axiosClient.delete(`/Ratings/delete-rating-for-student?ratingId=${ratingId}`);
      showSnackbar('Rating deleted successfully', 'success');
      fetchRatings();
    } catch (error) {
      console.error('Error deleting rating:', error);
      showSnackbar('Error deleting rating', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Ratings
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : ratings.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tutor Name</TableCell>
                    <TableCell>Star</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratings.map((rating) => (
                    <TableRow key={rating.id}>
                      <TableCell>{rating.tutorName}</TableCell>
                      <TableCell>
                        <Rating value={rating.star} readOnly />
                      </TableCell>
                      <TableCell>{rating.description}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenUpdateDialog(rating)} sx={{ mr: 1 }}>
                          Update
                        </Button>
                        <Button onClick={() => handleDeleteRating(rating.id)} color="error">
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
          </>
        ) : (
          <Typography variant="body1">No ratings found.</Typography>
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Rating</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="legend">Rating:</Typography>
            <Rating
              name="rating"
              value={newStar}
              onChange={(event, newValue) => {
                setNewStar(newValue);
              }}
            />
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateRating} disabled={newStar === 0}>Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentRatings;