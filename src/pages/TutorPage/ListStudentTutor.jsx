import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { axiosClient } from "../../axios/AxiosClient";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [subjectLevelId, setSubjectLevelId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchStudents = async () => {
    try {
      let url = `/StudentJoins/student-join-list-for-tutor?page=${currentPage}&pageSize=${10}`;
      if (subjectLevelId) url += `&subjectLevelId=${subjectLevelId}`;
      if (studentId) url += `&studentId=${studentId}`;

      console.log(`Fetching students from: ${url}`); // Logging the URL

      const response = await axiosClient.get(url);

      console.log("Response data:", response.data); // Logging the response data

      setStudents(response.data.data || []); // Ensure students is an array
      setTotalPages(Math.ceil(response.data.total / 10)); // Ensure totalCount is a number
    } catch (error) {
      console.error("Error fetching students:", error);
      setSnackbar({
        open: true,
        message: "Error fetching students",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, subjectLevelId, studentId]);

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(
        `/StudentJoins/delete-student-for-tutor?studentJoinId=${selectedStudent.id}`
      );
      console.log(selectedStudent.id);
      setSnackbar({
        open: true,
        message: "Student deleted successfully",
        severity: "success",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      setSnackbar({
        open: true,
        message: "Error deleting student",
        severity: "error",
      });
    }
    handleCloseDialog();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="p-10">
        <AdminHeader title="Student List" />
        <div className="flex gap-5 mb-3">
          <TextField
            label="Subject Level ID"
            value={subjectLevelId}
            onChange={(e) => setSubjectLevelId(e.target.value)}
          />
          {/* <TextField
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          /> */}
          <Button
            variant="contained"
            className="!text-xl !capitalize"
            color="primary"
            onClick={() => setPage(0)}
          >
            Search
          </Button>
        </div>
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
                  Subject Level ID
                </TableCell>
                <TableCell className="bg-slate-500 !text-xl !font-bold">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students && students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="!text-sm">{student.id}</TableCell>
                    <TableCell className="!text-sm">
                      {student.fullName}
                    </TableCell>
                    <TableCell className="!text-sm">{student.email}</TableCell>
                    <TableCell className="!text-sm">{student.userId}</TableCell>
                    <TableCell className="!text-sm">
                      {student.subjectLevelId}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        className="!text-xl !capitalize"
                        onClick={() => handleDeleteClick(student)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Phần điều hướng trang */}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student from the course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudentList;
