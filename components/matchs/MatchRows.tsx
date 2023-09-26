import React from 'react'

function MatchRows({entry,columns}:any) {
  return (
    <tr key={entry.id}>
        {columns.map((column:any) => (
            <td key={column}>{entry[column]}</td>
        ))}
        <td>
            
        </td>
    </tr>
  )
}

export default MatchRows