import React from "react";
import CalendarDays from "./CalendarDays";
import "./calendar.css";
import DateUtils from "../date/DateUtils";
function Calendar(props){

    const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];;


            function changeCurrentDay(day){
                if(day.past || day.busy ){
                        
                }else{
                    let x = {
                        currentDay:day.date,
                        dayAsInt: DateUtils.getDateAsInt(day.date)
                    };
                    props.setState(x);
                }
            }
  
    let last =  new Date(props.state.currentDay.getFullYear(), props.state.currentDay.getMonth()-1, props.state.currentDay.getDate());
    let next = new Date(props.state.currentDay.getFullYear(), props.state.currentDay.getMonth()+1, props.state.currentDay.getDate());
    let alwaysNextMonth =new Date()
    alwaysNextMonth.setDate(31);



    return (    
    <div className="calendar" style={{textAlign:"center", width:props.appStyle.width}} >
 
        <div className="calendar-header" style={{textAlign:"center", height:props.appStyle.rowHeight}}>
            
            <div className="calendar-header-item">       
                 {DateUtils.getYearAndMonth(DateUtils.getDateAsInt(alwaysNextMonth))<DateUtils.getYearAndMonth(props.state.dayAsInt) &&
                        <button 
                        onClick={()=>{props.setState(
                            {currentDay:last, 
                            dayAsInt: DateUtils.getDateAsInt(last)})}} 
                            style={{height:'25px'}}
                        >Previous Month</button>
                 }
            </div>
            <div className="calendar-header-item">
                <h2 >{props.appStyle.months[props.state.currentDay.getMonth()]}  {props.state.currentDay.getFullYear()}</h2>  
            </div>
            <div className="calendar-header-item">
                <button onClick={()=>{props.setState(
                    {currentDay:next, 
                    dayAsInt: DateUtils.getDateAsInt(next)})}} 
                    style={{height:'25px'}}
                >Next Month</button>
        
            </div>
        </div>
        <div className="calendar-body" >
                <div className="table-header"  style={{height:props.appStyle.rowHeight}}>
                        {props.appStyle.weekdays.map((weekday)=>{
                            return <div key={weekday} className="weekday"><p>{weekday}</p></div>
                        })}
                </div>
                <CalendarDays 
                day={props.state} 
                changeCurrentDay={(day)=>changeCurrentDay(day)} 
                today={props.today}
                appStyle={props.appStyle} />
        </div>  
    </div>)


}

export default Calendar;