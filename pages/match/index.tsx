import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

type Match = {
  id:number
  nome: string
  golos_p1: number
  golos_p2: number
  player_1: string
  player_2: string
  time_1: string
  time_2: string
  } 
type MatchProps ={
    match:Match[],
    text: string
}
export async function getStaticProps(){

  const data = await fetch('http://127.0.0.1:3333/api/partidas');
  const match = await data.json()

  return {
    props: { match,text:'Matchs'},
  }

}

export default function Match({ match,text }:MatchProps){
  return(
    <>
      <h1>{text}</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={match} type={text}/>
      </div>
    </>
  ) 
}