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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';
import DeleteIcon from '@mui/icons-material/Delete';

const SubjectLevel = () => {
    const [subjectLevels, setSubjectLevels] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchSubjectLevels = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/SubjectLevels/get-all-subject-level?page=${page + 1}&pageSize=${rowsPerPage}`);
        setSubjectLevels(response.data.data || []);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching subject levels:', error);
        setSubjectLevels([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
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
  
    const handleDeleteClick = (id) => {
      setDeleteId(id);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setDeleteId(null);
    };
  
    const handleConfirmDelete = async () => {
      try {
        await axiosClient.delete(`/SubjectLevels/delete-subject-level-for-staff?id=${deleteId}`);
        fetchSubjectLevels(); // Refresh the list after deletion
        handleCloseDialog();
      } catch (error) {
        console.error('Error deleting subject level:', error);
      }
    };
  
    return (
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Subject Level List
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : subjectLevels.length === 0 ? (
            <Typography sx={{ my: 4 }}>No subject levels found.</Typography>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">ID</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Level Name</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Subject Name</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Tutor Name</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Service Name</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Description</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">URL</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Coin</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Limit Member</TableCell>
                      <TableCell className="bg-slate-500 !text-xl !font-bold">Actions</TableCell>
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
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(subjectLevel.id)}
                          >
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
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </>
          )}
        </Paper>
  
        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this subject level? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
}

export default SubjectLevel