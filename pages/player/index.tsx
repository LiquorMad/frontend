import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { loadPlayers } from '../../lib/load-players'

type Players = {
  id: number,
  nome: string,
  apelido: string,
}
type PlayersProps = {
  players: Players[],
  text:string
}
 
// This function runs only on the server side
export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const players = await loadPlayers()
  // Props returned will be passed to the page component
  return {
    props: { players,text:'Players'},
  }
}

export default function Player({ players,text }: PlayersProps){
  return(
    <div >
      <h1>{text}</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={players} type={text} />
      </div>
    </div>
  ) 
}