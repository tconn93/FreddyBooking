
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import DateUtils from "../../util/date/DateUtils";
function CalendarApp(props){

    let today = new Date();

    useEffect(()=>{
        let x = undefined
        if(DateUtils.getDateAsInt(props.state.currentDay)<=DateUtils.getDateAsInt(new Date())){
            let nextDay = DateUtils.getNextDay(new Date())
            x ={
                currentDay:nextDay,
                dayAsInt:DateUtils.getDateAsInt(nextDay)

            }
            
        }
        if(x!== undefined) props.setState(x);
    },[props.state])
   
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