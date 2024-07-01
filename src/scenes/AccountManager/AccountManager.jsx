import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockIcon from "@mui/icons-material/Lock";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { axiosClient } from "../../axios/AxiosClient";


const AccountManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [pageIndex]);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get(`/Admins/GetAllUser?pageIndex=${pageIndex}`);
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLockAccount = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const confirmLockAccount = async () => {
    try {
      const response = await axiosClient.post(`/Lock-user-account?id=${selectedUserId}`);
      if (response.data.success) {
        fetchUsers(); // Refresh user list
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error locking account:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "isLocked",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { isLocked } }) => {
        return (
          <Typography color={isLocked ? colors.redAccent[500] : colors.greenAccent[500]}>
            {isLocked ? "Locked" : "Active"}
          </Typography>
        );
      },
    },
    {
      field: "roles",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { roles } }) => {
        const role = roles[0]; // Assuming only one role per user
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "Admin"
                ? colors.greenAccent[600]
                : role === "Moderator"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "Moderator" && <SecurityOutlinedIcon />}
            {(role === "Student" || role === "Tutor") && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LockIcon />}
            onClick={() => handleLockAccount(row.id)}
            disabled={row.isLocked || row.roles.includes('Admin')}
          >
            Lock
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <AdminHeader title="Account" subtitle="Managing Account" />
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
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
          onPageChange={(newPage) => setPageIndex(newPage)}
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Lock User Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to lock this user account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLockAccount} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountManager;