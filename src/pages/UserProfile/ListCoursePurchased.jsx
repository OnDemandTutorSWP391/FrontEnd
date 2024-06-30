import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { getCoursePurchasedByUser, getCoursePurchasedByUserWithFilter } from "../../service/CourseService";

const ListCoursesByUser = () => {
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCount, setRowCount] = useState(0);

    const fetchCourses = async () => {
        try {
            let response;
            if (!courseId) {
                response = await getCoursePurchasedByUser(pageIndex + 1); // pageIndex is zero-based, API expects 1-based
            } else {
                response = await getCoursePurchasedByUserWithFilter(pageIndex + 1, courseId);
            }
            console.log('API response:', response);
            setCourses(response.data.data);
            setRowCount(response.data.totalCount || 0); // Assuming API provides total count of items
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [pageIndex]);

    const handleCourseIdChange = (event) => setCourseId(event.target.value);
    const handlePageChange = (newPage) => setPageIndex(newPage);

    const handleFetchCourses = () => {
        setPageIndex(0);
        fetchCourses();
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", width: 90, checkboxSelection: true },
        {
            field: "fullName",
            headerName: "Full Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "subjectLevelId",
            headerName: "Course ID",
            flex: 1,
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
                    checkboxSelection
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
        </Box>
    );
};

export default ListCoursesByUser;
