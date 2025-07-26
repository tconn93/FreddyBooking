import React,{useState} from "react";
import WebUtils from "../util/web/WebUtils";
import { useNavigate} from "react-router-dom";


function AdminLogin(props){
    let [email,setEmail] = useState('');
    let [pword,setPword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handlePwordChange = (event) =>{
        setPword(event.target.value);
    }

    async function handleLogin(){ 
        let x =  await WebUtils.login(email,pword);
        try{
           
            if(x.response===400)
                alert('Invalid Credentials')
            else if(x.response===200)
                navigate('/admin/'+x.artist.id)
        }catch(error){
            alert('Invalid Login');
        }
        }

return (
    <div>
        <p>Please login</p>
        <form  id="loginF" name="loginForm" >
        <label>Email</label>
        <input name="email" type="text" value={email} onChange={handleEmailChange} />
        <label>Password</label>
        <input name="pword" type="password" value={pword} onChange={handlePwordChange}/>

        <div 
        style={{margin:'auto',border:'1px black solid', width:'100px',textAlign:'center'}}
        onClick={handleLogin}
        >Login</div>
        </form>
    </div>
)

}

export default AdminLogin;


