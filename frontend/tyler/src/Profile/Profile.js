import React from'react';
import './Profile.css';
import Menu from '../util/menu/Menu';
import insta from '../insta.png';



function Profile(){
    return(
        <div>
            <Menu />
            <div  className='page'>
                <div className='profile'>
                    <h1 style={{fontSize:'xxx-large'}}>Dustin Widmier</h1>
                    <h1 style={{fontSize:'xxx-large'}}>Tattoo Artist</h1>
                    <h1 style={{fontSize:'xxx-large'}}>Pensacola, FL</h1>
                    <h2 style={{fontSize:'x-large'}}>with a focus on</h2>
                    <h1 style={{fontSize:'xxx-large'}}>Anime tattos </h1>
                    <div>
                        
                        <p><a href='https://www.instagram.com/dustinwtattoos/'>    <img
                           width={'25px'}
                           height={'25px'}
                           src={insta} /><h3 style={{display:'inline'}} > : dustinwtattos</h3></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile;