import React, { useState } from 'react';
import { Container, Box, Grid, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const defaultData = {
  stocks: [
    { name: "AAPL", price: "150.00", change: "0.3%", volume: "75M" },
    { name: "IBM", price: "250.00", change: "14.3%", volume: "15M" },
    { name: "NVIDIA", price: "350.00", change: "2.3%", volume: "50M" },
    // Add more stocks data
  ],
  etfs: [
    { name: "SPY", price: "420.00", change: "0.2%", volume: "60M" },
    { name: "PLA", price: "120.00", change: "5.2%", volume: "60M" },
    { name: "SPX", price: "620.00", change: "-1.2%", volume: "60M" },
    // Add more ETFs data
  ],
  crypto: [
    { name: "BTC", price: "30000.00", change: "-0.5%", volume: "1.5B" },
    { name: "ETH", price: "2500.00", change: "-1.5%", volume: "780M" },
    { name: "XRP", price: "30000.00", change: "-2.5%", volume: "30M" },
    // Add more crypto data
  ]
};

const TopAssets = () => {
  const [selectedAssetType, setSelectedAssetType] = useState('stocks');
  const [assetsData, setAssetsData] = useState(defaultData.stocks);

  const handleChange = (event) => {
    const newAssetType = event.target.value;
    setSelectedAssetType(newAssetType);
    setAssetsData(defaultData[newAssetType]);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '6px 4px 18px 8px rgba(0,0,0,0.3)' }}>
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '24px' }} component="legend">Asset Type</FormLabel>
                <RadioGroup row aria-label="asset" name="row-radio-buttons-group" value={selectedAssetType} onChange={handleChange}>
                  <FormControlLabel value="stocks" control={<Radio />} label="Stocks" />
                  <FormControlLabel value="etfs" control={<Radio />} label="ETFs" />
                  <FormControlLabel value="crypto" control={<Radio />} label="Crypto" />
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '28px', my: 2 }}>
                  Top 10 {selectedAssetType.charAt(0).toUpperCase() + selectedAssetType.slice(1)}
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600, border: 1, borderColor: 'divider' }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'green' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Change in 24 Hours</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Volume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assetsData.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                        }}
                      >
                        <TableCell sx={{fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center" component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{row.price}</TableCell>
                        <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px', fontWeight: 'bold', color: row.change.startsWith('-') ? 'red' : 'green'}} align="center">
                          {row.change}
                        </TableCell>
                        <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{row.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TopAssets;
