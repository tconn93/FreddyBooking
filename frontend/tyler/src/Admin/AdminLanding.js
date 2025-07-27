import React,{useEffect, useState} from "react";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";


function AdminLanding(props){

    let [admin,setAdmin] = useState(undefined);

   

   

    


return (admin!== undefined 
                ?   <Admin artist={admin} 
                        isMobile={props.isMobile} 
                        setAdmin={(x)=> setAdmin(x)} 
                        />
                :   <AdminLogin 
                        />)
}

export default AdminLanding;


