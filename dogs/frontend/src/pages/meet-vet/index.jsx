import Landing from "../landing";

import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import dog from '../../images/meetavet-dog.png';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { API_PREFIX, doctorAppointment } from "../../common/api";
import { RingLoader } from "react-spinners";

const MeetAVet = () => {
    const emailRegex = /^\w+(\.\w+)*@\w+(\.\w+)*(\.\w{2,3})+$/;
    const initialFormDetails = {
        firstName: "", lastName: "", email: "", phone: "",
        petName: '', petAge: '', breed: '', reasonForVisit: '', doctorName: 'select', timeSlot: 'select', appointmentDate: ''
    }
    const [isApiProgress, setIsApiProgress] = useState(false)
    const [vetForm, setVetForm] = useState(initialFormDetails);
    const [error, setError] = useState("")
    const [notification, setNotification] = useState("")
    const [selectedDate, setSelectedDate] = useState()
    const handleVetForm = (property, e) => {
        setNotification('')
        if (property === 'email') {
            const validEmail = emailRegex.test(e.target.value)
            if (!validEmail) {
                setError('Invalid email address')
            }
            else {
                setError('')
            }
        }
        const accountCopy = { ...vetForm };
        accountCopy[property] = e.target.value;
        setVetForm(accountCopy)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsApiProgress(true)
        const validEmail = emailRegex.test(vetForm.email)
        if (!validEmail) {
            setError('Invalid email address')
        }
        else if (vetForm.doctorName === 'select') {
            setError('Select a Doctor')
            return
        }
        else if (vetForm.timeSlot === 'select') {
            setError('Select a Time Slot')
            return
        }
        else if (selectedDate === undefined) {
            setError('Select a Date')
            return
        }
        else {
            setError('')
            const request = { ...vetForm, appointmentDate: dayjs(selectedDate, 'YYYY-MM-DD')?.format('YYYY-MM-DD') };
            console.log(request)
            const baseURL = `${API_PREFIX}${doctorAppointment}`
            axios.post(baseURL, { ...request, user: { id: sessionStorage.getItem('user-token') } }).then(() => {
                setNotification('Your appointment has been booked successfully and a confirmation email has been sent to you.')
                setVetForm(initialFormDetails)
                setIsApiProgress(false)
            }).catch(()=>setIsApiProgress(false))
        }

    }
    const handleDateChange = (appointmentDate) => {
        setSelectedDate(appointmentDate);
    };
    return (
        <Landing page="meetVet">
            <div className="home-banner-sec meet-vet">
                <div className='container text-white    '>
                    <h1 className='mb-4 text-blue banner-heading'>Meet a Vet</h1>
                </div>
            </div>
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-6 text-center'>
                            <img src={dog} className='img-fluid' />
                        </div>
                        <div className='col-6'>
                            <h3 style={{ fontWeight: 300 }}>Dedicated doctors ensuring your dog's health and happiness</h3>
                            <p style={{ fontSize: '19px' }} className='mb-0'>Trust your dog’s health to our team of dedicated and experienced veterinary doctors. With a passion for animal care and a commitment to providing the highest standard of medical services, our veterinarians are here to ensure your furry companion receives the best possible care. From routine check-ups, vaccinations, to specialized treatments, our skilled professionals are devoted to keeping your pet healthy, happy, and thriving.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className='px-5'>
                        <h3>Fill in the application form!</h3>
                        <form onSubmit={handleSubmit}>
                            {error && <Alert severity="error" className="mb-3">{error}</Alert>}
                            {notification && <Alert severity="success" className="mb-3 mt-3">{notification}</Alert>}
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <TextField
                                            onChange={(event) => handleVetForm("firstName", event)}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            name="firstname"
                                            value={vetForm.firstName}
                                        />
                                        <TextField
                                            onChange={(event) => handleVetForm("lastName", event)}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            value={vetForm.lastName}

                                        />
                                    </div>
                                    <TextField
                                        onChange={(event) => handleVetForm("phone", event)}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        rows={3}
                                        id="phone"
                                        value={vetForm.phone}
                                        label="Phone"
                                        name="phone"
                                        type="number"
                                    />
                                    <TextField
                                        onChange={(event) => handleVetForm("email", event)}
                                        variant="outlined"
                                        value={vetForm.email}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email ID"
                                        name="email"

                                    />
                                    <TextField
                                        onChange={(event) => handleVetForm("petName", event)}
                                        variant="outlined"
                                        value={vetForm.petName}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="petName"
                                        label="Pet Name"
                                        name="petName"

                                    />
                                    <TextField
                                        onChange={(event) => handleVetForm("petAge", event)}
                                        variant="outlined"
                                        margin="normal"
                                        value={vetForm.petAge}
                                        required
                                        fullWidth
                                        id="petAge"
                                        label="Pet Age"
                                        name="petAge"
                                        type="number"
                                    />
                                </div>
                                <div style={{ border: 'solid rgba(128, 128, 128, 0.2) 1px', height: '400px' }}></div>
                                <div style={{ width: '100%' }}>
                                    <TextField
                                        onChange={(event) => handleVetForm("breed", event)}
                                        variant="outlined"
                                        margin="normal"
                                        value={vetForm.breed}
                                        required
                                        fullWidth
                                        id="breed"
                                        label="Breed"
                                        name="breed"

                                    />
                                    <TextField
                                        onChange={(event) => handleVetForm("reasonForVisit", event)}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={vetForm.reasonForVisit}
                                        id="reasonForVisit"
                                        label="Reason for Visit"
                                        name="reasonForVisit"
                                    />

                                    <Select
                                        className="mt-3"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        fullWidth
                                        required
                                        value={vetForm?.doctorName}
                                        onChange={(e) => handleVetForm("doctorName", e)}
                                    >
                                        <MenuItem value='select'>Select a Doctor</MenuItem>
                                        <MenuItem value={'Pavan Kumar'}>Pavan Kumar</MenuItem>
                                        <MenuItem value={'Geetanjali R'}>Geetanjali R</MenuItem>
                                        <MenuItem value={'Naveen Krishnamurthy'}>Naveen Krishnamurthy</MenuItem>
                                        <MenuItem value={'Suresh Radhakrishnan'}>Suresh Radhakrishnan</MenuItem>
                                        <MenuItem value={'Rupa Sasidharan'}>Rupa Sasidharan</MenuItem>
                                        <MenuItem value={'Darshana Arunkumar'}>Darshana Arunkumar</MenuItem>
                                    </Select>
                                    <div className="mt-3">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker fullWidth format="DD-MM-YYYY" minDate={dayjs()} label="Date" onChange={handleDateChange} value={selectedDate} className='date-picker' />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <Select
                                        className="mt-4"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        fullWidth
                                        required
                                        value={vetForm?.timeSlot}
                                        onChange={(e) => handleVetForm("timeSlot", e)}

                                    >
                                        <MenuItem value='select'>Select a Time Slot</MenuItem>
                                        <MenuItem value={'9am to 10am'}>9am to 10am</MenuItem>
                                        <MenuItem value={'10am to 11am'}>10am to 11am</MenuItem>
                                        <MenuItem value={'11am to 12pm'}>11am to 12pm</MenuItem>
                                        <MenuItem value={'2pm to 3pm'}>2pm to 3pm</MenuItem>
                                        <MenuItem value={'4pm to 5pm'}>4pm to 5pm</MenuItem>
                                        <MenuItem value={'6pm to 7pm'}>6pm to 7pm</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className='black-btn mt-4'
                            >
                                Schedule an Appointment
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
            {isApiProgress && <div className="spinner">
                <RingLoader color="#36d7b7" size={90} />
            </div>}
        </Landing>
    )
}

export default MeetAVet