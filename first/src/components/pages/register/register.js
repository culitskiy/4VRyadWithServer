import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './register.css';
import axios from 'axios';


export const Register = () => {

    const [userData, setUserData] = useState({
        login: '',
        email: '',
        password: ''
    });

    const changeLogin = (event) => {
        setUserData({...userData, login: event.target.value});
       
    };
    const changeEmail = (event) => {
        setUserData({...userData, email: event.target.value});
        
    };
    const changePassword = (event) => {
        setUserData({...userData, password: event.target.value});
        
    };
    
    const checkEmail = () => {
        const re =/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        const valid = re.test(userData.email);
       
        if(valid){
            return valid;
        }else return valid;
      

    };
    const sendUserData = () => {
        const valid = checkEmail();
        if(valid && userData.password !== ''){
        axios.post('http://localhost:5000/register', {"login": userData.login, "email": userData.email, "password": userData.password}).then((resp) => {
            return alert(resp.data.status +  'Now you can enter!');
        });
        setUserData({
            login: '',
            email: '',
            password: ''
        });
    }else alert('data is not true!!!');
    };

    return(
        <div className='enter'>
            <input onChange={changeLogin} placeholder='Enter your name' value={userData.login}/>
            <input type='email' required onChange={changeEmail} placeholder='Enter your email' value={userData.email}/>
            <input onChange={changePassword} placeholder='Enter yor password' value={userData.password}/>
            <input type="button" onClick={sendUserData} value='register'/>
            <Link to={{pathname:'/'}}>Enter</Link>
        </div>
    )
}