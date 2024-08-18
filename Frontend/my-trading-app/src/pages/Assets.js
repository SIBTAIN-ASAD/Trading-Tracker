import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AssetChart from '../components/AssetChart';
import Navbar from '../components/Navbar'; 

const mockAssets = {
  stocks: [
    { name: "AAPL", price: "150.00", change: "0.3%", volume: "75M" },
    { name: "MSFT", price: "250.00", change: "1.3%", volume: "55M" },
    { name: "GOOGL", price: "1800.00", change: "-0.5%", volume: "25M" },
  ],
  crypto: [
    { name: "BTC", price: "30000.00", change: "-0.5%", volume: "1.5B" },
    { name: "ETH", price: "2500.00", change: "-1.5%", volume: "780M" },
    { name: "LTC", price: "130.00", change: "2.5%", volume: "30M" },
  ],
  etfs: [
    { name: "SPY", price: "420.00", change: "0.2%", volume: "60M" },
    { name: "IVV", price: "300.00", change: "0.5%", volume: "30M" },
    { name: "VTI", price: "200.00", change: "1.0%", volume: "40M" },
  ]
};

const Assets = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialAssetType = query.get('type') || 'stocks'; // Default to 'stocks' if type is not specified
    const [selectedAssetType, setSelectedAssetType] = useState(initialAssetType);
    const [selectedAsset, setSelectedAsset] = useState('');

    useEffect(() => {
      // Update the selected asset type based on URL change
      const updatedAssetType = query.get('type') || 'stocks';
      setSelectedAssetType(updatedAssetType);
    }, [location.search]); // This effect runs when the URL search part changes
  
    const handleShowGraph = (asset) => {
      setSelectedAsset(asset);
    };

    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Raleway, Roboto',justifyContent: 'center', display: 'flex', mb: 4 }}>Asset List</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ justifyContent: 'Center', display: 'flex', p: 3, borderRadius: '16px', boxShadow: '6px 4px 18px 0px rgba(0,0,0,0.3)' }}>
                <CardContent>
                  <Typography variant="h5" sx={{justifyContent: 'center', display: 'flex', fontFamily: 'Raleway, Roboto'}}>Select Asset Type</Typography>
                  {/* Buttons to select asset type */}
                  {['stocks', 'crypto', 'etfs'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedAssetType === type ? "contained" : "outlined"}
                      onClick={() => setSelectedAssetType(type)}
                      sx={{ margin: '15px', ...buttonStyle }}
                    >
                      {type.toUpperCase()}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '6px 4px 18px 0px rgba(0,0,0,0.3)' }}>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="assets table">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'green' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Change in 24 Hours</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Volume</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Raleway, Roboto', fontSize: '18px'}} align="center">Chart</TableCell>
                            </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockAssets[selectedAssetType].map((asset) => (
                          <TableRow key={asset.name} hover>
                            <TableCell sx={{fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center" component="th" scope="row">{asset.name}</TableCell>
                            <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{asset.price}</TableCell>
                            <TableCell sx={{fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '15px', color: asset.change.startsWith('-') ? 'red' : 'green'}} align="center">{asset.change}</TableCell>
                            <TableCell sx={{fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">{asset.volume}</TableCell>
                            <TableCell sx={{fontWeight: 'bold', fontFamily: 'Raleway, Roboto', fontSize: '15px'}} align="center">
                              <Button
                                variant="contained"
                                onClick={() => handleShowGraph(asset.name)}
                                sx={{...buttonStyle}}
                              >
                                Show Chart
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            {selectedAsset && (
              <Grid item xs={12}>
                <AssetChart selectedAsset={selectedAsset} />
              </Grid>
            )}
          </Grid>
        </Container>
      </>
    );
  };

const buttonStyle = {
  fontFamily: 'Raleway, Roboto',
  padding: '10px 15px',
  borderRadius: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  bgcolor: 'green',
  color: 'white',
  '&:hover': {
    bgcolor: 'white',
    color: "green",
    borderColor: 'darkgreen'
  }
};

export default Assets;
