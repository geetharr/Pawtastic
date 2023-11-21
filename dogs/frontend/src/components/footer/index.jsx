import logo from '../../images/PD-white.png';
import phone from '../../images/phone.png';
import mail from '../../images/mail.png';

const Footer = ()=> {
    return (
        <div className="footer-sec">
            <div className="container">
                <div className="row justify-content-between">
                    <div className='col-12 mb-4 mb-lg-0 col-md-12 col-lg-6'>
                        <h4 className="footer-logo"><img src={logo} style={{width:'150px'}} /></h4>
                        <p className='mt-4'>We are a bunch of dog lovers who want to contribute to the well being of the canine community.</p>
                    </div>
                    <div className='col-12 mb-4 mb-sm-0 col-sm-6 col-md-6 col-lg-2'>
                        <h4>Quick Links</h4>
                        <p className='mb-2'><a href='/home'>Home</a></p>
                        <p className='mb-2'><a href='/adopt'>Adopt</a></p>
                        <p className='mb-2'><a href='/donate'>Donate</a></p>
                        <p className='mb-2'><a href='/pet-services'>Services</a></p>
                        <p className='mb-2'><a href='/volunteer'>Volunteer</a></p>
                        <p className=''><a href='/meetvet'>Meet a Vet</a></p>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-3'>
                        <h4>Get In Touch</h4>
                        <p className='mb-2'><a href='tel:(111) 111-1111'><img src={phone} className='me-2' /> {'(111) 111 - 1111'}</a></p>
                        <p><a href='mailto:lnora2210@gmail.com'><img src={mail} className='me-2' />Pawtasticd@gmail.com</a></p>
                        <p className='mt-2'>839 Kingswood Path, Middletown, DE 19709</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer