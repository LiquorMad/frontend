'use client'
import React, { useState } from 'react'
import Header from './Header'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, FileEdit, Plus, Trash2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { DeletePlayer } from '@/lib/CRUD'
import PlayersComponent from './PlayersComponent'
import { Players } from '@/pages/player'
  
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
                <PlayersComponent entry={entry} columns={columns}/>
            ))}
        </tbody>
    )
}

interface DataTableProps {
    data: Players[]
    onAdd: () => void
  }
  
  export function PlayersTable({
    data,
    onAdd,
}: DataTableProps) {
    const columns = ['id','nome','apelido']

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

export default PlayersTable