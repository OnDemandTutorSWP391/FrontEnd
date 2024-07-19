import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Autocomplete
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';

const TransferCoinsToTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [coins, setCoins] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axiosClient.get('/Tutors/get-all-tutors?page=1');
      setTutors(response.data.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleTransfer = async () => {
    if (!selectedTutor || !coins) {
      setSnackbarMessage('Please select a tutor and enter the number of coins');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axiosClient.post(`/Coins/transfer-coin?receiverId=${selectedTutor.id}&coin=${coins}`);
      setSnackbarMessage('Coins transferred successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      // Reset form
      setSelectedTutor(null);
      setCoins('');
    } catch (error) {
      console.error('Error transferring coins:', error);
      setSnackbarMessage('Error transferring coins. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transfer Coins to Tutor
        </Typography>
        <Autocomplete
          options={tutors}
          getOptionLabel={(option) => option.tutorName}
          renderInput={(params) => <TextField {...params} label="Select Tutor" />}
          value={selectedTutor}
          onChange={(event, newValue) => {
            setSelectedTutor(newValue);
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Number of Coins"
          type="number"
          value={coins}
          onChange={(e) => setCoins(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleTransfer} fullWidth>
          Transfer Coins
        </Button>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TransferCoinsToTutor;