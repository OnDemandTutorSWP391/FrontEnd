import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getUserProfile } from '../../service/UserProfileService';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { updateUserProfile } from '../../service/AccountService';

const UserProfileDetail = () => {
  const [userProfile, setUserProfile] = useState({
    avatar: "",
    createdDate: "",
    dob: null,
    email: "",
    fullName: "",
    gender: "",
  });
  const [formDataUpdate, setDataUpdate] = useState({
    fullName: "",
    dob: null,
    gender: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        const profileData = response.data.data;
        setUserProfile(profileData);
        setDataUpdate({
          fullName: profileData.fullName,
          dob: new Date(profileData.dob),
          gender: profileData.gender,
          avatar: profileData.avatar,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        showSnackbar("Error fetching user profile. Please try again.", "error");
      }
    };
    fetchUserProfile();
  }, []);

  const handleDataChange = (key, value) => {
    setDataUpdate({ ...formDataUpdate, [key]: value });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    try {
      let avatarUrl = userProfile.avatar;
      if (avatarFile) {
        const avatarRef = ref(storage, `avatars/${avatarFile.name}`);
        await uploadBytes(avatarRef, avatarFile);
        avatarUrl = await getDownloadURL(avatarRef);
      }

      const updatedData = {
        ...formDataUpdate,
        avatar: avatarUrl,
        dob: formDataUpdate.dob.toISOString()
      };

      await updateUserProfile(updatedData);
      showSnackbar('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showSnackbar('Failed to update profile.', 'error');
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box m="20px">
        <AdminHeader title="User Profile" subtitle="Manage Your Account Details" />
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Account Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formDataUpdate.fullName}
                  onChange={(e) => handleDataChange("fullName", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={userProfile.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Birthday"
                  value={formDataUpdate.dob}
                  onChange={(newValue) => handleDataChange("dob", newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formDataUpdate.gender}
                    onChange={(e) => handleDataChange("gender", e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span">
                    Upload Avatar
                  </Button>
                </label>
                {avatarFile && <Typography variant="body2">{avatarFile.name}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
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
    </LocalizationProvider>
  );
};

export default UserProfileDetail;