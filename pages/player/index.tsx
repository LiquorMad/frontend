import { Player, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { loadPlayers } from '../../lib/load-datas'
import { GetServerSideProps } from "next"
import React from "react"
import { ModalRegisterPlayer } from "@/components/modalRegisterPlayer"
import { useRouter } from "next/router"


export type Players = {
  id: number,
  nome: string,
  apelido: string,
}

type PlayersProps = {
  players: Players[],
  text:string
}
 
export const getServerSideProps: GetServerSideProps = async () => {
  const players = await loadPlayers()
  // Props returned will be passed to the page component
  return {
    props: { players,text:'Players'},
  }
}

export async function handleDelete(id:number){

  // API endpoint where we send form data.
  const endpoint = `http://127.0.0.1:3333/api/players/${id}`
  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'DELETE',
    // Tell the server we're sending JSON.
  }
  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options)
  console.log(response)
  
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
        <DataTable 
        columns={columns} 
        data={players} 
        type={text} 
        onAdd={handleClick} 
        />
      </div>
    </div>
  ) 
}