import React, { useEffect, useState } from "react";
import BackButton from "../availability/BackButton";
import { useNavigate, useParams } from "react-router";
import WebUtils from "../../util/web/WebUtils";
import dayjs from "dayjs";

function BookRequest(){
    const {artistId} = useParams();
    const [bookReq,setBookReq] = useState([]);
    const navigate = useNavigate();

                useEffect(()=>{
                    getBookRequest();
                },[]);

    async function getBookRequest() {
        let x = await WebUtils.getBookingRequest(artistId);
        if(x===undefined)
            alert('Issue getting book requests')
        else
            setBookReq(x);
    }
    async function confirmBooking(bookId) {
        let x = await WebUtils.confirmBook(bookId);
        if(x===undefined){
            alert('Issue confirming Book')
        }else{
            getBookRequest();   }
    }
    async function deleteBooking(book) {
        let x = await WebUtils.deleteBookRequest(book.id);
        if(x===undefined){
            alert('Issue Deleting Book Request')
        }else {
            getBookRequest();  }
    }

    return(<div className="AvailPage">
            <BackButton />
            <div className="editAvail">

                {bookReq.length>0 && bookReq.map((book)=>{
                    let date = dayjs(book.date);
                    return(<div key={book.id}>
                        <div style={{width:'100%'}}>
                        <div className="sect">{book.name}</div><div className="sect">{book.email}</div><div className="sect">{date.month()+1}/{date.date()+1}/{date.year()} {book.time}</div><div className="sect">{book.phone}</div>
                        </div>
                        <div style={{textAlign:'center'}}>
                        <div className="btn"
                            onClick={()=>confirmBooking(book.id)}
                        >Book</div> <div className="btn"
                            onClick={()=>deleteBooking(book)}
                            >Delete</div>
                        </div>
                        </div>)
                })}


            </div>

    </div>);
}

export default BookRequest;