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
import { getRequestByModerator, getRequestByModeratorhaveUserId } from '../../service/RequestService';
import { axiosClient } from '../../axios/AxiosClient';

const ModeratorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [responseTitle, setResponseTitle] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openTutorDialog, setOpenTutorDialog] = useState(false);
  const [tutorData, setTutorData] = useState(null);

  const fetchRequests = async () => {
    try {
      let response;
      if (userId.trim() === '') {
        response = await getRequestByModerator(page + 1);
      } else {
        response = await getRequestByModeratorhaveUserId(page + 1, userId);
      }
      setRequests(response.data.data);
      setTotalCount(response.data.data.length); // Assuming the API doesn't provide a total count
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, rowsPerPage]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSearch = () => {
    setPage(0);
    fetchRequests();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (requestId) => {
    setSelectedRequestId(requestId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequestId(null);
    setResponseTitle('');
    setResponseContent('');
  };

  const handleResponseTitleChange = (event) => {
    setResponseTitle(event.target.value);
  };

  const handleResponseContentChange = (event) => {
    setResponseContent(event.target.value);
  };

  const handleSendResponse = async () => {
    try {
      const response = await axiosClient.post(`/Response/send-response?requestId=${selectedRequestId}`, {
        title: responseTitle,
        content: responseContent
      });
      setSnackbarMessage('Response sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error('Error sending response:', error);
      setSnackbarMessage('Error sending response. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleViewTutorRequest = async (userId) => {
    try {
      const response = await axiosClient.get(`/Tutors/get-all-tutors?search=${userId}&page=1`);
      setTutorData(response.data.data[0]);
      setOpenTutorDialog(true);
    } catch (error) {
      console.error('Error fetching tutor data:', error);
      setSnackbarMessage('Error fetching tutor data. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseTutorDialog = () => {
    setOpenTutorDialog(false);
    setTutorData(null);
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await axiosClient.put(`/Request/update-status-by-id?id=${requestId}`, {
        status: status
      });
      setSnackbarMessage(`Request ${status === 'Chấp Thuận' ? 'accepted' : 'declined'} successfully!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error('Error updating request status:', error);
      setSnackbarMessage('Error updating request status. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Moderator Requests
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={handleUserIdChange}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.userId}</TableCell>
                  <TableCell>{request.fullName}</TableCell>
                  <TableCell>{request.categoryName}</TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{new Date(request.createdDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDialog(request.id)} sx={{ mr: 1 }}>
                      Send Response
                    </Button>
                    {request.description.startsWith('Yêu cầu phê duyệt dịch vụ giảng viên') && (
                      <Button variant="contained" onClick={() => handleViewTutorRequest(request.userId)} sx={{ mr: 1 }}>
                        View Tutor Request
                      </Button>
                    )}
                    <Button variant="contained" color="success" onClick={() => handleUpdateStatus(request.id, 'Chấp Thuận')} sx={{ mr: 1 }}>
                      Accept
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleUpdateStatus(request.id, 'Từ Chối')}>
                      Decline
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
        <DialogTitle>Send Response</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="responseTitle"
            label="Response Title"
            type="text"
            fullWidth
            variant="outlined"
            value={responseTitle}
            onChange={handleResponseTitleChange}
          />
          <TextField
            margin="dense"
            id="responseContent"
            label="Response Content"
            type="text"
            fullWidth
            variant="outlined"
            value={responseContent}
            onChange={handleResponseContentChange}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSendResponse}>Send</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTutorDialog} onClose={handleCloseTutorDialog}>
        <DialogTitle>Tutor Information</DialogTitle>
        <DialogContent>
          {tutorData && (
            <>
              <Typography><strong>Name:</strong> {tutorData.tutorName}</Typography>
              <Typography><strong>Academic Level:</strong> {tutorData.academicLevel}</Typography>
              <Typography><strong>Work Place:</strong> {tutorData.workPlace}</Typography>
              <Typography><strong>Degree:</strong> {tutorData.degree}</Typography>
              <Typography><strong>Service Name:</strong> {tutorData.tutorServiceName}</Typography>
              <Typography><strong>Service Description:</strong> {tutorData.tutorServiceDescription}</Typography>
              <Typography><strong>Status:</strong> {tutorData.status}</Typography>
              <Typography><strong>Average Star:</strong> {tutorData.averageStar}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTutorDialog}>Close</Button>
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

export default ModeratorRequests;