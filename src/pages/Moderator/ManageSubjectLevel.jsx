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
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';


const SubjectLevelList = () => {
  const [subjectLevels, setSubjectLevels] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchSubjectLevels = async () => {
    try {
      const response = await axiosClient.get(`/SubjectLevels/get-all-subject-level?page=${page + 1}`);
      setSubjectLevels(response.data.data);
      setTotalCount(response.data.data.length); // Assuming the API doesn't provide a total count
    } catch (error) {
      console.error('Error fetching subject levels:', error);
    }
  };

  useEffect(() => {
    fetchSubjectLevels();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Subject Level List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Level Name</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>Tutor Name</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Limit Member</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectLevels.map((subjectLevel) => (
                <TableRow key={subjectLevel.id}>
                  <TableCell>{subjectLevel.id}</TableCell>
                  <TableCell>{subjectLevel.levelName}</TableCell>
                  <TableCell>{subjectLevel.subjectName}</TableCell>
                  <TableCell>{subjectLevel.tutorName}</TableCell>
                  <TableCell>{subjectLevel.serviceName || 'N/A'}</TableCell>
                  <TableCell>{subjectLevel.description}</TableCell>
                  <TableCell>{subjectLevel.url}</TableCell>
                  <TableCell>{subjectLevel.coin}</TableCell>
                  <TableCell>{subjectLevel.limitMember}</TableCell>
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
    </Container>
  );
};

export default SubjectLevelList;