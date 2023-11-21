import React, { useState } from "react";
import { TextField, Button, Box, Grid, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_PREFIX, forgotPassword, login, passwordresetLink } from "../../common/api";
import axios from "axios";
import { RingLoader } from 'react-spinners';
import logo from '../../images/logo.png'


const ResetPasswordLink = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError] = useState("")
  const [isApiProgress, setIsApiProgress] = useState(false)
  const navigate = useNavigate();
  const handelAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
  };


 
  const handelSendMail = async () => {
    const baseURL = `${API_PREFIX}${passwordresetLink}${account.email}`;
    try {
      setIsApiProgress(true);
    //   const baseURL = `${API_PREFIX}${forgotPassword}`
      // Make the API request
    //   const response = await axios.post(baseURL, { email: account.email });
      const response = await axios.post(baseURL);
      // Handle the response as needed
      console.log(response.data);

      // Reset the form and navigate to the desired page
    //   setAccount({ email: "" });
    //   setError("");
    //   navigate('/login'); // Navigate to the login page or any other page after successful API call
    } catch (error) {
      // Handle errors from the API
      console.error("Error sending password reset link:", error.message);
      setError("Error sending password reset link. Please try again.");
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
              onChange={(event) => handelAccount("email", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              value={account?.email}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              className='black-btn'
              onClick={handelSendMail}
            >
              Submit
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
export default ResetPasswordLink;
