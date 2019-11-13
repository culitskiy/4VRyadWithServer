import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './room.css';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export const Room = ({data, playerName}) => {

    const [roomData, setRoomData] = useState([]);
 

   const addPlayer = () => {
        if(data.player1Name === '' || data.player2Name === ''){
            axios.post('http://localhost:5000/enterTheRoom', {
                idRoom: data.idRoom
            }, {
                withCredentials: true
            }).then((resp) => {
                socket.emit('updateRooms');
                return;
            });
        }else return;
   };

   const deleteRoom = (idRoom) => {
       axios.post('http://localhost:5000/deleteRoom', {
           idRoom: idRoom
       },{
           withCredentials: true
       }).then((resp) => {
            
           socket.emit('updateRooms');
           
           return;
       });
   };
   
  // How many people in the room
    let roomClass;
    if (data.player1Name !== '' && data.player2Name === ''){
        roomClass = 'room1';
    }else if(data.player1Name === '' && data.player2Name !== ''){
        roomClass = 'room1';
    }else if(data.player1Name.length > 2 && data.player2Name.length > 2){
        roomClass = 'room2';
    }else{roomClass = 'room'};

    // can enter and delete the room
    const buttons = () =>{
       
        if(data.player1Name === '' || data.player2Name === ''
         || data.player1Name === playerName || data.player2Name === playerName){
             return ( 
                 <>
                    <button onClick={() => deleteRoom(data.idRoom)} className='button'>Delete</button>
                    <button onClick={() => addPlayer()} className='button'><Link  to={{
                        pathname:'/game',
                        'state': {...data}
                        }} >Enter</Link></button>
                 </>
             )
         }
    } 

    return(
        <>
        {data.player1Name + " " + data.player2Name}
        <div className={roomClass}>room
            {buttons()}
        </div>
        </>
    )
}