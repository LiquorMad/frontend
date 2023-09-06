import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link';
import { columns } from "./columns"
type Teams = {
    id: number,
    nome: string,
    status: "pending" | "processing" | "success" | "failed"
  
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
    return(
      <div >
        <h1>{text}</h1>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={teams} type={text}/>
        </div>
      </div>
    ) 
  }
