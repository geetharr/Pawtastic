import dog1 from '../../images/services-bg1.png';
// import dog from '../../images/services-dog.png';
// import Servicesbannerimage from "../../images/GermanS.jpg"
import Servicesimage1 from "../../images/Servicesimage1.jpg"
import Landing from "../landing"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DogBoarding from '../../components/dogBoarding';
import DogGrooming from '../../components/dogGrooming';
import DogTraining from '../../components/dogTraining';

import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';


const PetServices = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedServices] = useState("select")


    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    return (
        <Landing page="services">
            <div className="home-banner-sec service-sec">
                <div className='container text-white'>
                    <h1 className='mb-4'>Services</h1>
                </div>
            </div>
            <div style={{ textAlign: 'center', padding: '50px 20px', background: '#f8f8f8' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Welcome to your one-stop destination for dog services and fun!
              </h1>
           <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5' }}>Simplifying dog services for you.</p>
            </div>
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-6 text-center'>
                            <img src={Servicesimage1} className='img-fluid' />
                        </div>
                        <div className='col-6'>
                            {/* <h3 style={{fontWeight:300}}>Premium Services Tailored to Their Well-Being</h3> */}
                            <h3 style={{fontWeight:300}}>Premium services tailored to their well-being</h3>
                            <p  style={{fontSize:'19px'}} >Discover a world of premium services designed to cater to every aspect of your dog's well-being. From boarding accommodations and professional grooming sessions to expert training programs, we have everything your furry friend needs to thrive. </p>

                        </div>
                    </div>
                </div>
            </section>

            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row">
                        {/* <div className='col-6 pl-5'> */}
                            <h3>Select Service</h3>
                            <div className='services-tile-group'>
                                <div className='services-tile' onClick={() => { setSelectedServices('Dog boarding');  }}>
                                    <img className='services-tile-image' src='/icons/Dog_Boarding_Tile.jpg' alt="j" />
                                    <h4>Dog Boarding</h4>
                                    {selectedService === 'Dog boarding' && <hr style={{color:'blue', height:'2px'}}/>}
                                </div>
                                <div className='services-tile' onClick={() => { setSelectedServices('Dog grooming');  }}>
                                    <img className='services-tile-image' src='/icons/Dog_Grooming_Tile.jpg' alt="j" />
                                    <h4>Dog Grooming</h4>
                                    {selectedService === 'Dog grooming' && <hr style={{color:'blue', height:'2px'}}/>}
                                </div>
                                <div className='services-tile' onClick={() => { setSelectedServices('Dog training');  }}>
                                    <img className='services-tile-image' src='/icons/Dog_Training_Tile.jpg' alt="j" />
                                    <h4>Dog Training</h4>
                                    {selectedService === 'Dog training' && <hr style={{color:'blue', height:'2px'}}/>}
                                </div>
                            </div>
                            
                                {selectedService === 'Dog training' && <h5>Fill this form to register for dog training</h5>}
                                {selectedService === 'Dog grooming' && <h5>Fill this form to book a slot for dog grooming</h5>}
                                {selectedService === 'Dog boarding' && <h5>Fill this form to register for dog boarding</h5>}
                                {selectedService === 'Dog training' && <DogTraining />}
                                {selectedService === 'Dog grooming' && <DogGrooming />}
                                {selectedService === 'Dog boarding' && <DogBoarding />}
                        </div>
                        {/* <div className='col-6 text-center'>
                            <img src={dog1} className='img-fluid' />
                        </div> */}
                    </div>
                {/* </div> */}
            </section>

        </Landing>
    )
}

export default PetServices