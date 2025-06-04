
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import DateUtils from "../../util/date/DateUtils";
function CalendarApp(props){

    let today = new Date();

    let day = today;
    let dayAsInt = DateUtils.getDateAsInt(day);
    console.log(dayAsInt);
    
        // const [state,setState] = useState({
        //     currentDay: day,
        //     dayAsInt: dayAsInt
        // });
        function handleClick(){
            props.setIsBan(true);
        }
       
    
   
    
  
    
    return (
        <div className="" >
            <div className="calendarGrid">
                    <div className="calGridItem">        
                        <Calendar state={props.state} 
                        setState={(x)=>props.setState(x)} 
                        today={DateUtils.getDateAsInt(today)} 
                        appStyle={props.appStyle}
                        />                
                    </div>                                
            </div>
        </div>
        )
}
export default  CalendarApp;