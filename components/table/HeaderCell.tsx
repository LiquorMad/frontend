import React from 'react'


const HeaderCell = ({column, sorting,sortTable}:any)=>{

    const isDescSorting = sorting.column === column && sorting.order === "desc" 
    const isAscSorting = sorting.column === column && sorting.order === "asc" 
    const futureSortingOrder = isDescSorting ? 'asc' : 'desc'
    return (
        <>
            <th key={column} onClick={()=>sortTable({column, order: futureSortingOrder})}>
                {column.trim().split('_').map((word:string) => {
                    return word[0].toLocaleUpperCase().concat(word.substring(1))
                }).join(' ')}
                {isDescSorting && <span>&uarr;</span>}
                {isAscSorting && <span>&darr;</span>}
            </th>
        </>
    )
}

export default HeaderCell