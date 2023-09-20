import React from 'react'

const Columns = ({column,entry}:any) => {
  return (
    <td key={column}>{entry[column]}</td>
  )
}

export default Columns