import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { ModalRegisterTeam } from '@/components/modalRegisterTeam';

export type Teams = {
    id: number,
    nome: string,
  
  }
  type TeamsProps = {
    teams: Teams[],
    text:string
  }

  export async function getStaticProps(){

    const data = await fetch('http://127.0.0.1:3333/api/times');
    const teams = await data.json()
  
    return {
      props: { teams,text:'Teams'},
    }
  
  }
  export async function handleDelete(id:number){

    // API endpoint where we send form data.
    const endpoint = `http://127.0.0.1:3333/api/times/${id}`
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'DELETE',
      // Tell the server we're sending JSON.
    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
    if (response.status===200){
      
    }
    console.log(response.status)
    
  }
  export default function Team({ teams,text }: TeamsProps){
  const [showModalTeam,setShowModalTeam] = React.useState(false);

  function handleClick() {
    setShowModalTeam(true);
  }
  function handleOnClose(){
    setShowModalTeam(false)
  }
    return(
      <div >
      <ModalRegisterTeam onClose={handleOnClose} visible={showModalTeam}/>
        <h1>{text}</h1>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={teams} type={text} onAdd={handleClick}/>
        </div>
      </div>
    ) 
  }
