import React from "react";



function AvailSlot(props){

    let status = '';
    let color = 'black';

    if(props.status==='A') {
        status = 'Available';
        color = 'white';
    }
    else if(props.status==='B') {
        status = 'Booked';
        color= 'skyblue'
    }
    else if(props.status==='V') {
        status = 'Vacation'
        color = 'lime'
    }

    return <td style={{background: color}}>
        {status}
    </td>
}

export default AvailSlot;



