import React, { useState } from 'react'
import Header from '../table/Header'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from "lucide-react"

import { Players } from '@/pages/player'
import { Teams } from '@/pages/team'
import { Match } from '@/pages/match'
import MatchRows from './MatchRows'


const Content = ({entries,columns,sorting,players,teams}:any) => {
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
                <MatchRows players={players} teams={teams} entry={entry} columns={columns}/>
            ))}
        </tbody>
    )
}

interface DataTableProps {
    data: Match[]
    onAdd: () => void
    players: Players[]
    teams: Teams[]
  }
  
  export function MatchTable({
    data,
    onAdd,
    players,
    teams
}: DataTableProps) {
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
                    key=""
                    entries={data} 
                    columns={columns} 
                    sorting={sorting}
                    players={players}
                    teams={teams}
                />
            </table>
        </div>
    )
}

export default MatchTable