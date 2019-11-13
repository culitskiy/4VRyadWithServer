import React from 'react'; 
import { Column } from '../column/column';
import './table.css';

export const Table = ({table, player, clickCell}) => {

    const elemnts = table.map((el, index) => <Column column={el} idCol={index} idRoom={el.idRoom} key={index} clickCell={clickCell}/>  )

    return(

        <div className='table'>   
            {elemnts}
        </div>
    )
}
