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


const ModeratorLevels = () => {
  const [levels, setLevels] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [levelName, setLevelName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchLevels = async () => {
    try {
      const response = await axiosClient.get(`/Levels/get-all?page=${page + 1}`, {
        params: { name: '' }
      });
      setLevels(response.data.data);
      setTotalCount(response.data.data.length); // Assuming the API doesn't provide a total count
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddDialog = () => {
    setLevelName('');
    setOpenAddDialog(true);
  };

  const handleOpenUpdateDialog = (level) => {
    setSelectedLevel(level);
    setLevelName(level.name);
    setOpenUpdateDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setOpenUpdateDialog(false);
    setSelectedLevel(null);
    setLevelName('');
  };

  const handleAddLevel = async () => {
    try {
      const response = await axiosClient.post('/Levels/create-level', { name: levelName });
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
      fetchLevels();
    } catch (error) {
      console.error('Error adding level:', error);
      setSnackbarMessage('Error adding level. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateLevel = async () => {
    try {
      const response = await axiosClient.put(`/Levels/update-level?id=${selectedLevel.id}`, { name: levelName });
      setSnackbarMessage('Level updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
      fetchLevels();
    } catch (error) {
      console.error('Error updating level:', error);
      setSnackbarMessage('Error updating level. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Moderator Levels
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleOpenAddDialog}>
            Add New Level
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {levels.map((level) => (
                <TableRow key={level.id}>
                  <TableCell>{level.id}</TableCell>
                  <TableCell>{level.name}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenUpdateDialog(level)}>
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
        <DialogTitle>{openAddDialog ? 'Add New Level' : 'Update Level'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="levelName"
            label="Level Name"
            type="text"
            fullWidth
            variant="outlined"
            value={levelName}
            onChange={(e) => setLevelName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={openAddDialog ? handleAddLevel : handleUpdateLevel}>
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

export default ModeratorLevels;