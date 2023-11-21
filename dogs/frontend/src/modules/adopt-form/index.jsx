import Landing from "../../pages/landing"
import React, { useState } from "react";
import {TextField, Button, Box, Alert} from "@mui/material";
import { API_PREFIX, adopt } from "../../common/api";
import axios from "axios";
import adoptImg from '../../images/home-dog1.png'
import {RingLoader} from 'react-spinners';
import './adopt-form.scss'
import dog1 from '../../images/volunteer-dog1.png';

const AdoptForm = ()=> {
    const [adoptForm, setAdoptForm] = useState({ firstName: "", lastName: "", email: "", phone:"", pinCode: "", address: "" });
    const [error, setError] = useState("")
    const [isApiProgress, setIsApiProgress] = useState(false)
    const [notification, setNotification] = useState("")
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
          axios.post(baseURL, {...adoptForm,  user: {id: sessionStorage.getItem('user-token')}}).then((response) => {
            setIsApiProgress(false)
            setNotification("Our team will reach out to you.")
            // navigate("/home");
          }).catch(err => {
            setIsApiProgress(false)
            setError( err?.response?.data?.errors?.length > 0 ? err?.response?.data?.errors?.[0] :'Something went wrong, Please try again later')
            console.log(err, 'login page error')
          });
        }else{
          setError("Please fill all the mandatory fields.")
        }
      };
    return (
        <>
       <div>
     

      <div className="container-fluid pb-50 pb-0">
      <div className="card border-0">
        <div className="card-body">
          <div className="row">
            <div className="col-4"><img src={adoptImg} alt="adopt" className="img-fluid"/></div>
            <div className="col-8">
              <div className="row">
                  <div className="col-6">

                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Animal ID :</b></p></div>
                      <div className="col-7"><p>39292804</p></div>
                    </div>

                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Species:</b></p></div>
                      <div className="col-7"><p>Dog</p></div>
                    </div>

                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Breed :</b></p></div>
                      <div className="col-7"><p>Great Pyrenees/Mix</p></div>
                    </div>

                    

                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Gender :</b></p></div>
                      <div className="col-7"><p>Female</p></div>
                    </div>

                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Size :</b></p></div>
                      <div className="col-7"><p>Large</p></div>
                    </div>
                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Color :</b></p></div>
                      <div className="col-7"><p>White/Grey</p></div>
                    </div>
                    <div className="row">
                      <div className="col-5 pe-0"><p><b>Spayed/Neutered :</b></p></div>
                      <div className="col-7"><p>Yes</p></div>
                    </div>

                  </div>
                  <div className="col-6">

                  
                  <div className="row">
                      <div className="col-4 pe-0"><p><b>Age :</b></p></div>
                      <div className="col-8"><p>8 years 11 months 7 days</p></div>
                    </div>
                    

                    <div className="row">
                      <div className="col-4 pe-0"><p><b>Declawed :</b></p></div>
                      <div className="col-8"><p>No</p></div>
                    </div>

                    <div className="row">
                      <div className="col-4 pe-0"><p><b>Housetrained :</b></p></div>
                      <div className="col-8"><p>Unknown</p></div>
                    </div>

                    <div className="row">
                      <div className="col-4 pe-0"><p><b>Site :</b></p></div>
                      <div className="col-8"><p>Animal Welfare Association of New Jersey</p></div>
                    </div>

                    <div className="row">
                      <div className="col-4 pe-0"><p><b>Location :</b></p></div>
                      <div className="col-8"><p>Foster Care</p></div>
                    </div>
                    <div className="row">
                      <div className="col-4 pe-0"><p><b>Intake :</b></p></div>
                      <div className="col-8"><p>Date 6/22/2023</p></div>
                    </div>
                    <div className="row">
                      <div className="col-4 pe-0"><p><b>Stage :</b></p></div>
                      <div className="col-8"><p>Available</p></div>
                    </div>


                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {isApiProgress &&<div className="spinner">
             <RingLoader color="#36d7b7" size={90} />
         </div>}

          <section className='py-50'>
            <div className='container-fluid dedicated-team'>
              <div className="row justify-content-between align-items-center">
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
                          autoFocus
                          />
                        <TextField
                          onChange={(event) => handleAdoptForm("lastName", event)}
                          variant="outlined"
                          margin="normal"
                          required
                          value={adoptForm.lastName}
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"

                        />
                        <TextField
                          onChange={(event) => handleAdoptForm("address", event)}
                          variant="outlined"
                          margin="normal"
                          value={adoptForm.address}
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
                          value={adoptForm.pinCode}
                          required
                          fullWidth
                          id="pinCode"
                          label="Pincode"
                          name="pincode"
                          type="number"
                          />
                        <TextField
                          onChange={(event) => handleAdoptForm("phone", event)}
                          variant="outlined"
                          margin="normal"
                          value={adoptForm.phone}
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          name="phone"
                          type="number"
                        />
                        <TextField
                          onChange={(event) => handleAdoptForm("email", event)}
                          variant="outlined"
                          margin="normal"
                          required
                          value={adoptForm.email}
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
    </div>
        </>
    )
}

export default AdoptForm