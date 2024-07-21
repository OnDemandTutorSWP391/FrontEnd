import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { axiosClient } from "../../axios/AxiosClient";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const StudentRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [newStar, setNewStar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newDescription, setNewDescription] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/Ratings/get-ratings-by-student-id?page=${currentPage}`
      );
      setRatings(response.data.data || []);
      setTotalPages(Math.ceil(response.data.total / 10));
      setTotalCount(response.data.totalCount || response.data.data.length || 0);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      showSnackbar("Error fetching ratings", "error");
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [currentPage]);

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
    setNewDescription("");
  };

  const handleUpdateRating = async () => {
    try {
      if (!selectedRating || !selectedRating.id) {
        showSnackbar("Invalid rating selected", "error");
        return;
      }

      console.log("Updating rating:", {
        id: selectedRating.id,
        star: newStar,
        description: newDescription,
      });

      await axiosClient.put(
        `/Ratings/update-rating?ratingId=${selectedRating.id}`,
        {
          star: newStar,
          description: newDescription,
        }
      );
      showSnackbar("Rating updated successfully", "success");
      handleCloseDialog();
      fetchRatings();
    } catch (error) {
      console.error("Error updating rating:", error);
      showSnackbar("Error updating rating", "error");
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      await axiosClient.delete(
        `/Ratings/delete-rating-for-student?ratingId=${ratingId}`
      );
      showSnackbar("Rating deleted successfully", "success");
      fetchRatings();
    } catch (error) {
      console.error("Error deleting rating:", error);
      showSnackbar("Error deleting rating", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="p-10">
        <AdminHeader title="Your Rating" />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Tutor Name
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Start
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Description
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratings.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell className="!text-xl">{rating.tutorName}</TableCell>
                  <TableCell className="!text-xl">
                    <Rating value={rating.star} readOnly />
                  </TableCell>
                  <TableCell className="!text-xl">
                    {rating.description}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="!text-xl !font-bold !text-green-500"
                      onClick={() => handleOpenUpdateDialog(rating)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      className="!text-xl !font-bold"
                      onClick={() => handleDeleteRating(rating.id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Phần điều hướng trang */}
        <div className="w-full flex justify-end mt-10">
          <Button
            className="!text-xl mr-3"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Trước
          </Button>
          <span className="text-xl mt-1">
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            className="!text-xl ml-3"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
      <Container maxWidth="lg">
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update Rating</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
            <Button onClick={handleUpdateRating} disabled={newStar === 0}>
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default StudentRatings;
