import React from'react';
import './MobileProfile.css';
import MobileMenu from '../util/menu/MobileMenu';


function MobileProfile(){
    return(
        <div>
                <MobileMenu />
            <div  className='mobile-profile'> 
            <div className='profile'>
                    <h1 style={{fontSize:'xxx-large'}}>Dustin Widmier</h1>
                    <h1 style={{fontSize:'xxx-large'}}>Tattoo Artist</h1>
                    <h1 style={{fontSize:'xxx-large'}}>Pensacola, FL</h1>
                    <h2 style={{fontSize:'x-large'}}>with a focus on</h2>
                    <h1 style={{fontSize:'xxx-large'}}>Anime tattos </h1>
                    <div>
                        <p>
                            Instagram: <a href='https://www.instagram.com/dustinwtattoos/'>dustinwtattos</a>
                        </p>
                    </div>

    
                </div>
                </div>
           
        </div>
    )
}

export default MobileProfile;