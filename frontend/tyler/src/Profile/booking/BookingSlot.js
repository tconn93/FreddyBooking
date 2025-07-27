import React from "react";



function BookingSlot(props){

    let slot = '';
    let color = 'black';
    if(props.status==='A'){
        slot="Available";
        color = 'green'
    }
    if(props.status==='B')
        slot='Booked';
    if(props.status==='V')
        slot='Vacation';

    const nothing=()=>{

        if(props.status==='A')
            props.book();

    }

    

return (<td onClick={()=>nothing()} style={{color:color}}>{slot}</td>)
}

export default BookingSlot;