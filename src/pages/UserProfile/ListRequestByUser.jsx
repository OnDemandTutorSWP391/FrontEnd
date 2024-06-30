import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useEffect, useState } from "react";
import { getRequestByUser, getRequestByUserWithFromDate, getRequestByUserWithFromDatendTodate, getRequestByUserWithSearch, getRequestByUserWithSearchandFromDate, getRequestByUserWithSearchandFromDateToDate, updateRequestStatus } from "../../service/RequestService";
import { tokens } from "../../theme";
import { format } from 'date-fns';

const ListRequestByUser = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [pageIndex, setPageIndex] = useState(1);

    const fetchRequests = async () => {
        try {
            let response;
            const formattedFromDate = fromDate ? format(new Date(fromDate), 'yyyy-MM-dd') : '';
            const formattedToDate = toDate ? format(new Date(toDate), 'yyyy-MM-dd') : '';

            if (!search && !fromDate && !toDate) {
                response = await getRequestByUser(pageIndex);
            } else if (search && !fromDate && !toDate) {
                response = await getRequestByUserWithSearch(pageIndex, search);
            } else if (search && fromDate && !toDate) {
                response = await getRequestByUserWithSearchandFromDate(pageIndex, search, formattedFromDate);
            } else if (search && fromDate && toDate) {
                response = await getRequestByUserWithSearchandFromDateToDate(pageIndex, search, formattedFromDate, formattedToDate);
            } else if (!search && fromDate && !toDate){
                response = await getRequestByUserWithFromDate( pageIndex, fromDate);
            } else if (!search && fromDate && toDate){
                response = await getRequestByUserWithFromDatendTodate(pageIndex, formattedFromDate, formattedToDate);
            }
            console.log('API response:', response);
            setRequests(response.data.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            setRequests([]);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [pageIndex]);

    const handleSearchChange = (event) => setSearch(event.target.value);
    const handleFromDateChange = (event) => setFromDate(event.target.value);
    const handleToDateChange = (event) => setToDate(event.target.value);
    const handleSortByChange = (event) => setSortBy(event.target.value);
    const handlePageIndexChange = (event) => setPageIndex(event.target.value);

    const handleFetchRequests = () => fetchRequests();

    const handleSelectionChange = (newSelection) => {
        setSelectedRequests(newSelection);
    };

    const handleUpdateStatus = async () => {
        try {
            await updateRequestStatus(selectedRequests);
            alert("Status updated successfully!");
            fetchRequests(); // Refresh the requests list
        } catch (error) {
            console.error('Error updating status:', error);
            alert("Failed to update status");
        }
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", width: 90, checkboxSelection: true },
        {
            field: "categoryName",
            headerName: "Category Name",
            flex: 1,
        },
        {
            field: "fullName",
            headerName: "Full Name",
            flex: 1,
        },
        {
            field: "createdDate",
            headerName: "Created Date",
            flex: 1,
            // type: 'dateTime',
            // valueGetter: ({ value }) => value && new Date(value),
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <AdminHeader title="Manage Request" subtitle="Managing Request" />
            <Box mb="20px">
                <TextField
                    label="Search"
                    value={search}
                    onChange={handleSearchChange}
                    variant="outlined"
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    label="From Date"
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    label="To Date"
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    label="Sort By"
                    value={sortBy}
                    onChange={handleSortByChange}
                    variant="outlined"
                    sx={{ marginRight: "10px" }}
                />
                <Button variant="contained" color="primary" onClick={handleFetchRequests}>
                    Fetch Requests
                </Button>
                <Button variant="contained" color="secondary" onClick={handleUpdateStatus} sx={{ marginLeft: "10px" }}>
                    Update Status
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
                    rows={requests || []}
                    columns={columns}
                    onSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
                />
            </Box>
        </Box>
    );
};

export default ListRequestByUser;
