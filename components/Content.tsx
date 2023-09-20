import { Players } from "@/pages/player"

interface ContentProps {
    entries: Players[]
    //type:string
    columns: string
    sorting: {column: string, order: string}
  }
  
 
const Content = ({entries,columns,sorting}:any) => {
    if(sorting.order === 'asc'){
        const sorted = [...entries].sort((a,b) =>
        a[sorting.column] > b[sorting.column] ? 1 : -1)
        entries = sorted
    }if(sorting.order === 'desc'){
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
                </tr>
            ))}
        </tbody>
    )
}

export default Content