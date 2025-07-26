import React from "react";
import {  useNavigate } from "react-router-dom";


function BackButton(){

    const navigate = useNavigate();

    return(
            <div style={{ paddingTop:'25px'}}>
                <div style={{
                    fontSize:'30px',
                    fontWeight:'bold',
                    width: '100px',
                    color: 'white',
                    background:'black',
                    marginLeft:'25px',
                    marginTop:'25px',
                    textAlign:'center',
                    paddingTop:'2px',
                    paddingBottom:'2px'
                    }}>
                    <div onClick={()=> navigate(-1)}>
                    Back
                    </div>
                </div>
            </div>
    )

}

export default BackButton;