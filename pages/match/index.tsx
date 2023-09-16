import { ModalRegisterMatch } from "@/components/modalRegisterMatch"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import React from "react"
import { GetServerSideProps } from "next"
import { loadMatchs, loadPlayers, loadTeams } from "@/lib/load-datas"
import { Players } from "../player"
import { Teams } from "../team"
import { ModalUpdateMatch } from "@/components/modalUpdateMatch"

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
    teams:Teams[]
    text: string,
    players: Players[]
}
export const getServerSideProps: GetServerSideProps = async () => {
  const players = await loadPlayers()
  const match = await loadMatchs();
  const teams = await loadTeams();
  // Props returned will be passed to the page component
  return {
    props: { players,match,teams,text:'Matchs'},
  }
}
export async function handleDelete(id:number){
  
  // API endpoint where we send form data.
  const endpoint = `http://127.0.0.1:3333/api/partidas/${id}`
  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'DELETE',
    // Tell the server we're sending JSON.
  }
  // Send the form data to our forms API on Vercel and get a response.
  await fetch(endpoint, options)
  
}
export default function Match({ match,text,players,teams }:MatchProps){
const [showModalMatch,setShowModalMatch] = React.useState(false);

function handleClick() {
  setShowModalMatch(true);
}

function handleOnClose(){
  setShowModalMatch(false)
}
  return(
    <>
      <ModalRegisterMatch 
        onClose={handleOnClose} 
        visible={showModalMatch} 
        players={players} 
        teams={teams}
      />
      <ModalUpdateMatch 
        onClose={handleOnClose} 
        visible={showModalMatch} 
        players={players} 
        teams={teams}

      />
      <h1>{text}</h1>
      <div className="container mx-auto py-10">
        <DataTable onAdd={handleClick} columns={columns} data={match} type={text}/>
      </div>
    </>
  ) 
}