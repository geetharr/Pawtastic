import dog1 from '../../images/volunteer-dog1.png';
import dog from '../../images/volunteer-dog.png';
import Landing from "../landing"

import React, { useState } from "react";
import { Button, TextField, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { API_PREFIX, volunteer } from "../../common/api";
import axios from "axios";
import { RingLoader } from 'react-spinners';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const Volunteer = () => {

    const [volunteerForm, setVolunteerForm] = useState({ reason: "", service: "select", firstName: "", lastName: "", volunteerContactNumber: "", age: "", email: '' });
    const [error, setError] = useState("")
    const [isApiProgress, setIsApiProgress] = useState(false)
    const [notification, setNotification] = useState("")
    const [selectedStartDate, setSelectedStartDate] = useState()
    const [selectedEndDate, setSelectedEndDate] = useState()
    const handleStartDateChange = (appointmentDate) => {
        setSelectedStartDate(appointmentDate);
    };
    const handleEndDateChange = (appointmentDate) => {
        setSelectedEndDate(appointmentDate);
    };


    function validateEmail(email) {
        console.log("inside validation", email)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Check if the entered email matches the regular expression
        return !emailRegex.test(email);
    }

    const handleVolunteer = (property, event) => {
        const accountCopy = { ...volunteerForm };
        accountCopy[property] = event.target.value;
        if (property === "email") {
            validateEmail(event.target.value)
                ? setError("Invalid email address")
                : setError("");
        }
        setVolunteerForm(accountCopy);
    };
    function isEmpty(obj) {
        return Object.values(obj).some(
            (element) => element === "" || element === null
        );
    }
    const handleRegister = () => {
        setError("")
        if (!isEmpty(volunteerForm)) {
            setIsApiProgress(true)
            const baseURL = `${API_PREFIX}${volunteer}`
            const request = { ...volunteerForm, startDate: dayjs(selectedStartDate, 'YYYY-MM-DD')?.format('YYYY-MM-DD'), endDate: dayjs(selectedEndDate, 'YYYY-MM-DD')?.format('YYYY-MM-DD') };
            // axios.post(baseURL, { ...request, user: { id: sessionStorage.getItem('user-token') } }).then((response) => {
            axios.post(baseURL, { ...volunteerForm, user: { id: sessionStorage.getItem('user-token') } }).then((response) => {
                setIsApiProgress(false)
                setVolunteerForm({ reason: "", service: "select", firstName: "", lastName: "", volunteerContactNumber: "", age: "" })
                setNotification("Our team will reach out to you. Please check your email for further updates.")
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
        <Landing page="volunteer">
            <div className="home-banner-sec volunteer-sec">
                <div className='container text-white'>
                    <h1 className='mb-4'>Volunteer</h1>
                </div>
            </div>
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-6 text-center'>
                            <img src={dog} className='img-fluid' />
                        </div>
                        <div className='col-6'>
                            <h3 style={{ fontWeight: 300 }}>Join our pack and transform the lives of dogs in need</h3>
                            <p style={{ fontSize: '19px' }} className='mb-0'>Join our pack of compassionate volunteers and make a difference in the lives of dogs in need. Whether you're taking them for a leisurely stroll, ensuring their boarding facilities are comfortable or providing care assistance, your time and dedication can bring immeasurable joy to our furry friends. Embrace the opportunity to give back and become a valued part of our dog-loving community today.</p>
                        </div>
                    </div>
                </div>
            </section>
            {isApiProgress && <div className="spinner">
                <RingLoader color="#36d7b7" size={90} />
            </div>}
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-6 pl-5'>
                            <h3>Become a volunteer!</h3>
                            <div className="row">
                                <div className="col-8">
                                    <form noValidate>
                                        {error && <Alert severity="error" className="mb-3">{error}</Alert>}
                                        {notification && <Alert severity="success" className="mb-3 mt-3">{notification}</Alert>}
                                        <TextField
                                            onChange={(event) => handleVolunteer("firstName", event)}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            name="firstname"
                                            value={volunteerForm.firstName}
                                            />
                                        <TextField
                                            onChange={(event) => handleVolunteer("lastName", event)}
                                            value={volunteerForm.lastName}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"

                                            />

                                        <TextField
                                            onChange={(event) => handleVolunteer("age", event)}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={volunteerForm.age}
                                            type='number'
                                            id="pincode"
                                            label="Age"
                                            name="pincode"

                                        />
                                        <TextField
                                            onChange={(event) => handleVolunteer("volunteerContactNumber", event)}
                                            variant="outlined"
                                            margin="normal"
                                            type='number'
                                            value={volunteerForm.volunteerContactNumber}
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Contact Number"
                                            name="phone"

                                        />
                                        <TextField
                                            onChange={(event) => handleVolunteer("email", event)}
                                            variant="outlined"
                                            value={volunteerForm.email}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"

                                        />
                                        <InputLabel htmlFor="Services">Services</InputLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                fullWidth
                                                required
                                                value={volunteerForm?.service}
                                                onChange={(e) => handleVolunteer('service', e)}
                                                >
                                                <MenuItem value='select'>Select</MenuItem>
                                                <MenuItem value={'Animal Care Assistance'}>Animal Care Assistance</MenuItem>
                                                <MenuItem value={'Dog Walking'}>Dog walking</MenuItem>
                                                <MenuItem value={'Facility Maintenance'}>Facility Maintenance</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            onChange={(event) => handleVolunteer("reason", event)}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows={3}
                                                value={volunteerForm.reason}
                                                id="email"
                                                label="Why do u want to volunteer?"
                                                name="email"

                                                />
                                        <div style={{ gap: '10px', marginBottom: '20px' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker fullWidth format="DD-MM-YYYY" minDate={dayjs()} maxDate={selectedEndDate} label="Available From" onChange={handleStartDateChange} value={selectedStartDate} className='date-picker' />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker fullWidth format="DD-MM-YYYY" minDate={selectedStartDate} label="Available Till" onChange={handleEndDateChange} value={selectedEndDate} className='date-picker' />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>

                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            className='black-btn'
                                            onClick={() => handleRegister()}
                                        >
                                            REGISTER
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

export default Volunteer