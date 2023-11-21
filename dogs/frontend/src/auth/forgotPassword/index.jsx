import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_PREFIX, forgotpassword, login } from "../../common/api";
import { RingLoader } from 'react-spinners';
import logo from '../../images/logo.png';

const ResetPassword = () => {
  const [account, setAccount] = useState({ email: "", userPassword: "" });
  const [error, setError] = useState("");
  const [isApiProgress, setIsApiProgress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handelAccount = (property, event) => {
    if(property==='userPassword'){
      console.log(event.target.value)
    }
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
  };

  useEffect(() => {
    // Set the email in the state when the component mounts
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    setAccount((prevAccount) => ({ ...prevAccount, email: emailParam }));
  }, [location.search]);

  const handleResetPassword = async () => {
    try {
      setIsApiProgress(true);

      // Construct the baseURL with email as a path variable
      const baseURL = `${API_PREFIX}${forgotpassword}${account.email}`;

      // Make the API request
      console.log("Request Payload:", { userPassword: account.userPassword });
      // console.log(first)
      const response = await axios.put(baseURL, {
          userPassword: account.userPassword,
          
          // Add any additional fields required by your API
        
      });

      // Handle the response as needed
      
console.log("Response from Server:", response.data);
      console.log(response.data);

      // Reset the form and navigate to the desired page
      setAccount({ email: "", password: "" });
      setError("");
      navigate('/login'); // Navigate to the login page or any other page after a successful API call
    } catch (error) {
      // Handle errors from the API
      console.error("Error resetting password:", error.message);
      setError("Error resetting password. Please try again.");
    } finally {
      setIsApiProgress(false);
    }
  };

  return (
    <div className="login--login-sec">
      <div className="login-page">
        <div className="icon">
          <img src={logo} alt="signup" />
        </div>
        <Box sx={{ width: "100%" }}>
          <form className="login--form" noValidate>

            {error && <Alert severity="error" className="mb-3">{error}</Alert>}
        
            <TextField
              onChange={(event) => handelAccount("userPassword", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="userPassword"
              type="password"
              value={account?.userPassword}
              id="userPassword"
              autoComplete="current-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              className='black-btn'
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>

          </form>
        </Box>
      </div>
      {isApiProgress && <div className="spinner">
        <RingLoader color="#36d7b7" size={90} />
      </div>}
    </div>
  );
};

export default ResetPassword;
