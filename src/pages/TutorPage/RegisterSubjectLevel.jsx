import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { axiosClient } from '../../axios/AxiosClient';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';

const RegisterSubjectLevel = ({ updateData }) => {
  const [subjectLevel, setSubjectLevel] = useState({
    levelId: null,
    subjectId: null,
    tutorId: '1',
    name: '',
    description: '',
    url: '',
    coin: '',
    limitMember: 5,
    image: null
  });
  const [levels, setLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchLevels();
    fetchSubjects();
    if (updateData) {
      setSubjectLevel(prevState => ({
        ...prevState,
        ...updateData,
        levelId: updateData.levelId || null,
        subjectId: updateData.subjectId || null,
      }));
    }
  }, [updateData]);

  const fetchLevels = async () => {
    try {
      const response = await axiosClient.get('/Levels/get-all');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setLevels(response.data.data);
      } else {
        console.error('Levels data is not as expected:', response);
        setLevels([]);
      }
    } catch (error) {
      console.error("Error fetching levels:", error);
      setSnackbarMessage("Error fetching levels");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLevels([]);
    }
  };
  
  const fetchSubjects = async () => {
    try {
      const response = await axiosClient.get('/Subjects/get-all');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setSubjects(response.data.data);
      } else {
        console.error('Subjects data is not as expected:', response);
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSnackbarMessage("Error fetching subjects");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setSubjects([]);
    }
  };

  const handleDataChange = (key, value) => {
    setSubjectLevel(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (imageFile) {
        const imageRef = ref(storage, `subject-levels/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const subjectLevelData = {
        ...subjectLevel,
        image: imageUrl
      };

      const response = await axiosClient.post('/SubjectLevels/register-subject-level', subjectLevelData);
      console.log(response);
      if (response.data) {
        toast.success("Register Subject Level Success");
      } 
      if(response.err){
        toast.error(response.err.response.data.message)
      }
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "An error occurred while registering the subject level");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register Subject Level
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select
              value={subjectLevel.levelId || ''}
              onChange={(e) => handleDataChange("levelId", e.target.value)}
              required
            >
              {levels.map(level => (
                <MenuItem key={level.id} value={level.id}>{level.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Subject</InputLabel>
            <Select
              value={subjectLevel.subjectId || ''}
              onChange={(e) => handleDataChange("subjectId", e.target.value)}
              required
            >
              {subjects.map(subject => (
                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={subjectLevel.name}
            onChange={(e) => handleDataChange("name", e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            value={subjectLevel.description}
            onChange={(e) => handleDataChange("description", e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="URL"
            type="text"
            value={subjectLevel.url}
            onChange={(e) => handleDataChange("url", e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Coin"
            type="number"
            value={subjectLevel.coin}
            onChange={(e) => handleDataChange("coin", e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Limit Member"
            type="number"
            value={subjectLevel.limitMember}
            onChange={(e) => handleDataChange("limitMember", e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register Subject Level
          </Button>
          <ToastContainer/>
        </Box>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterSubjectLevel;