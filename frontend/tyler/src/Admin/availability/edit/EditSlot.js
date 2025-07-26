import React from "react";


function EditSlot(props){



    return <td>
        <select name={props.name} onChange={(e)=>props.setAtt(e.target.value)}>
            <option value={''}>None</option>
            <option value={'B'}>Booked</option>
            <option value={'A'}>Available</option>
            <option value={'V'}>Vacation</option>
        </select>

    </td>
}


export default EditSlot;