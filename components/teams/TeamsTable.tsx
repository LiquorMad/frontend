import React, { useState } from 'react'
import Header from '../table/Header'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from "lucide-react"


import TeamsRows from './TeamsRows'

const Content = ({entries,columns,sorting}:any) => {
    if(sorting.order === 'desc'){
        const sorted = [...entries].sort((a,b) =>
        a[sorting.column] > b[sorting.column] ? 1 : -1)
        entries = sorted
    }if(sorting.order === 'asc'){
        const sorted = [...entries].sort((a,b) =>
        a[sorting.column] > b[sorting.column] ? -1 : 1)
        entries = sorted
    }
    
    return (
        <tbody>
            {entries.map((entry:any) =>(
                <TeamsRows key={entry.id} entry={entry} columns={columns}/>
            ))}
        </tbody>
    )
}

interface DataTableProps<TData> {
    data: TData[]
    onAdd: () => void
  }
  
  export function TeamsTable<TData>({
    data,
    onAdd
}: DataTableProps<TData>) {
    const columns = ['id','nome']

    const sortTable = (newSorting:any) => {
        setSorting(newSorting)
    }
    const [sorting, setSorting] = useState({column: "id", order: "desc"})
    
    return (
        <div>
           <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          className="max-w-sm"
        />
        <Button onClick={onAdd} variant="outline" className="mx-1" >
        <Plus className="mr-2 h-4 w-4" /> New
        </Button>
      </div>
            <table>
                <Header 
                    columns={columns} 
                    sorting={sorting} 
                    sortTable={sortTable}
                />
                <Content 
                    entries={data} 
                    columns={columns} 
                    sorting={sorting}
                />
            </table>
        </div>
    )
}

export default TeamsTable