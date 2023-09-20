import React from 'react'
import { ModalRegisterTeam } from '@/components/modalRegisterTeam';
import { loadTeamById } from '@/lib/load-datas';
import TeamsTable from '@/components/TeamsTable';

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
  //handle recieve id from collumn
  export async function handleUpdate(id:number){
    await loadTeamById(id);
  }
  export default function Team({ teams,text }: TeamsProps){
  const [showModalTeamRegister,setshowModalTeamRegister] = React.useState(false);

  function handleClick() {
    setshowModalTeamRegister(true);
  }
  function handleOnCloseRegister(){
    setshowModalTeamRegister(false)
  }
  
    return(
      <div>
      <ModalRegisterTeam onClose={handleOnCloseRegister} visible={showModalTeamRegister} />
        <h1>{text}</h1>
        <div className="container mx-auto py-10">
          <TeamsTable data={teams} onAdd={handleClick}/>
        </div>
      </div>
    ) 
  }
