import React from 'react'


const Cell = props => {
  return (
    <td className={props.status ? 'alive' : 'dead'}
      onClick={props.handleClick}></td>
  )
}

export default Cell
