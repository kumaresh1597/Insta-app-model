import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import instalogo from "../images/instalogo.png";

const SignUp = ()=>{

    const [user, setUser] = useState({name:"", email: "", password: "", confirmPassword: ""})
    let{name,email,password,confirmPassword} = user;

    const navigate = useNavigate();
    const {setToken} = useContext(UserContext);

    function updateInput(e){
        let x = e.target.name
        setUser({...user,  [x]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(!name || !email || !password || !confirmPassword){
            alert("Please fill all the feilds");
            return;
        }
        if(password !== confirmPassword){
            alert("Password and confirm password should be same");
            return;
        }

        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{name,email,password})
            setToken(response.data.data.token)
            setUser({name:"", email: "", password: "", confirmPassword: ""});
            localStorage.setItem("token",response.data.data.token);
            alert("User registered successfully");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
        }

    }

    return(
        <div className='sign-up-div'>
            <div className='logo'>
                <img src={instalogo}/>
            </div>
            <div style={{width:"100%",display:"flex", justifyContent:"center"}}>
                <p className='intro-text'>Sign up to see photos and videos from your friends.</p>
            </div>
            <div className='enter-data-sign-up'>
                <form className='input-div' onSubmit={handleSubmit}>
                    <input type='text' placeholder='Name' name='name' onChange={updateInput} value={name}/>
                    <input type='email' placeholder='Email' name='email' onChange={updateInput} value={email}/>
                    <input type='password' placeholder='Password' name='password' onChange={updateInput} value={password}/>
                    <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={updateInput} value={confirmPassword}/>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button className='log-in-btn' type='submit'>Sign-up</button> 
                    </div> 
                </form>
            </div>           
        </div>
    )
}


export default SignUp;
