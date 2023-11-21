import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_PREFIX, signUp } from "../../common/api";
import axios from "axios";
import { RingLoader } from 'react-spinners';
import './singup.scss'
import logo from '../../images/logo.png'


const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({address: "", contactNumber: "", firstName: "", lastName: "", contactNumber: "", email: "", userPassword: "", confirmPassword: "" });
  const [error, setError] = useState("")
  const [isApiProgress, setIsApiProgress] = useState(false)
  const navigate = useNavigate();
  function validateEmail(email) {
    console.log("inside validation", email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Check if the entered email matches the regular expression
    return !emailRegex.test(email);
  }
  const passwordCheck = (passwordValue) => {
    const regular = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=-]).{8,14}$/;
    return !regular.test(passwordValue);
  };
  const handleSignupDetails = (property, event) => {
    const accountCopy = { ...signupDetails };
    accountCopy[property] = event.target.value;
    if (property === "userPassword") {
      passwordCheck(event.target.value)
        ? setError("Password entered should contain min 8 char, max 14 char, atleast 1 alphabet, 1 digit and 1 special char."
        )
        : setError("");
    }
    if (property === "confirmPassword") {
      event.target.value !== signupDetails.userPassword
        ? setError("Password and confirm password are not same.")
        : setError(false, "");
    }
    if (property === "email") {
      validateEmail(event.target.value)
        ? setError("Invalid email address")
        : setError("");
    }
    setSignupDetails(accountCopy);
  };

  function isEmpty(obj) {
    return Object.values(obj).some(
      (element) => element === "" || element === null
    );
  }
  const handleSignup = () => {
    setError("")
    if (!isEmpty(signupDetails)) {
      setIsApiProgress(true)
      const baseURL = `${API_PREFIX}${signUp}`
      axios.post(baseURL, signupDetails).then((response) => {
        // sessionStorage.setItem("user-token", response?.data?.data?.userId);
        
        navigate("/login");
        setIsApiProgress(false)
      }).catch(err => {
        setIsApiProgress(false)
        setError(err?.response?.data?.errors?.length > 0 ? err?.response?.data?.errors?.[0] : 'Something went wrong, Please try again later')
        console.log(err, 'login page error')
      });
    } else {
      setError("Please fill all the mandatory fields.")
    }
  };

  return (
    <div className="signup--login-sec">
      <div className="login-page">
        <Box sx={{ width: "100%" }}>
          <div className="icon">
            <img src={logo} alt="signup" />
          </div>
          <form className="signup--form" noValidate>
            {error && <Alert severity="error" className="mb-3">{error}</Alert>}
            <TextField
              onChange={(event) => handleSignupDetails("firstName", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First name"
              name="firstname"
              autoFocus
            />
            <TextField
              onChange={(event) => handleSignupDetails("lastName", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"

            />
            <TextField
              onChange={(event) => handleSignupDetails("contactNumber", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contactNumber"
              label="Contact Number"
              name="contactNumber"

            />
            <TextField
              onChange={(event) => handleSignupDetails("address", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
            />
            <TextField
              onChange={(event) => handleSignupDetails("email", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"

            />
            <TextField
              onChange={(event) => handleSignupDetails("userPassword", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="userPassword"
            />
            <TextField
              onChange={(event) => handleSignupDetails("confirmPassword", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              className='black-btn'
              onClick={handleSignup}
            >
              Signup
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
export default Signup;
