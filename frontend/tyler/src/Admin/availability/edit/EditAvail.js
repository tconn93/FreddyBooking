import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "../BackButton";
import dayjs from "dayjs";
import WebUtils from "../../../util/web/WebUtils";
import '../../Admin.css';
import EditSlot from "./EditSlot";
import {  useNavigate } from "react-router-dom";



function EditAvail(props){
    const navigate = useNavigate();

    const [artist,setArtist] = useState(undefined);
    const [avails,setAvails] = useState(undefined);
    const today = dayjs();
    const startDay = today.subtract(6,'day');
    const endDate = startDay.add(6,'month');
    const sundays = [];
    let currentDay = startDay;
    const {artistId} = useParams();

    const [sunday,setSunday] = useState('');
    const [monday, setMonday] = useState('');
const [tuesday, setTuesday] = useState('');
const [wednesday, setWednesday] = useState('');
const [thursday, setThursday] = useState('');
const [friday, setFriday] = useState('');
const [saturday, setSaturday] = useState('');
const [sundayPM, setSundayPM] = useState('');
const [mondayPM, setMondayPM] = useState('');
const [tuesdayPM, setTuesdayPM] = useState('');
const [wednesdayPM, setWednesdayPM] = useState('');
const [thursdayPM, setThursdayPM] = useState('');
const [fridayPM, setFridayPM] = useState('');
const [saturdayPM, setSaturdayPM] = useState('');




    while(currentDay.isBefore(endDate)|| currentDay.isSame(endDate,'day' )){
        if(currentDay.day()===0){
            sundays.push(currentDay)
        }
        currentDay = currentDay.add(1,'day');
    }




    const [beginOfWeek,setBeginOfWeek] = useState((sundays[0].month()+1)+'/'+sundays[0].date()+'/'+sundays[0].year())



    useEffect(()=>{
getAvails()

    },[])


    async function getAvails(){
        let x = await WebUtils.getAvails(artistId);
        if(x === undefined){
            alert('Error with Avails')
        }else{
            setAvails(x.avails);
            setArtist(x.artist);
        }
    }



    async function save() {

        let avail = {
            beginOfWeek:beginOfWeek,
            artistId:artistId,
            sunday:sunday,
            monday:monday,
            tuesday:tuesday,
            wednesday:wednesday,
            thursday:thursday,
            friday:friday,
            saturday:saturday,
            sundayPM:sundayPM,
            mondayPM:mondayPM,
            tuesdayPM:tuesdayPM,
            wednesdayPM:wednesdayPM,
            thursdayPM:thursdayPM,
            fridayPM:fridayPM,
            saturdayPM:saturdayPM
        }

        let x = await WebUtils.saveAvail(avail,artistId);

        if(x===undefined){
            alert('Issue with Saving')
        }else{
            navigate(-1);
        }

    }

    


 

    const loading = () =>{

        return <div>

        </div>
    }

    if(artist===undefined)
        return loading();
    else      
    return(
        <div className="AvailPage">
            <BackButton />
            <div className="editAvail">
                <div className="editWeek">
                <label>Pick the week</label>
                <select onChange={(e)=>setBeginOfWeek(e.target.value)}>
                    {sundays.map((sun)=>{
                     

                    return (<option key={(sun.month()+1)+'/'+sun.date()+'/'+sun.year()} value={(sun.month()+1)+'/'+sun.date()+'/'+sun.year()}> {sun.month()+1}/{sun.date()}/{sun.year()}</option>)
                    })}
                </select>

                </div>
                <table className="editTable">
                    <tbody>      
                    <tr>
                        <td>Sunday</td>
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wednesday</td>
                        <td>Thursday</td>
                        <td>Friday</td>
                        <td>Saturday</td>
                    </tr>
                    <tr>
                        <EditSlot setAtt={(x) => setSunday(x)} day="sunday" />
                        <EditSlot setAtt={(x) => setMonday(x)} day="monday" />
                        <EditSlot setAtt={(x) => setTuesday(x)} day="tuesday" />
                        <EditSlot setAtt={(x) => setWednesday(x)} day="wednesday" />
                        <EditSlot setAtt={(x) => setThursday(x)} day="thursday" />
                        <EditSlot setAtt={(x) => setFriday(x)} day="friday" />
                        <EditSlot setAtt={(x) => setSaturday(x)} day="saturday" />
                    </tr>
                    <tr>
                        <EditSlot setAtt={(x) => setSundayPM(x)} day="sundayPM" />
                        <EditSlot setAtt={(x) => setMondayPM(x)} day="mondayPM" />
                        <EditSlot setAtt={(x) => setTuesdayPM(x)} day="tuesdayPM" />
                        <EditSlot setAtt={(x) => setWednesdayPM(x)} day="wednesdayPM" />
                        <EditSlot setAtt={(x) => setThursdayPM(x)} day="thursdayPM" />
                        <EditSlot setAtt={(x) => setFridayPM(x)} day="fridayPM" />
                        <EditSlot setAtt={(x) => setSaturdayPM(x)} day="saturdayPM" />
                    </tr>
                    </tbody>

                </table>

                <div>
                    <h2 onClick={save}>Save</h2>
                </div>
            </div>
        </div>
    )
}

export default EditAvail;

