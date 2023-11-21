import { Alert, Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { API_PREFIX, dogGrooming } from "../../common/api"
import axios from "axios"
import { RingLoader } from "react-spinners"

const DogGrooming = () => {
    const [groomingDetails, setGroomingDetails] = useState({ firstName: "", lastName: "", phone: "", dogName: "", breed: "",email:'', calendar: "", service: "select", timeSlot: "select" })
    const [selectedDate, setSelectedDate] = useState()
    const handleGrooming = (property, e) => {
        const accountCopy = { ...groomingDetails };
        accountCopy[property] = e.target.value;
        setGroomingDetails(accountCopy)
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
            const baseURL = `${API_PREFIX}${dogGrooming}`
            const request = {...groomingDetails, user: {id: sessionStorage.getItem('user-token')}, calendar: dayjs(selectedDate, 'YYYY-MM-DD')?.format('YYYY-MM-DD')}
            console.log(request)
            axios.post(baseURL, request).then(() => {
                setIsApiProgress(false)
                setNotification("Thanks for reaching out! Please check your email for further updates.")
                setGroomingDetails({ firstName: "", lastName: "", phone: "", dogName: "", breed: "",email:'', calendar: "", service: "select", timeSlot: "select" })
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
                        onChange={(event) => handleGrooming("firstName", event)}
                        variant="outlined"
                        margin="normal"
                        value={groomingDetails.firstName}
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                    />
                    <TextField
                        onChange={(event) => handleGrooming("lastName", event)}
                        variant="outlined"
                        value={groomingDetails.lastName}
                        margin="normal"
                        
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"

                    />


                    <TextField
                        onChange={(event) => handleGrooming("phone", event)}
                        value={groomingDetails.phone}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"

                    />
                     <TextField
                    onChange={(event) => handleGrooming("email", event)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={groomingDetails.email}
                    id="email"
                    label="Email ID"
                    name="email"
                />
                    <TextField
                        onChange={(event) => handleGrooming("dogName", event)}
                        variant="outlined"
                        margin="normal"
                        
                    value={groomingDetails.dogName}
                    fullWidth
                    label="Dog Name"
                    
                    />
                    <TextField
                        onChange={(event) => handleGrooming("breed", event)}
                        variant="outlined"
                    value={groomingDetails.breed}
                    margin="normal"
                    
                    fullWidth
                    id="breed"
                        label="Breed"
                        name="breed"

                    />
                    <h6>Select Service</h6>
                        <FormControl fullWidth>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            fullWidth
                            required
                            value={groomingDetails?.service}
                            onChange={(e) => handleGrooming("service", e)}
                            >
                            <MenuItem value='select'>Select</MenuItem>
                            <MenuItem value={'Regular haircut with bath'}>Regular haircut with bath</MenuItem>
                            <MenuItem value={'Hair cut with Tick and Flea Bath'}>Hair cut with Tick and Flea Bath</MenuItem>
                            </Select>
                        </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker fullWidth format="DD-MM-YYYY" minDate={dayjs()} label="Date" onChange={handleDateChange} value={selectedDate} className='date-picker' />
                  </DemoContainer>
                </LocalizationProvider>
                <h6 className="mt-2">Time slot</h6>
                        <FormControl fullWidth>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            fullWidth
                            required
                            
                            value={groomingDetails?.timeSlot}
                            onChange={(e) => handleGrooming("timeSlot",e)}
                            >
                            <MenuItem value='select'>Select</MenuItem>
                            <MenuItem value={'10am to 12pm'}>10am to 12pm</MenuItem>
                            <MenuItem value={'1pm to 3pm'}>1pm to 3pm</MenuItem>
                            <MenuItem value={'4pm to 6pm'}>4pm to 6pm</MenuItem>
                            </Select>
                        </FormControl>
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

export default DogGrooming