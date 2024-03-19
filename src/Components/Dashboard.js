import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const DashBoard = ()=>{

    const[joke,setJoke] = useState("");
    const[user,setUser] = useState({});
    const {token,setToken} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(token === ""){
            let token_from_local_storage = localStorage.getItem("token");
            if(token_from_local_storage){
                setToken(token_from_local_storage);
            }else{
                navigate("/")
            }
        }
    },[])

    useEffect(()=>{
        getUserDetails();
    },[])

    async function getUserDetails(){
        try {
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                Authorization: `Bearer ${token}`
            }})
            setUser(response.data.data.user);
        } catch (error) {
            alert(error.data.response.message)
        }
    }

    async function getJoke(){
        try {
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                Authorization: `Bearer ${token}`
            }})
            setJoke(response.data.data.message);
        } catch (error) {
            alert(error.data.response.message);
        }
    }

    async function implementLogOut(){

        try {
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setJoke("");
            setUser({});
            setToken("");
            localStorage.removeItem("token");
            alert("User logged out successfully");
            navigate("/");
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return(
        <div>
            <h1>DashBoard</h1>
            <h2>Welcome {user.name}!!</h2>
            <h3>Email : {user.email}</h3>
            {
                joke && <p>{joke}</p>
            } 
            <button onClick={getJoke}>Get joke</button>
            
            <button onClick={implementLogOut}>Log Out</button>    
        </div>
    )
}


export default DashBoard;