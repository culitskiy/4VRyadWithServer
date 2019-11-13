import React from 'react';
import './gameOver.css';
import { Profile } from '../../profile/profile';
export const GameOver = (props) => {
    
    return(
        <>
        <Profile/>
        <div className='gameOver'>
            Loooooooser is {props.location.looser}
        </div>
        </>
        )
}