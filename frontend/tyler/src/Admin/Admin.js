import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import CalendarApp from "../util/cal/CalendarApp";
import DateUtils from "../util/date/DateUtils";
import './Admin.css';
import Avail from "./availability/Avail";
import WebUtils from "../util/web/WebUtils";
import OtherArtist from "./otherartist/OtherArtist";


function Admin(props){
    let [artist,setArtist] = useState(undefined)
    const {artistId} = useParams();
    let today = new Date();
    let day = today;
    let dayAsInt = DateUtils.getDateAsInt(day);
    const navigate = useNavigate();
    const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    const mobileWeekdays = ["S","M", "T", "W", "T", "F","S"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];;
    const mobileMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];;
    const [state,setState] = useState({
        currentDay: day,
        dayAsInt: dayAsInt
    });

                useEffect(()=>{
                    getArtist();
                },[]);

    async function getArtist(){
        let x = await WebUtils.getArtist(artistId);
        if(x=== undefined){
            alert('Issue getting Artist Details')
        } else {
            setArtist(x); }
    }
    let mobileAppStyle ={
        width:'100%',
        rowHeight:'40px',
        weekdays:mobileWeekdays,
        months: mobileMonths
    };
    let desktopAppStyle = {
        width:'100%',
        rowHeight:'60px',
        weekdays: weekdays,
        months:months
    }
    const availUrl = (x) =>{
        return "/admin/"+artist.id+"/availability";
    }
    const loading = () =>{
        return <div></div>;
    }

    if(artist===undefined)
        return loading();
    else
        return (
        <div className="AdminPage">
                <div className="AdminCal"> 
                        <CalendarApp appStyle={props.isMobile?mobileAppStyle:desktopAppStyle}
                        state={state} 
                        setState={(x)=>setState(x)} />
                </div>
                <div className="AdminItems">
                    <h2>Agenda for </h2>
                    <h2>{state.currentDay.getMonth()+1}/{state.currentDay.getDate()}/{state.currentDay.getFullYear()}</h2>
                    <h2>{artist !== undefined && artist.name}</h2>               
                </div>
                <div className="AdminItems"> 
                    <h2><Link to={availUrl()}
                    component={<Avail artist={artist} />}
                    >Availability</Link></h2>
                </div>
                <div className="AdminItems"> 
                    <h2>Booking Request</h2>
                </div>
                <div className="AdminItems">              
                    <button 
                        onClick={()=>navigate(-1)}
                        >Log Out
                    </button>
                        {artist.isOwner &&
                            <h2>
                            <Link to={'/admin/'+artistId+'/others'}
                            component={<OtherArtist />}
                            >Other Artists
                            </Link></h2>
                        }
                </div>
        </div>
    );

}

export default Admin;