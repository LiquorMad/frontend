import { loadPlayers } from '../../lib/load-datas'
import { GetServerSideProps } from "next"
import React from "react"
import { ModalRegisterPlayer } from "@/components/players/modalRegisterPlayer"
import PlayersTable from "@/components/players/PlayersTable"
import { parseCookies } from 'nookies'

export type Players = {
  id: number,
  nome: string,
  apelido: string,
}

type PlayersProps = {
  players: Players[],
  text:string
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
  return {
    props: { players,text:'Players'},
  }
}

export default function Player({ players,text }: PlayersProps){
  
  const [showModalPlayer,setShowModalPlayer] = React.useState(false);

  function handleClick() {
    setShowModalPlayer(true);
  }
  function handleOnClose(){
    setShowModalPlayer(false)
  }
  return(
    <div >
      <ModalRegisterPlayer onClose={handleOnClose} visible={showModalPlayer}/>
      <h1>{text}</h1>
      <div className="container mx-auto py-10">
       <PlayersTable data={players} onAdd={handleClick}/>
      </div>
    </div>
  ) 
}