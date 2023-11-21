import Landing from "../landing"
import dog from '../../images/home-dog1.png';
import dog1 from '../../images/home-dog2.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    return (
        <Landing page="home">
            <div className="home-banner-sec">
                <div className='container text-white'>
                    <h1 className='mb-4'>Welcome to Pawtastic Dogs!</h1>
                </div>
            </div>
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-6 text-center'>
                            <img src={dog} className='img-fluid' />
                        </div>
                        <div className='col-6'>
                            {/* <h3 style={{fontWeight:300}}>Our Dedicated Team: Creating a Tail-Wagging Haven</h3> */}
                            <h3 style={{fontWeight:300}}>Our dedicated team: Creating a tail-wagging haven</h3>
                            <p style={{fontSize:'19px'}} className='mb-0'>We understand that your furry friend is a cherished member of your family. That’s why we are dedicated to providing top-notch services tailored to meet your dog’s unique needs and preferences. Whether you’re a busy pet parent seeking pet services, looking for a vet, or a place for your pooch to socialize and have fun, we’ve got you covered.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='adobt-bg-sec'>
                <div className='container text-center'>
                    <h5>Together, lets make this community a joyful one for us and our dogs!</h5>
                </div>
            </section>
            <section className='py-50'>
                <div className='container-fluid dedicated-team'>
                    <div className="row justify-content-between align-items-center">
                        <div className='col-6'>
                            {/* <h3 style={{fontWeight:300}}>Welcome to Our Dog-Loving Community</h3> */}
                            <h3 style={{fontWeight:300}}>Welcome to our dog-loving community!</h3>
                            <p style={{fontSize:'19px'}} className='mb-0'>We're not just a service provider - we're a community of dog lovers who are dedicated to making tails wag and creating unforgettable experiences for our four-legged friends. Join our pack today and let us become your trusted partner in providing the care and attention your dog deserves.</p>
                        </div>
                        <div className='col-6 text-center'>
                            <img src={dog1} className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-50'>
                <div className='container-fluid'>
                    <div className='quotation-sec'>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-sm-6'>
                                <div>
                                    <p className='mb-0'>“A dog will teach you unconditional love. If you can have that in your life, things won’t be too bad.”  <br />
                                        – Robert Wagner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Landing>
    )
}

export default Home