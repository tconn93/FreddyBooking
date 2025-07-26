import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "../availability/BackButton";
import WebUtils from "../../util/web/WebUtils";


function OtherArtist(){
    const [others, setOthers] = useState(undefined);
    const [newEmail,setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newIsOwner,setNewIsOwner] = useState('N');
    const [newPword, setNewPword] = useState('');
    const [othDisplay,setOthDisplay] = useState(true);
            useEffect(()=>{
                    getOthers();
            },[othDisplay]);
    const {artistId} = useParams();
    async function getOthers() {
        let x = await WebUtils.getOthers();
        if(x===undefined){
            alert('Error getting others')
        }else
        setOthers(x);
    }
    async function saveNewArtist() {
        let newArtist ={email:newEmail,
            pword:newPword,
            name:newName,
            isOwner:newIsOwner
        }
        let x = await WebUtils.saveNewArtist(newArtist);
        if(x===undefined) alert('Error saving New Artist');
        else{
            setNewEmail('');
            setNewIsOwner('N');
            setNewName('');
            setNewPword('');
            setOthDisplay(!othDisplay); } 
    }
    const toggleDisplay = () => {
        setOthDisplay(!othDisplay);
    }
    const SaveButton = ()=>{
        return <h2 onClick={()=>saveNewArtist()}>Save New Artist</h2>
    }
    return (<div className="AvailPage">
                <BackButton />
                <div className="editAvail">
                    {othDisplay && (
                    <div className="OtherList"  >
                    {others!== undefined && others.map((other)=>{
                        if(''+other.id=== artistId){
                            return <div key={other.id}></div>
                        }
                        return (<div key={other.id}>
                                    {other.name}  - {other.email}  {other.isOwner && 'Owner'}
                                </div>)
                    })}
                    </div>
                    )}
                    {!othDisplay && (
                        <div className="OtherList">
                            <form>
                                <div>
                                    <label>Email</label>
                                    <input type="text" name="email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Name</label>
                                    <input type="text" name="name" value={newName} onChange={(e)=> setNewName(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type="password" name="pword" value={newPword} onChange={(e)=> setNewPword(e.target.value)}/>
                                </div>
                                <div>
                                    <label>is Owner?</label>
                                    <input type="radio" name="isOwner" 
                                    value={'Y'} onChange={(e)=>setNewIsOwner(e.target.value)}
                                    /> Yes
                                    <input type="radio" name="isOwner" 
                                    value={'N'} onChange={(e)=>setNewIsOwner(e.target.value)}
                                    checked
                                    />No
                                </div>      
                            </form>
                        </div>
                    )}
                    <div>
                        <h2 onClick={toggleDisplay}>
                            {othDisplay ?'Add New Artist':'Cancel'}
                            {!othDisplay &&<SaveButton />}
                            </h2>
                    </div>
                </div>
             </div>);
}

export default OtherArtist;