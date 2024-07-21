import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUserTransaction } from "../../service/CoinService";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Button } from "@mui/material";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserTransaction(currentPage);
        setTransactions(response.data.data);
        setTotalPages(Math.ceil(response.data.total / 10));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-10">
      <AdminHeader title="Manage Transaction" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Tên người dùng
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Số coin
              </TableCell>
              <TableCell className="bg-slate-500 !text-xl !font-bold">
                Ngày giao dịch
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="!text-sm">
                    {transaction.fullName}
                  </TableCell>
                  <TableCell className="!text-sm">{transaction.coin}</TableCell>
                  <TableCell className="!text-sm">
                    {new Date(transaction.date).toLocaleString()}
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

export default UserTransactions;
