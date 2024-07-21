import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Rating,
  CircularProgress,
} from "@mui/material";
import { axiosClient } from "../../axios/AxiosClient";
import { Button } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const TutorRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/Ratings/get-ratings-by-tutor-self?page=${currentPage}`
      );
      setRatings(response.data.data || []);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchRatings();
  }, [currentPage]);

  return (
    <div className="p-10">
      <AdminHeader title="Your Rating" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Tutor Name
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Start
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell className="!text-xl">{rating.tutorName}</TableCell>
                <TableCell className="!text-xl">
                  <Rating value={rating.star} readOnly />
                </TableCell>
                <TableCell className="!text-xl">{rating.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Phần điều hướng trang */}
      <div className="w-full flex justify-end mt-10">
        <Button
          className="!text-xl mr-3"
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

export default TutorRatings;
