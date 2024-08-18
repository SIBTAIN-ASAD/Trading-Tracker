import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup, Container } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // For time scale
import { subHours, subMinutes, subDays, format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);

const timeframeOptions = {
  '5m': (date) => subMinutes(date, 5),
  '15m': (date) => subMinutes(date, 15),
  '30m': (date) => subMinutes(date, 30),
  '1h': (date) => subHours(date, 1),
  '6h': (date) => subHours(date, 6),
  '24h': (date) => subDays(date, 1),
  '3d': (date) => subDays(date, 3),
};

const generateMockData = (timeframe) => {
    let data = [];
    let date = new Date();
    const dataLength = 12; // Number of data points, adjust as needed
  
    for (let i = 0; i < dataLength; i++) {
      switch(timeframe) {
        case '5m':
        case '15m':
        case '30m':
          date = subMinutes(date, 5 * (timeframe === '15m' ? 3 : (timeframe === '30m' ? 6 : 1)));
          break;
        case '1h':
          date = subHours(date, 1);
          break;
        case '6h':
          date = subHours(date, 6);
          break;
        case '24h':
          date = subDays(date, 1);
          break;
        case '3d':
          date = subDays(date, 3);
          break;
        default:
          date = subDays(date, 1);
      }
      data.unshift({
        x: new Date(date.getTime()),
        y: Math.random() * 1000 + 100 // Random price, for example
      });
    }
  
    return data;
  };

  const AssetChart = ({ selectedAsset, defaultTimeframe = '1h' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [timeframe, setTimeframe] = useState(defaultTimeframe);
    const [data, setData] = useState(generateMockData(defaultTimeframe));

    useEffect(() => { //To update chart data
      if (selectedAsset) {
        setData(generateMockData(timeframe));
      }
    }, [selectedAsset, timeframe]);

  const handleSearch = () => {
    setData(generateMockData(timeframe));
  };

  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe) {
      setTimeframe(newTimeframe);
      setData(generateMockData(newTimeframe));
    }
  };

  const chartData = {
    labels: data.map(d => d.x),
    datasets: [{
      label: searchTerm || "Sample Asset",
      data: data,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: false,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeframe === '5m' || timeframe === '15m' || timeframe === '30m' ? 'minute' : 'day',
          displayFormats: {
            minute: 'HH:mm', // Display format for Hours
            day: 'd MMM', // Display format for days
          },
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            family: 'Raleway',
            size: 16,
            weight: 'bold', 
          },
          padding: {top: 20},
        },
        ticks: {
          font: {
            family: 'Raleway',
            size: 14,
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
          font: {
            family: 'Raleway',
            size: 16,
            weight: 'bold', 
          }
        },
        ticks: {
          font: {
            family: 'Raleway',
            size: 14,
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}> {/* Adjusted to "lg" */}
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Card sx={{ p: 3, borderRadius: '16px', boxShadow: '6px 4px 18px 8px rgba(0,0,0,0.3)' }}>
                <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField 
                        label="Search Asset" 
                        variant="outlined"
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: '30%', marginRight: 2, flexGrow: 1 }}
                    />
                    <Button variant="contained" onClick={handleSearch} sx={{ width: '20%', fontFamily: 'Raleway, Roboto', padding: '10px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', bgcolor: 'green', color: 'white', '&:hover': { bgcolor: 'white', color: "green", borderColor: 'darkgreen' }, marginRight: 2 }}>
                        Search
                    </Button>
                    <ToggleButtonGroup
                        color="primary"
                        value={timeframe}
                        exclusive
                        onChange={handleTimeframeChange}
                        size="small"
                        sx={{ marginLeft: '100px', flexShrink: 0 }} // Prevents shrinking
                    >
                        {['5m', '15m', '30m', '1h', '6h', '24h', '3d'].map(frame => (
                        <ToggleButton key={frame} value={frame}>{frame}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Raleway, Roboto', fontWeight: 'bold', textAlign: 'center', fontSize: '24px' }}>
                    {searchTerm || "Asset Name"}
                    </Typography>
                    <Box sx={{ height: '500px' }}> {/* Ensure the chart fits within this box */}
                      <Line data={chartData} options={options} />
                    </Box>
                </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Container>
  );
};

export default AssetChart;
