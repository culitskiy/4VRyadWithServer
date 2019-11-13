import React,{useState, } from 'react';
import './enter.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

export const Enter = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        canEnter: null,
        error:null
    });

    const changeEmail = (event) => {

        setUserData({...userData, email: event.target.value});
    };
    
    const changePassword = (event) => {

        setUserData({...userData, password: event.target.value});
    };
    const sendData = () => {
        Axios.post('http://localhost:5000/enterData', {"email": userData.email, "password": userData.password},{withCredentials: true}).then((resp) => {
       
        setUserData({...userData, canEnter: resp.data, error: resp.data.error});
        
        
        });
    };
    if(userData.canEnter === true){
        localStorage.setItem('player', userData.email);
        return <Redirect to={{pathname:'/rooms', state: userData.email}}/>
    }else if(userData.error !== null) {
        alert(userData.error);
    }

    return(
        <div className='enter'>
            <input onChange={changeEmail} value={userData.email} placeholder='Enter your email'/>
            <input onChange={changePassword} placeholder='Enter yor password'/>
            <button><Link onClick={sendData} to={{
                pathname:'/',
                state: {...userData}
                }} >Enter</Link></button>
            <Link to={{pathname:'/register'}}>Register</Link>
        </div>
    )
}