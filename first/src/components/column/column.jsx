import React from 'react';
import './column.css';
import { Cell } from '../cell/cell';

export const Column = ({column, clickCell, idCol, idRoom}) => {
    const cell = column.map((el, index) => {
        return(
            <div className='column'>
            <Cell cell={el} idCell={index} key={index} idCol={idCol} idRoom={idRoom} clickCell={clickCell}/>
            </div>
        )
    })
    return(
        <div >
            {cell}
        </div>
    )
}