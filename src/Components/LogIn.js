import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import instalogo from "../images/instalogo.png";

const LogIn = ()=>{

    const [user, setUser] = useState({email: "", password: ""})
    let{email,password} = user;

    const navigate = useNavigate();

    const {token,setToken} = useContext(UserContext);

    useEffect(()=>{
        if(token || localStorage.getItem("token")){
            navigate("/dashboard");
        }
    },[])

    function updateInput(e){
        let x = e.target.name
        setUser({...user,  [x]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(!email || !password){
            alert("Please fill all the feilds");
            return;
        }

        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{email,password})
            setToken(response.data.data.token)
            setUser({email: "", password: ""});
            localStorage.setItem("token",response.data.data.token);
            alert("User Logged in successully");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
        }

    }

    return (
        <div className='log-in-div'>
            <div className='logo'>
                <img src={instalogo}/>
            </div>
            <div className='enter-data'>
              <form className='input-div' onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' name='email' onChange={updateInput} value={email}/>
                <input type='password' placeholder='Password' name='password' onChange={updateInput} value={password}/>
                <div style={{display:"flex", justifyContent:"center"}}>
                <button className='log-in-btn' type='submit'>LogIn</button> 
                </div>                             
              </form>
            </div>
            <div className='sign-up-option'>
                <p>Don't have an account? <Link className='sign-up-link' to={"/signUp"}>Sign up</Link></p>
            </div> 
        </div>
    )
}


export default LogIn;