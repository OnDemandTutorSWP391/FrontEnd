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
                <TableCell className="bg-slate-500 !text-xl !font-bold">Request ID</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">User ID</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Full Name</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Category</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Description</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Status</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Created Date</TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">Action</TableCell>
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
                    <Button variant="contained" onClick={() => handleOpenDialog(request.id)}>
                      Send Response
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

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ModeratorRequests;