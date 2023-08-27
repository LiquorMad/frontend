import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { columns } from "./columns"
import { DataTable } from "../player/data-table"

type Match = {
    id: number,
    nome: string,
    id_player1: number,
    id_time1: number,
    id_player2: number,
    id_time2: number,
    estado: string,
    created_at: string,
    updated_at: string
  }
type MatchProps ={
    match:Match[],
    text: string
}
export async function getStaticProps(){

  const data = await fetch('http://127.0.0.1:3333/api/partidas');
  const match = await data.json()

  return {
    props: { match,text:'Match'},
  }

}

export default function Match({ match,text }:MatchProps){
    console.log(match)
const router = useRouter();
  useEffect(() => {
  }, [router.query]);
  
  return(
    <>
    
      <h1>Match</h1>
      <Link href="/match/create">Register</Link>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={match} />
      </div>
    </>
  ) 
}