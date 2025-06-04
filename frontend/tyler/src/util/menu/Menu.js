import React from'react';
import { useNavigate} from 'react-router-dom';

import logo from '../../skull.png';
import logo2 from '../../image.png';
import './Menu.css';


function Menu(){

    const navigate = useNavigate();
    return(
        <div className='menu-grid' >
            <div className='menu-item'>
                    <img onClick={()=>navigate("/")} style={{float:'left'}} src={logo2} alt='skull' className='skull'/>            
            </div>
            <div className='menu-links'>
                <h1 className='banner' onClick={()=>navigate("/")}style={{color: 'aqua'}}>Dustin<span style={{color: 'red'}}>.</span><span style={{color: 'violet'}}>Ink</span></h1>
            </div>         
            <div className='menu-item'> 
                    <img onClick={()=>navigate("/")} style={{float: 'right'}}src={logo} alt='skull' className='skull'/>
            </div>
          
        </div>
    )
}

export default Menu;