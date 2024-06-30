import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { getCourseStudent, getCourseStudentWithFilter } from "../../service/CourseService";

const StudentSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [subjectLevelId, setSubjectLevelId] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCount, setRowCount] = useState(0);

    const fetchSchedule = async () => {
        try {
            let response;
            if (!subjectLevelId) {
                response = await getCourseStudent(pageIndex + 1);
            } else {
                response = await getCourseStudentWithFilter(subjectLevelId, pageIndex + 1);
            }
            console.log('API response:', response);
            setSchedule(response.data.data);
            setRowCount(response.data.totalCount || 0);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setSchedule([]);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, [pageIndex]);

    const handleSubjectLevelIdChange = (event) => setSubjectLevelId(event.target.value);
    const handlePageChange = (newPage) => setPageIndex(newPage);

    const handleFetchSchedule = () => {
        setPageIndex(0);
        fetchSchedule();
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "subjectLevelId",
            headerName: "Subject Level ID",
            flex: 1,
        },
        {
            field: "slotName",
            headerName: "Slot Name",
            flex: 1,
        },
        {
            field: "startSlot",
            headerName: "Start Time",
            flex: 1,
        },
        {
            field: "endSlot",
            headerName: "End Time",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <AdminHeader title="Student Schedule" subtitle="View Your Class Schedule" />
            <Box mb="20px">
                <TextField
                    label="Subject Level ID"
                    value={subjectLevelId}
                    onChange={handleSubjectLevelIdChange}
                    variant="outlined"
                    sx={{ marginRight: "10px" }}
                />
                <Button variant="contained" color="primary" onClick={handleFetchSchedule}>
                    Fetch Schedule
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
                }}
            >
                <DataGrid
                    rows={schedule || []}
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

export default StudentSchedule;