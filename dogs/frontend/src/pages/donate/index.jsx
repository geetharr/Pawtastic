import dog1 from '../../images/donate-dog1.png';
import dog from '../../images/donate-dog.png';
import qrcode from '../../images/QR code.jpg'
import Landing from "../landing"

import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_PREFIX, adopt } from "../../common/api";
import axios from "axios";

const Donate = () => {
  const [adoptForm, setAdoptForm] = useState({ firstName: "", lastName: "", email: "", phone: "", pincode: "", address: "" });
  const [error, setError] = useState("")
  const [isApiProgress, setIsApiProgress] = useState(false)
  const navigate = useNavigate();

  const handleDogAdopt = () => {
    navigate('/adopt/form')
  }
  function validateEmail(email) {
    console.log("inside validation", email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Check if the entered email matches the regular expression
    return !emailRegex.test(email);
  }

  const handleAdoptForm = (property, event) => {
    const accountCopy = { ...adoptForm };
    accountCopy[property] = event.target.value;

    if (property === "email") {
      validateEmail(event.target.value)
        ? setError("Invalid email address")
        : setError("");
    }
    setAdoptForm(accountCopy);
  };
  function isEmpty(obj) {
    return Object.values(obj).some(
      (element) => element === "" || element === null
    );
  }
  const handleAdopt = () => {
    setError("")
    if (!isEmpty(adoptForm)) {
      setIsApiProgress(true)
      const baseURL = `${API_PREFIX}${adopt}`
      axios.post(baseURL, { ...adoptForm, user: { id: sessionStorage.getItem('user-token') } }).then((response) => {
        setIsApiProgress(false)
        navigate("/home");
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
    <Landing page="donate">
      <div className="home-banner-sec donate-sec">
        <div className='container text-white'>
          <h1 className='mb-4' >Donate</h1>
        </div>
      </div>
      <section className='py-50'>
        <div className='container-fluid dedicated-team'>
          <div className="row justify-content-between align-items-center">
            <div className='col-6 text-center'>
              <img src={dog} className='img-fluid' />
            </div>
            <div className='col-6'>
              {/* <h3 style={{ fontWeight: 300 }}>Donate Today to Support Dogs in Need</h3> */}
              <h3 style={{ fontWeight: 300 }}>Donate today to support dogs in need</h3>
              <p style={{ fontSize: '19px' }} className='mb-0'>Make a difference in the lives of dogs in need with your generous contribution. Every penny donated to Pawtastic Dogs goes directly towards providing essential care, medical assistance, and shelter for vulnerable dogs. Join us in making a lasting impact and ensuring that every dog receives the love and care they deserve. Donate today and help us create a brighter future for our furry friends.</p>
            </div>

            <div className='col-6'>

            </div>

          </div>
        </div>
      </section>
      {/* payment */}
      <section className='py-50'>
        <div className='container-fluid dedicated-team'>
          <div className="row justify-content-center align-items-center">
            <div className='col-6 text-center'>
              <img src={qrcode} className='img-fluid' alt='Payment QR Code' />
              <p className='mt-3 text-muted'>
                <span role="img" aria-label="Dog Paw">🐾</span> Woof! Ready to make your pup's day pawesome?
                Simply scan the QR code below to complete your payment securely and treat your furry friend!
                <span role="img" aria-label="Dog Treat"> 🦴</span>
              </p>
            </div>
          </div>
        </div>
      </section>


    </Landing>
  )
}

export default Donate