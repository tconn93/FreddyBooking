import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import '../Admin.css';
import WebUtils from "../../util/web/WebUtils";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AvailSlot from "./AvailSlot";
import { Link, useNavigate } from "react-router-dom";
import EditAvail from "./edit/EditAvail";
import BackButton from "./BackButton";

dayjs.extend(relativeTime);

function Avail(props){

     const [avails,setAvails]= useState(undefined);
     const [artist,setArtist] = useState(undefined);
    const {artistId} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        getAvails();
    },[]);


    async function getAvails(){
        let x = await WebUtils.getAvails(artistId);
        if(x === undefined){
            alert('Error with Avails')
        }else{
            convertAvails(x.avails);
            setArtist(x.artist);
        }
    }

    function convertAvails(availabilities){

        let result =[];
        for (const avail of availabilities){
            let days =[];
            let sun = dayjs(new Date(avail.beginning_of_week));
            sun = sun.add(1,'day');
            days.push(sun)
            days.push( sun.add(1,'day'));
            days.push( sun.add(2,'day'));
            days.push( sun.add(3,'day'));
            days.push( sun.add(4,'day'));
            days.push( sun.add(5,'day'));
            days.push( sun.add(6,'day'));
           
            let av = {days:days,avail:avail};
  
            result.push(av);
        }
        setAvails(result);
    }


    async function deleteAvail(availId){
        let x = await WebUtils.deleteAvail(availId);
        if(x=== undefined)
            alert('Issue deleting Availability')
        else
            getAvails();
    }




    if(artist===undefined){
        return(
        <div className="AvailPage">
            <BackButton />
            <div style={{margin:'auto',width:'250 px', textAlign:'center'}}>
                Page is loading 
            </div>
        </div>
        )
    }else

    return(
        <div className="AvailPage">
            <BackButton />
            <div style={{margin: 'auto', border:'3px black solid', width:'100px'}}>
            {artist.name}
            </div>

            <div className="availTable"  style={{background:'white'}}>
                
                {avails!==undefined && avails.map((avail)=>{

                    //let startDay = new Date(avail.beginning_of_week);

                    return (
                        <table key={avail.avail.id} >  
                        <tbody>                      
                        <tr >
                            <td className="btn" onClick={()=>deleteAvail(avail.avail.id)}> Delete</td>
                            <td>{avail.days[0].month()+1}/{avail.days[0].date()}</td>
                            <td>{avail.days[1].month()+1}/{avail.days[1].date()}</td>
                            <td>{avail.days[2].month()+1}/{avail.days[2].date()}</td>
                            <td>{avail.days[3].month()+1}/{avail.days[3].date()}</td>
                            <td>{avail.days[4].month()+1}/{avail.days[4].date()}</td>
                            <td>{avail.days[5].month()+1}/{avail.days[5].date()}</td>
                            <td>{avail.days[6].month()+1}/{avail.days[6].date()}</td>
                        </tr>
                        <tr >
                            <td>AM</td>
                            <AvailSlot status={avail.avail.sunday} />
                            <AvailSlot status={avail.avail.monday}/>
                            <AvailSlot status={avail.avail.tuesday}/>
                            <AvailSlot status={avail.avail.wednesday}/>
                            <AvailSlot status={avail.avail.thursday}/>
                            <AvailSlot status={avail.avail.friday}/>
                            <AvailSlot status={avail.avail.saturday}/>
                        </tr>
                        <tr >
                            <td>PM</td>
                            <AvailSlot status={avail.avail.sundayPM}/>
                            <AvailSlot status={avail.avail.mondayPM}/>
                            <AvailSlot status={avail.avail.tuesdayPM}/>
                            <AvailSlot status={avail.avail.wednesdayPM}/>
                            <AvailSlot status={avail.avail.thursdayPM}/>
                            <AvailSlot status={avail.avail.fridayPM}/>
                            <AvailSlot status={avail.avail.saturdayPM}/>
                        </tr>
                        </tbody>
                        </table>

                    )

                })}

                <div style={{textAlign:'center',
                                fontSize:'30px'  
                }}>
                    <Link
                    to={`/admin/${artistId}/availability/edit`}
                    component={<EditAvail/>}
                    >Add Availability Week</Link>
                </div>
               
            </div>
        </div>
    )
}

export default Avail;



