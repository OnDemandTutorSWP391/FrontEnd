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
  Alert
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { tokens } from "../../theme";
import { getCoursePurchasedByUser, getCoursePurchasedByUserWithFilter } from "../../service/CourseService";
import { axiosClient } from "../../axios/AxiosClient";

const ListCoursesByUser = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingDescription, setRatingDescription] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const fetchCourses = async () => {
    try {
      let response;
      if (!courseId) {
        response = await getCoursePurchasedByUser(pageIndex + 1);
      } else {
        response = await getCoursePurchasedByUserWithFilter(pageIndex + 1, courseId);
      }
      setCourses(response.data.data);
      setRowCount(response.data.totalCount || 0);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
      showSnackbar("Error fetching courses. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [pageIndex, pageSize]);

  const handleCourseIdChange = (event) => setCourseId(event.target.value);
  const handlePageChange = (newPage) => setPageIndex(newPage);
  const handleFetchCourses = () => {
    setPageIndex(0);
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
        description: ratingDescription
      });
      showSnackbar("Rating submitted successfully!", "success");
      handleCloseRatingDialog();
    } catch (error) {
      console.error('Error submitting rating:', error);
      showSnackbar("Error submitting rating. Please try again.", "error");
    }
  };

  const handleMoveOutClass = async (studentJoinId) => {
    try {
      const response = await axiosClient.delete(`/StudentJoins/move-out?studentJoinId=${studentJoinId}`);
      if (response.data.success) {
        showSnackbar(response.data.message, "success");
        fetchCourses(); // Refresh the list after moving out
      } else {
        showSnackbar("Failed to move out of class. Please try again.", "error");
      }
    } catch (error) {
      console.error('Error moving out of class:', error);
      showSnackbar("Error moving out of class. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "subjectLevelId", headerName: "Course ID", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenRatingDialog(params.row.tutorId)}
            sx={{ marginRight: 1 }}
          >
            Rate Tutor
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleMoveOutClass(params.row.id)}
          >
            Move Out
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <AdminHeader title="Manage Courses" subtitle="Managing Courses" />
      <Box mb="20px">
        <TextField
          label="Course ID"
          value={courseId}
          onChange={handleCourseIdChange}
          variant="outlined"
          sx={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleFetchCourses}>
          Fetch Courses
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={courses || []}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={rowCount}
          page={pageIndex}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Box>

      <Dialog open={openRatingDialog} onClose={handleCloseRatingDialog}>
        <DialogTitle>Rate Tutor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
          <Button onClick={handleSubmitRating} disabled={ratingValue === 0}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListCoursesByUser;