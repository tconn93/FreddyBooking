import React, {useState, useEffect} from 'react';
import DateUtils from '../date/DateUtils';
import dayjs from 'dayjs';
function CalendarDays(props){

        let firstDayOfMonth = new Date(props.day.currentDay.getFullYear(), props.day.currentDay.getMonth(), 1);
        let weekdayOfFirstDay = firstDayOfMonth.getDay();

        let currentDays = [];

        const [appointments, setAppointments] = useState([]); 
        const [displayDates,setDisplayDates] = useState(undefined);

        const [avails,setAvails] = useState(props.avails);

        let availDays = [];
        let bookedDays = [];
        let vacationDays = [];
        function isAvailable(day, dayPM){
            if('A'=== day|| 'A'===dayPM)
                return true;
            return false;
        }
        function isBooked(day,dayPM){
            if('B'===day||'B'===dayPM)
                return true;
            return false;
        }
        function isVacation(day,dayPM){
            if('V'===day||'V'===dayPM)
                return true;
            return false;
        }

        useEffect(()=>{

                        for(const avail of avails ){
                            if(isAvailable(avail.avail.sunday,avail.avail.sundayPM))
                                availDays.push(avail.days[0]);
                            if(isAvailable(avail.avail.monday,avail.avail.mondayPM))
                                availDays.push(avail.days[1]);
                            if(isAvailable(avail.avail.tuesday,avail.avail.tuesdayPM))
                                availDays.push(avail.days[2]);
                            if(isAvailable(avail.avail.wednesday,avail.avail.wednesdayPM))
                                availDays.push(avail.days[3]);
                            if(isAvailable(avail.avail.thursday,avail.avail.thursdayPM))
                                availDays.push(avail.days[4]);
                            if(isAvailable(avail.avail.friday,avail.avail.fridayPM))
                                availDays.push(avail.days[5]);
                            if(isAvailable(avail.avail.saturday,avail.avail.saturdayPM))
                                availDays.push(avail.days[6]);
                            if(isBooked(avail.avail.sunday, avail.avail.sundayPM))
                                bookedDays.push(avail.days[0]);
                            if(isBooked(avail.avail.monday, avail.avail.mondayPM))
                                bookedDays.push(avail.days[1]);
                            if(isBooked(avail.avail.tuesday, avail.avail.tuesdayPM))
                                bookedDays.push(avail.days[2]);
                            if(isBooked(avail.avail.wednesday, avail.avail.wednesdayPM))
                                bookedDays.push(avail.days[3]);
                            if(isBooked(avail.avail.thursday, avail.avail.thursdayPM))
                                bookedDays.push(avail.days[4]);
                            if(isBooked(avail.avail.friday, avail.avail.fridayPM))
                                bookedDays.push(avail.days[5]);
                            if(isBooked(avail.avail.saturday, avail.avail.saturdayPM))
                                bookedDays.push(avail.days[6]);
                            if(isVacation(avail.avail.sunday, avail.avail.sundayPM))
                                vacationDays.push(avail.days[0]);
                            if(isVacation(avail.avail.monday, avail.avail.mondayPM))
                                vacationDays.push(avail.days[1]);
                            if(isVacation(avail.avail.tuesday, avail.avail.tuesdayPM))
                                vacationDays.push(avail.days[2]);
                            if(isVacation(avail.avail.wednesday, avail.avail.wednesdayPM))
                                vacationDays.push(avail.days[3]);
                            if(isVacation(avail.avail.thursday, avail.avail.thursdayPM))
                                vacationDays.push(avail.days[4]);
                            if(isVacation(avail.avail.friday, avail.avail.fridayPM))
                                vacationDays.push(avail.days[5]);
                            if(isVacation(avail.avail.saturday, avail.avail.saturdayPM))
                                vacationDays.push(avail.days[6]);

                        }




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
                            let currentDay =  dayjs(firstDayOfMonth);
                            let busy = bookedDays.some(day => day.add(1,'day').isSame(currentDay,'day'));
                            let past = dateAsInt <= todayAsInt;

                            let vacay = vacationDays.some((day)=> day.add(1,'day').isSame(currentDay,'day'));
                            let available = availDays.some((day)=> day.add(1,'day').isSame(currentDay,'day'));               
                            let calendarDay = {
                            currentMonth: (firstDayOfMonth.getMonth() === props.day.currentDay.getMonth()),
                            date: new Date(firstDayOfMonth),
                            month: (firstDayOfMonth.getMonth()),
                            number: firstDayOfMonth.getDate(),
                            selected: dateAsInt=== props.day.dayAsInt ,
                            year: firstDayOfMonth.getFullYear(),
                            busy: busy,
                            past: past,
                            vacay:vacay,
                            available:available,
                            dateAsInt: dateAsInt
                            
                        }
                        currentDays.push(calendarDay);
                        }
                        setDisplayDates(currentDays)
        },[appointments,props.day])



        useEffect(()=>{

        if(displayDates!==undefined){
        displayDates.forEach((date)=>{
        if(date.dateAsInt===props.day.dayAsInt){
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

                if((day.vaycay && day.available)||(day.available && day.busy)||(day.busy && day.vaycay)){
                    avail = "blue"
                }else {
            
                if(day.vacay){
                    avail="yellow"
                }
                if(day.available){
                    avail="skyblue"
                }
                    if(day.busy){
                    avail = "darkgray";
                }
                
                if(day.past){
                    avail = "gray";
                }
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