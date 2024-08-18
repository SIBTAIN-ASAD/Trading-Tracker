import React, { useState , useEffect } from 'react';
import { Box, Card, CardContent, Grid, Tab, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import axios from 'axios';

import Navbar from '../components/Navbar';
import AssetChart from '../components/AssetChart';
import StatCard from '../components/StatCard';
import { TRANSECTION_LIST_URL } from '../api/constants';

// Sample chart data for the StatCard components
const stocksChartData = {
    labels: ['Tech', 'Finance', 'Energy'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
      hoverOffset: 4
    }]
  };
  
  const cryptoChartData = {
    labels: ['BTC', 'ETH', 'XRP'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
      hoverOffset: 4
    }]
};

const transactionHistory = [
    { from: 'USD', to: 'BTC', amount: 0.5, value: '10,000', type: 'Buy', date: '2023-01-01' },
    { from: 'BTC', to: 'USD', amount: 0.2, value: '8,000', type: 'Sell', date: '2023-02-01' },
  ];
  
  const topPerformingAssets = [
    { asset: 'BTC', investment: '15,000', currentValue: '20,000', profit: '5,000' },
    { asset: 'ETH', investment: '10,000', currentValue: '15,000', profit: '5,000' },
  ];

  const Portfolio = () => {
    const [selectedTab, setSelectedTab] = useState('1');
  
    const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
  
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(TRANSECTION_LIST_URL, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }

      };
      fetchTransactions();
    }, []);

    const renderTransactionTable = () => (
      <TableContainer component={Paper}>
        <Table aria-label="Transaction history">
          <TableHead>
            <TableRow sx={{ backgroundColor: "green" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white", fontFamily: "Raleway, Roboto", fontSize: "18px" }} align="center">Asset Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", fontFamily: "Raleway, Roboto", fontSize: "18px" }} align="center">Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", fontFamily: "Raleway, Roboto", fontSize: "18px" }} align="center">Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", fontFamily: "Raleway, Roboto", fontSize: "18px" }} align="center">Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", fontFamily: "Raleway, Roboto", fontSize: "18px" }} align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontFamily: "Raleway, Roboto", fontSize: "15px", fontWeight: "bold" }} align="center">{row.asset_name}</TableCell>
                <TableCell sx={{ fontFamily: "Raleway, Roboto", fontSize: "15px" }} align="center">{row.amount}</TableCell>
                <TableCell sx={{ fontFamily: "Raleway, Roboto", fontSize: "15px" }} align="center">{row.quantity}</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "Raleway, Roboto", fontSize: "15px", color: row.transaction_type === 'buy' ? 'green' : 'red' }} align="center">{row.transaction_type}</TableCell>
                <TableCell sx={{ fontFamily: "Raleway, Roboto", fontSize: "15px" }} align="center">{row.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  
    const renderTopPerformingAssetsTable = (assets) => (
      <TableContainer component={Paper}>
        <Table aria-label="Top performing assets">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'green' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Asset</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Investment</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Current Value</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index}>
                <TableCell sx={{fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{asset.asset}</TableCell>
                <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{asset.investment}</TableCell>
                <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{asset.currentValue}</TableCell>
                <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px', fontWeight: 'bold', color: asset.profit.startsWith('-') ? 'red' : 'green'}} align="center">{asset.profit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  
    return (
      <>
        <Navbar position="static" />
        <Box sx={{ padding: '0px 20px', width: '100%', typography: 'body1' }}>
          <TabContext value={selectedTab}>
            <Box sx={{ padding: '10px', borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="Portfolio tabs">
                <Tab sx={{ fontFamily: 'Raleway' }} label="Overall Value" value="1" />
                <Tab sx={{ fontFamily: 'Raleway' }} label="Asset Allocation" value="2" />
                <Tab sx={{ fontFamily: 'Raleway' }} label="Performance" value="3" />
                <Tab sx={{ fontFamily: 'Raleway' }} label="Top Performing Assets" value="4" />
                <Tab sx={{ fontFamily: 'Raleway' }} label="Transaction History" value="5" />
              </TabList>
            </Box>
            <Card>
              <CardContent>
                    <TabPanel value="1">
                    {/* Overall Portfolio Value */}
                    <Typography sx={{ fontFamily: 'Raleway' }} variant="h6">Overall Portfolio Value</Typography>
                    {/* Insights of user's portfolio */}
                    <Grid container spacing={3}>
                        <Grid sx={{marginTop: '40px'}} item xs={12} sm={4}>
                            <StatCard title="Stocks" chartData={stocksChartData} navigateTo="/assets?type=stocks" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <AssetChart />
                        </Grid>
                    </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        {/* Asset Allocation */}
                        <Typography sx ={{padding: '20px 10px', fontFamily: 'Raleway'}} variant="h6">Asset Allocation</Typography>
                        <Grid container spacing={3}>
                            {/* Stat Cards */}
                            <Grid item xs={12} sm={4}>
                                <StatCard title="Stocks" chartData={stocksChartData} navigateTo="/assets?type=stocks" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StatCard title="Crypto" chartData={cryptoChartData} navigateTo="/assets?type=crypto" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StatCard title="ETFs" chartData={cryptoChartData} navigateTo="/assets?type=etfs" />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                    {/* Performance Chart showing user profits */}
                        <Typography sx={{ fontFamily: 'Raleway' }} variant="h6">Portfolio Performance</Typography>
                        <AssetChart />
                    </TabPanel>
                    <TabPanel value="4">
                    {/* Top Performing Assets Table */}
                    {renderTopPerformingAssetsTable(topPerformingAssets)}
                    </TabPanel>
                    <TabPanel value="5">
                        {/* Transaction History Table */}
                        {renderTransactionTable(transactionHistory)}
                    </TabPanel>
                </CardContent>
            </Card>
        </TabContext>
    </Box>
  </>
  );
  };
  
  export default Portfolio;