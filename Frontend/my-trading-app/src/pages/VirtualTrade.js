import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  TextField,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import axios from "axios";

import Navbar from "../components/Navbar";
import { TRANSECTION_CREATE_URL, USER_FUNDS_URL } from "../api/constants";
import { fetchUserFunds, fetchUserAssets, fetchAssets } from "../api/apiCalls"; // Import API functions

const VirtualTrade = () => {
  const [tradeType, setTradeType] = useState("buy"); // 'buy' or 'sell'
  const [assetType, setAssetType] = useState("crypto"); // 'crypto', 'etfs', 'stocks'
  const [selectedAsset, setSelectedAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [portfolioUSD, setPortfolioUSD] = useState(10000); // Mock portfolio value in USD
  const [tradeStatus, setTradeStatus] = useState(""); // Status of the executed trade
  const [userAssets, setUserAssets] = useState([]);
  const [userFunds, setUserFunds] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Fetch user assets
    const fetchAssets = async () => {
      try {
        const response = await fetchUserAssets(); // Use API function to fetch assets
        setUserAssets(response);
      } catch (error) {
        console.error("Error fetching user assets:", error);
      }
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    // Fetch user funds
    const fetchFunds = async () => {
      try {
        const response = await fetchUserFunds(); // Use API function to fetch funds
        setUserFunds(response);
      } catch (error) {
        console.error("Error fetching user funds:", error);
      }
    };
    fetchFunds();
  }, []);

  const [allAssets, setAllAssets] = useState(null);

  useEffect(() => {
    // Fetch all assets
    const fetchAllAssets = async () => {
      try {
        const response = await fetchAssets(); // Use API function to fetch all assets
        setAllAssets(response);
      } catch (error) {
        console.error("Error fetching all assets:", error);
      }
    };
    fetchAllAssets();
  }, []);

  const handleTradeTypeChange = (event) => {
    setTradeType(event.target.value);
  };

  const handleAssetTypeChange = (event) => {
    setAssetType(event.target.value);
  };

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const executeTrade = async () => {
    try {
      // Execute trade logic
      console.log(`Executing ${tradeType} for ${amount} of ${selectedAsset}`);
      // Mock calculation for demonstration
      const totalMoney = allAssets.find((asset) => asset.name === selectedAsset).price * quantity;


      // Send a POST request to save transaction history
      const response = await axios.post(
        TRANSECTION_CREATE_URL,
        {
          asset_name: selectedAsset,
          quantity: quantity,
          amount: totalMoney,
          timestamp: new Date().toISOString(),
          transaction_type: tradeType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update trade status based on response from the server
      setTradeStatus(response.data.message);

      // force reload of screen
      window.location.reload();

      // Update portfolio value
      if (tradeType === "sell") {
        setPortfolioUSD(portfolioUSD + totalMoney);
      } else {
        setPortfolioUSD(portfolioUSD - totalMoney);
      }
    } catch (error) {
      setTradeStatus(error.response.data.error);
      console.error("Error executing trade:", error);
    }
  };

  const addFunds = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= 0) {
      alert("Amount must be positive.");
      return;
    }

    try {
      await axios.post(
        USER_FUNDS_URL,
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserFunds(userFunds + parseFloat(amount));
      // force reload of screen
      window.location.reload();

      alert("Funds added successfully!");
      setAmount(""); // Clear the amount field after successful submission
    } catch (error) {
      console.error("Error adding funds:", error);
      alert("Error adding funds. Please try again.");
    }
  };

  // Pie chart data
  const pieChartData = {
    labels: userAssets.map((asset) => asset.asset.name),
    datasets: [
      {
        data: userAssets.map((asset) => asset.quantity * asset.asset.price),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <>
      {userAssets && allAssets && (
        <>
          <Navbar />
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={5} justifyContent="space-between">
              {/* User Assets */}
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "6px 4px 18px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Raleway, Roboto",
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      User Assets
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "green" }}>
                            <TableCell
                              align="center"
                              sx={{
                                color: "white",
                                fontFamily: "Raleway, Roboto",
                                fontWeight: "bold",
                              }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                color: "white",
                                fontFamily: "Raleway, Roboto",
                                fontWeight: "bold",
                              }}
                            >
                              Quantities
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                color: "white",
                                fontFamily: "Raleway, Roboto",
                                fontWeight: "bold",
                              }}
                            >
                              Total Value
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userAssets.map((asset) => (
                            <TableRow key={asset.id}>
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                                sx={{ fontFamily: "Raleway, Roboto" }}
                              >
                                {asset.asset.name}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontFamily: "Raleway, Roboto" }}
                              >
                                {asset.quantity}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontFamily: "Raleway, Roboto" }}
                              >
                                ${asset.quantity * asset.asset.price}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {userAssets.length > 0 && (
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <Pie data={pieChartData} />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Deposit Money */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "6px 4px 18px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Raleway, Roboto",
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      Deposit Money
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={addFunds} // Use onSubmit instead of onClick for form submission
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="cardNumber"
                        label="Card Number"
                        name="cardNumber"
                        autoComplete="cc-number"
                        autoFocus
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="expirationDate"
                        label="Expiration Date"
                        id="expirationDate"
                        autoComplete="cc-exp"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="cvv"
                        label="CVV"
                        id="cvv"
                        autoComplete="cc-csc"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="cardHolderName"
                        label="Full Name"
                        name="cardHolderName"
                        autoComplete="cc-name"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="amountToAdd"
                        label="Amount"
                        name="amountToAdd"
                        autoComplete="cc-name"
                        value={amount}
                        onChange={handleAmountChange}
                        type="number"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                      <Button
                        type="submit" // Change type to submit for form submission
                        sx={{
                          fontFamily: "Raleway, Roboto",
                          padding: "10px",
                          borderRadius: "20px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          bgcolor: "green",
                          color: "white",
                          marginTop: "20px",
                          "&:hover": {
                            bgcolor: "white",
                            color: "green",
                            borderColor: "darkgreen",
                          },
                          width: { xs: "100%", sm: "100%" },
                        }}
                        variant="contained"
                      >
                        Deposit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 3 }}>
              {/* Virtual Trade */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "6px 4px 18px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "Raleway, Roboto",
                          fontWeight: "bold",
                        }}
                      >
                        Virtual Trade
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      >
                        Portfolio Value: ${portfolioUSD}
                      </Typography>
                    </Box>
                    <RadioGroup
                      row
                      value={tradeType}
                      onChange={handleTradeTypeChange}
                      sx={{ mt: 2 }}
                    >
                      <FormControlLabel
                        value="buy"
                        control={<Radio />}
                        label="Buy"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                      <FormControlLabel
                        value="sell"
                        control={<Radio />}
                        label="Sell"
                        sx={{ fontFamily: "Raleway, Roboto" }}
                      />
                    </RadioGroup>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <RadioGroup
                        row
                        value={assetType}
                        onChange={handleAssetTypeChange}
                      >
                        <FormControlLabel
                          value="crypto"
                          control={<Radio />}
                          label="Crypto"
                          sx={{ fontFamily: "Raleway, Roboto" }}
                        />
                        <FormControlLabel
                          value="etfs"
                          control={<Radio />}
                          label="ETFs"
                          sx={{ fontFamily: "Raleway, Roboto" }}
                        />
                        <FormControlLabel
                          value="stocks"
                          control={<Radio />}
                          label="Stocks"
                          sx={{ fontFamily: "Raleway, Roboto" }}
                        />
                      </RadioGroup>
                      <TextField
                        select
                        label="Select Asset"
                        value={selectedAsset}
                        onChange={handleAssetChange}
                        fullWidth
                        sx={{ mt: 2, fontFamily: "Raleway, Roboto" }}
                      >
                        {allAssets.map((asset) => (
                          <MenuItem key={asset.id} value={asset.name}>
                            {asset.name}{" "}
                            {/* Access asset name from asset object */}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        fullWidth
                        sx={{ mt: 2, fontFamily: "Raleway, Roboto" }}
                      />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {tradeStatus}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          sx={{
                            fontFamily: "Raleway, Roboto",
                            padding: "10px",
                            borderRadius: "20px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            bgcolor: "green",
                            color: "white",
                            marginTop: "20px",
                            "&:hover": {
                              bgcolor: "white",
                              color: "green",
                              borderColor: "darkgreen",
                            },
                            width: { xs: "100%", sm: "60%" },
                          }}
                          variant="contained"
                          onClick={executeTrade}
                        >
                          Execute Trade
                        </Button>
                      </Box>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default VirtualTrade;
