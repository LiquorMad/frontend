import * as z from "zod"
import { formSchemaCreateMatch, formSchemaUpdateMatch } from "./FormSchemaMatchs";

const baseUrlMatchs = 'http://127.0.0.1:3333/api/partidas';

export async function CreateMatch(matchs: z.infer<typeof formSchemaCreateMatch>){
    const JSONdata = JSON.stringify(matchs)
    const endpoint = baseUrlMatchs;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    return response;
}
export async function DeleteMatch(id:number){
    const endpoint = (`${baseUrlMatchs}/${id}`)
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }

  export async function UpdateMatch(match: z.infer<typeof formSchemaUpdateMatch>){
    const JSONdata = JSON.stringify(match)
    console.log(JSONdata)

    const endpoint = `${baseUrlMatchs}/${match.id}`
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
