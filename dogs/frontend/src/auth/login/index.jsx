import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Grid, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_PREFIX, login } from "../../common/api";
import axios from "axios";
import { RingLoader } from 'react-spinners';
import './login.scss'
import logo from '../../images/logo.png'



const Login = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError] = useState("")
  const [isApiProgress, setIsApiProgress] = useState(false)
  const [isEmailFieldTouched, setIsEmailFieldTouched] = useState(false)
  const [isPasswordFieldTouched, setIsPasswordFieldTouched] = useState(false)
  const navigate = useNavigate();
  const handelAccount = (property, event) => {
    if (property === 'email') {
      setIsEmailFieldTouched(true)
    }
    if (property === 'password') {
      setIsPasswordFieldTouched(true)
    }
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
  };

  const emailRegex = /^\w+(\.\w+)*@\w+(\.\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=-]).{8,14}$/

  useEffect(() => {
    const emailValid = emailRegex.test(account.email);
    (isEmailFieldTouched && !emailValid) ? setError("Invalid email address")
      : setError("")
  }, [account.email])

  useEffect(() => {
    const passwordValid = passwordRegex.test(account.password);
    (isPasswordFieldTouched && !passwordValid) ? setError("Password entered should contain min 8 char, max 14 char, atleast 1 alphabet, 1 digit and 1 special char.")
      : setError("")
  }, [account.password])


  const handelLogin = () => {
    setError("")
    if (account.email !== "" && account.password !== "") {
      setIsApiProgress(true)
      const baseURL = `${API_PREFIX}${login}`
      axios.post(baseURL, { email: account?.email, userPassword: account?.password }).then((response) => {
        sessionStorage.setItem("user-token", response?.data?.id);
        setIsApiProgress(false)
        navigate("/home");
      }).catch(err => {
        setIsApiProgress(false)
        // sessionStorage.setItem("user-token", 'test');
        // navigate("/home");
        setError(err?.response?.data?.errors?.length > 0 ? err?.response?.data?.errors?.[0] : 'Something went wrong, Please try again later')
        console.log(err, 'login page error')
      });
    } else {
      setError("Please fill all the mandatory fields.")
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
            <TextField
              onChange={(event) => handelAccount("password", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={account?.password}
              id="password"
              autoComplete="current-password"
            />
            <div className="login-links-group">
            <div className="login--forgot-pwd rr" >
            <Grid item >
                <Link href="/passwordResetLink" variant="body2" className="login--forgotpswd">
                  {"forgotPassword"}
                </Link>
              </Grid>
              </div>
                <div className="login--signup">
              <Grid item>
                <Link href="/signup" variant="body2" className="login--forgotpswd">
                  {"Signup"}
                </Link>
              </Grid>
              </div>
              </div>
            
            <Button
              type="button"
              fullWidth
              variant="contained"
              className='black-btn'
              onClick={handelLogin}
            >
              Log In
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
export default Login;
