"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router"

import { Players } from "@/pages/player"
import { Teams } from "@/pages/team"

type MatchProps = {
  players: Players[],
  teams: Teams[],
  visible: boolean,
  onClose: () => void,
}
const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome must be at least 2 characters.",
  }),
  id_player_1: z.string().min(1,{
    message: "Escolhe um jogador diferente"
  }),
  id_player_2: z.string().min(1,{
    message: "Escolhe um jogador diferente"
  }),
  id_time_1: z.string().min(1,{
    message: "Escolhe um time diferente"
  }),
  id_time_2: z.string().min(1,{
    message: "Escolhe um time diferente"
  }),
})

export function ModalUpdateMatch({ visible, onClose,players,teams }:MatchProps) {
  if(!visible) return null;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      id_player_1: "",
      id_player_2: "",
      id_time_1: "",
      id_time_2: "",
    },
  })
  const router = useRouter();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>, id:Number) {

      // API endpoint where we send form data.
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(values)
    // API endpoint where we send form data.
    const endpoint = `http://127.0.0.1:3333/api/partidas/${id}`
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'PUT',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    
    if(response.status==201){
      
      router.push('/match');
      onClose()
      
    }
    
  }
return (
  
  <div  className="
    backdrop-blur-sm
    fixed
     bg-black
     bg-opacity-25 
     p-4 
     inset-0 
     flex 
     justify-center 
     items-center
      ">
    <div className="bg-white p-4 rounded m-2 drop-shadow-xl">
    <ScrollArea className="h-[400px] w-[450px] rounded-md border p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit()} className="space-y-8 p-1">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da partida" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_player_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player 1</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolhe o Player 1" />
                </SelectTrigger>
                <SelectContent>
                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                  {players.map((player) =>(
                    <SelectItem  value={player.id.toString()} key={player.id}>{player.nome}</SelectItem>
                  ))}
                </ScrollArea>
                </SelectContent>
              </Select>
              </FormControl>
              <FormDescription>
                This is your public display apelido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_player_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>P2</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} >

                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolhe o Player 2" />
                </SelectTrigger>
                <SelectContent>
                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                  {players.map((player) =>(
                    <SelectItem value={player.id.toString()} key={player.id}>{player.nome}</SelectItem>
                  ))}
                </ScrollArea>
                </SelectContent>
              </Select>
              </FormControl>
              <FormDescription>
                This is your public display apelido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="id_time_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time 1</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolhe o time 1" />
                </SelectTrigger>
                <SelectContent>
                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4"> 
                  {teams.map((team) =>(
                    <SelectItem value={team.id.toString()} key={team.id}>{team.nome}</SelectItem>
                  ))}
                </ScrollArea>
                </SelectContent>
              </Select>
              </FormControl>
              <FormDescription>
                This is your public display apelido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_time_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time 2</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} >

                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolhe o time 2" />
                </SelectTrigger>
                <SelectContent>
                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4"> 
                  {teams.map((team) =>(
                    <SelectItem value={team.id.toString()} key={team.id}>{team.nome}</SelectItem>
                  ))}
                </ScrollArea>
                </SelectContent>
              </Select>
              </FormControl>
              <FormDescription>
                This is your public display apelido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">Submit</Button>
        <Button className="float-right" variant="outline" onClick={onClose}>Cancel</Button>
      </form>
    </Form>
  </ScrollArea>
    </div>
    </div>
  )
}