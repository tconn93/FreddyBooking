import React from'react';
import { Link, useNavigate} from 'react-router-dom';

import logo from '../../skull.png';
import logo2 from '../../image.png';
import './Menu.css';
import GalleryDesk from '../../Profile/gallery/GalleryDesk';
import AboutDesk from '../../Profile/about/AboutDesk';
import ContactDesk from '../../Profile/contact/ContactDesk';
import BookingDesk from '../../Profile/booking/BookingDesk';

function Menu(){

    const navigate = useNavigate();
    return(
        <div>
        <div className='menu-grid' >
            <div className='menu-item'>
                    <img onClick={()=>navigate("/")} style={{float:'left'}} src={logo2} alt='skull' className='skull'/>            
            </div>
            <div className='menu-links'>
                <h1 className='banner' onClick={()=>navigate("/")}style={{color: 'aqua'}}>Dustin<span style={{color: 'red'}}>.</span><span style={{color: 'violet'}}>Ink</span></h1>
                <Link to={'/about'} component={<AboutDesk />}>About</Link>
                <Link to={'/gallery'} component={<GalleryDesk />}>Gallery</Link>
                <Link to={'/booking'} component={<BookingDesk />}>Booking</Link>
                <Link to={'/contact'} component={<ContactDesk />}>Contact</Link>            
            </div>         
            <div className='menu-item'> 
                    <img onClick={()=>navigate("/")} style={{float: 'right'}}src={logo} alt='skull' className='skull'/>
            </div>  
        </div>
        <div>

        </div>
        </div>
    )
}

export default Menu;