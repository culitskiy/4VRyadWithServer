import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './profile.css';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export const Profile = () => {
    const [playerName, setPlayerName] = useState();
    const [profile, setProfile] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/initialPlayer', {withCredentials: true}).then((resp) => {
            setPlayerName(resp.data);
        });
    },[]);

    const exitProfile = () => {
        axios.post('http://localhost:5000/exitProfile',{}, {withCredentials: true}).then((resp) => {
            setProfile(resp.data);
            socket.emit('updateRooms');
        });
        };

    if(profile === false){
        return <Redirect to='/'/>
    }
        return(
        <div className='profile'>
            {playerName}
            <button onClick={exitProfile}>Exit</button>

        </div>
    )
}