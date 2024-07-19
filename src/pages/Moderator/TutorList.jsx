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
  Avatar,
  Chip,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';

const TutorList12 = () => {
  const [tutors, setTutors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedTutorProfile, setSelectedTutorProfile] = useState(null);

  const fetchTutors = async () => {
    try {
      const response = await axiosClient.get(`/Tutors/get-all-tutors?page=${page + 1}`);
      setTutors(response.data.data);
      setTotalCount(response.data.data.length); // Adjust this if the API provides a total count
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chấp thuận':
        return 'success';
      case 'Chờ phê duyệt':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleViewProfile = async (tutorId) => {
    try {
      const response = await axiosClient.get(`/Tutors/get-tutor-profile-by-id?id=${tutorId}`);
      setSelectedTutorProfile(response.data.data);
      setOpenProfile(true);
    } catch (error) {
      console.error('Error fetching tutor profile:', error);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
    setSelectedTutorProfile(null);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tutor List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Academic Level</TableCell>
                <TableCell>Work Place</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Average Star</TableCell>
                <TableCell>Is Locked</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutors.map((tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell>
                    <Avatar src={tutor.avatar} alt={tutor.tutorName}>
                      {tutor.tutorName.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{tutor.tutorName}</TableCell>
                  <TableCell>{tutor.academicLevel}</TableCell>
                  <TableCell>{tutor.workPlace}</TableCell>
                  <TableCell>{tutor.tutorServiceName}</TableCell>
                  <TableCell>
                    <Chip label={tutor.status} color={getStatusColor(tutor.status)} />
                  </TableCell>
                  <TableCell>{tutor.averageStar}</TableCell>
                  <TableCell>
                    <Chip label={tutor.isLocked ? 'Locked' : 'Unlocked'}
                          color={tutor.isLocked ? 'error' : 'success'} />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleViewProfile(tutor.id)}>
                      View Profile
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

      <Dialog open={openProfile} onClose={handleCloseProfile}>
        <DialogTitle>Tutor Profile</DialogTitle>
        <DialogContent>
          {selectedTutorProfile && (
            <Box>
              <Typography><strong>Academic Level:</strong> {selectedTutorProfile.academicLevel}</Typography>
              <Typography><strong>Work Place:</strong> {selectedTutorProfile.workPlace}</Typography>
              <Typography><strong>Degree:</strong> {selectedTutorProfile.degree}</Typography>
              <Typography><strong>Credit Card:</strong> {selectedTutorProfile.creditCard}</Typography>
              <Typography><strong>Service Name:</strong> {selectedTutorProfile.tutorServiceName}</Typography>
              <Typography><strong>Service Description:</strong> {selectedTutorProfile.tutorServiceDescription}</Typography>
              <Typography><strong>Service Video:</strong> {selectedTutorProfile.tutorServiceVideo}</Typography>
              <Typography><strong>Learning Material Demo:</strong> {selectedTutorProfile.learningMaterialDemo}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TutorList12;