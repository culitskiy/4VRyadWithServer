import React,{useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { Room } from './room/room';
import axios from 'axios';
import './rooms.css';
import io from 'socket.io-client';
import { Profile } from '../../profile/profile';

const socket = io.connect('http://localhost:5000');

export const Rooms = (props) => {
    
    const [player, setPlayer] = useState()
    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5000/initialRooms',{withCredentials: true}).then((resp) => {
        
            if (resp.data !== false && resp.data.player){
                
                setRooms(resp.data.data);
                setPlayer(resp.data.player) ;
            }else {
                
                setPlayer(false);
            }
            
           
        });
        socket.on('updateRoom', () => {
        
            axios.get('http://localhost:5000/initialRooms',{withCredentials: true}).then((resp) => {
    
                setRooms(resp.data.data);
                
            });
        });
    

        return () => socket.close();
    },[]);
    
    const addRoom = () => {
        axios.post('http://localhost:5000/addRoom').then((resp) => {

            socket.emit('updateRooms', {
                my: 'rooms is update'
            });
            
        });
    };
   
    const elements = rooms.map((item, index) => <Room  key={item._id} data={item} playerName={player} />)
    
    if(player === false) {
        return <Redirect to={{pathname:'/'}}/>
    }
    return(
        <div className='rooms'>
            <Profile name={player}/>
            <button onClick={addRoom}>Add room</button>
            {elements}
        </div>
    )
}