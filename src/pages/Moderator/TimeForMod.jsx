import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { axiosClient } from "../../axios/AxiosClient";

const WeeklySchedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [studentJoins, setStudentJoins] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudentJoinId, setSelectedStudentJoinId] = useState(null);
  const [userId, setUserId] = useState("");
  const [subjectLevelId, setSubjectLevelId] = useState("");

  useEffect(() => {
    fetchStudentJoins();
  }, [page, userId, subjectLevelId]);

  const fetchStudentJoins = async () => {
    try {
      let currentPage = page;
      if (subjectLevelId && !userId) {
        currentPage = 1;
      }

      let url = `/StudentJoins/all-student-join-for-all-subject-level?page=${currentPage}`;
      if (userId) url += `&userId=${userId}`;
      if (subjectLevelId) url += `&subjectLevelId=${subjectLevelId}`;

      const response = await axiosClient.get(url);
      if (response.data.success) {
        setStudentJoins(response.data.data || []); // Ensure data is an array
        if (subjectLevelId && !userId) {
          setPage(1);
        }
      } else {
        setStudentJoins([]); // Set to empty array if response is not successful
      }
    } catch (error) {
      console.error("Error fetching student joins:", error);
      setStudentJoins([]); // Set to empty array on error
    }
  };

  const handleDeleteStudentJoin = (id) => {
    setSelectedStudentJoinId(id);
    setOpenDialog(true);
  };

  const confirmDeleteStudentJoin = async () => {
    try {
      const response = await axiosClient.delete(`/StudentJoins/delete-student-join-for-staff?studentJoinId=${selectedStudentJoinId}`);
      if (response.data.success) {
        fetchStudentJoins(); // Refresh student join list
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error deleting student join:", error);
    }
  };

  const handleSubjectLevelIdChange = (e) => {
    setSubjectLevelId(e.target.value);
    if (e.target.value && !userId) {
      setPage(1);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "isLocked",
      headerName: "Status",
      flex: 0.5,
      renderCell: ({ row: { isLocked } }) => (
        <Typography color={isLocked ? colors.redAccent[500] : colors.greenAccent[500]}>
          {isLocked ? "Locked" : "Active"}
        </Typography>
      ),
    },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "subjectLevelId", headerName: "Subject Level ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => handleDeleteStudentJoin(row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <AdminHeader title="Student Joins" subtitle="Managing Student Joins" />
      <Box mb="20px">
        <TextField
          label="Subject Level ID"
          variant="outlined"
          value={subjectLevelId}
          onChange={handleSubjectLevelIdChange}
        />
      </Box>
      <Box
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
          rows={studentJoins.length ? studentJoins : []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Student Join"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this student join? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteStudentJoin} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WeeklySchedule;
