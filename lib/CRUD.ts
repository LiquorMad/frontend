import { formSchema } from './../components/players/modalRegisterPlayer';
import { Players } from "@/pages/player";
import * as z from "zod"

const baseUrlPlayers = 'http://127.0.0.1:3333/api/players';

export async function CreatePlayer(players: z.infer<typeof formSchema>){
    const JSONdata = JSON.stringify(players)
    const endpoint = baseUrlPlayers;
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
export async function DeletePlayer(id:number){
    const endpoint = (`${baseUrlPlayers}/${id}`)
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }

  export async function EditPlayer(player:Players){
    const JSONdata = JSON.stringify(player)
    const endpoint = `${baseUrlPlayers}/${player.id}`
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
