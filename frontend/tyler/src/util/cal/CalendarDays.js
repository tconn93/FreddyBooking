import React, {useState, useEffect} from 'react';
import DateUtils from '../date/DateUtils';
function CalendarDays(props){

        let firstDayOfMonth = new Date(props.day.currentDay.getFullYear(), props.day.currentDay.getMonth(), 1);
        let weekdayOfFirstDay = firstDayOfMonth.getDay();

        let currentDays = [];

        const [appointments, setAppointments] = useState([]); 
        const [displayDates,setDisplayDates] = useState(undefined);



        async function getAppointments(){
        let result =  await fetch('http://localhost:8080/appointment')
        .then(res=>res.json())
        .then(data=>{

        return data;
        }).catch(err=>{
        console.log(err);
        return undefined;
        });
        if(result!== undefined && result.status === undefined){
            setAppointments(result);
        }


        }


        useEffect(()=>{
        getAppointments();
        },[])


        useEffect(()=>{
        currentDays =[];



        for(let day = 0; day<42; day++){
            if(day ===0 && weekdayOfFirstDay === 0){
                firstDayOfMonth.setDate(firstDayOfMonth.getDate()-7);
            }else if(day === 0){
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
            }else{
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
            }

            let today = new Date();
            let todayAsInt = DateUtils.getDateAsInt(today);

            let dateAsInt = DateUtils.getDateAsInt(firstDayOfMonth);
            
            let busy = appointments.map((app)=>app.date).indexOf(dateAsInt)>-1;
            let past = dateAsInt <= todayAsInt;
           

            // if(dateAsInt===20240824||dateAsInt===20240827||dateAsInt===20240828){
            //     console.log(appointments.map((app)=>app.date))
            //     console.log("date: "+dateAsInt)
            // console.log("busy is "+busy)
            // console.log("past is "+past)
            // console.log("weekend is "+weekend)
            // }
            let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === props.day.currentDay.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: (firstDayOfMonth.getMonth()),
            number: firstDayOfMonth.getDate(),
            selected: dateAsInt=== props.day.dayAsInt ,
            year: firstDayOfMonth.getFullYear(),
            busy: busy,
            past: past,
            dateAsInt: dateAsInt
            
        }
        if(calendarDay.selected)console.log(calendarDay);
        currentDays.push(calendarDay);

        }

        setDisplayDates(currentDays)




        },[appointments,props.day])



        useEffect(()=>{

        if(displayDates!==undefined){
        displayDates.forEach((date)=>{
        if(date.dateAsInt===props.day.dayAsInt){
        console.log("selected Date")
        console.log(date)
        date.selected = true;
        }
        });
        }
        },[props.day])


        let x =0;



        if(displayDates === undefined){
        return(<div>loading...</div>)
        }else {

        return (
        <div className='table-content'>
            
            {displayDates.map((day)=>{
                let color = "hotpink";
                let avail = "white";
            
                    if(day.busy){
                    avail = "darkgray";
                }
                if(day.past){
                    avail = "gray";
                }
               
                    if(day.selected){
                    avail = "#7FFF00";
                }
                    
                x++;
                return (<div key={x}
                className={"calendar-day"+(day.currentMonth?" current":"") }
                onClick={() => props.changeCurrentDay(day)}
                    style={{backgroundColor: avail, color: color,height:props.appStyle.rowHeight}}>
                <p >{day.number}  </p>
                
                </div>)
            })}
        </div>
        )

        }
}

export default CalendarDays;