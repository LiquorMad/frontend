import React, { useState } from 'react'
import Header from './Header'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowUpDown, MoreHorizontal,Plus } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


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
                <tr key={entry.id}>
                    {columns.map((column:any) => (
                        <td key={column}>{entry[column]}</td>
                    ))}
                    <td>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>handleDelete(match.id)}>Delete</DropdownMenuItem>
                                <DropdownMenuItem>Update</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </td>
                </tr>
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
    const columns = ['id','nome','player_1','player_2','time_1','time_2']

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