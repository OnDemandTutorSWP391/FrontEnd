import React, { useState, useEffect } from 'react';
import {
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
  CircularProgress,
  Alert,
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';

const ModeratorResponses = () => {
  const [responses, setResponses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/Response/get-all?page=${page + 1}`);
      setResponses(response.data.data || []);
      setTotalCount(response.data.totalCount || response.data.data.length);
    } catch (error) {
      console.error('Error fetching responses:', error);
      setError('There is no response');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Moderator Responses
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Request ID</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Response Date</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {responses?.map((response) => (
                    <TableRow key={response.id}>
                      <TableCell>{response.id}</TableCell>
                      <TableCell>{response.requestId}</TableCell>
                      <TableCell>{response.categoryName}</TableCell>
                      <TableCell>{response.fullName}</TableCell>
                      <TableCell>{formatDate(response.responseDate)}</TableCell>
                      <TableCell>{response.description}</TableCell>
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
        )}
      </Paper>
    </Container>
  );
};

export default ModeratorResponses;