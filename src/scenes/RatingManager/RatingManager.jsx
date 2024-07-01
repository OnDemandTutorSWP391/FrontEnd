import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, TextField, Rating } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { axiosClient } from "../../axios/AxiosClient";


const RatingManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchRatings();
  }, [page, userId]);

  const fetchRatings = async () => {
    try {
      let url = `/Ratings/get-all-ratings?page=${page + 1}`; // DataGrid uses 0-based indexing, API uses 1-based
      if (userId) url += `&userId=${userId}`;
      
      const response = await axiosClient.get(url);
      if (response.data.success) {
        setRatings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "tutorName", headerName: "Tutor Name", flex: 1 },
    { field: "studentName", headerName: "Student Name", flex: 1 },
    { 
      field: "star", 
      headerName: "Rating", 
      flex: 1,
      renderCell: ({ row: { star } }) => (
        <Rating value={star} readOnly />
      ),
    },
    { 
      field: "description", 
      headerName: "Description", 
      flex: 2,
      renderCell: ({ row: { description } }) => (
        <Typography>{description}</Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <AdminHeader title="Ratings" subtitle="Managing Ratings" />
      <Box mb="20px">
        <TextField
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: '10px' }}
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
          rows={ratings}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default RatingManager;