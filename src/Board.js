import React, { Component } from 'react'
import Cell from './Cell'

const Board = props => {
  return (
    <div>
      <table className='board'>
        <tbody>
          {props.grid.map((row, yCoord) => (
            <tr key={yCoord}>
              {row.map((cell, xCoord) => (
                <Cell key={xCoord}
                  status={props.grid[yCoord][xCoord]}
                  handleClick={() => props.toggleCell(xCoord, yCoord)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Board
