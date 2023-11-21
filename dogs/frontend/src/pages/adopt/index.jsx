import Landing from "../landing"

import germans from "../../images/GermanS.jpg";
import shihtzu from "../../images/Shihtzu.jpg"
import GratDane from "../../images/GreatDane.jpg"
import BorderCollie from "../../images/Bordercollie.jpg"
import Boxer from "../../images/Boxer.jpg"
import Labrador from "../../images/Labrador.jpg"

// import dog from '../../images/adobt-dog.png';
import dog1 from '../../images/adobt-dog1.png';
// import puppy from '../../images/puppy.png';
// import dane from '../../images/dane.png';
// import shepherd from '../../images/shepherd.png';
// import streetdog from '../../images/streetdog.png';
// import breed from '../../images/breed.png';
// import breed1 from '../../images/breed1.png';


import { RingLoader } from "react-spinners"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AdoptForm from "../../modules/adopt-form";




import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_PREFIX, adopt } from "../../common/api";
import axios from "axios";
const Adopt = () => {
  const [adoptForm, setAdoptForm] = useState({ firstName: "", lastName: "", email: "", phone: "", pinCode: "", address: "" });
  const [error, setError] = useState("")
  const [isApiProgress, setIsApiProgress] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [notification, setNotification] = useState("")
  const navigate = useNavigate();

  const handleDogAdopt = () => {
    // navigate('/adopt/form')
    setIsPopupOpen(true)
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
        setNotification("Thanks for reaching out! Please check your email for further updates.")
        setAdoptForm({ firstName: "", lastName: "", email: "", phone: "", pinCode: "", address: "" })
      }).catch(err => {
        setIsApiProgress(false)
        setError(err?.response?.data?.errors?.length > 0 ? err?.response?.data?.errors?.[0] : 'Something went wrong, Please try again later')
        console.log(err, 'login page error')
      });
    } else {
      setError("Please fill all the mandatory fields.")
    }
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  return (
    <Landing page="adopt">
      <div className="home-banner-sec adobt-now">
        <div className='container text-white'>
          <h1 className='mb-4'>Adopt</h1>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '50px 20px', background: '#f8f8f8' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
          Find your perfect furry companion at Pawtastic Dogs
        </h1>
        <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'cursive' }}>
          Adopt
        </h2>
        {/* <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>Where Love Finds a Home!</p> */}
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>Where love finds a home!</p>
      </div>
      {isApiProgress && <div className="spinner">
        <RingLoader color="#36d7b7" size={90} />
      </div>}
      <section className='py-50 pt-0'>
        <div className='container-fluid'>
          <div className='adopt-dog-sec'>
            <div className='row justify-content- dog-breed-card-group'>
              <div className='col-2' >
                <div className="dog-breed-card">
                  <img src={Labrador} className="img-fluid dog-breed-card-image" />
                  <h4> Bailey</h4>
                  <p>Male/Neutered <br />Labrador<br />6 months</p>
                </div>
              </div>
              <div className='col-2' >
                <div className="dog-breed-card">
                  <img src={GratDane} className="img-fluid dog-breed-card-image" />
                  <h4>Rosie</h4>
                  <p>Female/Spayed<br />Great Dane <br />2 years</p>
                </div>
              </div>
              <div className='col-2'>
                <div className="dog-breed-card">
                  <img src={germans} className="img-fluid dog-breed-card-image" />
                  <h4>Duke</h4>
                  <p>Male/Neutered<br />German shepherd <br />1 year</p>
                </div>
              </div>
              <div className='col-2' >
                <div className="dog-breed-card">
                  <img src={BorderCollie} className="img-fluid dog-breed-card-image" />
                  <h4> Cooper</h4>
                  <p>Male/Neutered <br />Border Collie <br />4 years</p>
                </div>
              </div>
              <div className='col-2' >
                <div className="dog-breed-card">
                  <img src={Boxer} className="img-fluid dog-breed-card-image" />
                  <h4>  Tucker</h4>
                  <p>Male/Neutered <br />Boxer<br />3 years</p>
                </div>
              </div>
              <div className='col-2' >
                <div className="dog-breed-card">
                  <img src={shihtzu} className="img-fluid dog-breed-card-image" />
                  <h4>Zoey </h4>
                  <p>Female/Spayed <br /> Shihtzu <br />3 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BootstrapDialog
          onClose={() => setIsPopupOpen(false)}
          aria-labelledby="customized-dialog-title"
          open={isPopupOpen}
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Adoption Form
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setIsPopupOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <AdoptForm />

        </BootstrapDialog>
      </section>
      <section className='py-50'>
        <div className='container-fluid dedicated-team'>
          <div className="row">
            <div className='col-6 pl-5'>
              <h3>Fill in the application form!</h3>
              <div className="row">
                <div className="col-8">
                  <form noValidate>
                    {error && <Alert severity="error" className="mb-3">{error}</Alert>}
                    {notification && <Alert severity="success" className="mb-3 mt-3">{notification}</Alert>}
                    <TextField
                      onChange={(event) => handleAdoptForm("firstName", event)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstname"
                      label="First Name"
                      name="firstname"
                      value={adoptForm.firstName}
                      />
                    <TextField
                      onChange={(event) => handleAdoptForm("lastName", event)}
                      value={adoptForm.lastName}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"

                      />
                    <TextField
                      onChange={(event) => handleAdoptForm("address", event)}
                      variant="outlined"
                      value={adoptForm.address}
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      rows={3}
                      id="address"
                      label="Address"
                      name="address"

                    />
                    <TextField
                      onChange={(event) => handleAdoptForm("pinCode", event)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      value={adoptForm.pinCode}
                      type="number"
                      id="pincode"
                      label="Pincode"
                      name="pincode"

                      />
                    <TextField
                      onChange={(event) => handleAdoptForm("phone", event)}
                      variant="outlined"
                      margin="normal"
                      value={adoptForm.phone}
                      type="number"
                      required
                      fullWidth
                      id="phone"
                      label="Phone"
                      name="phone"
                      
                      />
                    <TextField
                      onChange={(event) => handleAdoptForm("email", event)}
                      variant="outlined"
                      value={adoptForm.email}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      
                    />

                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      className='black-btn'
                      onClick={handleAdopt}
                    >
                      Adopt
                    </Button>

                  </form>
                </div>
              </div>

            </div>
            <div className='col-6 text-center'>
              <img src={dog1} className='img-fluid' />
            </div>
          </div>
        </div>
      </section>
     
      
    </Landing>
  )
}

export default Adopt