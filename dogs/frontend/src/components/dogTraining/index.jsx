import { Alert, Button, TextField } from "@mui/material"
import { useState } from "react"
import { API_PREFIX, dogTraining } from "../../common/api"
import axios from "axios"
import { RingLoader } from "react-spinners"

const DogTraining = () => {
    const [training, setTraining] = useState({ firstName: "", lastName: "", phone: "", dogName: "",email:'', breed: "", ageInYears: "", comments: "" })
    function isEmpty(obj) {
        return Object.values(obj).some(
            (element) => element === "" || element === null
        );
    }
    const handleTraining = (property, e) => {
        const accountCopy = { ...training };
        accountCopy[property] = e.target.value;
        setTraining(accountCopy)
    }
    const [error, setError] = useState("")
    const [isApiProgress, setIsApiProgress] = useState(false)
    const [notification, setNotification] = useState("")
    const handleSubmitDetails = () => {
        setError("")
        if (!isEmpty(training)) {
            setIsApiProgress(true)
            const baseURL = `${API_PREFIX}${dogTraining}`
            axios.post(baseURL, { ...training, user: { id: sessionStorage.getItem('user-token') } }).then(() => {
                setIsApiProgress(false)
                setNotification("Thanks for reaching out! Please check your email for further updates..")
                setTraining({ firstName: "", lastName: "", phone: "", dogName: "", breed: "",email:'', ageInYears: "", comments: "" })
            }).catch(err => {
                setIsApiProgress(false)
                setError(err?.response?.data?.errors?.length > 0 ? err?.response?.data?.errors?.[0] : 'Something went wrong, Please try again later')
                console.log(err, 'login page error')
            });
        } else {
            setError("Please fill all the mandatory fields.")
        }
    }
    return (
        <div>
            <form noValidate>
                {error && <Alert severity="error" className="mb-3 mt-3">{error}</Alert>}
                {notification && <Alert severity="success" className="mb-3 mt-3">{notification}</Alert>}
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
                    
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={training.lastName}
                    name="lastName"
                    
                    />
                <TextField
                    onChange={(event) => handleTraining("phone", event)}
                    variant="outlined"
                    margin="normal"
                    type="number"
                    fullWidth
                    value={training.phone}
                    id="phone"
                    label="Phone"
                    name="phone"
                    
                    />
                <TextField
                    onChange={(event) => handleTraining("email", event)}
                    variant="outlined"
                    margin="normal"
                    value={training.email}
                    fullWidth
                    id="email"
                    label="Email ID"
                    name="email"
                    />
                <TextField
                    onChange={(event) => handleTraining("dogName", event)}
                    variant="outlined"
                    margin="normal"

                    value={training.dogName}
                    fullWidth
                    label="Dog Name"
                    
                    />
                <TextField
                    onChange={(event) => handleTraining("breed", event)}
                    variant="outlined"
                    value={training.breed}
                    margin="normal"
                    
                    fullWidth
                    id="breed"
                    label="Breed"
                    name="breed"

                />
                <TextField
                    onChange={(event) => handleTraining("ageInYears", event)}
                    value={training.ageInYears}
                    variant="outlined"
                    margin="normal"
                    type="number"
                    fullWidth
                    id="breed"
                    label="Dog Age"
                    name="breed"

                    />
                <TextField
                    onChange={(event) => handleTraining("comments", event)}
                    value={training.comments}
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    multiline
                    rows={3}
                    id="comments"
                    label="Specific Comments"
                    name="comments"

                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    className='black-btn'
                    onClick={() => handleSubmitDetails()}
                >
                    Submit
                </Button>

            </form>
            {isApiProgress && <div className="spinner">
                <RingLoader color="#36d7b7" size={90} />
            </div>}
        </div>
    )
}

export default DogTraining