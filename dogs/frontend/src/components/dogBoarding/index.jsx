import { Alert, Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { API_PREFIX, dogBoarding } from "../../common/api"
import axios from "axios"
import { RingLoader } from "react-spinners"

const DogBoarding = () => {
    const [training, setTraining] = useState({ firstName: "", lastName: "", phone: "", dogName: "", breed: "", calendar: "", email: '' })
    const [selectedDate, setSelectedDate] = useState()
    const handleTraining = (property, e) => {
        const accountCopy = { ...training };
        accountCopy[property] = e.target.value;
        setTraining(accountCopy)
    }
    const [notification, setNotification] = useState("")
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [error, setError] = useState("")
    const [isApiProgress, setIsApiProgress] = useState(false)
    const handleSubmitDetails = () => {
        setError("")
        setIsApiProgress(true)
        const baseURL = `${API_PREFIX}${dogBoarding}`
        const request = { ...training, user: { id: sessionStorage.getItem('user-token') }, calendar: dayjs(selectedDate, 'YYYY-MM-DD')?.format('YYYY-MM-DD') }
        axios.post(baseURL, request).then(() => {
            setIsApiProgress(false)
            setTraining({ firstName: "", lastName: "", phone: "", dogName: "", breed: "", calendar: "", email: '' })
            setNotification("Thanks for reaching out! Please check your email for further updates.")
        }).catch(err => {
            setIsApiProgress(false)
            setError(err?.response?.data?.errors?.length > 0 ? err?.response?.data?.errors?.[0] : 'Something went wrong, Please try again later')
            console.log(err, 'login page error')
        });

    }
    return (
        <div>
            <form noValidate>
                {notification && <Alert severity="success" className="mb-3 mt-3">{notification}</Alert>}
                {error && <Alert severity="error" className="mb-3 mt-3">{error}</Alert>}
                <TextField
                    onChange={(event) => handleTraining("firstName", event)}
                    variant="outlined"
                    margin="normal"
                    value={training.firstName}
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                />
                <TextField
                    onChange={(event) => handleTraining("lastName", event)}
                    variant="outlined"
                    margin="normal"
                    value={training.lastName}

                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"

                />


                <TextField
                    onChange={(event) => handleTraining("phone", event)}
                    variant="outlined"
                    value={training.phone}
                    margin="normal"
                    type="number"
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"

                />
                <TextField
                    onChange={(event) => handleTraining("email", event)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    value={training.email}
                    label="Email ID"
                    name="email"
                />
                <TextField
                    onChange={(event) => handleTraining("dogName", event)}
                    value={training.dogName}
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    label="Dog Name"

                />
                <TextField
                    onChange={(event) => handleTraining("breed", event)}
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    id="breed"
                    label="Breed"
                    value={training.breed}
                    name="breed"

                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker fullWidth format="DD-MM-YYYY" minDate={dayjs()} label="Date" onChange={handleDateChange} value={selectedDate} className='date-picker' />
                    </DemoContainer>
                </LocalizationProvider>
                <Box mt={2}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        className='black-btn'
                        onClick={() => handleSubmitDetails()}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
            {isApiProgress && <div className="spinner">
                <RingLoader color="#36d7b7" size={90} />
            </div>}
        </div>
    )
}

export default DogBoarding