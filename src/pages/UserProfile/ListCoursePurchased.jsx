import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Typography,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { tokens } from "../../theme";
import {
  getCoursePurchasedByUser,
  getCoursePurchasedByUserWithFilter,
} from "../../service/CourseService";
import { axiosClient } from "../../axios/AxiosClient";

const ListCoursesByUser = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingDescription, setRatingDescription] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchCourses = async () => {
    try {
      let response;
      if (!courseId) {
        response = await getCoursePurchasedByUser(currentPage);
      } else {
        response = await getCoursePurchasedByUserWithFilter(
          currentPage,
          courseId
        );
      }
      setCourses(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
      showSnackbar("Error fetching courses. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const handleCourseIdChange = (event) => setCourseId(event.target.value);
  const handleFetchCourses = () => {
    setCurrentPage(1);
    fetchCourses();
  };

  const handleOpenRatingDialog = (tutorId) => {
    setSelectedTutorId(tutorId);
    setOpenRatingDialog(true);
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
    setSelectedTutorId(null);
    setRatingValue(0);
    setRatingDescription("");
  };

  const handleSubmitRating = async () => {
    try {
      await axiosClient.post("/Ratings/create-rating", {
        tutorId: selectedTutorId,
        star: ratingValue,
        description: ratingDescription,
      });
      showSnackbar("Rating submitted successfully!", "success");
      handleCloseRatingDialog();
    } catch (error) {
      console.error("Error submitting rating:", error);
      showSnackbar("Error submitting rating. Please try again.", "error");
    }
  };

  const handleMoveOutClass = async (studentJoinId) => {
    try {
      const response = await axiosClient.delete(
        `/StudentJoins/move-out?studentJoinId=${studentJoinId}`
      );
      if (response.data.success) {
        showSnackbar(response.data.message, "success");
        fetchCourses(); // Refresh the list after moving out
      } else {
        showSnackbar("Failed to move out of class. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error moving out of class:", error);
      showSnackbar("Error moving out of class. Please try again.", "error");
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
        <AdminHeader title="Manage Courses" />
        <div className="mb-5 flex">
          <TextField
            label="Course ID"
            value={courseId}
            onChange={handleCourseIdChange}
            variant="outlined"
            sx={{ marginRight: "10px" }}
          />
          <Button
            className="!font-bold"
            variant="contained"
            color="primary"
            onClick={handleFetchCourses}
          >
            Search
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  ID
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Full Name
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Email
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  User ID
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Course Id
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses &&
                courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="!text-sm">{course.id}</TableCell>
                    <TableCell className="!text-sm">
                      {course.fullName}
                    </TableCell>
                    <TableCell className="!text-sm">{course.email}</TableCell>
                    <TableCell className="!text-sm">{course.userId}</TableCell>
                    <TableCell className="!text-sm">
                      {course.subjectLevelId}
                    </TableCell>
                    <TableCell className="!text-sm">
                      <Button
                        className="!text-lg !mr-3 !font-bold !capitalize !text-green-500"
                        onClick={() => handleOpenRatingDialog(course.tutorId)}
                      >
                        Rate Tutor
                      </Button>
                      <Button
                        className="!text-lg !font-bold !mr-3 !capitalize !text-red-500"
                        onClick={() => handleMoveOutClass(course.id)}
                      >
                        Move Out
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
            className="!text-xl !mr-3"
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

        <Dialog open={openRatingDialog} onClose={handleCloseRatingDialog}>
          <DialogTitle>Rate Tutor</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography component="legend">Rating:</Typography>
              <Rating
                name="rating"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
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
              value={ratingDescription}
              onChange={(e) => setRatingDescription(e.target.value)}
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRatingDialog}>Cancel</Button>
            <Button onClick={handleSubmitRating} disabled={ratingValue === 0}>
              Submit
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
      </div>
    </>
  );
};

export default ListCoursesByUser;
