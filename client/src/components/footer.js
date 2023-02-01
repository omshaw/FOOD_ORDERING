import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer=()=>{
    return (
        <div className='footerbox'>
            <div className='contact'>
                <h4>Contact US</h4>
                <Link>Help & Support</Link>
                <Link>Rate Us</Link>
            </div>
            <div className='legal'>
                <h4>Legal</h4>
                <Link>Terms and Conditions</Link>
                <Link>Offers Term</Link>
                <Link>Refund & Cancelation</Link>
                <Link>Privacy Policy</Link>
            </div>
        </div>
    );
}

export default Footer;