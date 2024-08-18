import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Chart from 'react-apexcharts'; 
import logo from '../assets/img/App_Logo.png';
import Navbar from '../components/Navbar';
  
import axios from 'axios';

import { PROFILE_URL } from '../api/constants';


// Dummy data for the pie chart
const chartData = {
  series: [44, 55, 41], // These values should dynamically reflect user holdings
  options: {
    labels: ['Stocks', 'Crypto', 'ETFs'],
    chart: {
      type: 'pie',
    },
    // Other chart configurations can be added here
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    email: '',
    phone_number: '',
    country: '',
    birth_date: '',
    username: '',
    password: '',
    confirmPassword: '',
    profile_picture : logo,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('User data:', response.data);
        const { email, phone_number, country, birth_date, username , profile_picture} = response.data;
        
        if (profile_picture)
          setProfileData({
            email,
            phone_number,
            country,
            birth_date,
            username,
            profile_picture,
          });
        else
          setProfileData({
            email,
            phone_number,
            country,
            birth_date,
            username,
            logo, 
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle profile image upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        profile_picture: reader.result,
      }));
    };
  };

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!profileData.email) {
      errors.email = 'Email is required';
    }
    if (!profileData.phone_number) {
      errors.phone_number = 'Phone number is required';
    } 
    if (!profileData.country) {
      errors.country = 'Country is required';
    }
    if (!profileData.birth_date) {
      errors.birth_date = 'Birth date is required';
    }
    if (!profileData.username) {
      errors.username = 'Username is required';
    }
    if (!profileData.password) {
      errors.password = 'Password is required';
    }
    if (!profileData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    }
    if (profileData.password !== profileData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  }




  const handleSaveChanges = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Create a FormData object to handle multipart/form-data encoding
      const formDataObject = new FormData();
      // Append each form field to the FormData object
      for (const key in profileData) {
        formDataObject.append(key, profileData[key]);
      }
        await axios.put(PROFILE_URL, formDataObject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
        alert('Profile updated successfully');
    } catch (error) {
       alert('ERROR: ', error);
    }
  };

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar position="static" />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={3} direction="column">
          {/* Profile Section */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Avatar src={profileData.profile_picture} sx={{ width: 200, height: 200, boxShadow: 3, borderRadius: '50%' }} />
              <IconButton color="primary" aria-label="upload picture" component="label" sx={{ mt: 1 }}>
                <input hidden accept="image/*" type="file" onChange={handleProfileImageUpload} />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>
          {/* Error Messages */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {Object.keys(formErrors).map((key) => (
                <Typography key={key} variant="body1" sx={{ color: 'red', fontFamily: 'Raleway, Roboto' }}>
                  {formErrors[key]}
                </Typography>
              ))}
            </Box>
          </Grid>
          {/* User Information Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 8px 18px 0 rgba(0,0,0,0.3)', borderRadius: '16px' }}>
              <CardContent>
                <TextField label="Username" name="username" value={profileData.username || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <TextField label="Email" name="email" value={profileData.email || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <TextField label="Phone" name="phone_number" value={profileData.phone_number || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <TextField label="Country" name="country" value={profileData.country || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <TextField label="Birth Date" name="birth_date" value={profileData.birth_date || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <TextField label="Password" name="password" value={profileData.password || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <TextField label="Confirm Password" name="confirmPassword" value={profileData.confirmPassword || ''} onChange={handleInputChange} fullWidth margin="normal" />
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                  <Button  sx={{mt: 1, ...buttonStyle}} variant="contained" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                  <Button  sx={{mt: 2, ...buttonStyle}} variant="contained" onClick={handleReturnToDashboard}>
                    Return to Dashboard
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {/* Portfolio Information Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 8px 18px 0 rgba(0,0,0,0.3)', borderRadius: '16px' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontFamily: 'Raleway, Roboto', display: 'flex', justifyContent: 'center', mb: 2 }}>Portfolio</Typography>
                {/* Portfolio details here */}
                <Typography sx={{ fontFamily: 'Raleway, Roboto'}} variant="body1">Profit/Loss: +60%</Typography>
                <Typography sx={{ fontFamily: 'Raleway, Roboto'}} variant="body1">Total Money Invested: 5000 USD</Typography>
                <Chart options={chartData.options} series={chartData.series} type="pie" height={320} />
              </CardContent>
            </Card>
          </Grid>
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
  width: '60%',
  '&:hover': {
    bgcolor: 'white',
    color: 'green',
    borderColor: 'darkgreen',
  },
};

export default Profile;
