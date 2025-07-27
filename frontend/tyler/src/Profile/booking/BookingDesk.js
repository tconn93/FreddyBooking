import React, { useEffect, useState } from "react";
import Menu from "../../util/menu/Menu";
import WebUtils from "../../util/web/WebUtils";
import dayjs from "dayjs";
import BookingSlot from "./BookingSlot";

function BookingDesk(){

    const [artists,setArtists] = useState(undefined);
    const [availabilities,setAvailabilities] = useState(undefined)

    const [bookAvail,setBookAvail] = useState(undefined);
        useEffect(()=>{
            getArtist();
         
        },[]);

  

    async function getArtist(){
        let x = await WebUtils.getArtistWithAvail();
        if(x===undefined){
            alert('Issue geting Artist')
        } else{
            setArtists(x);
            getArtistAvail(x[0].id);
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

    function clickBook(date,time){
        let data = {date:date,time:time};
        setBookAvail(data);

    }

    function handleArtistChange(x){
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
                        <div className="bar">.</div>

                        {availabilities!==undefined && availabilities.map((avail)=>{
                           
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
                                        <BookingSlot status={avail.sunday} book={()=>clickBook(sunday,'AM')}/>
                                        <BookingSlot status={avail.monday} book={()=>clickBook(monday,'AM')}/>
                                        <BookingSlot status={avail.tuesday} book={()=>clickBook(tuesday,'AM')}/>
                                        <BookingSlot status={avail.wednesday} book={()=>clickBook(wednesday,'AM')}/>
                                        <BookingSlot status={avail.thursday} book={()=>clickBook(thursday,'AM')}/>
                                        <BookingSlot status={avail.friday} book={()=>clickBook(friday,'AM')}/>
                                        <BookingSlot status={avail.saturday} book={()=>clickBook(saturday,'AM')}/>
                                    </tr>
                                    <tr>
                                        <td>PM</td>
                                        <BookingSlot status={avail.sundayPM} book={()=>clickBook(sunday,'PM')}/>
                                        <BookingSlot status={avail.mondayPM} book={()=>clickBook(monday,'PM')}/>
                                        <BookingSlot status={avail.tuesdayPM} book={()=>clickBook(tuesday,'PM')}/>
                                        <BookingSlot status={avail.wednesdayPM} book={()=>clickBook(wednesday,'PM')}/>
                                        <BookingSlot status={avail.thursdayPM} book={()=>clickBook(thursday,'PM')}/>
                                        <BookingSlot status={avail.fridayPM} book={()=>clickBook(friday,'PM')}/>
                                        <BookingSlot status={avail.saturdayPM} book={()=>clickBook(saturday,'PM')}/>
                                    </tr>
                                </tbody>
                            </table>
                        
                         )})}

                </div>
                {bookAvail!==undefined &&(
                    <div className="bookForm">
                        <label>Date and Time</label><br></br>
                        {bookAvail.date.month()+1}/{bookAvail.date.date()} {bookAvail.time}
                        <br/>
                        <label>Name</label>
                        <br/>
                        <input type="text" ></input>
                        <br/>
                        <label>Email</label>
                        <br/>
                        <input type="text" />
                        <br />
                        <label>Phone</label>
                        <br />
                        <input type="text" />
                        <br />
                        <label>Description</label>
                        <br />
                        <input type="textArea"></input>
                    </div>
                )}


            </div>
        </div>
    </div>);
}

export default BookingDesk;