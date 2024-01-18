import * as z from "zod"
import { formSchemaCreateTeam, formSchemaUpdateTeam } from "./FormSchemaTeams";

const baseUrlTeam = 'http://127.0.0.1:3333/api/times';

export async function CreateTeam(Teams: z.infer<typeof formSchemaCreateTeam>){
    const JSONdata = JSON.stringify(Teams)
    const endpoint = baseUrlTeam;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    console.log(response)

    return response;
}
export async function DeleteTeam(id:number){
    const endpoint = (`${baseUrlTeam}/${id}`)
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }

  export async function UpdateTeam(Teams: z.infer<typeof formSchemaUpdateTeam>){
    const JSONdata = JSON.stringify(Teams)
    const endpoint = `${baseUrlTeam}/${Teams.id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    return response;
  }
