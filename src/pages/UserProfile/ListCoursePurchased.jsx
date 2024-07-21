import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useEffect, useState } from "react";
import {
  getRequestByUser,
  getRequestByUserWithFromDate,
  getRequestByUserWithFromDatendTodate,
  getRequestByUserWithSearch,
  getRequestByUserWithSearchandFromDate,
  getRequestByUserWithSearchandFromDateToDate,
  updateRequestStatus,
} from "../../service/RequestService";
import { format } from "date-fns";

const ListRequestByUser = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async () => {
    try {
      let response;
      const formattedFromDate = fromDate
        ? format(new Date(fromDate), "yyyy-MM-dd")
        : "";
      const formattedToDate = toDate
        ? format(new Date(toDate), "yyyy-MM-dd")
        : "";

      if (!search && !fromDate && !toDate) {
        response = await getRequestByUser(pageIndex);
      } else if (search && !fromDate && !toDate) {
        response = await getRequestByUserWithSearch(currentPage, search);
      } else if (search && fromDate && !toDate) {
        response = await getRequestByUserWithSearchandFromDate(
          pageIndex,
          search,
          formattedFromDate
        );
      } else if (search && fromDate && toDate) {
        response = await getRequestByUserWithSearchandFromDateToDate(
          pageIndex,
          search,
          formattedFromDate,
          formattedToDate
        );
      } else if (!search && fromDate && !toDate) {
        response = await getRequestByUserWithFromDate(currentPage, fromDate);
      } else if (!search && fromDate && toDate) {
        response = await getRequestByUserWithFromDatendTodate(
          pageIndex,
          formattedFromDate,
          formattedToDate
        );
      }
      console.log("API response:", response);
      setRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
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
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-10">
      <AdminHeader title="Manage Request" />
      <div className="mb-3 flex">
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
        <Button
          variant="contained"
          className="!text-xl !capitalize"
          color="primary"
          onClick={handleFetchRequests}
        >
          Search
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
                Category Name
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                FullName
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Create Date
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Status
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests &&
              requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="!text-sm">{request.id}</TableCell>
                  <TableCell className="!text-sm">
                    {request.categoryName}
                  </TableCell>
                  <TableCell className="!text-sm">{request.fullName}</TableCell>
                  <TableCell className="!text-sm">
                    {request.createDate}
                  </TableCell>
                  <TableCell className="!text-sm">{request.status}</TableCell>
                  <TableCell className="!text-sm">
                    {request.description}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Phần điều hướng trang */}
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
    </div>
  );
};

export default ListRequestByUser;
