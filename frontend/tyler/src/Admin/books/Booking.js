import React, { useEffect, useState } from "react";
import BackButton from "../availability/BackButton";
import { useParams } from "react-router";
import WebUtils from "../../util/web/WebUtils";
import dayjs from "dayjs";

function Booking(){

    const [books,setBooks] = useState([])
    const {artistId} = useParams();

    useEffect(()=>{
    getBooks();
    },[])

    async function getBooks() {
        let x = await WebUtils.getBooks(artistId);
        if(x===undefined)
            alert('Issue getting Books');
        else
            setBooks(x);
    }

    async function deleteBook(bookId){
        let x = await WebUtils.deleteBook(bookId);
        if(x=== undefined)
            alert('Issue deleting Book')
        else{
            getBooks();
        }
    }



    return (<div className="AvailPage">
        <BackButton />
        <div className="editAvail">

            {books.length>0 && books.map((book)=>{
                
                let date = dayjs(book.date);

                let dateStr = (date.month()+1)+'/'+(date.date()+1)+'/'+date.year();

                return(<div key={book.id}>
                            <div>
                                <div className="sect">{dateStr} {book.time}</div>
                                <div className="sect">{book.name}</div>
                                <div className="sect">{book.email}</div>
                                <div className="sect">{book.phone}</div>
                                <div className="sect">{book.description}</div>
                                <div className="sect"><div style={{display:'inline'}} className="btn" onClick={()=>deleteBook(book.id)}>Delete</div></div>
                            </div>
                        </div>)
            })}

        </div>
    </div>)
}

export default Booking;

