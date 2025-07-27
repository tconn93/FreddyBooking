import React, { useEffect, useState } from "react";
import Menu from "../../util/menu/Menu";
import WebUtils from "../../util/web/WebUtils";
import dayjs from "dayjs";

function BookingDesk(){

    const [artists,setArtists] = useState(undefined);
    const [selArtist,setSelArtist] = useState(undefined);
    const [availabilities,setAvailabilities] = useState(undefined)
        useEffect(()=>{
            getArtist();
        },[]);

        useEffect(()=>{

            if(selArtist!==undefined)
                getArtistAvail(selArtist);
        },[]);


    async function getArtist(){
        let x = await WebUtils.getArtistWithAvail();
        if(x===undefined){
            alert('Issue geting Artist')
        } else{
            setArtists(x);
            setSelArtist(x[0].id);
        }
    }


    async function getArtistAvail(artistId) {
        
        let x = await WebUtils.getAvails(artistId);
        if(x=== undefined){
            alert('Issue getting Artist Availability')
        }else {
            setAvailabilities(x.avails);
        }
    
    }



    function handleArtistChange(x){
        setSelArtist(x);
        setAvailabilities(undefined)
        getArtistAvail(x);

    }




    if(artists===undefined){
        return(<div>
            <Menu />
            <div className="page">
                <div className="profile">
                    <h3>Loading ...</h3>
                </div>
            </div>
        </div>)

    }else
    return (<div>
        <Menu />
        <div className="page">
            <div className="profile">
                <h1>Booking </h1>

                <div className="form">
                    <label>Select Artist:</label>
                    <select onChange={(e)=> handleArtistChange(e.target.value)}>
                        {artists.map((artist)=>{

                            return(<option key={artist.id} value={artist.id}>{artist.name}</option>)
                        })}
                    </select>

                </div>
                <div className="cal-Booking">
                        <table>
                            <tbody>
                            <tr>
                                        <td>Time</td>
                                        <td>Sunday</td>
                                        <td>Monday</td>
                                        <td>Tuesday</td>
                                        <td>Wednesday</td>
                                        <td>Thursday</td>
                                        <td>Friday</td>
                                        <td>Saturday</td>
                                    </tr>
                            </tbody>
                        </table>

                        {selArtist!==undefined&&availabilities!==undefined && availabilities.map((avail)=>{
                           
                           let sunday = dayjs(avail.beginning_of_week);
                           sunday = sunday.add(1,'day');
                           let monday = sunday.add(1,'day');
                           let tuesday = sunday.add(2,'day');
                           let wednesday = sunday.add(3,'day');
                           let thursday = sunday.add(4,'day');
                           let friday = sunday.add(5,'day');
                           let saturday = sunday.add(6,'day');
                           return(
                           <table key={avail.id}>
                                <tbody>
                                   
                                    <tr>
                                        <td>AM/PM</td>
                                        <td>{sunday.month()+1}/{sunday.date()}</td>
                                        <td>{monday.month()+1}/{monday.date()}</td>
                                        <td>{tuesday.month()+1}/{tuesday.date()}</td>
                                        <td>{wednesday.month()+1}/{wednesday.date()}</td>
                                        <td>{thursday.month()+1}/{thursday.date()}</td>
                                        <td>{friday.month()+1}/{friday.date()}</td>
                                        <td>{saturday.month()+1}/{saturday.date()}</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>AM</td>
                                        <td>{avail.sunday}</td>
                                        <td>{avail.monday}</td>
                                        <td>{avail.tuesday}</td>
                                        <td>{avail.wednesday}</td>
                                        <td>{avail.thursday}</td>
                                        <td>{avail.friday}</td>
                                        <td>{avail.saturday}</td>
                                    </tr>
                                    <tr>
                                        <td>PM</td>
                                        <td>{avail.sundayPM}</td>
                                        <td>{avail.mondayPM}</td>
                                        <td>{avail.tuesdayPM}</td>
                                        <td>{avail.wednesdayPM}</td>
                                        <td>{avail.thursdayPM}</td>
                                        <td>{avail.fridayPM}</td>
                                        <td>{avail.saturdayPM}</td>
                                    </tr>
                                </tbody>
                            </table>
                        
                         )})}

                </div>


            </div>
        </div>
    </div>);
}

export default BookingDesk;