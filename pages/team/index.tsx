import React from 'react'
import { ModalRegisterTeam } from '@/components/teams/modalRegisterTeam';
import { loadTeamById } from '@/lib/load-datas';
import TeamsTable from '@/components/teams/TeamsTable';

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
