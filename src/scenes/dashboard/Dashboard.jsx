import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { axiosClient } from "../../axios/AxiosClient";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState([]);
  const [totalCoin, setTotalCoin] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    try {
      const response = await axiosClient.get(`/Admins/get-all-transaction?page=${page}`);
      if (response.data.success) {
        setTransactions(response.data.data);
        calculateStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const calculateStats = (data) => {
    const total = data.reduce((sum, transaction) => sum + transaction.coin, 0);
    setTotalCoin(total);

    if (data.length > 1) {
      const firstTransaction = data[0].coin;
      const lastTransaction = data[data.length - 1].coin;
      const change = ((lastTransaction - firstTransaction) / Math.abs(firstTransaction)) * 100;
      setPercentageChange(change.toFixed(2));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const chartData = transactions.map(t => ({
    date: formatDate(t.date),
    coin: t.coin
  }));

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { 
      field: "coin", 
      headerName: "Coin", 
      flex: 1,
      renderCell: (params) => (
        <Typography color={params.value >= 0 ? colors.greenAccent[500] : colors.redAccent[500]}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: "date", 
      headerName: "Date", 
      flex: 1,
      renderCell: (params) => formatDate(params.value)
    },
    { field: "transactionId", headerName: "Transaction ID", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <AdminHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Tổng coin */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
            Tổng Coin: {totalCoin}
          </Typography>
        </Box>

        {/* Phần trăm thay đổi */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: percentageChange >= 0 ? colors.greenAccent[500] : colors.redAccent[500] }}>
            {percentageChange}%
          </Typography>
        </Box> */}

        {/* Biểu đồ */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
            Biểu đồ giao dịch
          </Typography>
          <Box height="250px" mt="-20px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="coin" stroke={colors.greenAccent[500]} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>

      {/* Bảng chi tiết giao dịch */}
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
        <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "10px" }}>
          Chi tiết giao dịch
        </Typography>
        <DataGrid
          rows={transactions}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;