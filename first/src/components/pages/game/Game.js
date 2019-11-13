import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './Game.css';
import { Table } from '../../table/table';
import {clickCellFunc, animation} from './func';
import {Redirect} from 'react-router-dom';
import io from 'socket.io-client';
import { Profile } from '../../profile/profile';

const socket = io('http://localhost:5000');

function Game(props) {
  const playerName = localStorage.getItem('player');
  const [data, setData] = useState();
  const [animationData, setAnimationData] = useState([false,0]);
 
  useEffect(() => {
  
      axios.get('http://localhost:5000/gameData', {withCredentials: true}).then((resp) => {
      setData(resp.data);
       
    });
    
  },[]);
  useEffect(() => {
    

    socket.on('updateGame',async (dataSocket) => {
     
        setAnimationData([true, dataSocket.idCol]);
      
    });
    return () => socket.close();
  }, []);

  if(animationData[0] === true){
    animation(animationData[1], data, setData, setAnimationData, axios, playerName);
  }

  const clickCell = (idCol, idCell) => {
    if (data.canClick === true && !data.winner 
      && (playerName === data.player1Name && data.player === 1
        || playerName === data.player2Name && data.player === 2)) {
      const idRoom = data.idRoom;
    
      clickCellFunc(idCol, idCell, axios, data, setData, idRoom, playerName );
     
      const player = localStorage.getItem('player');
      socket.emit('clickGame',{idCell: idCell, idCol: idCol, player: player });
    } else {
      return
    }
    
  };
  
  const restart = () => {
    axios.post('http://localhost:5000/restart',{idRoom: data.idRoom}).then((resp) => {

      setData(resp.data);
     
    });
  };
  const exitRoom = () => {
    axios.post('http://localhost:5000/exitRoom', {idRoom: data.idRoom }, {withCredentials: true}).then((resp) => {
    setData('exit');
    socket.emit('updateRooms');
    });
  };
  
  
if(!data || data === 1){
  console.log('!!!!!!!!!!!!!!!!!1');
  return <div>
    Reboot page
  </div>
}if(data === 'error'){
  return <Redirect to='/'/>
}if(data === 'exit') {
  return <Redirect to='/rooms'/>
}if(data.winner !== ''){
  let looser;
  if(data.winner === '2'){
    looser = data.player2Name
  }if(data.winner === '1'){
    looser = data.player1Name
  }

  return <Redirect to={{pathname:'/gameOver',looser: looser}}/>
}
  return (
    <div className='game'>
      <Profile/>
      <button className='exit' onClick={exitRoom}>Exit the room</button>
      <div className="app">
      <button onClick={restart}>restart</button>
      <Table player={data.player} table={data.gameTable} clickCell={clickCell}/>
      </div>
    </div>
    
  );
}


export default Game;

