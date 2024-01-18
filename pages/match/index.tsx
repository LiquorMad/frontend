import { ModalRegisterMatch } from "@/components/matchs/modalRegisterMatch"
import { DataTable } from "@/components/ui/data-table"
import React from "react"
import { GetServerSideProps } from "next"
import { loadMatchs, loadPlayers, loadTeams } from "@/lib/load-datas"
import { Players } from "../player"
import { Teams } from "../team"
import MatchsTable from '@/components/matchs/MatchsTable';
import { parseCookies } from "nookies"

export type Match = {
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
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {['ps4StandingsAuth.token']: token} = parseCookies(ctx)

  if(!token){
    return{
      redirect: { 
        destination: '/login',
        permanent: false,
      }
    }
  }
  const players = await loadPlayers()
  const match = await loadMatchs();
  const teams = await loadTeams();
  return {
    props: { players,match,teams,text:'Matchs'},
  }
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
     
      <h1>{text}</h1>
      <div className="container mx-auto py-10">
        <MatchsTable data={match} onAdd={handleClick} players={players}teams={teams}/>
      </div>
    </>
  ) 
}