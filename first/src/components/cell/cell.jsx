import React from 'react';
import './cell.css';

export const Cell = ({cell, clickCell, idCell, idCol, idRoom}) => {
    const cellClass = cell === 1 ? 'cell-first': cell === 2 ? 'cell-second': "";
    return(
        <div className={`cell ${cellClass}`} onClick={() => clickCell(idCol, idCell, idRoom)}>
   
        </div>
    )
}