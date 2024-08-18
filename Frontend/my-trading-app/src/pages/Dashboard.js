import React, { useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Assets from "../components/TopAssets";
import AssetChart from "../components/AssetChart";
import DisplayData from "../components/DisplayData";

// Sample chart data for the StatCard components
const stocksChartData = {
  labels: ["Tech", "Finance", "Energy"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const cryptoChartData = {
  labels: ["BTC", "ETH", "XRP"],
  datasets: [
    {
      data: [60, 25, 15],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const Dashboard = () => {
  const [displayDataParams, setDisplayDataParams] = useState({
    symbol: "AAPL",
    from: "2023-01-01",
    to: "2023-02-02",
    defaultTimeframe: "day",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisplayDataParams({ ...displayDataParams, [name]: value });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Grid container spacing={2} mt={5} mb={5} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Symbol"
              name="symbol"
              value={displayDataParams.symbol}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="From"
              type="date"
              name="from"
              value={displayDataParams.from}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="To"
              type="date"
              name="to"
              value={displayDataParams.to}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Default Timeframe"
              name="defaultTimeframe"
              value={displayDataParams.defaultTimeframe}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Container>

      <DisplayData
        symbol={displayDataParams.symbol}
        from={displayDataParams.from}
        to={displayDataParams.to}
        defaultTimeframe={displayDataParams.defaultTimeframe}
      />

      <AssetChart />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Stat Cards */}
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Stocks"
              chartData={stocksChartData}
              navigateTo="/stocks"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Crypto"
              chartData={cryptoChartData}
              navigateTo="/crypto"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="ETFs"
              chartData={cryptoChartData}
              navigateTo="/etfs"
            />
          </Grid>
          {/* Assets Component */}
          <Grid item xs={12}>
            <Assets />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
