import { Router } from "next/router";

export async function DeletePlayer(id:number){
    const endpoint = `http://127.0.0.1:3333/api/players/${id}`
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }