import Link from 'next/link';
import { columns } from "./columns"
import { DataTable } from "./data-table"

type Players = {
  id: number,
  nome: string,
  apelido: string,
  created_at: string,
  updated_at: string
}
type PlayersProps = {
  players: Players[],
  text:string
}

export async function getStaticProps(){

  const data = await fetch('http://127.0.0.1:3333/api/players');
  const players = await data.json()

  return {
    props: { players,text:'Players'},
  }

}

export default function Player({ players,text }: PlayersProps){
  return(
    <div >
      <h1>{text}</h1>

      <Link href="/player/create">Register</Link>
      
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={players} />
      </div>
    </div>
  ) 
}