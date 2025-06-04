import React, { useEffect, useState } from "react";
import CalendarApp from "../util/cal/CalendarApp";
import DateUtils from "../util/date/DateUtils";
import './Admin.css';


function Admin(props){


    let today = new Date();

    let day = today;
    let dayAsInt = DateUtils.getDateAsInt(day);
    console.log(dayAsInt);
    const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    const mobileWeekdays = ["S","M", "T", "W", "T", "F","S"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];;
    const mobileMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];;
    const [state,setState] = useState({
        currentDay: day,
        dayAsInt: dayAsInt
    });

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


    // return (
    //     <div>
            
    //         <div >
    //             <CalendarApp appStyle={props.isMobile?mobileAppStyle:desktopAppStyle}/>
    //         </div>
            
    //     </div>
    // )

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
                </div>
                <div className="AdminItems"> 
                    <h2>Availability</h2>
                </div>
                <div className="AdminItems"> 
                    <h2>Booking Request</h2>
                </div>
                <div className="AdminItems"> 
                    <h2>Other Artists</h2>
                </div>
        </div>
    )

}

export default Admin;