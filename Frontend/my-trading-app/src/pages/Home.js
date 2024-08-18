import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

import logo from '../assets/img/App_Logo.png';
import { LOGIN_URL, PROFILE_URL } from '../api/constants';
import { startTokenRefreshInterval } from '../api/apiCalls';


const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    // Save original styles to revert on component unmount
    const originalBodyStyle = document.body.style.cssText;
    const originalHtmlStyle = document.documentElement.style.cssText;
  
    // Apply gradient background to the body for full page coverage
    document.documentElement.style.cssText = `
      height: 100%;
    `;
    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      height: 100%;
      background: linear-gradient(135deg, #0d432a, #2c774f, #3c9d70);
      background-attachment: fixed;
      min-height: 100%;
    `;
  
    // Revert back to the original background when the component unmounts
    return () => {
      document.body.style.cssText = originalBodyStyle;
      document.documentElement.style.cssText = originalHtmlStyle;
    };
  }, []);
  

  const handleSignIn = async () => {
    try {
      const response = await axios.post(LOGIN_URL, formData);
      console.log('Login response:', response.data);
      const { access, refresh } = response.data;

      // Save token and refresh token in localStorage
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);

      const response2 = await axios.get(PROFILE_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response2.status === 200 || response2.status === 201) {
            const user = response2.data;
            localStorage.setItem('user', JSON.stringify(user));
        }

      startTokenRefreshInterval();

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (display error message, etc.)
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };


  
  return (
    <Container maxWidth="lg" sx={{ py: 5}}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <img src={logo} alt="App Logo" style={{ maxWidth: '250px', maxHeight: '250px' }} /> {/* Adjust size as needed */}
      </Box>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" style={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: '6px 4px 18px 8px rgba(0,0,0,0.3)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '16px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '30px', fontFamily: 'Raleway, Roboto' }} variant="h5" component="h2" mb={2}>
                Sign In
              </Typography>
              <TextField label="Username" placeholder="Insert Username" variant="outlined" fullWidth margin="normal" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              <TextField label="Password" placeholder="Insert Password" type="password" variant="outlined" fullWidth margin="normal" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <Button variant="contained" sx={{ mt: 3, fontFamily: 'Raleway, Roboto', padding: '10px', bgcolor: 'green', borderRadius: '20px', boxShadow: 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)', color: 'white', '&:hover': { bgcolor: 'white', color: 'green', borderColor: 'darkgreen' } }} onClick={handleSignIn} fullWidth>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: '6px 4px 18px 8px rgba(0,0,0,0.3)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '16px' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography sx={{fontSize: '36px', fontFamily: 'Raleway, Roboto'}} variant="h5" component="h2" mb={4}>
                InvestmentTracker
              </Typography>
              <Typography sx={{fontSize: '20px', fontFamily: 'Raleway, Roboto'}} variant="body1" mb={3}>
                Welcome to the world of trading Stocks, Crypto, and ETFs through an easy application!
              </Typography>
              <Button variant="contained" sx={{ mb: 0, mt: 8, fontFamily: 'Raleway, Roboto' , padding: '10px', borderRadius: '20px', boxShadow: 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)', bgcolor: 'green', color: 'white', '&:hover': { bgcolor: 'white', color: "green", borderColor: 'darkgreen' } }} onClick={handleSignUp} fullWidth>
                Sign Up
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;







