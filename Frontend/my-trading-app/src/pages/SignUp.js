import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../assets/img/App_Logo.png";
import axios from "axios";
import { SIGNUP_URL, PROFILE_URL } from "../api/constants";

const SignUp = () => {
  const navigate = useNavigate();

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

  // State for each input field
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    country: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    profile_picture: "",
    birth_date: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handlers for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // This will toggle the state between true and false
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // This will toggle the state between true and false
  };

  const validateForm = () => {
    const errors = {};
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Create a FormData object to handle multipart/form-data encoding
      const formDataObject = new FormData();
      // Append each form field to the FormData object
      for (const key in formData) {
        formDataObject.append(key, formData[key]);
      }
      const response = await axios.post(SIGNUP_URL, formDataObject);

      // check if the response is successful, then fetch the access token/refresh token and store it in the local storage
      if (response.status === 201) {
        const { access, refresh } = response.data;
        console.log("Signup response:", response.data);
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);

        const response2 = await axios.get(PROFILE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            if (response2.status === 200 || response2.status === 201) {
                const user = response2.data;
                localStorage.setItem('user', JSON.stringify(user));
            }
      } else throw new Error("Signup failed");



      // Redirect to login page after successful signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.response.data);
      setErrors(error.response.data);
    }
  };

  const setErrors = (error) => {
    const errors = {};
    if (error.username) {
      errors.username = error.username;
    }
    if (error.email) {
      errors.email = error.email;
    }
    if (error.password) {
      errors.password = error.password;
    }
    if (error.confirmPassword) {
      errors.confirmPassword = error.confirmPassword;
    }
    if (error.firstName) {
      errors.firstName = error.firstName;
    }
    if (error.lastName) {
      errors.lastName = error.lastName;
    }
    if (error.phone_number) {
      errors.phone_number = error.phone_number;
    }
    if (error.country) {
      errors.country = error.country;
    }
    if (error.birth_date) {
      errors.birth_date = error.birth_date;
    }
    setFormErrors(errors);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    // Ensure that a file is selected
    if (!file) {
      return;
    }
    // Check file type if necessary
    // For example: if (!file.type.startsWith('image/')) return;

    // Create a FileReader instance to read the file as data URL
    const reader = new FileReader();
    reader.onload = () => {
      // Once the file is loaded, update the form data state with the data URL
      setFormData((prevData) => ({
        ...prevData,
        profile_picture: reader.result,
      }));
    };
    // Read the file as a data URL
    reader.readAsDataURL(file);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "110vh",
      }}
    >
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ maxWidth: 250, maxHeight: 250 }}>
              <img
                src={logo}
                alt="App Logo"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                boxShadow: "8px 10px 18px 0px rgba(0,0,0,0.3)",
              }}
            >
              <CardContent sx={{ minHeight: "400px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Typography
                    sx={{ fontSize: "30px", fontFamily: "Raleway, Roboto" }}
                    variant="h5"
                    component="h2"
                    mb={2}
                  >
                    Sign Up
                  </Typography>
                </Box>
                <Box sx={{ overflow: "auto" }}>
                  <Grid container spacing={2}>
                    {/* First Name and Last Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    {/* Username and Email */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Username"
                        placeholder="Insert Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        error={!!formErrors.username}
                        helperText={formErrors.username}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        placeholder="Insert Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                      />
                    </Grid>
                    {/* Password and Confirm Password */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Password"
                        placeholder="Insert Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/* Phone Number and Country */}
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Phone Number"
                        error={!!formErrors.phone_number}
                        helperText={formErrors.phone_number}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Country"
                        error={!!formErrors.country}
                        helperText={formErrors.country}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    {/* Birth Date */}
                    <Grid item xs={4}>
                      <TextField
                        label="Birth Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        error={!!formErrors.birth_date}
                        helperText={formErrors.birth_date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    {/* Profile Picture */}
                    <Grid item xs={12}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageUpload}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily: "Raleway, Roboto",
                      padding: "10px",
                      bgcolor: "green",
                      borderRadius: "20px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "white",
                        color: "green",
                        borderColor: "darkgreen",
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
