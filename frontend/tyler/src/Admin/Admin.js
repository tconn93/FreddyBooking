import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import CalendarApp from "../util/cal/CalendarApp";
import DateUtils from "../util/date/DateUtils";
import './Admin.css';
import Avail from "./availability/Avail";
import WebUtils from "../util/web/WebUtils";
import OtherArtist from "./otherartist/OtherArtist";
import dayjs from "dayjs";


function Admin(props){
    let [artist,setArtist] = useState(undefined);
    let [avails,setAvails] = useState(undefined);
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
                   // getArtist();
                    getAvails();
                },[]);

    async function getArtist(){
        let x = await WebUtils.getArtist(artistId);
        if(x=== undefined){
            alert('Issue getting Artist Details')
        } else {
            setArtist(x); }
    }

    async function getAvails(){
        let x = await WebUtils.getAvails(artistId);
        if(x===undefined){
            alert('Issue getting Availabilities')
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
            days.push(sun)
            days.push( sun.add(1,'days'));
            days.push( sun.add(2,'days'));
            days.push( sun.add(3,'day'));
            days.push( sun.add(4,'day'));
            days.push( sun.add(5,'day'));
            days.push( sun.add(6,'day'));
           
            let av = {days:days,avail:avail};
  
            result.push(av);
        }
        setAvails(result);
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
                        setState={(x)=>setState(x)} 
                        avails={avails}/>
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